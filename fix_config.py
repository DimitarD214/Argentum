import os

path = r'c:\Users\HomePC\.gemini\antigravity\brain\792a8f1a-0fce-41a3-95c6-d1341073d446\next.config.ts'
with open(path, 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace("{ protocol: 'https', hostname: 'astera-stil.vercel.app' },", "{ protocol: 'https', hostname: 'astera-stil.vercel.app' },\n      { protocol: 'https', hostname: 'argentum-stil.vercel.app' },")

with open(path, 'w', encoding='utf-8') as f:
    f.write(c)
print('Fixed next config')
