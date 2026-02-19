"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Video } from "lucide-react";
import * as React from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const mockAppointments = [
  { time: "10:00", client: "Sophie Martin", status: "Confirmé" },
  { time: "11:30", client: "Jean Dupont", status: "En attente" },
  { time: "14:00", client: "Paul Bernard", status: "Confirmé" },
];

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" } = {
  "Confirmé": "default",
  "En attente": "secondary",
};


export default function VisioPage() {
    const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <div className="space-y-6">
        <div className="flex items-start justify-between">
            <div>
                <h1 className="font-headline text-3xl font-bold">Rendez-vous Visio</h1>
                <p className="text-muted-foreground mt-2">Gérez les consultations en ligne avec vos clients.</p>
            </div>
             <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Nouveau RDV
            </Button>
        </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
             <Card>
                <CardContent className="p-0">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md"
                        locale={fr}
                    />
                </CardContent>
             </Card>
        </div>
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Rendez-vous du {date ? format(date, "d MMMM yyyy", { locale: fr }) : ''}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {mockAppointments.map(rdv => (
                            <div key={rdv.time} className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50">
                                <div>
                                    <p className="font-bold">{rdv.time}</p>
                                    <p className="text-muted-foreground">{rdv.client}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                     <Badge variant={statusVariant[rdv.status] || "outline"}>
                                        {rdv.status}
                                    </Badge>
                                    <Button size="sm">
                                        <Video className="mr-2 h-4 w-4"/>
                                        Rejoindre
                                    </Button>
                                </div>
                            </div>
                        ))}

                        {mockAppointments.length === 0 && (
                            <div className="text-center text-muted-foreground py-12">
                                <p>Aucun rendez-vous prévu pour cette date.</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
