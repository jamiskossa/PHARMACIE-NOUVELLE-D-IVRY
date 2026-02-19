"use client";

import { useState, useMemo } from "react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { mockProducts } from "@/lib/mock-data";
import Image from "next/image";
import type { Product } from "@/types";
import { ProductDetailModal } from "@/components/product-detail-modal";
import { ChevronRight, ShoppingCart } from "lucide-react";

// Define a structured category list for filtering
const categories = [
  {
    name: 'Parapharmacie',
    slug: 'parapharmacie',
    subcategories: [
      { name: 'Soins du visage', slug: 'soins-visage' },
      { name: 'Hygiène', slug: 'hygiene' },
    ],
  },
  {
    name: 'Compléments',
    slug: 'complements',
    subcategories: [
      { name: 'Immunité', slug: 'immunite' },
      { name: 'Vitalité', slug: 'vitalite' },
    ],
  },
  {
    name: 'Matériel Médical',
    slug: 'materiel-medical',
    subcategories: [
      { name: 'Diagnostic', slug: 'diagnostic' },
    ],
  },
];

// Simple logic to assign products to new subcategories for demo
const productsWithSubcategories = mockProducts.map(p => {
    if (p.name.includes('Crème') || p.name.includes('Solution')) {
        return {...p, subcategory: 'soins-visage'};
    }
    if (p.name.includes('Vitamines')) {
        return {...p, subcategory: 'immunite'};
    }
    if (p.name.includes('Thermomètre')) {
        return {...p, subcategory: 'diagnostic'};
    }
    return {...p, subcategory: ''};
});

export default function ProduitsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) {
      return productsWithSubcategories;
    }
    const categoryData = categories.find(c => c.slug === selectedCategory);
    if (!categoryData) return [];

    let products = productsWithSubcategories.filter(p => p.category === selectedCategory);

    if (selectedSubCategory) {
      products = products.filter(p => p.subcategory === selectedSubCategory);
    }
    
    return products;
  }, [selectedCategory, selectedSubCategory]);

  const handleSelectCategory = (categorySlug: string) => {
    if (selectedCategory === categorySlug) {
        setSelectedCategory(null); // Unselect if clicked again
        setSelectedSubCategory(null);
    } else {
        setSelectedCategory(categorySlug);
        setSelectedSubCategory(null); // Reset subcategory when category changes
    }
  }

  const handleSelectSubCategory = (subcategorySlug: string) => {
     if (selectedSubCategory === subcategorySlug) {
        setSelectedSubCategory(null); // Unselect if clicked again
     } else {
        setSelectedSubCategory(subcategorySlug);
     }
  }

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          {/* Hero Section - Professional & Simple Redesign */}
          <section className="relative bg-white pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden">
            <div className="container mx-auto px-4">
              <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                <div className="flex-1 text-center lg:text-left">
                  <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-6 animate-in fade-in slide-in-from-left-8 duration-700">
                    <ShoppingCart className="mr-2 h-4 w-4" /> Boutique
                  </div>
                  <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] animate-in fade-in slide-in-from-left-8 duration-1000">
                    Prendre soin de vous <br />
                    <span className="text-primary">en toute simplicité.</span>
                  </h1>
                  <p className="mt-8 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 animate-in fade-in slide-in-from-left-8 duration-1000 delay-200">
                    Parcourez notre catalogue de produits sélectionnés avec soin par nos pharmaciens pour répondre à tous vos besoins de santé et de bien-être.
                  </p>
                  <div className="mt-8 flex justify-center lg:justify-start animate-in fade-in slide-in-from-left-8 duration-1000 delay-300">
                    <div className="h-1.5 w-24 bg-primary rounded-full shadow-sm"></div>
                  </div>
                </div>
                <div className="flex-1 relative w-full max-w-2xl lg:max-w-none animate-in fade-in zoom-in duration-1000 delay-200">
                  <div className="relative aspect-video sm:aspect-[4/3] overflow-hidden rounded-3xl lg:rounded-[3rem] shadow-2xl shadow-slate-200 ring-8 ring-slate-50">
                    <Image
                      src="https://picsum.photos/seed/pharmacy-products/800/600"
                      alt="Produits de Pharmacie"
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  </div>
                  <div className="absolute -top-12 -right-12 -z-10 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
                </div>
              </div>
            </div>
          </section>

          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
                {/* Filters */}
                <aside className="lg:col-span-1">
                  <h2 className="font-headline text-2xl font-semibold mb-4">Catégories</h2>
                  <Accordion type="single" collapsible className="w-full" value={selectedCategory || undefined}>
                    {categories.map((cat) => (
                      <AccordionItem value={cat.slug} key={cat.slug}>
                        <AccordionTrigger onClick={() => handleSelectCategory(cat.slug)} className="text-lg font-semibold hover:no-underline">
                          {cat.name}
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-2 pl-4">
                            {cat.subcategories.map(sub => (
                                <li key={sub.slug}>
                                    <button 
                                        onClick={() => handleSelectSubCategory(sub.slug)} 
                                        className={`flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors w-full text-left ${selectedSubCategory === sub.slug ? 'text-primary font-semibold' : ''}`}
                                    >
                                        <ChevronRight className={`h-4 w-4 transition-transform ${selectedSubCategory === sub.slug ? 'rotate-90' : ''}`} />
                                        {sub.name}
                                    </button>
                                </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </aside>

                {/* Products Grid */}
                <div className="lg:col-span-3">
                  {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
                      {filteredProducts.map((product) => (
                        <Card key={product.productId} className="overflow-hidden rounded-lg shadow-md transition-shadow duration-300 hover:shadow-2xl flex flex-col group">
                          <CardHeader className="p-0">
                            <div className="relative h-56 w-full">
                                <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                          </CardHeader>
                          <CardContent className="p-6 flex-1 flex flex-col">
                            <CardTitle className="font-headline text-xl h-14">{product.name}</CardTitle>
                            <div className="flex-grow"></div>
                            <p className="mt-4 text-2xl font-bold text-primary">{product.price.toFixed(2)}€</p>
                          </CardContent>
                          <CardFooter className="p-6 pt-0">
                            <Button variant="outline" className="w-full" onClick={() => setSelectedProduct(product)}>
                              Voir les détails
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center h-full text-muted-foreground bg-secondary/20 rounded-lg py-20">
                        <p className="text-lg font-semibold">Aucun produit trouvé</p>
                        <p className="mt-2">Essayez de sélectionner une autre catégorie ou de réinitialiser les filtres.</p>
                        <Button variant="link" onClick={() => { setSelectedCategory(null); setSelectedSubCategory(null); }}>
                            Réinitialiser les filtres
                        </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
      {selectedProduct && (
        <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </>
  );
}
