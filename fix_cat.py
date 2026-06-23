import os

path = r'c:\Users\HomePC\.gemini\antigravity\brain\792a8f1a-0fce-41a3-95c6-d1341073d446\src\components\home\CategoryGrid.tsx'
with open(path, 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace('className={group }', 'className={group }')
c = c.replace('className={group }', 'className={group }')

with open(path, 'w', encoding='utf-8') as f:
    f.write(c)
print('CategoryGrid fixed')
