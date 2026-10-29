from pathlib import Path
import re

root=Path(__file__).resolve().parents[4]
definition=Path('C:/Storage/The Brain/The Brain/Notes/Projects/(P) Loop/definicja_mvp_loop2.md').read_text(encoding='utf-8')
decisions=(root/'foundations/decisions.md').read_text(encoding='utf-8')
def binding(text, heading):
    return re.search(re.escape(heading)+r'\n\n(.*?)\n\n-', text, re.S)[1]
def normal(text):
    return ' '.join(text.split())
for number,question in [(24,'What is a map made of?'),(140,'How does combat go?')]:
    source=binding(definition, '#### (new) — '+question)
    question_in_log='What is a game map made of?' if number==24 else question
    actual=binding(decisions,f'### D-{number} — '+question_in_log)
    assert normal(source)==normal(actual), number
source=normal(binding(definition,'#### (new) — How is a map solved, and what opens the next one?'))
expected=source.replace(', and every switch of the character to another program, sets it', ' sets it').replace(', while a change of the trip plan alone leaves it', '')
actual=normal(binding(decisions,'### D-136 — How is a map solved, and what opens the next one?'))
assert actual==expected, 'D-136 task-authorized subset'
for number in range(140,152):
    body=re.search(rf'(?ms)^### D-{number} — .*?\n\n(.*?)\n\n-',decisions)[1]
    if number!=140:
        assert not re.search(r'\b(only|never|always|without|must|shall)\b',body,re.I),number
assert 'narrows D-140 · narrows D-141' in decisions
assert 'a creature defeated in those turns adds a beaten attack' in decisions
print('PASS: projected map and combat binding text exact; solving subset exact; new candidate wording; early-completion precedence and conditional defeat count.')
