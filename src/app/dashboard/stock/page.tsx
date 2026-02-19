"use client";
import { mockProducts } from "@/lib/mock-data";
import { AIStockSuggester } from "@/components/ai-stock-suggester";

export default function StockPage() {
    const lowStockProducts = mockProducts.filter(p => p.stock < (p.reorderThreshold || 20));
    const otherProducts = mockProducts.filter(p => p.stock >= (p.reorderThreshold || 20));

  return (
    <div className="space-y-6">
      <h1 className="font-headline text-3xl font-bold">Gestion du Stock</h1>
      
      <div>
        <h2 className="text-xl font-semibold mb-4 text-destructive">Produits à surveiller</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {lowStockProducts.map(product => (
                <AIStockSuggester key={product.productId} product={product} />
            ))}
        </div>
      </div>

       <div>
        <h2 className="text-xl font-semibold my-4">Autres produits</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {otherProducts.map(product => (
                <AIStockSuggester key={product.productId} product={product} />
            ))}
        </div>
      </div>
      
    </div>
  );
}
