'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader, Lightbulb } from 'lucide-react';
import type { Product } from '@/types';
import { aiStockReorderSuggestions, AiStockReorderSuggestionsOutput } from '@/ai/flows/ai-stock-reorder-suggestions-flow';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

interface AISuggestion extends AiStockReorderSuggestionsOutput {
  productId: string;
}

export function AIStockSuggester({ product }: { product: Product }) {
  const [suggestion, setSuggestion] = useState<AISuggestion | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getSuggestion = async () => {
    setIsLoading(true);
    setError(null);
    setSuggestion(null);
    try {
      const result = await aiStockReorderSuggestions({
        productId: product.productId,
        productName: product.name,
        currentStock: product.stock,
        reorderThreshold: product.reorderThreshold || 20,
        salesHistory: product.salesHistory || [],
        category: product.category,
      });
      setSuggestion({ ...result, productId: product.productId });
    } catch (e) {
      setError('Erreur lors de la génération de la suggestion.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const isLowStock = product.stock < (product.reorderThreshold || 20);

  return (
    <Card className={isLowStock ? 'border-amber-500' : ''}>
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>ID: {product.productId}</CardDescription>
            </div>
            <Badge variant={isLowStock ? 'destructive' : 'secondary'}>
                {isLowStock ? 'Stock Faible' : 'En Stock'}
            </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <p className="text-sm font-medium text-muted-foreground">Stock Actuel</p>
                <p className="text-2xl font-bold">{product.stock}</p>
            </div>
            <div>
                <p className="text-sm font-medium text-muted-foreground">Seuil de Réappro</p>
                <p className="text-2xl font-bold">{product.reorderThreshold || 20}</p>
            </div>
        </div>
        {suggestion && suggestion.productId === product.productId && (
            <Alert className="mt-4 bg-gradient-to-tr from-primary/5 to-accent/5">
                <Lightbulb className="h-4 w-4" />
                <AlertTitle>Suggestion IA</AlertTitle>
                <AlertDescription>
                    <p className="font-bold">Quantité à commander: {suggestion.reorderQuantity}</p>
                    <p className="text-xs mt-1">{suggestion.reasoning}</p>
                </AlertDescription>
            </Alert>
        )}
        {error && (
            <Alert variant="destructive" className="mt-4">
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={getSuggestion} disabled={isLoading} className="w-full">
          {isLoading ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <Lightbulb className="mr-2 h-4 w-4" />}
          Obtenir une suggestion IA
        </Button>
      </CardFooter>
    </Card>
  );
}
