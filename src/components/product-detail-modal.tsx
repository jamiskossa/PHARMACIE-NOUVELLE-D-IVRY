"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@/types";
import { CreditCard, ShoppingCart, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// Placeholder icons for payment methods
const PayPalIcon = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"><title>PayPal</title><path d="M7.076 21.337H2.478l.195-1.162.77-4.614-.196-1.16-.012.006H.337a.332.332 0 0 1-.333-.333L0 13.91l2.115-12.693a.333.333 0 0 1 .333-.301h6.088c4.49 0 7.02 2.117 5.728 6.55-1.01 3.5-3.699 4.318-6.873 4.318h-1.32zM4.172 5.163L2.95 12.48h1.127c2.375 0 4.134-.95 4.882-3.235.75-2.28-.688-3.92-3.13-3.92H4.172zm12.924 10.02l-2.06-12.355a.333.333 0 0 0-.332-.301H9.803c.27 1.63.095 2.992-.5 4.02-.59 1.02-1.46 1.634-2.58 2.012l-.25.087.196 1.162.77 4.614-.196 1.16-.012.006H3.443a.332.332 0 0 0-.333.333l-.004.16.286 1.716a.334.334 0 0 0 .334.301h3.633c.36 0 .662-.23.773-.574l.89-3.562.23-1.383.022.014c.43.273 1.348.653 2.15.653 4.49 0 7.02-2.117 5.727-6.55zm-5.71-3.447c-.75-2.28.687-3.92 3.13-3.92h1.12l-1.22 7.323c-.75 2.28-2.508 3.235-4.882 3.235h-1.92c.62-1.35.79-2.9.472-4.638z"/></svg>;
const ApplePayIcon = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current"><title>Apple Pay</title><path d="M10.244 5.275a2.636 2.636 0 0 1 2.219-1.252c.84 0 1.6.43 2.25.961.168.13.342.264.52.4.043.033.087.067.13.102a.49.49 0 0 1 .116.638 10.45 10.45 0 0 1-.508.683 2.64 2.64 0 0 0-.962 2.05c0 1.432.962 2.457 2.316 2.457a2.37 2.37 0 0 0 1.37-.43 2.51 2.51 0 0 0 .961-1.634c.033-.13.062-.263.087-.395a.51.51 0 0 1 .638-.415c.297.07.48.37.414.667a4.29 4.29 0 0 1-1.683 2.76 4.38 4.38 0 0 1-2.828 1.06 4.6 4.6 0 0 1-3.14-.995 4.87 4.87 0 0 1-1.78-3.04c-1.847.1-3.548.89-4.832 2.35a.51.51 0 0 1-.683-.716 9.4 9.4 0 0 1 2.382-2.828c.45-.36.934-.683 1.446-.962a11.1 11.1 0 0 1 1.748-.862c.11-.05.21-.102.308-.157.02-.01.03-.02.04-.031a10.8 10.8 0 0 0-2.083-3.615zm8.99 2.246c0-.33.116-.65.33-.913A2.08 2.08 0 0 1 11.1.205c.168 0 .33.02.49.052.5.087.979.33 1.385.683.407.35.717.785.914 1.284.196.5.275.995.227 1.492a2.03 2.03 0 0 1-1.864 1.634h-.051a2.07 2.07 0 0 1-1.83-1.127 8.5 8.5 0 0 0-1.413-2.612zm5.07 14.288c.65 0 1.282.167 1.847.498a.51.51 0 0 1 .134.782l-.014.015c-.23.23-.49.43-.765.597-.9.5-1.96.638-2.96.347a11.23 11.23 0 0 1-2.115-.994c-.464-.298-.9-.638-1.28-1.028-.396-.395-.7-84-.9-1.334a.51.51 0 0 1 .621-.605c.24.043.465.13.668.252.7.415 1.5.638 2.33.667h.45z"/></svg>;


export function ProductDetailModal({ product, onClose }: { product: Product; onClose: () => void; }) {
  const [paymentStep, setPaymentStep] = useState<'details' | 'payment'>('details');
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal' | 'applepay' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleAddToCart = () => {
    toast({
      title: "Produit ajouté !",
      description: `${product.name} a été ajouté à votre panier.`,
    });
    // Here you would typically call a context function to update the cart state
    onClose();
  };

  const handlePayNow = () => {
    setPaymentStep('payment');
  };
  
  const handleSelectPayment = (method: 'stripe' | 'paypal' | 'applepay') => {
      setPaymentMethod(method);
      // For a real app, you might immediately trigger the payment provider's SDK here.
      // For this demo, we'll just show a placeholder form/message.
  }
  
  const handleFinalizePayment = (e: React.FormEvent) => {
      e.preventDefault();
      setIsProcessing(true);
      toast({ title: 'Traitement du paiement...' });

      // Simulate API call
      setTimeout(() => {
          setIsProcessing(false);
          toast({
              title: "Paiement réussi !",
              description: "Votre commande a été validée. Merci pour votre achat !",
              variant: 'default',
          });
          onClose();
      }, 2000);
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0">
        <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left side: Image */}
            <div className="relative h-64 md:h-full min-h-[400px]">
                <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover rounded-l-lg"
                />
            </div>

            {/* Right side: Content */}
            <div className="flex flex-col">
                <DialogHeader className="p-6 text-left">
                    <DialogTitle className="font-headline text-3xl">{product.name}</DialogTitle>
                    <DialogDescription className="text-base pt-2">{product.shortDescription}</DialogDescription>
                </DialogHeader>

                <div className="px-6 flex-grow overflow-y-auto">
                    {paymentStep === 'details' && (
                        <>
                        <p className="text-3xl font-bold text-primary my-4">{product.price.toFixed(2)}€</p>
                        <p className="text-muted-foreground">{product.description}</p>
                        </>
                    )}
                    {paymentStep === 'payment' && (
                        <div className="space-y-6 animate-in fade-in-50">
                            <h3 className="font-headline text-2xl">Paiement</h3>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">{product.name}</span>
                                <span className="font-bold text-primary">{product.price.toFixed(2)}€</span>
                            </div>
                            <Separator/>
                            <div className="font-bold flex justify-between text-lg">
                                <span>Total</span>
                                <span>{product.price.toFixed(2)}€</span>
                            </div>
                            
                            <div className="space-y-3">
                                <Label>Choisir une méthode de paiement</Label>
                                <div className="grid grid-cols-3 gap-2">
                                    <Button variant={paymentMethod === 'stripe' ? 'default' : 'outline'} onClick={() => handleSelectPayment('stripe')} className="h-12"><CreditCard className="mr-2 h-5 w-5"/> Carte</Button>
                                    <Button variant={paymentMethod === 'paypal' ? 'default' : 'outline'} onClick={() => handleSelectPayment('paypal')} className="h-12"><PayPalIcon /></Button>
                                    <Button variant={paymentMethod === 'applepay' ? 'default' : 'outline'} onClick={() => handleSelectPayment('applepay')} className="h-12"><ApplePayIcon /></Button>
                                </div>
                            </div>
                            
                            {/* Payment Placeholders */}
                            {paymentMethod === 'stripe' && (
                                <form onSubmit={handleFinalizePayment} className="space-y-4 pt-4 border-t">
                                    <div className="space-y-2">
                                        <Label htmlFor="card-number">Numéro de carte</Label>
                                        <Input id="card-number" placeholder="0000 0000 0000 0000" disabled={isProcessing}/>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="expiry">Expiration</Label>
                                            <Input id="expiry" placeholder="MM/AA" disabled={isProcessing}/>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="cvc">CVC</Label>
                                            <Input id="cvc" placeholder="123" disabled={isProcessing}/>
                                        </div>
                                    </div>
                                    <Button type="submit" className="w-full" disabled={isProcessing}>
                                        {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                                        Payer {product.price.toFixed(2)}€
                                    </Button>
                                </form>
                            )}
                            {paymentMethod === 'paypal' && <div className="text-center p-4 bg-secondary rounded-md text-sm text-muted-foreground">Redirection vers PayPal...</div>}
                            {paymentMethod === 'applepay' && <div className="text-center p-4 bg-secondary rounded-md text-sm text-muted-foreground">Ouverture de la fenêtre Apple Pay...</div>}
                        </div>
                    )}
                </div>

                <DialogFooter className={cn("p-6 bg-secondary/30", paymentStep === 'payment' ? 'justify-between' : '')}>
                    {paymentStep === 'details' && (
                    <>
                        <Button variant="outline" onClick={handleAddToCart}>
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Ajouter au panier
                        </Button>
                        <Button onClick={handlePayNow}>Payer directement</Button>
                    </>
                    )}
                    {paymentStep === 'payment' && (
                        <Button variant="ghost" onClick={() => {setPaymentStep('details'); setPaymentMethod(null);}}>
                            Retour
                        </Button>
                    )}
                </DialogFooter>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
