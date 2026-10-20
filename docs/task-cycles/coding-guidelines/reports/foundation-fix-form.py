import json
from pathlib import Path
import re

root = Path.cwd()
reports = Path(__file__).parent
with (reports/'foundation-entries.json').open(encoding='utf-8',newline='') as stream:
    entries = json.load(stream)
path = root/'foundations/environment_facts.md'
with path.open(encoding='utf-8',newline='') as stream:
    text = stream.read()
for entry in entries['facts']:
    old = entry['source']
    new = re.sub(r' — "(.*?)"; read (\d{4}-\d{2}-\d{2})',lambda match:' — “'+match[1]+'”; read '+match[2],old)
    assert old in text
    text = text.replace(old,new,1)
    entry['source'] = new
with path.open('w',encoding='utf-8',newline='') as stream:
    stream.write(text)
path = root/'foundations/decisions.md'
with path.open(encoding='utf-8',newline='') as stream:
    text = stream.read()
for entry in entries['decisions']:
    old = '- **Scope:** '+entry['scope']
    new = '- **Scope:** '+entry['scope'].replace(' · ', ', ')
    assert old in text
    text = text.replace(old,new,1)
    entry['scope'] = entry['scope'].replace(' · ', ', ')
with path.open('w',encoding='utf-8',newline='') as stream:
    stream.write(text)
with (reports/'foundation-entries.json').open('w',encoding='utf-8',newline='') as stream:
    json.dump(entries,stream,ensure_ascii=False,indent=2)
print('Source delimiters and Scope separators corrected')
