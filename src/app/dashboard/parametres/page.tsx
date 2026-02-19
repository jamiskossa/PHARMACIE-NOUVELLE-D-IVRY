"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
       <div>
        <h1 className="font-headline text-3xl font-bold flex items-center gap-3">
            <Settings/>
            Paramètres
        </h1>
        <p className="text-muted-foreground mt-2">Gérez les paramètres de votre compte et de l'application.</p>
       </div>
      <Tabs defaultValue="profil">
        <TabsList>
          <TabsTrigger value="profil">Profil</TabsTrigger>
          <TabsTrigger value="apparence">Apparence</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="securite">Sécurité</TabsTrigger>
        </TabsList>
        <TabsContent value="profil">
          <Card>
            <CardHeader>
              <CardTitle>Profil public</CardTitle>
              <CardDescription>
                Ces informations seront visibles par les autres utilisateurs.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="username">Nom d'utilisateur</Label>
                    <Input id="username" defaultValue="@alixchen" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="bio">Biographie</Label>
                    <Input id="bio" placeholder="Pharmacien expert en phytothérapie." />
                </div>
                <Button>Sauvegarder</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="apparence">
          <Card>
            <CardHeader>
              <CardTitle>Apparence</CardTitle>
              <CardDescription>
                Personnalisez l'apparence de l'application.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label>Thème</Label>
                    <p className="text-sm text-muted-foreground">Le thème sera bientôt synchronisé avec les paramètres de votre système.</p>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="language">Langue</Label>
                     <Select defaultValue="fr">
                        <SelectTrigger id="language" className="w-[180px]">
                            <SelectValue placeholder="Selectionner" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="fr">Français</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button>Sauvegarder</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Gérez la façon dont vous recevez les notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <Label>Notifications par email</Label>
                        <p className="text-sm text-muted-foreground">Recevoir des emails pour les nouveaux messages et les alertes importantes.</p>
                    </div>
                    <Switch defaultChecked/>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <Label>Notifications push</Label>
                        <p className="text-sm text-muted-foreground">Recevoir des notifications push sur vos appareils connectés.</p>
                    </div>
                    <Switch />
                </div>
                 <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <Label>Alertes de stock</Label>
                        <p className="text-sm text-muted-foreground">Être notifié lorsque le stock d'un produit est faible.</p>
                    </div>
                    <Switch defaultChecked/>
                </div>
                <Button>Sauvegarder</Button>
            </CardContent>
          </Card>
        </TabsContent>
         <TabsContent value="securite">
          <Card>
            <CardHeader>
              <CardTitle>Sécurité</CardTitle>
              <CardDescription>
                Gérez les paramètres de sécurité de votre compte.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="space-y-2">
                    <Label htmlFor="current-password">Mot de passe actuel</Label>
                    <Input id="current-password" type="password"/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="new-password">Nouveau mot de passe</Label>
                    <Input id="new-password" type="password"/>
                </div>
                 <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <Label>Authentification à deux facteurs</Label>
                        <p className="text-sm text-muted-foreground">Ajoutez une couche de sécurité supplémentaire à votre compte.</p>
                    </div>
                    <Button variant="outline">Activer</Button>
                </div>
                <Button>Changer le mot de passe</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
