"use client";
import { mockAnnuaire } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, PlusCircle, Building, Handshake, User } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const typeInfo = {
  fournisseur: {
    icon: Building,
    label: "Fournisseur",
    variant: "secondary",
  },
  partenaire: {
    icon: Handshake,
    label: "Partenaire",
    variant: "outline",
  },
  client: {
    icon: User,
    label: "Client",
    variant: "default",
  },
};

export default function AnnuairePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="font-headline text-3xl font-bold">Gestion de l'Annuaire</h1>
            <p className="text-muted-foreground mt-2">Gérez vos contacts : fournisseurs, partenaires et clients.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Ajouter une entrée
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des contacts</CardTitle>
          <CardDescription>Consultez, modifiez ou supprimez les contacts de votre annuaire.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead className="hidden lg:table-cell">Téléphone</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAnnuaire.map((entry) => {
                const info = typeInfo[entry.type as keyof typeof typeInfo] || typeInfo.client;
                return (
                  <TableRow key={entry.entryId}>
                    <TableCell className="font-medium">{entry.nom}</TableCell>
                    <TableCell>
                      <Badge variant={info.variant as any} className="flex items-center w-fit">
                        <info.icon className="mr-2 h-3.5 w-3.5" />
                        {info.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{entry.email}</TableCell>
                    <TableCell className="hidden lg:table-cell">{entry.telephone}</TableCell>
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
                          <DropdownMenuItem>Modifier</DropdownMenuItem>
                          <DropdownMenuItem>Voir détails</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive focus:text-destructive">Supprimer</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
