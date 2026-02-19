"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart as BarChartIcon, LineChart, PieChart } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { mockProducts } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

const salesData = [
  { date: 'Lun', sales: 400 },
  { date: 'Mar', sales: 300 },
  { date: 'Mer', sales: 600 },
  { date: 'Jeu', sales: 800 },
  { date: 'Ven', sales: 750 },
  { date: 'Sam', sales: 900 },
  { date: 'Dim', sales: 500 },
];

const categoryData = [
    { name: 'Parapharmacie', value: 400, fill: 'hsl(var(--chart-1))' },
    { name: 'Compléments', value: 300, fill: 'hsl(var(--chart-2))' },
    { name: 'Matériel Médical', value: 300, fill: 'hsl(var(--chart-3))' },
];

export default function DashboardPage() {
    const lowStockProducts = mockProducts.filter(p => p.stock < (p.reorderThreshold || 20));

    return (
        <div className="space-y-6">
            <h1 className="font-headline text-3xl font-bold">Dashboard</h1>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Revenu Total</CardTitle>
                        <span className="text-muted-foreground">€</span>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">45,231.89€</div>
                        <p className="text-xs text-muted-foreground">+20.1% depuis le mois dernier</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Ventes</CardTitle>
                        <BarChartIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+12,234</div>
                        <p className="text-xs text-muted-foreground">+19% depuis le mois dernier</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">RDV du jour</CardTitle>
                        <LineChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">5</div>
                        <p className="text-xs text-muted-foreground">2 confirmés, 3 en attente</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Messages non lus</CardTitle>
                        <PieChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">Dont 3 urgents</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                    <CardHeader>
                        <CardTitle>Ventes de la semaine</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                       <ChartContainer config={{
                           sales: {
                               label: "Ventes",
                               color: "hsl(var(--primary))",
                           }
                       }} className="h-[300px] w-full">
                         <BarChart data={salesData}>
                            <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}€`} />
                            <Tooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Bar dataKey="sales" fill="var(--color-sales)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                       </ChartContainer>
                    </CardContent>
                </Card>
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Produits en stock faible</CardTitle>
                        <CardDescription>
                            Produits nécessitant un réapprovisionnement urgent.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                       <div className="space-y-4">
                        {lowStockProducts.map(product => (
                            <div key={product.productId} className="flex items-center">
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">{product.name}</p>
                                    <p className="text-sm text-muted-foreground">{product.category}</p>
                                </div>
                                <div className="ml-auto font-medium"><Badge variant="destructive">{product.stock}</Badge></div>
                            </div>
                        ))}
                       </div>
                    </CardContent>
                    <CardContent>
                        <Button size="sm" className="w-full" asChild>
                            <Link href="/dashboard/stock">
                                Gérer le stock <ArrowUpRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
