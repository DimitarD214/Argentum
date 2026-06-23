import os

path = r'c:\Users\HomePC\.gemini\antigravity\brain\792a8f1a-0fce-41a3-95c6-d1341073d446\src\app\globals.css'
with open(path, 'r', encoding='utf-8') as f:
    c = f.read()
if '--color-charcoal' not in c:
    c = c.replace('--color-soft-taupe: #9e9e9e;', '--color-soft-taupe: #9e9e9e;\n  \n  --color-charcoal: #1f1f1f;\n  --color-obsidian: #0a0a0a;')
    with open(path, 'w', encoding='utf-8') as f:
        f.write(c)
print('globals.css updated')
