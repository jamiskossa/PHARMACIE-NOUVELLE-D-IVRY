'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Product {
  id: string;
  brand: string;
  name: string;
  oldPrice: number;
  newPrice: number;
  discount: string;
  volume: string;
  category: string;
  categoryHref: string;
}

const bestsellers: Product[] = [
  {
    id: '1',
    brand: 'LA ROCHE-POSAY',
    name: 'Lipikar Baume AP+MAX',
    volume: '400ml',
    oldPrice: 21.99,
    newPrice: 18.99,
    discount: '-3€',
    category: 'Beauté',
    categoryHref: '/produits?cat=beaute',
  },
  {
    id: '2',
    brand: 'ARKOPHARMA',
    name: 'Arkoroyal Gelée Royale BIO 2500 mg',
    volume: '20 ampoules',
    oldPrice: 15.99,
    newPrice: 12.99,
    discount: '-3€',
    category: 'Nutrition',
    categoryHref: '/produits?cat=nutrition',
  },
  {
    id: '3',
    brand: 'URIAGE',
    name: 'Huile Lavante Nettoyante',
    volume: '1L',
    oldPrice: 10.99,
    newPrice: 8.79,
    discount: '-2,20€',
    category: 'Hygiène',
    categoryHref: '/produits?cat=hygiene',
  },
  {
    id: '4',
    brand: 'BIODERMA',
    name: 'Gel Douche Atoderm Éco-Recharge',
    volume: '1L',
    oldPrice: 8.49,
    newPrice: 6.49,
    discount: '-2€',
    category: 'Hygiène',
    categoryHref: '/produits?cat=hygiene',
  },
  {
    id: '5',
    brand: 'BIOLANE',
    name: 'Liniment Oléo-Calcaire Bébé',
    volume: '500ml',
    oldPrice: 7.99,
    newPrice: 6.49,
    discount: '-1,50€',
    category: 'Bébé',
    categoryHref: '/produits?cat=bebe',
  },
  {
    id: '6',
    brand: 'MAYO KLINIK',
    name: 'Crème SPF 50+ Visage',
    volume: '50ml',
    oldPrice: 18.99,
    newPrice: 15.49,
    discount: '-3,50€',
    category: 'Beauté',
    categoryHref: '/produits?cat=beaute',
  },
];

export function BestsellersSection() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground mb-3">
            Les meilleures ventes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Retrouvez dans votre pharmacie les plus grandes marques de parapharmacie au meilleur prix
          </p>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto mt-2">
            Commandez facilement vos produits Santé, Beauté, Hygiène et Bébé
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {bestsellers.map((product) => (
            <Link
              key={product.id}
              href={product.categoryHref}
              className="group relative bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border border-slate-100 overflow-hidden flex flex-col"
            >
              {/* Discount Badge */}
              <div className="absolute top-3 left-3 z-10 bg-red-500 text-white font-bold text-xs py-1 px-3 rounded-full shadow-md">
                {product.discount} RÉDUCTION
              </div>

              {/* Image Placeholder */}
              <div className="relative h-48 sm:h-56 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden">
                <div className="text-5xl sm:text-6xl font-bold text-slate-300 select-none opacity-50">
                  {product.brand.split(' ')[0][0]}
                </div>
              </div>

              {/* Product Info */}
              <div className="flex-1 p-4 sm:p-6 flex flex-col">
                <h3 className="text-xs sm:text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">
                  {product.brand}
                </h3>
                <h4 className="text-base sm:text-lg font-medium text-slate-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 mb-4">
                  {product.volume}
                </p>

                {/* Prices */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xl sm:text-2xl font-bold text-red-600">
                    {product.newPrice.toFixed(2)}€
                  </span>
                  <span className="text-sm sm:text-base text-slate-400 line-through">
                    {product.oldPrice.toFixed(2)}€
                  </span>
                </div>

                {/* Add to Cart Button */}
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-colors mt-auto"
                  asChild
                >
                  <div className="flex items-center justify-center gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    Ajouter au panier
                  </div>
                </Button>
              </div>
            </Link>
          ))}
        </div>

        {/* See All Button */}
        <div className="text-center">
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
            asChild
          >
            <Link href="/produits">
              Voir toutes les meilleures ventes
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
