"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { collection, serverTimestamp } from "firebase/firestore";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, Mail, Phone, Pin } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { addDocumentNonBlocking, useFirestore } from "@/firebase";

const formSchema = z.object({
  name: z.string().min(2, { message: "Le nom est requis." }),
  email: z.string().email({ message: "L'adresse email est invalide." }),
  subject: z.string().min(5, { message: "Le sujet doit contenir au moins 5 caractères." }),
  message: z.string().min(10, { message: "Le message doit contenir au moins 10 caractères." }),
});

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!firestore) {
        toast({ variant: 'destructive', title: 'Erreur', description: 'Le service de base de données n\'est pas disponible.' });
        return;
    }
    setIsLoading(true);
    
    try {
        const submission = {
            ...values,
            submittedAt: serverTimestamp(),
            isRead: false,
        };
        const contactSubmissionsRef = collection(firestore, 'contact_submissions');
        await addDocumentNonBlocking(contactSubmissionsRef, submission);
        
        toast({
            title: "Message envoyé !",
            description: "Merci de nous avoir contactés. Nous vous répondrons bientôt.",
        });
        form.reset();
    } catch (error) {
        console.error("Error submitting contact form:", error);
        toast({
            variant: "destructive",
            title: "Une erreur est survenue",
            description: "Votre message n'a pas pu être envoyé. Veuillez réessayer.",
        });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section - Professional & Simple Redesign */}
        <section className="relative bg-white pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-semibold mb-6 animate-in fade-in slide-in-from-left-8 duration-700">
                  <Mail className="h-4 w-4" /> Contact
                </div>
                <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] animate-in fade-in slide-in-from-left-8 duration-1000">
                  Besoin d'un <br />
                  <span className="text-primary">conseil santé ?</span>
                </h1>
                <p className="mt-8 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 animate-in fade-in slide-in-from-left-8 duration-1000 delay-200">
                  Notre équipe de pharmaciens est à votre écoute. Contactez-nous par téléphone, email ou via le formulaire ci-dessous pour toute question.
                </p>
                <div className="mt-8 flex justify-center lg:justify-start animate-in fade-in slide-in-from-left-8 duration-1000 delay-300">
                  <div className="h-1.5 w-24 bg-primary rounded-full shadow-sm"></div>
                </div>
              </div>
              <div className="flex-1 relative w-full max-w-2xl lg:max-w-none animate-in fade-in zoom-in duration-1000 delay-200">
                <div className="relative aspect-video sm:aspect-[4/3] overflow-hidden rounded-2xl border border-slate-100 shadow-lg">
                  <Image
                    src="https://picsum.photos/seed/contact-pharmacy/800/600"
                    alt="Contact Pharmacie"
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

        <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24">

          <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline">Nos Coordonnées</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Pin className="h-6 w-6 text-primary" />
                    <span>1 Rue de la Pharmacie, 94200 Ivry-sur-Seine</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="h-6 w-6 text-primary" />
                    <span>01 23 45 67 89</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Mail className="h-6 w-6 text-primary" />
                    <span>contact@ivrypharma.com</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <Image
                  src="https://picsum.photos/seed/map/600/400"
                  alt="Carte de localisation de la pharmacie"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                  data-ai-hint="map location"
                />
              </Card>
            </div>
            
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline">Envoyez-nous un message</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <FormField control={form.control} name="name" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom</FormLabel>
                            <FormControl>
                              <Input placeholder="Votre nom" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField control={form.control} name="email" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="votre@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField control={form.control} name="subject" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sujet</FormLabel>
                          <FormControl>
                            <Input placeholder="Sujet de votre message" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField control={form.control} name="message" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Écrivez votre message ici..." rows={5} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Envoyer le message
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
