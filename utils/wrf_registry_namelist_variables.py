import base64
import json
from github_utils import github_get, get_git_trees

namelist_input = []

git_trees = get_git_trees()
variables = {}

def read_until_quote(reader):
    current = reader['current']
    while current < reader['length'] and reader['line'][current] != '"':
        current += 1
    reader['current'] = current

def read_until_delim(reader):
    current = reader['current']
    while current < reader['length'] and reader['line'][current] != ' ' and reader['line'][current] != '\t':
        current += 1
    reader['current'] = current

def read_until_next_value(reader):
    while reader['current'] < reader['length'] and (reader['line'][reader['current']] == ' ' or reader['line'][reader['current']] == '\t'):
        reader['current'] += 1

def read_value(reader):
    start = reader['current']
    match reader['line'][reader['current']]:
        case '"':
            start += 1
            reader['current'] = start
            read_until_quote(reader)
        case _:
            read_until_delim(reader)
    value = reader['line'][start:reader['current']]
    reader['current'] += 1
    return value

def add_variable_error(variable, error):
    if not "errors" in variable:
        variable["errors"] = []
    variable["errors"].append(error)

for item in git_trees["tree"]:
    if item["type"] != "blob" or not(item["path"].startswith("Registry/")):
        continue

    print(item["path"])
    source = item["path"]

    response = github_get(item["url"])
    blob_json = response.json()
    content = base64.b64decode(blob_json["content"])

    for line in content.splitlines():

        if len(line) == 0:
            continue

        str_line = str(line, encoding='utf-8').strip()

        if str_line.startswith("#"):
            continue

        values = []
        reader = {
            "current": 0,
            "length": len(str_line),
            "line": str_line
        }

        while reader['current'] < reader['length']:
            values.append(read_value(reader))
            read_until_next_value(reader)

        #<Table>   <Type>    <Sym>      <How set>               <Nentries>   <Default>
        #rconfig   integer   run_days   namelist,time_control   1            0           irh   "run_days"   "NUMBER OF DAYS TO RUN"

        if len(values) < 6:
            continue

        if values[0] != "rconfig":
            continue

        # data type
        type = values[1].lower()

        # variable name
        name = values[2].lower()
        print("\t{0}".format(name))

        # how set
        how_set = values[3].split(",")
        if len(how_set) < 2 or how_set[0] != "namelist":
            continue
        group = how_set[1].lower()

        # number of entries
        entries = values[4].lower()

        # default value
        str_default_value = values[5]
        if (str_default_value == "-"):
            default_value = None
        else:
            match type:
                case "integer":
                    default_value = int(str_default_value)
                case "real":
                    default_value = float(str_default_value)
                case "logical":
                    match str_default_value:
                        case ".true.":
                            default_value = True
                        case ".false.":
                            default_value = False
                        case _:
                            raise RuntimeError("Unknown logical value {0}".format(str_default_value))
                case "character":
                    default_value = str_default_value
                case _:
                    raise RuntimeError("Unknown variable data type {0}".format(type))

        # I/O
        io = None
        tail = 6
        if len(values) > tail:
            io = values[tail]
            tail += 1

        comments = None
        if len(values) > tail:
            comments = list(filter(lambda x: (len(x) > 0), values[tail:]))
            if len(comments) == 0:
                comments = None

        if not(group in variables):
            variables[group] = {}

        if name in variables[group]:
            last_source = variables[group][name]["sources"][-1]
            variables[group][name]["sources"].append(source)
            if comments != None and len(comments) > 0:
                if variables[group][name]["comments"] == None:
                    variables[group][name]["comments"] = comments
                else:
                    for comment in comments:
                        variables[group][name]["comments"].append(comment)
                    variables[group][name]["comments"] = list(set(variables[group][name]["comments"]))

            if type != variables[group][name]["type"]:
                add_variable_error(variables[group][name], "Data type {0} ({1}) does not match existing type {2} ({3})".format(type, source, variables[group][name]["type"], last_source))
            
            if entries != variables[group][name]["entries"]:
                add_variable_error(variables[group][name], "Number of entries {0} ({1}) does not match existing number of entries {2} ({3})".format(entries, source, variables[group][name]["entries"], last_source))
            
            if default_value != variables[group][name]["defaultValue"]:
                add_variable_error(variables[group][name], "Default value '{0}' ({1}) does not match existing default value '{2}' ({3})".format(default_value, source, variables[group][name]["defaultValue"], last_source))
            
        else:
            variables[group][name] = {
                "type": type,
                "defaultValue": default_value,
                "entries": entries,
                "comments": comments,
                "io": io,
                "sources": [
                    source
                ]
            }

json_path = "src/json/namelist.input.registry.json"
with open(json_path, "w") as outfile:
    outfile.write(json.dumps(variables, indent=4))

for group in variables:
    for variable in variables[group]:
        if 'errors' in variables[group][variable]:
            for error in variables[group][variable]['errors']:
                print("{0}/{1}: {2}".format(group, variable, error))
