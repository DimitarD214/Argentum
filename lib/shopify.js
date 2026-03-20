export const mockProducts = [
  {
    id: "prod_1",
    handle: "traditional-konavle-earrings",
    title: "Traditional Konavle Earrings",
    price: 120,
    description: "Authentic Croatian heritage. These stunning silver filigree earrings are handcrafted using centuries-old techniques native to the Konavle region.",
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?q=80&w=1000&auto=format&fit=crop"
    ],
    options: [
      { name: "Metal", values: ["Silver", "Gold Plated"] }
    ],
  },
  {
    id: "prod_2",
    handle: "mens-classic-chronograph",
    title: "Classic Chronograph Watch",
    price: 890,
    description: "Precision meets elegance. A robust stainless steel case houses a deep navy dial with precise chronograph functions and a scratch-resistant sapphire crystal.",
    images: [
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1000&auto=format&fit=crop"
    ],
    options: [
      { name: "Material", values: ["Stainless Steel", "Brushed Silver"] }
    ],
  },
  {
    id: "prod_3",
    handle: "tiami-personalized-necklace",
    title: "TiAmi Name Necklace",
    price: 95,
    description: "Our signature TiAmi collection. A delicate, custom-crafted silver nameplate necklace designed to be uniquely yours.",
    images: [
      "https://images.unsplash.com/photo-1599643478514-4a4e09f52f5e?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=1000&auto=format&fit=crop"
    ],
    options: [
      { name: "Metal", values: ["Silver", "Rose Gold Plated"] },
      { name: "Chain Length", values: ["16 inch", "18 inch", "20 inch"] }
    ],
  },
  {
    id: "prod_4",
    handle: "sibenik-button-ring",
    title: "Šibenik Button Ring",
    price: 150,
    description: "Inspired by the traditional Croatian Šibenik button (Šibensko puce), this exquisite silver ring brings history into modern luxury.",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f52bcfed5?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605101100878-574f8087ab91?q=80&w=1000&auto=format&fit=crop"
    ],
    options: [
      { name: "Metal", values: ["Silver", "Oxidized Silver"] },
      { name: "Size", values: ["6", "7", "8", "9"] }
    ],
  },
  {
    id: "prod_5",
    handle: "womens-elegant-watch",
    title: "Elegant Silver Watch",
    price: 450,
    description: "A minimalist masterpiece. Featuring a slimprofile case, mother-of-pearl dial, and a delicate mesh silver strap.",
    images: [
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611591437146-55e4e83f2dae?q=80&w=1000&auto=format&fit=crop"
    ],
    options: [
      { name: "Material", values: ["Silver Mesh", "White Leather"] }
    ],
  },
  {
    id: "prod_6",
    handle: "minimalist-silver-bangle",
    title: "Minimalist Silver Bangle",
    price: 85,
    description: "Sleek, stackable, and brilliantly polished. This solid 925 sterling silver bangle is the perfect everyday accessory.",
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515562141207-7a8efd38827e?q=80&w=1000&auto=format&fit=crop"
    ],
    options: [
      { name: "Size", values: ["Small", "Medium", "Large"] }
    ],
  }
];

export async function getProducts() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockProducts;
}

export async function getProduct(handle) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockProducts.find((p) => p.handle === handle) || null;
}

export async function createCart() {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return { id: "cart_mock_123", lines: [] };
}
