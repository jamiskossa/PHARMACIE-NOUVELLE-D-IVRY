import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Package } from "lucide-react";

const mockOrders = [
  {
    id: "ORD001",
    date: "2023-11-20",
    status: "Livré",
    total: "45.30€",
  },
  {
    id: "ORD002",
    date: "2023-11-28",
    status: "En cours",
    total: "15.50€",
  },
  {
    id: "ORD003",
    date: "2023-12-05",
    status: "Annulé",
    total: "29.80€",
  },
  {
    id: "ORD004",
    date: "2023-12-10",
    status: "Livré",
    total: "102.00€",
  },
];

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" } = {
  "Livré": "default",
  "En cours": "secondary",
  "Annulé": "destructive",
};

export default function CommandesPage() {
  return (
    <div className="space-y-6">
       <div>
        <h1 className="font-headline text-3xl font-bold flex items-center gap-3">
            <Package/>
            Mes Commandes
        </h1>
        <p className="text-muted-foreground mt-2">Consultez l'historique de vos commandes passées sur notre site.</p>
       </div>

      <Card>
        <CardHeader>
          <CardTitle>Historique des commandes</CardTitle>
          <CardDescription>
            Retrouvez ici toutes les informations relatives à vos commandes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Commande</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[order.status] || "outline"}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{order.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
