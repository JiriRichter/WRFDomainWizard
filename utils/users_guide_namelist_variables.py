from bs4 import BeautifulSoup
import requests
import json

variables = {}

url = "https://www2.mmm.ucar.edu/wrf/users/wrf_users_guide/build/html/namelist_variables.html"
page = requests.get(url)

soup = BeautifulSoup(page.text, 'html.parser')
section_variables = soup.find(id="namelist-variables")
sections = section_variables.find_all('section')

def get_element_text(element):
    if element is None:
        return None
    return element.text.strip()

def get_cell_text(cell):
    p = cell.find('p')
    return get_element_text(p)

def get_entry(cell):
    entry = get_cell_text(cell)
    if entry is None:
        return None
    entry = entry.lower()
    if entry == 'max_dom':
        return entry
    return '1'

def decode_text(text):
    if text is None:
        return None
    text = text.replace('\u2018', '\'').replace('\u2019', "'")
    text = text.replace('\u201c', '').replace('\u201d', '')
    text = text.replace('"', '')
    text = text.replace('\u2013', '-')
    text = text.replace('\u2026', '...')
    return ' '.join(text.splitlines())

for section in sections:
    title = section.find('h2').text
    group_name = title.strip().replace('¶', '').replace('&', '')
    variables[group_name] = {}

    tables = section.find_all('table', class_="docutils")
    for table in tables:

        if 'nlheader' in table['class'] or 'nlnote' in table['class']:
            continue

        rows = table.find_all('tr')
        for row in rows:

            cells = row.find_all('td')
            variable_names = cells[0].find_all('p')
            for variable_name in variable_names:
                variable = {
                    'defaultValue': decode_text(get_cell_text(cells[1])),
                    'description': decode_text(get_cell_text(cells[2]))
                }

                if len(cells) > 3:
                    variable['entries'] = get_entry(cells[3])
                else:
                    variable['entries'] = '1'

                variables[group_name][get_element_text(variable_name)] = variable

json_path = "src/json/namelist.input.users.guide.json"
with open(json_path, "w") as outfile:
    outfile.write(json.dumps(variables, indent=4))