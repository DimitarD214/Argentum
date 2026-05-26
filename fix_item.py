import os

path = 'src/components/Navbar.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the sub-menu link
content = content.replace('href={`/shop/${item.toLowerCase().replace(/ /g, "-")}`}\n                                className="text-[16px] md:text-[20px]', 'href={`/shop/${activeMenu.toLowerCase().replace(/ /g, "-")}/${link.toLowerCase().replace(/ /g, "-")}`}\n                                className="text-[16px] md:text-[20px]')

# Replace the featured image link
content = content.replace('<Link href={`/shop/${item.toLowerCase().replace(/ /g, "-")}`} className="mt-8 group/btn', '<Link href={`/shop/${activeMenu.toLowerCase().replace(/ /g, "-")}`} className="mt-8 group/btn')

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Fixed item undefined")
