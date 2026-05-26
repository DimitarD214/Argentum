import os
import re

path = 'src/components/Navbar.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace menuData
new_menu_data = """const menuData: Record<string, { columns: { title: string; links: string[] }[]; featuredImage: string; featuredTitle: string }> = {
  "Astera nakit": {
    columns: [
      { title: "Kategorije", links: ["Ogrlice", "Prstenje", "Naušnice", "Narukvice", "Privjesci"] },
      { title: "Kolekcije", links: ["Proljetni Cvat", "Smaragdna Priča", "Zvjezdana Noć"] }
    ],
    featuredImage: "https://images.unsplash.com/photo-1596566111082-d55e82ad9028?q=80&w=1974&auto=format&fit=crop",
    featuredTitle: "Elegancija i stil"
  },
  "Tradicijski nakit": {
    columns: [
      { title: "Vrsta", links: ["Botuni", "Konavoske naušnice", "Šibenski botun", "Zlatovez"] },
      { title: "Regije", links: ["Dalmacija", "Slavonija", "Istra"] }
    ],
    featuredImage: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070&auto=format&fit=crop",
    featuredTitle: "Hrvatska Baština"
  },
  "Vjerski nakit": {
    columns: [
      { title: "Kategorije", links: ["Krunice", "Medaljoni", "Križevi", "Anđeli"] },
      { title: "Prigode", links: ["Krštenja", "Prva Pričest", "Krizma", "Vjenčanja"] }
    ],
    featuredImage: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=1974&auto=format&fit=crop",
    featuredTitle: "Duhovna Povezanost"
  }
};"""

content = re.sub(r'const menuData.*?};\n', new_menu_data + '\n', content, flags=re.DOTALL)

# Replace navItems
content = re.sub(r'const navItems = \[.*?\];', 'const navItems = ["Astera nakit", "Tradicijski nakit", "Vjerski nakit"];', content)

# Change Left Nav and Right Nav logic
# Currently slice(0,3) and slice(3). We have exactly 3, so let's put 2 on left, 1 on right, or all 3 on left.
# Wait, let's put all 3 on the left and remove the right nav slice.
# Or put 1 on left, 2 on right. "Astera nakit", "Tradicijski nakit" on left, "Vjerski nakit" on right.
content = content.replace('navItems.slice(0, 3).map', 'navItems.slice(0, 2).map')
content = content.replace('navItems.slice(3).map', 'navItems.slice(2).map')

# Fix links in nav. Currently they point to href="/shop".
# We want href={`/shop/${item.toLowerCase().replace(' ', '-')}`}
content = content.replace('href="/shop"', 'href={`/shop/${item.toLowerCase().replace(/ /g, "-")}`}')

# Fix links in dropdown. Currently they point to href="/shop"
# In the menuData map: col.links.map((link) => ( ... href="/shop"
# We need it to be href={`/shop/${activeMenu.toLowerCase().replace(' ', '-')}/${link.toLowerCase().replace(/ /g, "-")}`}
content = content.replace('href="/shop"\n                                className="text-[16px] md:text-[20px]', 'href={`/shop/${activeMenu.toLowerCase().replace(/ /g, "-")}/${link.toLowerCase().replace(/ /g, "-")}`}\n                                className="text-[16px] md:text-[20px]')

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Patched Navbar")
