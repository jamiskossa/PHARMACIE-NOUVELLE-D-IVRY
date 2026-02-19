"use client";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockAnnuaire } from "@/lib/mock-data";
import { Building, Handshake, Mail, Phone, Pin } from "lucide-react";
import Image from "next/image";

export default function AnnuairePage() {
  const fournisseurs = mockAnnuaire.filter((entry) => entry.type === "fournisseur");
  const partenaires = mockAnnuaire.filter((entry) => entry.type === "partenaire");

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section - Professional & Simple Redesign */}
        <section className="relative bg-white pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <Handshake className="mr-2 h-4 w-4" /> Annuaire
                </div>
                <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] animate-in fade-in slide-in-from-left-8 duration-1000">
                  Nos <span className="text-primary">Partenaires de Confiance.</span>
                </h1>
                <p className="mt-8 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 animate-in fade-in slide-in-from-left-8 duration-1000 delay-200">
                  Découvrez le réseau de professionnels et fournisseurs qui collaborent avec nous pour vous garantir une qualité de service irréprochable.
                </p>
                <div className="mt-8 flex justify-center lg:justify-start animate-in fade-in slide-in-from-left-8 duration-1000 delay-300">
                  <div className="h-1.5 w-24 bg-primary rounded-full shadow-sm"></div>
                </div>
              </div>
              <div className="flex-1 relative w-full max-w-2xl lg:max-w-none animate-in fade-in zoom-in duration-1000 delay-200">
                <div className="relative aspect-video sm:aspect-[4/3] overflow-hidden rounded-2xl border border-slate-100 shadow-lg">
                  <Image
                    src="https://picsum.photos/seed/partnership/800/600"
                    alt="Annuaire Partenaires"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12 md:py-16">

          <Tabs defaultValue="partenaires" className="mt-12">
            <TabsList className="grid w-full grid-cols-2 md:w-1/2 mx-auto">
              <TabsTrigger value="partenaires">
                <Handshake className="mr-2 h-4 w-4" /> Partenaires
              </TabsTrigger>
              <TabsTrigger value="fournisseurs">
                <Building className="mr-2 h-4 w-4" /> Fournisseurs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="partenaires" className="mt-8">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {partenaires.map((entry) => (
                  <Card
                    key={entry.entryId}
                    className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                  >
                    <CardHeader className="bg-gradient-to-tr from-primary/10 to-accent/10">
                      <CardTitle className="font-headline flex items-center gap-3">
                        <Handshake className="h-6 w-6 text-primary" />
                        {entry.nom}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="p-6 space-y-4">
                      <p className="text-muted-foreground text-sm">
                        {entry.description}
                      </p>

                      <div className="space-y-3 pt-4 border-t">
                        <div className="flex items-start gap-3">
                          <Phone className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                          <span className="text-sm">{entry.telephone}</span>
                        </div>

                        <div className="flex items-start gap-3">
                          <Mail className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                          <span className="text-sm">{entry.email}</span>
                        </div>

                        <div className="flex items-start gap-3">
                          <Pin className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                          <span className="text-sm">{entry.adresse}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="fournisseurs" className="mt-8">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {fournisseurs.map((entry) => (
                  <Card
                    key={entry.entryId}
                    className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                  >
                    <CardHeader className="bg-gradient-to-tr from-primary/10 to-accent/10">
                      <CardTitle className="font-headline flex items-center gap-3">
                        <Building className="h-6 w-6 text-primary" />
                        {entry.nom}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="p-6 space-y-4">
                      <p className="text-muted-foreground text-sm">
                        {entry.description}
                      </p>

                      <div className="space-y-3 pt-4 border-t">
                        <div className="flex items-start gap-3">
                          <Phone className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                          <span className="text-sm">{entry.telephone}</span>
                        </div>

                        <div className="flex items-start gap-3">
                          <Mail className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                          <span className="text-sm">{entry.email}</span>
                        </div>

                        <div className="flex items-start gap-3">
                          <Pin className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                          <span className="text-sm">{entry.adresse}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
