"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp } from "firebase/firestore";
import { FirebaseError } from "firebase/app";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuthContext } from "@/contexts/auth-context";
import { useAuth, useFirestore } from "@/firebase";
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@/types";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
  email: z.string().email({ message: "Adresse email invalide." }),
  password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères." }),
});

export default function InscriptionPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { user, isLoading: isAuthLoading } = useAuthContext();
  const router = useRouter();
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });
  
  useEffect(() => {
    if (!isAuthLoading && user) {
      // New users are always clients, redirect to their dashboard
      router.push("/dashboard/profil");
    }
  }, [user, isAuthLoading, router]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const newUser = userCredential.user;
      
      const [prenom, ...nomParts] = values.fullName.split(' ');
      const nom = nomParts.join(' ');

      const userProfile = {
        userId: newUser.uid,
        role: 'client' as const,
        prenom: prenom,
        nom: nom || '',
        email: newUser.email!,
        photoURL: '',
        active: true,
        createdAt: serverTimestamp(),
      };

      if (firestore) {
        const userDocRef = doc(firestore, "users", newUser.uid);
        setDocumentNonBlocking(userDocRef, userProfile, { merge: true });
      }
      
      // Let the useEffect handle redirection
      
    } catch (error) {
      if (error instanceof FirebaseError) {
        let message = "Une erreur est survenue lors de l'inscription.";
        if (error.code === 'auth/email-already-in-use') {
          message = "Cette adresse email est déjà utilisée.";
        }
        toast({
          variant: "destructive",
          title: "Erreur d'inscription",
          description: message,
        });
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-secondary to-background p-4">
      <Button variant="ghost" className="absolute top-4 left-4" asChild>
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour à l'accueil
        </Link>
      </Button>
      <Card className="w-full max-w-sm shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <Link
              href="/"
              className='group flex flex-col items-center gap-2 text-foreground'
            >
              <Image
                src="/images/logo.png"
                alt="Pharmacie Nouvelle d'Ivry"
                width={40}
                height={40}
                className="transition-transform duration-300 group-hover:scale-105"
              />
              <span className="font-headline text-lg text-center font-bold">
                Pharmacie Nouvelle d'Ivry
              </span>
            </Link>
          </div>
          <CardTitle className="font-headline text-2xl">Créer un compte</CardTitle>
          <CardDescription>Rejoignez notre communauté en quelques clics</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom complet</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: Sophie Martin" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="votre@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                S'inscrire
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 pt-4">
          <p className="text-center text-sm text-muted-foreground">
            Déjà un compte ?{" "}
            <Link href="/connexion" className="underline hover:text-primary">
              Connectez-vous
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
