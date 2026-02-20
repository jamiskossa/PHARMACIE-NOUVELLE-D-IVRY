'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Heart,
  Menu,
  Phone,
  Search,
  ShoppingBag,
  Star,
  MapPin,
  Mail,
  ChevronDown,
  User as UserIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Logo } from '@/components/logo';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { UserNav } from '@/components/user-nav';
import { Separator } from './ui/separator';
import { useAuthContext } from '@/contexts/auth-context';
import { Skeleton } from './ui/skeleton';

const navLinks = [
  {
    name: 'BEAUTÉ',
    href: '#',
    subLinks: [
      { 
        name: 'Visage', 
        href: '#', 
        products: [
          'Nettoyants et Démaquillants', 'Gommages', 'Masques', 'Eaux Thermales', 'Soins Hydratants',
          'Soins Matifiants', 'Teint et éclat', 'Acné et Imperfections', 'Soins Anti-rougeurs',
          'Soins Anti-taches', 'Soins Anti-âge', 'Soins des yeux, cils et sourcils', 'Soins des lèvres',
          'Cosmétiques éthniques', 'Compléments alimentaires', 'Soins réparateurs', 'Soins Visage Premium'
        ]
      },
      { 
        name: 'Maquillage', 
        href: '#', 
        products: [
          'Base teint', 'Crème teintée', 'Correcteurs', 'Anti-cernes', 'Fond de teint', 'Poudre',
          'Maquillage yeux', 'Maquillage lèvres', 'Maquillage ongles', 'Accessoire maquillage', 'Maquillage Premium'
        ]
      },
      { 
        name: 'Corps', 
        href: '#', 
        products: [
          'Soins gommants et exfoliants', 'Epilation - décoloration', 'Soins hydratants', 'Soins anti-age',
          'Soins mains et ongles', 'Soins des pieds', 'Soins apaisants', 'Massage détente', 'Soins buste',
          'Vergetures', 'Cosmétiques éthniques', 'Parfums et eaux', 'Soins Corps Premium'
        ]
      },
      { 
        name: 'Cheveux', 
        href: '#', 
        products: [
          'Shampooing', 'Après-shampooing', 'Shampooing sec', 'Masque cheveux', 'Soins avec rinçage',
          'Soins sans rinçage', 'Chute de cheveux', 'Coloration', 'Lissage cheveux', 'Soins protecteurs',
          'Produits coiffants', 'Accessoires cheveux', 'Anti-poux', 'Enfant', 'Soins Capillaires Premium'
        ]
      },
      { 
        name: 'Bio et nature', 
        href: '#', 
        products: [
          'Nettoyants et Démaquillants bio', 'Gommages bio', 'Masques bio', 'Soins Hydratants bio',
          'Teint-Eclat bio', 'Soins Anti-age bio', 'Soins des yeux bio', 'Soins des lèvres bio',
          'Shampooing bio', 'Soins corps bio', 'Solaires bio'
        ]
      },
      { 
        name: 'Solaire', 
        href: '#', 
        products: [
          'Préparation au soleil', 'Protections solaires', 'Après-soleil', 'Coups de soleil',
          'Protection enfant', 'Zones sensibles', 'Protections solaires cheveux', 'Autobronzants',
          'Accessoires solaire', 'Soins Solaires Premium'
        ]
      },
    ],
  },
  {
    name: 'MAMAN & BÉBÉ',
    href: '#',
    subLinks: [
      { 
        name: 'Grossesse & Maternité', 
        href: '#', 
        products: ['Vergetures', 'Allaitement', 'Vitamines grossesse', 'Accessoires maternité'] 
      },
      { 
        name: 'Bébé - Soins & Hygiène', 
        href: '#', 
        products: ['Nettoyants', 'Change', 'Hydratation bébé', 'Solaire enfant', 'Croûtes de lait'] 
      },
      { 
        name: 'Bébé - Nutrition', 
        href: '#', 
        products: ['Lait 1er âge', 'Lait 2ème âge', 'Lait de croissance', 'Petits pots & Diversification'] 
      },
      { 
        name: 'Bébé - Accessoires', 
        href: '#', 
        products: ['Biberons', 'Tétines & Sucettes', 'Anneaux de dentition', 'Thermomètres'] 
      },
    ]
  },
  {
    name: 'SANTÉ & NUTRITION',
    href: '#',
    subLinks: [
      { 
        name: 'Médicaments', 
        href: '#', 
        products: ['Douleurs & Fièvre', 'Rhume & État grippal', 'Digestion', 'Allergies', 'Maux de gorge'] 
      },
      { 
        name: 'Compléments alimentaires', 
        href: '#', 
        products: ['Vitamines & Minéraux', 'Sommeil', 'Stress & Anxiété', 'Immunité', 'Articulations'] 
      },
      { 
        name: 'Premiers Secours', 
        href: '#', 
        products: ['Pansements', 'Désinfectants', 'Compresses', 'Seringues & Aiguilles'] 
      },
    ]
  },
  {
    name: 'HYGIÈNE & BIEN-ÊTRE',
    href: '#',
    subLinks: [
      { 
        name: 'Hygiène dentaire', 
        href: '#', 
        products: ['Brosses à dents', 'Dentifrices', 'Bains de bouche', 'Blanchiment', 'Interdentaire'] 
      },
      { 
        name: 'Hygiène corporelle', 
        href: '#', 
        products: ['Gels douche', 'Savons', 'Déodorants', 'Hygiène intime', 'Epilation'] 
      },
      { 
        name: 'Bien-être', 
        href: '#', 
        products: ['Huiles essentielles', 'Diffuseurs', 'Fleurs de Bach', 'Massages'] 
      },
    ]
  },
  {
    name: 'MINCEUR & SPORT',
    href: '#',
    subLinks: [
      { 
        name: 'Minceur', 
        href: '#', 
        products: ['Brûleurs de graisse', 'Draineurs', 'Substituts de repas', 'Crèmes minceur'] 
      },
      { 
        name: 'Sport & Nutrition', 
        href: '#', 
        products: ['Protéines', 'Énergie', 'Récupération', 'Accessoires de sport'] 
      },
    ]
  },
  {
    name: 'HOMME',
    href: '#',
    subLinks: [
      { 
        name: 'Rasage & Barbe', 
        href: '#', 
        products: ['Mousses & Gels', 'Après-rasage', 'Entretien barbe'] 
      },
      { 
        name: 'Soins Homme', 
        href: '#', 
        products: ['Visage', 'Corps', 'Cheveux', 'Déodorants homme'] 
      },
    ]
  },
  {
    name: 'VÉTÉRINAIRE',
    href: '#',
    subLinks: [
      { 
        name: 'Chiens', 
        href: '#', 
        products: ['Anti-parasitaires', 'Hygiène', 'Alimentation', 'Articulations'] 
      },
      { 
        name: 'Chats', 
        href: '#', 
        products: ['Pipettes & Colliers', 'Shampooings', 'Litières', 'Boules de poils'] 
      },
    ]
  },
  {
    name: 'K-BEAUTY',
    href: '#',
    subLinks: [
      { 
        name: 'Nettoyage Coréen', 
        href: '#', 
        products: ['Huiles démaquillantes', 'Nettoyants aqueux', 'Exfoliants'] 
      },
      { 
        name: 'Soins & Traitements', 
        href: '#', 
        products: ['Essences', 'Sérums', 'Masques tissus', 'Crèmes barrières'] 
      },
    ]
  },
  { name: 'PROMOTIONS', href: '#', highlight: true },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { user, isLoading } = useAuthContext();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Return a skeleton or null to avoid hydration mismatch
    // For now, returning null as before.
    return null;
  }

  return (
    <>
      {/* Top Bar */}
      <div className="bg-secondary/80 text-secondary-foreground text-[10px] sm:text-xs">
        <div className="container mx-auto px-4 h-9 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <span className="font-bold">4,8/5</span>
              <Star className="w-3 h-3 fill-accent text-accent" />
              <span className="text-muted-foreground hidden sm:inline">- 12 341 avis</span>
            </div>
            <Separator orientation="vertical" className="h-4 hidden sm:block" />
            <span className="hidden md:block">Pharmacie française agréée</span>
          </div>
          <div className="hidden text-center lg:block">
            Click & Collect ✦ Livraison Standard ou Express 24h
          </div>
          <div className="flex items-center gap-4">
            <Link href="#" className="flex items-center gap-1 transition-colors hover:text-primary">
              <Mail className="w-4 h-4"/> <span className="hidden md:inline">Nous écrire</span>
            </Link>
             <Link href="/contact" className="flex items-center gap-1 transition-colors hover:text-primary">
              <MapPin className="w-4 h-4"/> <span className="hidden md:inline">Nous trouver</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-6">
          {/* Mobile Menu Trigger */}
          <div className="lg:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Ouvrir le menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-full max-w-sm">
                 <SheetTitle className="sr-only">Menu principal</SheetTitle>
                 <SheetDescription className="sr-only">Liste des catégories et pages du site.</SheetDescription>
                <div className="p-6">
                  <Logo />
                </div>
                <Separator/>
                <nav className="p-6 h-[calc(100vh-120px)] overflow-y-auto">
                  <Accordion type="single" collapsible className="w-full">
                    {navLinks.map((link) => (
                      <AccordionItem key={`mobile-${link.name}`} value={link.name} className="border-none">
                        {link.subLinks ? (
                          <>
                            <AccordionTrigger className="py-3 text-[11px] font-semibold uppercase tracking-wider text-foreground hover:text-primary hover:no-underline">
                              {link.name}
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="flex flex-col space-y-1 ml-1">
                                <Accordion type="single" collapsible className="w-full">
                                  {link.subLinks.map((subLink) => (
                                    <AccordionItem key={`mobile-sub-${subLink.name}`} value={subLink.name} className="border-none">
                                      {subLink.products ? (
                                        <>
                                          <AccordionTrigger className="py-2 pl-4 text-xs font-medium text-foreground hover:text-primary hover:no-underline">
                                            {subLink.name}
                                          </AccordionTrigger>
                                          <AccordionContent>
                                            <div className="flex flex-col space-y-2 pl-8 border-l border-primary/10 ml-1">
                                              {subLink.products.map((product) => (
                                                <Link
                                                  key={`mobile-prod-${product}`}
                                                  href="#"
                                                  className="py-1 text-[11px] text-muted-foreground hover:text-primary transition-colors"
                                                  onClick={() => setIsMobileMenuOpen(false)}
                                                >
                                                  {product}
                                                </Link>
                                              ))}
                                            </div>
                                          </AccordionContent>
                                        </>
                                      ) : (
                                        <Link
                                          href={subLink.href}
                                          className="block py-2 pl-4 text-xs font-medium text-foreground hover:text-primary transition-colors"
                                          onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                          {subLink.name}
                                        </Link>
                                      )}
                                    </AccordionItem>
                                  ))}
                                </Accordion>
                              </div>
                            </AccordionContent>
                          </>
                        ) : (
                          <Link
                            href={link.href}
                            className={`block py-3 text-[11px] font-semibold uppercase tracking-wider transition-colors hover:text-primary ${link.highlight ? 'text-accent' : 'text-foreground'}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {link.name}
                          </Link>
                        )}
                      </AccordionItem>
                    ))}
                  </Accordion>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <div className="hidden lg:block">
            <Logo />
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher un médicament, une marque..."
                className="w-full rounded-full pl-12 pr-4 py-3 h-12 text-sm"
              />
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
             <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
                <Heart className="h-6 w-6" />
                <span className="sr-only">Liste de souhaits</span>
            </Button>
            <Button variant="ghost" size="icon" className="relative flex items-center gap-2 px-2 w-auto min-w-[40px]">
              <ShoppingBag className="h-6 w-6" />
               <span className="absolute -top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-accent-foreground text-[10px] font-bold">
                3
              </span>
              <span className="hidden sm:inline-block text-xs font-semibold">Panier</span>
            </Button>
             <a href="tel:0146723176" className="hidden xl:flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary">
                <Phone className="h-5 w-5" />
                <span>01 46 72 31 76</span>
              </a>
            {isLoading ? (
              <Skeleton className="h-10 w-10 rounded-full" />
            ) : user ? (
              <UserNav />
            ) : (
              <Button asChild variant="ghost" size="icon">
                <Link href="/connexion">
                  <UserIcon className="h-6 w-6" />
                  <span className="sr-only">Connexion</span>
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Main Navigation (Desktop) */}
        <nav className="hidden lg:block border-t bg-white">
          <div className="container mx-auto px-4">
            <ul className="flex justify-start xl:justify-center items-center h-14 space-x-3 xl:space-x-4 overflow-x-auto no-scrollbar whitespace-nowrap">
              {navLinks.map((link) => (
                <li key={link.name} className="group relative h-full flex items-center">
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider transition-colors hover:text-primary ${link.highlight ? 'text-accent hover:text-accent/80' : 'text-foreground'}`}
                  >
                    {link.name}
                    {link.subLinks && <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />}
                  </Link>
                  {link.subLinks && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[60]">
                       <div className="bg-background shadow-2xl rounded-2xl border p-10 w-[95vw] max-w-7xl grid grid-cols-5 gap-10 max-h-[75vh] overflow-y-auto custom-scrollbar ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 duration-300">
                        {link.subLinks.map((subLink) => (
                          <div key={subLink.name} className="space-y-4">
                            <h3 className="font-bold text-[13px] text-primary uppercase tracking-wider border-b pb-3 border-primary/20 flex items-center gap-2">
                               <div className="h-1 w-1 rounded-full bg-primary" />
                              {subLink.name}
                            </h3>
                            {subLink.products ? (
                              <ul className="space-y-2">
                                {subLink.products.map((product) => (
                                  <li key={product}>
                                    <Link
                                      href="#"
                                      className="block text-[11px] font-medium text-muted-foreground hover:text-primary hover:translate-x-1 transition-all py-0.5"
                                    >
                                      {product}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}
