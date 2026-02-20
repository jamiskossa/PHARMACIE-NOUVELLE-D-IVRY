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
      { name: 'Visage', href: '#' },
      { name: 'Nettoyants et Démaquillants', href: '#' },
      { name: 'Gommages', href: '#' },
      { name: 'Masques', href: '#' },
      { name: 'Eaux Thermales', href: '#' },
      { name: 'Soins Hydratants', href: '#' },
      { name: 'Soins Matifiants', href: '#' },
      { name: 'Teint et éclat', href: '#' },
      { name: 'Acné et Imperfections', href: '#' },
      { name: 'Soins Anti-rougeurs', href: '#' },
      { name: 'Soins Anti-taches', href: '#' },
      { name: 'Soins Anti-âge', href: '#' },
      { name: 'Soins des yeux, cils et sourcils', href: '#' },
      { name: 'Soins des lèvres', href: '#' },
      { name: 'Cosmétiques éthniques', href: '#' },
      { name: 'Compléments alimentaires', href: '#' },
      { name: 'Soins réparateurs', href: '#' },
      { name: 'Soins Visage Premium', href: '#' },
    ],
  },
  {
    name: 'MAQUILLAGE',
    href: '#',
    subLinks: [
      { name: 'Base teint', href: '#' },
      { name: 'Crème teintée', href: '#' },
      { name: 'Correcteurs', href: '#' },
      { name: 'Anti-cernes', href: '#' },
      { name: 'Fond de teint', href: '#' },
      { name: 'Poudre', href: '#' },
      { name: 'Maquillage yeux', href: '#' },
      { name: 'Maquillage lèvres', href: '#' },
      { name: 'Maquillage ongles', href: '#' },
      { name: 'Accessoire maquillage', href: '#' },
      { name: 'Maquillage Premium', href: '#' },
    ],
  },
  {
    name: 'CORPS',
    href: '#',
    subLinks: [
      { name: 'Soins gommants et exfoliants', href: '#' },
      { name: 'Epilation - décoloration', href: '#' },
      { name: 'Soins hydratants', href: '#' },
      { name: 'Soins anti-age', href: '#' },
      { name: 'Soins mains et ongles', href: '#' },
      { name: 'Soins des pieds', href: '#' },
      { name: 'Soins apaisants', href: '#' },
      { name: 'Massage détente', href: '#' },
      { name: 'Soins buste', href: '#' },
      { name: 'Vergetures', href: '#' },
      { name: 'Cosmétiques éthniques', href: '#' },
      { name: 'Parfums et eaux', href: '#' },
      { name: 'Soins Corps Premium', href: '#' },
    ],
  },
  {
    name: 'CHEVEUX',
    href: '#',
    subLinks: [
      { name: 'Shampooing', href: '#' },
      { name: 'Après-shampooing', href: '#' },
      { name: 'Shampooing sec', href: '#' },
      { name: 'Masque cheveux', href: '#' },
      { name: 'Soins avec rinçage', href: '#' },
      { name: 'Soins sans rinçage', href: '#' },
      { name: 'Chute de cheveux', href: '#' },
      { name: 'Coloration', href: '#' },
      { name: 'Lissage cheveux', href: '#' },
      { name: 'Soins protecteurs', href: '#' },
      { name: 'Produits coiffants', href: '#' },
      { name: 'Accessoires cheveux', href: '#' },
      { name: 'Anti-poux', href: '#' },
      { name: 'Enfant', href: '#' },
      { name: 'Soins Capillaires Premium', href: '#' },
    ],
  },
  {
    name: 'BIO ET NATURE',
    href: '#',
    subLinks: [
      { name: 'Nettoyants et Démaquillants bio', href: '#' },
      { name: 'Gommages bio et nature', href: '#' },
      { name: 'Masques bio et nature', href: '#' },
      { name: 'Soins Hydratants bio', href: '#' },
      { name: 'Teint-Eclat bio', href: '#' },
      { name: 'Soins Anti-age bio', href: '#' },
      { name: 'Soins des yeux bio', href: '#' },
      { name: 'Soins des lèvres bio', href: '#' },
      { name: 'Shampooing bio', href: '#' },
      { name: 'Soins corps bio', href: '#' },
      { name: 'Solaires bio', href: '#' },
    ],
  },
  {
    name: 'SOLAIRE',
    href: '#',
    subLinks: [
      { name: 'Préparation au soleil', href: '#' },
      { name: 'Protections solaires', href: '#' },
      { name: 'Après-soleil', href: '#' },
      { name: 'Coups de soleil', href: '#' },
      { name: 'Protection enfant', href: '#' },
      { name: 'Zones sensibles', href: '#' },
      { name: 'Protections solaires cheveux', href: '#' },
      { name: 'Autobronzants', href: '#' },
      { name: 'Accessoires solaire', href: '#' },
      { name: 'Soins Solaires Premium', href: '#' },
    ],
  },
  { name: 'TROUSSES ET COFFRETS', href: '#' },
  { name: 'BEAUTÉ PREMIUM', href: '#' },
  { name: 'MAMAN & BÉBÉ', href: '#' },
  { name: 'SANTÉ & NUTRITION', href: '#' },
  { name: 'HYGIÈNE & BIEN-ÊTRE', href: '#' },
  { name: 'MINCEUR & SPORT', href: '#' },
  { name: 'HOMME', href: '#' },
  { name: 'VÉTÉRINAIRE', href: '#' },
  { name: 'K-BEAUTY', href: '#' },
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
      <header className="sticky top-0 z-40 w-full border-b bg-background/95">
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
                              <div className="flex flex-col space-y-2 pl-4 border-l-2 border-primary/10 ml-1">
                                {link.subLinks.map((subLink) => (
                                  <Link
                                    key={`mobile-sub-${subLink.name}`}
                                    href={subLink.href}
                                    className="py-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    {subLink.name}
                                  </Link>
                                ))}
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
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-6 w-6" />
               <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs font-bold">
                3
              </span>
              <span className="sr-only">Panier</span>
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
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                       <ul className="bg-background shadow-lg rounded-lg border w-64 p-2 max-h-[80vh] overflow-y-auto custom-scrollbar">
                        {link.subLinks.map((subLink) => (
                          <li key={subLink.name}>
                            <Link
                              href={subLink.href}
                              className="block px-4 py-2 rounded-md text-xs text-muted-foreground hover:bg-secondary hover:text-primary"
                            >
                              {subLink.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
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
