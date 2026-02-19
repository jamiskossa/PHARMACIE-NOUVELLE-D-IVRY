"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Loader2 } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp } from "firebase/firestore";

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
import { useToast } from "@/hooks/use-toast";
import { FirebaseError } from "firebase/app";
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates";

const formSchema = z.object({
  email: z.string().email({ message: "Adresse email invalide." }),
  password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères." }),
});

export default function ConnexionPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { user, authUser, isLoading: isAuthLoading } = useAuthContext();
  const router = useRouter();
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    // 1. Wait until auth state and profile are loaded
    if (isAuthLoading) {
      return;
    }

    // 2. If fully logged in (Auth + Profile), redirect.
    if (authUser && user) {
      setIsLoading(false); // Stop loading spinner on button
      if (user.role === 'client') {
        router.push("/dashboard/profil");
      } else { // admin or collaborateur
        router.push("/dashboard");
      }
      return; // Done
    }

    // 3. If logged into Auth but no profile exists, create one.
    if (authUser && !user) {
      // This is the self-healing part
      setIsLoading(true); // Ensure UI shows loading
      toast({
          title: "Finalisation de votre compte",
          description: "Création de votre profil utilisateur...",
      });

      let prenom = 'Nouvel';
      let nom = 'Utilisateur';

      if (authUser.displayName) {
          const nameParts = authUser.displayName.split(' ');
          prenom = nameParts[0] || '';
          nom = nameParts.slice(1).join(' ');
      } else if (authUser.email) {
          const emailName = authUser.email.split('@')[0];
          prenom = emailName.charAt(0).toUpperCase() + emailName.slice(1);
      }

      const userProfile = {
        userId: authUser.uid,
        role: 'client' as const,
        prenom: prenom,
        nom: nom || '', // ensure nom is not undefined
        email: authUser.email!,
        photoURL: authUser.photoURL || '',
        active: true,
        createdAt: serverTimestamp(),
      };
      
      const userDocRef = doc(firestore, "users", authUser.uid);
      setDocumentNonBlocking(userDocRef, userProfile, { merge: true });
      // The auth context will now re-render with the new user profile,
      // and this useEffect will run again, hitting case #2 and redirecting.
    }

    // 4. If no authUser, just stay on the login page.
    if (!authUser) {
        setIsLoading(false);
    }

  }, [user, authUser, isAuthLoading, router, auth, toast, firestore]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      // We use the raw SDK function here to get error feedback
      await signInWithEmailAndPassword(auth, values.email, values.password);
      // The useEffect will handle the redirection or profile creation
    } catch (error) {
      if (error instanceof FirebaseError) {
        let message = "Une erreur est survenue lors de la connexion.";
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
          message = "Email ou mot de passe incorrect.";
        }
        toast({
          variant: "destructive",
          title: "Erreur de connexion",
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
                <span className="font-headline text-lg text-center font-bold break-words">
                  Pharmacie Nouvelle d'Ivry
                </span>
              </Link>
          </div>
          <CardTitle className="font-headline text-2xl">Connexion</CardTitle>
          <CardDescription>Accédez à votre espace personnalisé</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                Se connecter
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 pt-4">
          <p className="text-center text-sm text-muted-foreground">
            Pas encore de compte ?{" "}
            <Link href="/inscription" className="underline hover:text-primary">
              Inscrivez-vous
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
