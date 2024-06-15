import base64
import json
from github_utils import github_get, get_git_trees
import re

namelist_input = []

git_trees = get_git_trees()
variables = {}

variables = {}

for item in git_trees["tree"]:
    if item["type"] != "blob" or not(item["path"].startswith("run/README.namelist")):
        continue

    print(item["path"])
    source = item["path"]

    response = github_get(item["url"])
    blob_json = response.json()
    content = base64.b64decode(blob_json["content"])
    group = None

    for line in content.splitlines():

        if len(line) == 0:
            continue

        str_line = str(line, encoding='utf-8')

        match = re.search("^ \&([a-z0-9_]+)", str_line)

        if not(match == None):
            group = match.groups()[0]
            if not(group in variables):
                variables[group] = {}

        if group == None:
            continue

        match = re.search("^ ([a-z_]+) (\(max_dom\))?\s+\=\s(\S+)\,?(\s*\!\s*(.+))?", str_line)
        if not(match == None):
            variable = match.groups()[0]
            if match.groups()[1] == None:
                entries = '1'
            else:
                entries = 'max_dom'

            defaultValue = match.groups()[2]

            if not(variable in variables[group]):
                variables[group][variable] = {
                    "entries": entries,
                    "defaultValue": defaultValue
                }

json_path = "src/json/namelist.input.readme.json"
with open(json_path, "w") as outfile:
    outfile.write(json.dumps(variables, indent=4))