import os

path = r'c:\Users\HomePC\.gemini\antigravity\brain\792a8f1a-0fce-41a3-95c6-d1341073d446\src\components\home\BrandStory.tsx'
with open(path, 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace('"Ljepota koja nadilazi prolaznost vremena."', '&quot;Ljepota koja nadilazi prolaznost vremena.&quot;')

with open(path, 'w', encoding='utf-8') as f:
    f.write(c)
print('BrandStory lint fixed')
