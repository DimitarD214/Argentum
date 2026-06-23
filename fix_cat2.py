import os

path = r'c:\Users\HomePC\.gemini\antigravity\brain\792a8f1a-0fce-41a3-95c6-d1341073d446\src\components\home\CategoryGrid.tsx'
with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

with open(path, 'w', encoding='utf-8') as f:
    for line in lines:
        if 'className={group }>' in line:
            line = line.replace('className={group }>', 'className={group }>')
        f.write(line)
print('Fixed line 34')
