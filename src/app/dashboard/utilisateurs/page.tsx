"use client";
import { mockUsers } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('');

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="font-headline text-3xl font-bold">Gestion des Utilisateurs</h1>
            <p className="text-muted-foreground mt-2">Gérez les rôles et les accès des utilisateurs de la plateforme.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Ajouter un utilisateur
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des utilisateurs</CardTitle>
          <CardDescription>Consultez et gérez les comptes utilisateurs.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="hidden md:table-cell">Rôle</TableHead>
                <TableHead className="hidden md:table-cell">Statut</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockUsers.map((user) => (
                <TableRow key={user.userId}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarImage src={user.photoURL} alt="Avatar" />
                        <AvatarFallback>{getInitials(`${user.prenom} ${user.nom}`)}</AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{user.prenom} {user.nom}</div>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="outline" className="capitalize">{user.role}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                     <Badge variant={user.active ? "default" : "destructive"}>
                        {user.active ? 'Actif' : 'Inactif'}
                     </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Modifier le rôle</DropdownMenuItem>
                        <DropdownMenuItem>{user.active ? 'Désactiver' : 'Activer'}</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive">Supprimer</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
