import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  const authorityLogos = [
    {
      name: "Agence Régionale de Santé d'Île-de-France",
      logoUrl: "/images/logo-ars.jpg",
      link: "https://www.iledefrance.ars.sante.fr/",
    },
    {
      name: "ANSM",
      logoUrl: "/images/logo-ansm.jpg",
      link: "https://ansm.sante.fr/",
    },
    {
      name: "Ministère de la Santé",
      logoUrl: "/images/logo-ministere-sante.jpg",
      link: "https://sante.gouv.fr/",
    },
    {
      name: "Ordre des Pharmaciens",
      logoUrl: "/images/logo-ordre-pharmaciens.jpg",
      link: "https://www.ordre.pharmacien.fr/",
    },
  ];

  return (
    <footer className="border-t bg-secondary/50 text-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-headline text-lg font-semibold">Pharmacie Nouvelle d'Ivry</h3>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <p className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0 text-primary" />
                <span>
                  40 Rue Marat
                  <br />
                  94200 Ivry-sur-Seine
                </span>
              </p>
              <p className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-1 flex-shrink-0 text-primary" />
                <span>Tél : 01 46 72 31 76</span>
              </p>
              <p className="flex items-start gap-3">
                <Mail className="h-4 w-4 mt-1 flex-shrink-0 text-primary" />
                <span>Mail : komarafanta@yahoo.fr</span>
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-headline text-lg font-semibold">Horaires d'ouverture</h3>
            <div className="mt-4 text-sm text-muted-foreground space-y-1">
              <p>Lundi – Vendredi : 09h00 – 20h00</p>
              <p>Samedi : 09h00 – 19h00</p>
              <p>Dimanche : Fermé</p>
              <p className="text-xs mt-2">Pause déjeuner ~12h30–14h00</p>
            </div>
            <h3 className="font-headline text-lg font-semibold mt-6">Service client</h3>
             <div className="text-sm text-muted-foreground mt-4 space-y-1">
                <p>Du lundi au vendredi : 9h30 – 17h30</p>
                <p>Le samedi : 9h – 17h (prix appel local)</p>
             </div>
          </div>

          <div>
            <h3 className="font-headline text-lg font-semibold">Notre société</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/pharmacie" className="text-muted-foreground hover:text-primary">
                  Qui sommes-nous ?
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  Contactez nos pharmaciens
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary">
                  Le blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-headline text-lg font-semibold">Informations</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  Livraison
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  Paiement sécurisé
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t pt-16">
          <div className="text-center">
             <h3 className="font-headline text-lg font-semibold uppercase tracking-wider text-muted-foreground">
              Site agréé par les autorités de santé
            </h3>
          </div>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 items-center justify-items-center">
            {authorityLogos.map((logo) => (
              <Link 
                key={logo.name} 
                href={logo.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="relative h-14 w-full grayscale opacity-75 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
                aria-label={logo.name}
              >
                <Image
                  src={logo.logoUrl}
                  alt={logo.name}
                  fill
                  className="object-contain"
                />
              </Link>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center mt-16 border-t pt-16">
          <div>
            <h3 className="font-headline text-2xl font-semibold">Newsletter</h3>
            <p className="text-muted-foreground mt-2 text-sm">
              Recevez toutes les actualités, conseils et offres promotionnelles de votre pharmacie.
            </p>
          </div>
          <div className="space-y-4">
            <form className="flex flex-col sm:flex-row gap-4">
              <Input type="email" placeholder="Votre email" className="flex-grow bg-background" />
              <Button type="submit" size="lg">
                S'inscrire
              </Button>
            </form>
            <div className="flex items-center space-x-2">
              <Checkbox id="privacy" />
              <Label htmlFor="privacy" className="text-sm font-normal text-muted-foreground">
                J'accepte la{' '}
                <Link href="/" className="underline hover:text-primary">
                  politique de confidentialité
                </Link>
              </Label>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t pt-8 text-sm text-muted-foreground">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center">
              <Link href="/" className="hover:text-primary">
                Mentions légales
              </Link>
              <Link href="/" className="hover:text-primary">
                Conditions générales de vente
              </Link>
              <Link href="/" className="hover:text-primary">
                Politique de confidentialité
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">FR</Button>
              <span className="text-muted-foreground/50">|</span>
              <Button variant="ghost" size="sm" className="text-muted-foreground">EN</Button>
            </div>
          </div>
          <p className="mt-8 text-center text-xs">
            2014 – 2026 © Pharmacie Nouvelle d'Ivry est habilité par l'Agence Régionale de Santé d'Île-de-France depuis le 1er juillet 2014.
            <br/>
            40 Rue Marat, 94200 Ivry-sur-Seine – Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
