
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { mockUsers } from "@/lib/mock-data";
import { HeartPulse, Leaf, Stethoscope } from "lucide-react";
import Image from "next/image";

const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('');

export default function PharmaciePage() {
    const team = mockUsers.filter(u => u.role === 'admin' || u.role === 'collaborateur');
    
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section - Professional & Simple Redesign */}
        <section className="relative bg-white pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden">
          <div className="container mx-auto px-4">
             <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                {/* Image Section - Now on the left for variety but consistent frame */}
                <div className="flex-1 relative w-full max-w-2xl lg:max-w-none order-2 lg:order-1 animate-in fade-in zoom-in duration-1000">
                    <div className="relative aspect-video overflow-hidden rounded-3xl lg:rounded-[3rem] shadow-2xl shadow-slate-200 ring-8 ring-slate-50">
                        <Image
                            src="https://picsum.photos/seed/pharmacy-interior/1920/1080"
                            alt="Intérieur de la pharmacie"
                            fill
                            className="object-cover transition-transform duration-700 hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
                    </div>
                    {/* Simple Decorations */}
                    <div className="absolute -top-12 -left-12 -z-10 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
                </div>

                {/* Content Section */}
                <div className="flex-1 text-center lg:text-left order-1 lg:order-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-semibold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <Stethoscope className="h-4 w-4" /> Notre Histoire
                    </div>
                    <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] animate-in fade-in slide-in-from-right-8 duration-1000">
                        La Pharmacie <br />
                        <span className="text-primary">Nouvelle d'Ivry</span>
                    </h1>
                    <p className="mt-8 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
                        Plus qu'une simple pharmacie, nous sommes un espace dédié à votre santé et votre bien-être global. Notre équipe vous accueille avec professionnalisme et expertise pour vous accompagner au quotidien.
                    </p>
                    <div className="mt-8 flex justify-center lg:justify-start animate-in fade-in slide-in-from-right-8 duration-1000 delay-300">
                        <div className="h-1.5 w-24 bg-primary rounded-full shadow-sm"></div>
                    </div>
                </div>
             </div>
          </div>
        </section>

        {/* Mission & Values Section */}
        <section className="py-16 md:py-24 bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
              <div>
                <h2 className="font-headline text-3xl font-bold md:text-4xl">Notre Mission</h2>
                <p className="mt-6 text-lg text-muted-foreground">
                  Nous nous engageons à offrir un service pharmaceutique de proximité, alliant expertise humaine et innovations digitales. Notre priorité est de fournir des conseils personnalisés, des produits de qualité et un accompagnement sur-mesure pour chaque patient, en plaçant toujours votre santé au cœur de nos préoccupations.
                </p>
              </div>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 rounded-full bg-primary/10 p-3">
                    <HeartPulse className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-headline text-xl font-semibold">Le Conseil Avant Tout</h3>
                    <p className="mt-1 text-muted-foreground">Une équipe d'experts à votre écoute pour vous guider.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 rounded-full bg-primary/10 p-3">
                    <Leaf className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-headline text-xl font-semibold">Qualité & Naturel</h3>
                    <p className="mt-1 text-muted-foreground">Une sélection rigoureuse de produits, privilégiant les solutions naturelles.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 rounded-full bg-primary/10 p-3">
                    <Stethoscope className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-headline text-xl font-semibold">Innovation au service de la Santé</h3>
                    <p className="mt-1 text-muted-foreground">Des outils digitaux pour simplifier votre parcours de soin.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-24">
           <div className="container mx-auto px-4">
             <div className="text-center">
                <h2 className="font-headline text-3xl font-bold md:text-4xl">Notre Équipe</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Des professionnels passionnés et dévoués à votre service.
                </p>
             </div>
             <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {team.map(member => (
                    <Card key={member.userId} className="text-center border-0 shadow-none bg-transparent">
                        <CardContent className="flex flex-col items-center">
                            <Avatar className="h-32 w-32 border-4 border-secondary">
                                <AvatarImage src={member.photoURL} alt={`${member.prenom} ${member.nom}`}/>
                                <AvatarFallback className="text-4xl">{getInitials(`${member.prenom} ${member.nom}`)}</AvatarFallback>
                            </Avatar>
                            <h3 className="mt-4 font-headline text-xl font-semibold">{member.prenom} {member.nom}</h3>
                            <p className="text-primary capitalize">{member.role === 'admin' ? 'Pharmacien Titulaire' : 'Préparateur en Pharmacie'}</p>
                        </CardContent>
                    </Card>
                ))}
             </div>
           </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
