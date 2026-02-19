"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockUsers } from "@/lib/mock-data";
import { User } from "lucide-react";

const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('');

export default function ProfilPage() {
  const user = mockUsers.find(u => u.role === 'admin'); // Mocking logged-in user

  if (!user) {
    return <div>Utilisateur non trouvé.</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-3xl font-bold flex items-center gap-3">
            <User />
            Mon Profil
        </h1>
        <p className="text-muted-foreground mt-2">Gérez les informations de votre profil et vos préférences.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations personnelles</CardTitle>
          <CardDescription>
            Mettez à jour vos informations et choisissez comment elles apparaissent.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-8">
            <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                    <AvatarImage src={user.photoURL} alt={`${user.prenom} ${user.nom}`} />
                    <AvatarFallback className="text-3xl">{getInitials(`${user.prenom} ${user.nom}`)}</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                    <Label htmlFor="photo">Photo de profil</Label>
                    <Input id="photo" type="file" className="text-muted-foreground file:text-foreground" />
                    <p className="text-xs text-muted-foreground">PNG, JPG, GIF jusqu'à 5Mo.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="prenom">Prénom</Label>
                <Input id="prenom" defaultValue={user.prenom} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nom">Nom</Label>
                <Input id="nom" defaultValue={user.nom} />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Adresse email</Label>
              <Input id="email" type="email" defaultValue={user.email} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telephone">Téléphone</Label>
              <Input id="telephone" type="tel" placeholder="+33 6 12 34 56 78" defaultValue={user.telephone} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="adresse">Adresse</Label>
              <Input id="adresse" placeholder="123 Rue de la Paix, 75001 Paris" defaultValue={user.adresse}/>
            </div>

            <Button type="submit">Enregistrer les modifications</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
