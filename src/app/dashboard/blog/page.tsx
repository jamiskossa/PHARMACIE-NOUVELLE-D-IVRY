"use client";
import { mockBlogPosts } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function BlogManagementPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <div>
            <h1 className="font-headline text-3xl font-bold">Gestion du Blog</h1>
            <p className="text-muted-foreground mt-2">Gérez, rédigez et publiez les articles de votre blog ici.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nouvel article
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des articles</CardTitle>
          <CardDescription>Gérez les articles publiés et les brouillons.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">Image</TableHead>
                <TableHead>Titre</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="hidden md:table-cell">Auteur</TableHead>
                <TableHead className="hidden md:table-cell">Date de publication</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockBlogPosts.map((post) => (
                <TableRow key={post.blogId}>
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt={post.title}
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src={post.coverImage}
                      width="64"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>
                    <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                      {post.status === 'published' ? 'Publié' : 'Brouillon'}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{post.authorName}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {format(post.publishDate, "d MMMM yyyy", { locale: fr })}
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
                        <DropdownMenuItem>Modifier</DropdownMenuItem>
                        {post.status !== 'published' && <DropdownMenuItem>Publier</DropdownMenuItem>}
                        <DropdownMenuItem>Aperçu</DropdownMenuItem>
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
