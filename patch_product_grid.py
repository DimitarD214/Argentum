import os
import re

path = r'src/app/shop/ProductGrid.tsx'
if not os.path.exists(path):
    print(f'Error: {path} not found')
    exit(1)

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update the grid layout
old_grid = 'className=\"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-32\"'
new_grid = 'className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6\"'
content = content.replace(old_grid, new_grid)

# 2. Update the product card rendering logic
pattern = re.compile(r'\{filteredProducts\.map\(product => \{.*?\}\)\}', re.DOTALL)

new_map_content = \"\"\"{filteredProducts.map(product => {
          const isFav = favItems.includes(product.id);
          const badge = product.badges && product.badges.length > 0 ? product.badges[0] : null;

          return (
            <div key={product.id} className=\"group flex flex-col bg-white border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-500\">
              {/* Image Container with strict absolute anchors */}
              <div className=\"relative aspect-[4/5] overflow-hidden bg-gray-50 flex items-center justify-center\">
                
                {/* Badge - Top Left - Absolute & High Z-Index */}
                {badge && (
                  <div className=\"absolute top-4 left-4 z-10 px-3 py-1 bg-black/80 backdrop-blur-sm text-white text-[10px] font-sans font-bold uppercase tracking-widest pointer-events-none\">
                    {badge}
                  </div>
                )}

                {/* Favourites - Top Right */}
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleToggleFav(e, product.id);
                  }}
                  className=\"absolute top-4 right-4 z-20 p-2 bg-white/50 backdrop-blur-sm rounded-full text-gray-400 hover:text-black transition-all hover:scale-110 active:scale-95\"
                >
                  <svg xmlns=\"http://www.w3.org/2000/svg\" fill={isFav ? \"black\" : \"none\"} viewBox=\"0 0 24 24\" strokeWidth={1} stroke=\"currentColor\" className={w-5 h-5 }>
                    <path strokeLinecap=\"round\" strokeLinejoin=\"round\" d=\"M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z\" />
                  </svg>
                </button>
                
                {/* Interactive Image Area */}
                <a href={/shop/} className=\"absolute inset-0 block z-0\">
                  {product.images && product.images.length > 0 ? (
                    <img 
                      src={product.images[0]} 
                      alt={product.name} 
                      className=\"w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105\" 
                    />
                  ) : (
                    <div className=\"w-full h-full flex items-center justify-center text-gray-300 font-sans tracking-[0.2em] text-[10px] uppercase\">
                      {product.name}
                    </div>
                  )}
                </a>

                {/* Quick Add To Bag - Anchored to bottom, no text overlap */}
                <div className=\"absolute bottom-0 w-full z-20 transition-transform duration-500 transform translate-y-full group-hover:translate-y-0\">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleQuickAdd(e, product);
                    }}
                    className=\"w-full bg-black text-white text-[11px] font-sans font-bold uppercase tracking-widest py-4 hover:bg-astera-800 transition-colors shadow-[0_-4px_20px_rgba(0,0,0,0.1)]\"
                  >
                    Quick Add to Bag
                  </button>
                </div>
              </div>

              {/* Product Info - Internal Padding 16px - Perfect Center Alignment */}
              <div className=\"p-4 flex flex-col items-center text-center\">
                <a href={/shop/} className=\"block mb-2 overflow-hidden\">
                  <h2 className=\"font-serif text-[18px] text-black tracking-[-0.02em] leading-[1.2] hover:text-astera-600 transition-colors line-clamp-1\">
                    {product.name}
                  </h2>
                </a>
                <p className=\"font-sans text-[11px] text-astera-600/60 uppercase tracking-widest leading-[1.6] mb-4 h-[3.2em] line-clamp-2\">
                  {product.description}
                </p>
                <div className=\"pt-2 border-t border-gray-50 w-full flex justify-center\">
                  <p className=\"font-serif text-[19px] text-black tracking-tight\">
                    
                  </p>
                </div>
              </div>
            </div>
          );
        })}\"\"\"

if pattern.search(content):
    content = pattern.sub(new_map_content, content)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print('Successfully overhauled ProductGrid.tsx')
else:
    print('Error: Could not find product map block in ProductGrid.tsx')
