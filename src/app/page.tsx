
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Leaf,
  HeartPulse,
  Stethoscope,
  ShoppingCart,
  Pill,
  Sparkles,
  Baby,
  Dumbbell,
  ShieldCheck,
  Truck,
  CreditCard,
  Calendar,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { mockBlogPosts } from '@/lib/mock-data';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function Home() {
  const categories = [
    { name: 'Médicaments', description: 'Sans ordonnance pour vos besoins quotidiens.', imageUrl: 'https://picsum.photos/seed/meds/400/300', imageHint: 'pills medication', href: '/produits' },
    { name: 'Santé & Bien-être', description: 'Produits pour votre vitalité.', imageUrl: 'https://picsum.photos/seed/wellness/400/300', imageHint: 'healthy lifestyle', href: '/produits' },
    { name: 'Beauté & Hygiène', description: 'Soins pour toute la famille.', imageUrl: 'https://picsum.photos/seed/beauty/400/300', imageHint: 'skincare products', href: '/produits' },
    { name: 'Bébé & Enfant', description: 'Produits adaptés aux plus petits.', imageUrl: 'https://picsum.photos/seed/baby/400/300', imageHint: 'baby products', href: '/produits' },
    { name: 'Médecines Naturelles', description: 'Solutions douces et naturelles.', imageUrl: 'https://picsum.photos/seed/natural/400/300', imageHint: 'herbal medicine', href: '/produits' },
    { name: 'Nutrition & Sport', description: 'Performance et récupération.', imageUrl: 'https://picsum.photos/seed/sport/400/300', imageHint: 'sports nutrition', href: '/produits' },
  ];
  
  const trustPoints = [
      { text: "Pharmaciens diplômés et à votre écoute", icon: ShieldCheck },
      { text: "Click & Collect disponible", icon: ShoppingCart },
      { text: "Livraison rapide en Île-de-France", icon: Truck },
      { text: "Paiement 100% sécurisé", icon: CreditCard },
  ];

  const latestPosts = mockBlogPosts.filter(p => p.status === 'published').slice(0, 3);

  const heroImages = [
    "https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1626285861696-9f0bf5a49c6d?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512428813833-df4a2e7b0e52?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2070&auto=format&fit=crop",
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section - Professional Slideshow */}
        <section className="relative w-full bg-white">
          <Carousel
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 3500,
                stopOnInteraction: false,
              }),
            ]}
          >
            <CarouselContent className="-ml-0">
              {heroImages.map((src, index) => (
                <CarouselItem key={index} className="pl-0">
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                      src={src}
                      alt={`Promotion ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      priority={index === 0}
                      sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-black/5" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 hidden sm:flex" />
            <CarouselNext className="right-4 hidden sm:flex" />
          </Carousel>
        </section>
        
        {/* Categories Section */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-center text-foreground md:text-4xl">
              Nos Catégories Phares
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <Card key={category.name} className="group overflow-hidden text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                    <CardHeader className="p-0">
                        <div className="relative h-48 w-full">
                            <Image
                                src={category.imageUrl}
                                alt={category.name}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                data-ai-hint={category.imageHint}
                            />
                        </div>
                    </CardHeader>
                    <CardContent className="p-6">
                        <h3 className="font-headline text-2xl font-semibold text-foreground">
                            {category.name}
                        </h3>
                        <p className="mt-2 text-muted-foreground">{category.description}</p>
                    </CardContent>
                    <CardFooter>
                        <Button variant="link" className="w-full text-primary" asChild>
                            <Link href={category.href}>Découvrir <ArrowRight className="ml-2 h-4 w-4"/></Link>
                        </Button>
                    </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Promotions Section */}
        <section className="py-16 sm:py-24 bg-secondary/50">
            <div className="container mx-auto px-4">
                <Card className="bg-gradient-to-r from-primary to-teal-500 text-primary-foreground overflow-hidden">
                    <div className="grid md:grid-cols-2 items-center">
                        <div className="p-8 md:p-12">
                            <h2 className="font-headline text-3xl md:text-4xl font-bold">Promotions du Moment</h2>
                            <p className="text-5xl font-bold mt-4">-20%</p>
                            <p className="text-xl mt-2">sur une sélection de compléments alimentaires !</p>
                            <Button size="lg" variant="secondary" className="mt-8" asChild>
                                <Link href="/produits">Voir les offres <ArrowRight className="ml-2 h-4 w-4"/></Link>
                            </Button>
                        </div>
                        <div className="relative h-64 md:h-full">
                           <Image src="https://picsum.photos/seed/promo/800/600" alt="Promotion" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" data-ai-hint="vitamins promotion"/>
                        </div>
                    </div>
                </Card>
            </div>
        </section>

        {/* Blog Section */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Nos dernières actualités santé
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Suivez les conseils et les actualités de nos pharmaciens.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post) => (
                <Card key={post.blogId} className="flex flex-col overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-2xl">
                  <CardHeader className="p-0">
                    <Link href={`/blog/${post.slug}`}>
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        width={800}
                        height={600}
                        className="h-60 w-full object-cover"
                      />
                    </Link>
                  </CardHeader>
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4"/>
                        <time dateTime={post.publishDate.toISOString()}>
                            {format(post.publishDate, "d MMMM yyyy", { locale: fr })}
                        </time>
                    </div>
                    <CardTitle className="font-headline text-2xl leading-tight mt-2 flex-grow">
                      <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                        {post.title}
                      </Link>
                    </CardTitle>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button asChild variant="link" className="p-0 text-primary">
                      <Link href={`/blog/${post.slug}`}>
                        Lire la suite <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
             <div className="mt-12 text-center">
                <Button asChild size="lg" variant="outline">
                    <Link href="/blog">
                        Voir toutes les actualités
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-16 sm:py-24">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="font-headline text-3xl font-bold md:text-4xl">Une pharmacie à votre écoute</h2>
                        <p className="mt-6 text-lg text-muted-foreground">
                          Depuis plus de 10 ans, la Pharmacie Nouvelle d'Ivry vous accompagne dans votre parcours de santé avec des conseils personnalisés et une large gamme de produits.
                        </p>
                        <p className="mt-4 font-semibold text-lg">Votre santé, notre engagement.</p>
                    </div>
                     <div className="space-y-6">
                        {trustPoints.map((point, index) => (
                             <div key={index} className="flex items-center gap-4">
                                <div className="flex-shrink-0 rounded-full bg-primary/10 p-3">
                                    <point.icon className="h-6 w-6 text-primary" />
                                </div>
                                <p className="font-medium text-lg">{point.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24 border-t">
            <div className="container mx-auto px-4 text-center">
                <h2 className="font-headline text-3xl font-bold">Besoin d'un conseil ?</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">Notre équipe de pharmaciens est disponible pour répondre à toutes vos questions.</p>
                <div className="mt-8 flex flex-wrap gap-4 justify-center">
                    <Button size="lg" asChild>
                        <a href="tel:0146723176">Nous appeler</a>
                    </Button>
                     <Button size="lg" variant="outline" asChild>
                        <Link href="/contact">Nous contacter</Link>
                    </Button>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
