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
import { UserNav } from '@/components/user-nav';
import { Separator } from './ui/separator';
import { useAuthContext } from '@/contexts/auth-context';
import { Skeleton } from './ui/skeleton';

const navLinks = [
    {
      name: 'MÉDICAMENTS',
      href: '#',
      subLinks: [
        { name: 'Douleurs & fièvre', href: '#' },
        { name: 'Rhume, toux, gorge', href: '#' },
        { name: 'Digestion – Transit', href: '#' },
        { name: 'Sommeil – Stress', href: '#' },
        { name: 'Allergies', href: '#' },
      ],
    },
    { name: 'SANTÉ & BIEN-ÊTRE', href: '/produits'},
    { name: 'BEAUTÉ & HYGIÈNE', href: '/produits'},
    { name: 'BÉBÉ – ENFANT – MAMAN', href: '/produits'},
    { name: 'COMPLÉMENTS ALIMENTAIRES', href: '#'},
    { name: 'MÉDECINES NATURELLES', href: '#'},
    { name: 'NUTRITION & SPORT', href: '#'},
    { name: 'ORTHOPÉDIE & CONTENTION', href: '#'},
    { name: 'MATÉRIEL MÉDICAL', href: '#'},
    { name: 'VÉTÉRINAIRE', href: '#'},
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
                <nav className="p-6 space-y-2">
                  {navLinks.map((link) => (
                    <Link
                      key={`mobile-${link.name}`}
                      href={link.href}
                      className="block text-[10px] font-semibold uppercase tracking-wider text-foreground transition-colors hover:text-primary"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
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
        <nav className="hidden lg:block border-t">
          <div className="container mx-auto px-4">
            <ul className="flex justify-center items-center h-14 space-x-4">
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
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                       <ul className="bg-background shadow-lg rounded-lg border w-64 p-2">
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
