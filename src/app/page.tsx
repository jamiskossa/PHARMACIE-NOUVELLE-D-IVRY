
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

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section - Professional & Simple Redesign */}
        <section className="relative bg-white pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                    {/* Content Left */}
                    <div className="flex-1 text-center lg:text-left z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-semibold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Ouvert et à votre écoute
                        </div>
                        <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] animate-in fade-in slide-in-from-left-8 duration-1000">
                            Votre santé mérite <br className="hidden sm:block" />
                            <span className="text-primary">le meilleur conseil.</span>
                        </h1>
                        <p className="mt-8 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 animate-in fade-in slide-in-from-left-8 duration-1000 delay-200">
                            La Pharmacie Nouvelle d'Ivry allie expertise traditionnelle et services modernes pour vous accompagner au quotidien dans votre parcours de soin.
                        </p>
                        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-in fade-in slide-in-from-left-8 duration-1000 delay-300">
                            <Button asChild size="lg" className="w-full sm:w-auto h-14 px-10 rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
                                <Link href="/produits">
                                    Nos Produits <ShoppingCart className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto h-14 px-10 rounded-xl border-slate-200 hover:bg-slate-50 transition-all">
                                <Link href="/contact">Contactez-nous</Link>
                            </Button>
                        </div>
                        
                        {/* Simple Stats/Trust Bars */}
                        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-wrap justify-center lg:justify-start gap-8 opacity-70">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5 text-primary" />
                                <span className="text-sm font-medium text-slate-700">Qualité Certifiée</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <HeartPulse className="h-5 w-5 text-primary" />
                                <span className="text-sm font-medium text-slate-700">Conseils d'Experts</span>
                            </div>
                        </div>
                    </div>

                    {/* Image Right - Modern Frame */}
                    <div className="flex-1 relative w-full max-w-2xl lg:max-w-none animate-in fade-in zoom-in duration-1000 delay-200">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-100 shadow-lg">
                            <Image
                                src="/images/hero.png"
                                alt="Pharmacie Nouvelle d'Ivry"
                                fill
                                className="object-cover object-center transition-transform duration-700 hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
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
