"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { useCustomerPreferencesStore } from "@/store/customerPreferencesStore";
import products from "@/data/products.json";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import PriceDisplay from "@/components/shop/PriceDisplay";
import TrustIndicators from "@/components/shop/TrustIndicators";
import RingSizeGuideButton, { RING_SIZES } from "@/components/shop/RingSizeGuide";
import HallmarkModalButton from "@/components/shop/HallmarkModal";
import { formatEUR, getFineness, getPriceInfo } from "@/lib/pricing";
import { VAT_NOTICE } from "@/lib/company";

interface Product {
  id: string;
  name: string;
  line?: string;
  subcategory?: string;
  theme: string;
  stoneColor: string;
  brand?: string;
  price: { sterling_silver?: number; gold_14k?: number };
  /** Lowest price in the 30 days before a reduction, per metal (ZZP čl. 19) */
  priceHistory30d?: { sterling_silver?: number; gold_14k?: number };
  badges: string[];
  description: string;
  images: string[];
  category: string;
  material: string[];
}

const translateMap: Record<string, string> = {
  All: "Sve",
  Rings: "Prstenje",
  Earrings: "Naušnice",
  Necklaces: "Ogrlice",
  Bracelets: "Narukvice",
  Tradicijski: "Tradicijski nakit",
  Klasično: "Astera Klasici",
  Cvijeće: "Cvjetni Filigran",
  "Sterling Silver": "Srebro 925",
  "14k Gold": "14k Zlato",
  "Rose Gold": "Rozo Zlato",
  Platinum: "Platina",
  Jewelry: "Nakit",
};

const t = (val: string) => translateMap[val] || val;

export default function ProductDetailClient({
  productId,
  breadcrumbs = [],
}: {
  productId: string;
  /** Visible breadcrumb trail (mirrors the BreadcrumbList JSON-LD), excluding "Početna" */
  breadcrumbs?: { name: string; path: string }[];
}) {
  const product = (products as Product[]).find((p) => p.id === productId);
  const { addItem, updateCartOpen } = useCartStore();
  const {
    recentlyViewedIds,
    preferredMetal,
    ringSize,
    recordProductView,
    setPreferredMetal,
    setRingSize,
  } = useCustomerPreferencesStore();

  const [selectedMetalOverride, setSelectedMetalOverride] = useState<string>("");
  const [selectedImageIdx, setSelectedImageIdx] = useState<number>(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [selectedSizeOverride, setSelectedSizeOverride] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const isRing = product?.category === "Rings";

  const selectedMetal =
    selectedMetalOverride && product?.material.includes(selectedMetalOverride)
      ? selectedMetalOverride
      : preferredMetal && product?.material.includes(preferredMetal)
      ? preferredMetal
      : product?.material[0] || "";

  const selectedSize =
    selectedSizeOverride !== null
      ? selectedSizeOverride
      : isRing && ringSize && RING_SIZES.some((s) => s.eu === ringSize)
      ? ringSize
      : "";

  useEffect(() => {
    if (product) {
      recordProductView(product.id, product.line);
    }
  }, [product, recordProductView]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm-beige">
        <div className="text-center px-6">
          <h1 className="font-serif tracking-widest uppercase leading-tight text-astera-900 text-4xl mb-6">
            Komad Nije Pronađen
          </h1>
          <p className="font-sans text-charcoal/70 mb-12 italic">
            Umjetnička kreacija koju tražite trenutno nije dostupna.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center px-12 py-4 font-sans text-xs font-bold tracking-[0.2em] uppercase rounded-sm bg-astera-900 text-white hover:bg-astera-700 transition-all"
          >
            Povratak u Astera trgovinu
          </Link>
        </div>
      </div>
    );
  }

  const getPrice = () => getPriceInfo(product, selectedMetal).current;
  const fineness = getFineness(selectedMetal || product.material[0]);

  const handleAddToBag = () => {
    if (isRing && !selectedSize) {
      setSizeError(true);
      return;
    }
    addItem({
      id: product.id,
      name: product.name,
      price: getPrice(),
      quantity,
      image: product.images[0] || undefined,
      metal: t(selectedMetal),
      ...(isRing ? { size: selectedSize } : {}),
    });
    setAdded(true);
    updateCartOpen(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const personalizedProducts = (products as Product[])
    .filter((p) => p.id !== product.id)
    .sort((a, b) => {
      const aViewed = recentlyViewedIds.includes(a.id) ? 2 : 0;
      const bViewed = recentlyViewedIds.includes(b.id) ? 2 : 0;
      const aSameLine = a.line === product.line ? 1 : 0;
      const bSameLine = b.line === product.line ? 1 : 0;
      return bViewed + bSameLine - (aViewed + aSameLine);
    })
    .slice(0, 4);

  return (
    <div className="bg-cream">
      <Navbar />

      <main className="min-h-screen pt-36 lg:pt-48 pb-24">
        <section className="py-10 md:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
              {/* Left — Product Visuals (7 Cols) */}
              <div className="lg:col-span-7 space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <div className="aspect-square bg-warm-beige rounded-2xl overflow-hidden flex items-center justify-center border border-astera-200 shadow-md group relative">
                    {product.images && product.images.length > 0 ? (
                      <Image
                        src={product.images[selectedImageIdx] || product.images[0]}
                        alt={product.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        priority
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                    ) : (
                      <div className="text-astera-400 font-serif tracking-[0.3em] text-xl uppercase italic">
                        {product.name}
                      </div>
                    )}
                  </div>
                </motion.div>

                {product.images && product.images.length > 1 && (
                  <div className="flex gap-4">
                    {product.images.map((img, idx) => (
                      <button
                        key={img}
                        type="button"
                        onClick={() => setSelectedImageIdx(idx)}
                        className={`relative w-24 h-24 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                          selectedImageIdx === idx
                            ? "border-astera-900 shadow-sm"
                            : "border-astera-200 opacity-70 hover:opacity-100"
                        }`}
                      >
                        <Image src={img} alt={`${product.name} ${idx + 1}`} fill sizes="96px" className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right — Product Details (5 Cols) */}
              <div className="lg:col-span-5 lg:sticky lg:top-40">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
                >
                  {/* Breadcrumb */}
                  <nav
                    aria-label="Navigacijske mrvice"
                    className="font-sans text-[11px] tracking-[0.2em] uppercase flex flex-wrap items-center gap-x-2.5 gap-y-1 mb-6 text-astera-600 font-bold"
                  >
                    <Link href="/" className="hover:text-astera-900 transition-colors">
                      Početna
                    </Link>
                    {breadcrumbs.map((c, i) => (
                      <span key={c.path} className="flex items-center gap-2.5">
                        <span className="opacity-40">/</span>
                        {i < breadcrumbs.length - 1 ? (
                          <Link href={c.path} className="hover:text-astera-900 transition-colors">
                            {c.name}
                          </Link>
                        ) : (
                          <span aria-current="page" className="opacity-80">{c.name}</span>
                        )}
                      </span>
                    ))}
                  </nav>

                  {/* Badges */}
                  {product.badges.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-5">
                      {product.badges.map((b) => (
                        <span
                          key={b}
                          className="inline-flex items-center px-3.5 py-1 rounded-full font-sans text-xs font-bold tracking-[0.18em] uppercase bg-warm-beige border border-astera-300/60 text-astera-900"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Identity */}
                  <h1 className="font-serif tracking-wider uppercase leading-tight text-astera-900 text-3xl md:text-4xl lg:text-5xl mb-4">
                    {product.name}
                  </h1>

                  {/* Fineness (DZM) – dedicated badge */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-5">
                    <span
                      data-testid="fineness-badge"
                      title={`Finoća ${fineness.ratio}`}
                      className="inline-flex items-center px-4 py-1.5 rounded-sm font-sans text-xs font-bold tracking-[0.18em] uppercase bg-astera-900 text-white"
                    >
                      {fineness.label}
                    </span>
                    <HallmarkModalButton />
                  </div>

                  <PriceDisplay product={product} material={selectedMetal} size="lg" className="mb-8" />

                  {/* Description */}
                  <p className="font-sans text-base text-charcoal/80 leading-relaxed mb-10 italic border-l-2 border-astera-400 pl-6">
                    &ldquo;{product.description}&rdquo;
                  </p>

                  {/* Form Elements */}
                  <div className="space-y-8">
                    {product.material.length > 1 && (
                      <div>
                        <label className="font-sans font-bold uppercase tracking-[0.22em] text-astera-900 mb-3 block text-xs">
                          Odaberite Materijal
                        </label>
                        <div className="flex flex-wrap gap-3">
                          {product.material.map((m) => (
                            <button
                              key={m}
                              onClick={() => {
                                setSelectedMetalOverride(m);
                                setPreferredMetal(m);
                              }}
                              className={`px-6 py-3 rounded-sm text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                                selectedMetal === m
                                  ? "bg-astera-900 text-white shadow-md"
                                  : "bg-transparent border border-astera-300 text-astera-800 hover:border-astera-900"
                              }`}
                            >
                              {t(m)}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Ring size selector with the guide directly adjacent */}
                    {isRing && (
                      <div>
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                          <label
                            htmlFor="ring-size"
                            className="font-sans font-bold uppercase tracking-[0.22em] text-astera-900 block text-xs"
                          >
                            Veličina prstena (EU)
                          </label>
                          <RingSizeGuideButton />
                        </div>
                        <select
                          id="ring-size"
                          value={selectedSize}
                          onChange={(e) => {
                            setSelectedSizeOverride(e.target.value);
                            setRingSize(e.target.value);
                            setSizeError(false);
                          }}
                          aria-invalid={sizeError}
                          className={`w-full bg-warm-beige border rounded-sm px-4 py-3 font-sans text-sm text-astera-900 ${
                            sizeError ? "border-red-500" : "border-astera-200"
                          }`}
                        >
                          <option value="">Odaberite veličinu</option>
                          {RING_SIZES.map((s) => (
                            <option key={s.eu} value={s.eu}>
                              {s.eu} (opseg {s.circumference} mm)
                            </option>
                          ))}
                        </select>
                        {sizeError && (
                          <p role="alert" className="mt-2 font-sans text-xs text-red-600">
                            Molimo odaberite veličinu prstena prije dodavanja u košaricu.
                          </p>
                        )}
                      </div>
                    )}

                    {/* Quantity & Action */}
                    <div className="flex flex-col gap-3">
                      <label className="font-sans font-bold uppercase tracking-[0.22em] text-astera-900 block text-xs">
                        Količina
                      </label>
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="flex items-center bg-warm-beige rounded-sm border border-astera-200 p-1 px-3">
                          <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="p-3 text-astera-700 hover:text-astera-900 transition-colors cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-4 font-serif text-base font-bold min-w-[40px] text-center text-astera-900">
                            {quantity}
                          </span>
                          <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="p-3 text-astera-700 hover:text-astera-900 transition-colors cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={handleAddToBag}
                          className={`flex-1 w-full py-5 rounded-sm font-sans text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer ${
                            added
                              ? "bg-astera-700 text-white"
                              : "bg-astera-900 text-white hover:bg-astera-800"
                          }`}
                        >
                          {added
                            ? "✦ Dodano u Košaricu"
                            : `Dodaj u Košaricu — ${formatEUR(getPrice() * quantity)}`}
                        </button>
                      </div>
                      <p className="font-sans text-[11px] text-charcoal/55">{VAT_NOTICE}</p>
                    </div>

                    <TrustIndicators />
                  </div>

                  {/* Details */}
                  <div className="mt-12 pt-8 border-t border-astera-200">
                    <h4 className="font-sans font-bold uppercase tracking-[0.22em] text-astera-900 mb-5 text-xs">
                      Specifikacije Izrade
                    </h4>
                    <ul className="grid grid-cols-2 gap-y-4">
                      <li className="flex flex-col gap-0.5">
                        <span className="text-xs text-astera-500 uppercase tracking-widest font-bold">
                          Kategorija
                        </span>
                        <span className="text-sm font-sans text-astera-900 font-semibold">
                          {t(product.category)}
                        </span>
                      </li>
                      <li className="flex flex-col gap-0.5">
                        <span className="text-xs text-astera-500 uppercase tracking-widest font-bold">
                          Linija
                        </span>
                        <span className="text-sm font-sans text-astera-900 font-semibold">
                          {t(product.theme)}
                        </span>
                      </li>
                      <li className="flex flex-col gap-0.5">
                        <span className="text-xs text-astera-500 uppercase tracking-widest font-bold">
                          Detalj
                        </span>
                        <span className="text-sm font-sans text-astera-900 font-semibold">
                          {t(product.stoneColor)}
                        </span>
                      </li>
                      <li className="flex flex-col gap-0.5">
                        <span className="text-xs text-astera-500 uppercase tracking-widest font-bold">
                          Finoća (DZM)
                        </span>
                        <span className="text-sm font-sans text-astera-900 font-semibold">
                          {Array.from(new Set(product.material.map((m) => getFineness(m).label))).join(" & ")}
                        </span>
                      </li>
                      <li className="flex flex-col gap-0.5">
                        <span className="text-xs text-astera-500 uppercase tracking-widest font-bold">
                          Materijal
                        </span>
                        <span className="text-sm font-sans text-astera-900 font-semibold">
                          {product.material.map((m) => t(m)).join(" & ")}
                        </span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Personalized Recommendations & Recently Viewed */}
        <section className="py-16 border-t border-astera-200/70">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <p className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-astera-600 mb-2">
                  Personalizirani Odabir Za Vas
                </p>
                <h3 className="font-serif text-2xl md:text-3xl uppercase tracking-wider text-astera-900">
                  Nedavno pregledano &amp; slični komadi
                </h3>
              </div>
              <Link
                href="/shop"
                className="text-xs font-sans font-bold uppercase tracking-[0.22em] text-astera-800 hover:text-astera-900"
              >
                Pogledaj sve →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {personalizedProducts.map((item) => {
                const isViewed = recentlyViewedIds.includes(item.id);
                return (
                  <Link
                    key={item.id}
                    href={`/shop/${item.id}`}
                    className="group bg-warm-beige rounded-2xl border border-astera-200/80 overflow-hidden hover:shadow-xl transition-all duration-500 flex flex-col"
                  >
                    <div className="relative aspect-square overflow-hidden">
                      {isViewed && (
                        <span className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-astera-900/85 text-astera-100 text-xs font-sans font-bold uppercase tracking-[0.18em]">
                          Nedavno pregledano
                        </span>
                      )}
                      <Image
                        src={item.images[0] || "/images/astera-showcase.jpg"}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <h4 className="font-serif text-base uppercase tracking-wider text-astera-900 truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs font-sans uppercase tracking-widest text-astera-600 font-bold mt-0.5">
                          {item.stoneColor}
                        </p>
                      </div>
                      <PriceDisplay
                        product={item}
                        material={item.material[0]}
                        size="sm"
                        showVatNotice={false}
                        className="shrink-0 text-right"
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Trust Bar */}
        <section className="py-14 bg-warm-beige border-t border-astera-200/70">
          <div className="max-w-5xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
            <div className="flex flex-col items-center">
              <p className="font-serif uppercase tracking-[0.2em] text-astera-900 text-base mb-1">
                Ručna izrada
              </p>
              <p className="font-sans text-sm text-charcoal/75">
                Autentični hrvatski zlatarski i filigranski rad
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-serif uppercase tracking-[0.2em] text-astera-900 text-base mb-1">
                Besplatna dostava
              </p>
              <p className="font-sans text-sm text-charcoal/75">
                Luksuzno poklon pakiranje i osigurana pošiljka ({formatEUR(0)})
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
