import os

path = r'c:\Users\HomePC\.gemini\antigravity\brain\792a8f1a-0fce-41a3-95c6-d1341073d446\src\components\home\CategoryGrid.tsx'
with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

lines[33] = "             <ScrollReveal key={cat.name} delay={i * 150} className={`group ${cat.size || 'col-span-1'}`}>\n"

with open(path, 'w', encoding='utf-8') as f:
    f.writelines(lines)
print('Fixed line 34 truly')
