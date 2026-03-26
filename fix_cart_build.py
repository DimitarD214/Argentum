import os

def patch_file(path, search_text, replace_text):
    abs_path = os.path.join(os.getcwd(), path)
    if not os.path.exists(abs_path):
        print(f"File not found: {path}")
        return
    with open(abs_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if search_text not in content:
        print(f"Search text not found in {path}")
    else:
        content = content.replace(search_text, replace_text)
        print(f"Successfully patched {path}")
    
    with open(abs_path, 'w', encoding='utf-8') as f:
        f.write(content)

# 1. Update CartStore Interface
patch_file("src/store/cartStore.ts",
           "interface CartState {\r\n  items: CartItem[];",
           "interface CartState {\r\n  items: CartItem[];\r\n  isCartOpen: boolean;")

# Fallback for \n if \r\n didn't match
patch_file("src/store/cartStore.ts",
           "interface CartState {\n  items: CartItem[];",
           "interface CartState {\n  items: CartItem[];\n  isCartOpen: boolean;")

patch_file("src/store/cartStore.ts",
           "  getCartCount: () => number;",
           "  getCartCount: () => number;\n  updateCartOpen: (isOpen: boolean) => void;")

# 2. Update CartStore Implementation
patch_file("src/store/cartStore.ts",
           "      items: [],",
           "      items: [],\n      isCartOpen: false,")

patch_file("src/store/cartStore.ts",
           "      getCartCount: () => {\n        return get().items.reduce((count, item) => count + item.quantity, 0);\n      },",
           "      getCartCount: () => {\n        return get().items.reduce((count, item) => count + item.quantity, 0);\n      },\n      updateCartOpen: (isOpen) => set({ isCartOpen: isOpen }),")

# 3. Update Navbar.tsx to use Global state instead of local
patch_file("src/components/Navbar.tsx",
           "const [isCartOpen, setIsCartOpen] = useState(false);",
           "const isCartOpen = useCartStore((state) => state.isCartOpen);\n  const setIsCartOpen = useCartStore((state) => state.updateCartOpen);")

print("Cart store fixed. Local Navbar state synced to global store.")
