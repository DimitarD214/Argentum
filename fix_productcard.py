import os

path = r'c:\Users\HomePC\.gemini\antigravity\brain\792a8f1a-0fce-41a3-95c6-d1341073d446\src\components\shop\ProductCard.tsx'
with open(path, 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace('image: product.images[0],', 'image: product.images && product.images[0] ? product.images[0] : "/forest-greens-necklace.png",')
c = c.replace('src={product.images[0]}', 'src={product.images && product.images[0] ? product.images[0] : "/forest-greens-necklace.png"}')
c = c.replace('product.images.length > 1', 'product.images && product.images.length > 1')
c = c.replace('{product.images && product.images.length > 1 && (', '{product.images && product.images.length > 1 && product.images[1] && (')

with open(path, 'w', encoding='utf-8') as f:
    f.write(c)
print('Fixed ProductCard')
