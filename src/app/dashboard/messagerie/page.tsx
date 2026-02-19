"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { mockUsers } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Bot, Search, Send } from "lucide-react";

const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('');

const conversations = [
  { ...mockUsers.find(u => u.role === 'client')!, lastMessage: "Bonjour, j'ai une question sur ma commande.", time: "10:42", unread: 2 },
  { ...mockUsers.find(u => u.role === 'collaborateur')!, lastMessage: "Peux-tu vérifier le stock de la crème X ?", time: "09:15", unread: 0 },
  {
    userId: 'ai_assistant',
    prenom: 'Assistant',
    nom: 'IA',
    email: 'ai@ivrypharma.com',
    photoURL: '',
    role: 'admin',
    lastMessage: "Rappel : 3 produits en stock faible.",
    time: "Hier",
    unread: 1,
    isAi: true,
  }
];

const messages = [
    { sender: 'other', text: "Bonjour, j'ai une question sur ma commande." },
    { sender: 'me', text: "Bonjour Sophie, bien sûr. Quel est le numéro de votre commande ?" },
]

export default function MessageriePage() {
  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col">
       <div>
        <h1 className="font-headline text-3xl font-bold">Messagerie</h1>
        <p className="text-muted-foreground mt-2 mb-4">Communiquez avec vos collaborateurs et vos clients.</p>
       </div>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-hidden">
        {/* Conversations List */}
        <div className="md:col-span-1 lg:col-span-1 bg-card border rounded-lg flex flex-col h-full">
            <div className="p-4 border-b">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Rechercher..." className="pl-10" />
                </div>
            </div>
          <ScrollArea className="flex-1">
            {conversations.map(convo => (
              <div key={convo.userId} className="flex items-center gap-4 p-4 hover:bg-secondary/50 cursor-pointer border-b">
                <Avatar>
                  <AvatarImage src={convo.photoURL} />
                  <AvatarFallback>{convo.isAi ? <Bot/> : getInitials(`${convo.prenom} ${convo.nom}`)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <p className="font-semibold truncate">{convo.prenom} {convo.nom}</p>
                  <p className="text-sm text-muted-foreground truncate">{convo.lastMessage}</p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-muted-foreground">{convo.time}</p>
                    {convo.unread > 0 && <span className="mt-1 flex justify-end"><span className="text-xs bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center">{convo.unread}</span></span>}
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* Chat Window */}
        <div className="md:col-span-2 lg:col-span-3 bg-card border rounded-lg flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={conversations[0].photoURL} />
                  <AvatarFallback>{getInitials(`${conversations[0].prenom} ${conversations[0].nom}`)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-semibold">{conversations[0].prenom} {conversations[0].nom}</p>
                    <p className="text-xs text-green-500">En ligne</p>
                </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-6">
                <div className="space-y-6">
                {messages.map((message, index) => (
                     <div key={index} className={cn("flex items-end gap-2", message.sender === 'me' ? "justify-end" : "justify-start")}>
                        {message.sender === 'other' && (
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={conversations[0].photoURL} />
                                <AvatarFallback>{getInitials(`${conversations[0].prenom} ${conversations[0].nom}`)}</AvatarFallback>
                            </Avatar>
                        )}
                        <div className={cn("max-w-[70%] rounded-2xl px-4 py-3", message.sender === 'me' ? 'rounded-br-none bg-primary text-primary-foreground' : 'rounded-bl-none bg-secondary')}>
                            <p>{message.text}</p>
                        </div>
                     </div>
                ))}
                </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t bg-secondary/50">
                <div className="relative">
                    <Input placeholder="Écrire un message..." className="pr-12" />
                    <Button type="submit" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full">
                        <Send className="h-4 w-4"/>
                    </Button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
