'use client';

import { useState } from 'react';
import { Bot, Loader, Send, User, AlertTriangle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { aiCustomerSupportChatbot } from '@/ai/flows/ai-customer-support-chatbot-flow';

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  productRecommendations?: string[];
  escalate?: boolean;
}

export function AIChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: "Bonjour ! Je suis l'assistant IA de la Pharmacie Nouvelle d'Ivry. Comment puis-je vous aider aujourd'hui ?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await aiCustomerSupportChatbot({ customerQuery: input });
      const aiMessage: ChatMessage = {
        sender: 'ai',
        text: result.responseText,
        productRecommendations: result.productRecommendations,
        escalate: result.escalateToPharmacist,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI Chatbot Error:', error);
      const errorMessage: ChatMessage = {
        sender: 'ai',
        text: 'Désolé, une erreur est survenue. Veuillez réessayer plus tard.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="default"
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-gradient-to-br from-primary to-green-400 p-0 shadow-lg hover:scale-105 transition-transform"
        >
          <Bot className="h-8 w-8 text-primary-foreground" />
          <span className="sr-only">Ouvrir le chat</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="end"
        className="w-[90vw] max-w-md rounded-xl p-0 shadow-2xl"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <div className="flex h-[60vh] flex-col">
          <header className="flex items-center justify-between rounded-t-xl border-b bg-secondary/50 p-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar>
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot />
                  </AvatarFallback>
                </Avatar>
                <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white" />
              </div>
              <div>
                <p className="font-semibold">Assistant IA</p>
                <p className="text-xs text-muted-foreground">En ligne</p>
              </div>
            </div>
             <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </header>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex items-end gap-2',
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.sender === 'ai' && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      'max-w-[80%] rounded-2xl px-4 py-2',
                      message.sender === 'user'
                        ? 'rounded-br-none bg-primary text-primary-foreground'
                        : 'rounded-bl-none bg-secondary'
                    )}
                  >
                    <p className="text-sm">{message.text}</p>
                    {message.productRecommendations && message.productRecommendations.length > 0 && (
                        <div className="mt-2 border-t pt-2">
                            <p className="text-xs font-semibold mb-1">Suggestions :</p>
                            <ul className="list-disc list-inside">
                                {message.productRecommendations.map((p, i) => <li key={i} className="text-xs">{p}</li>)}
                            </ul>
                        </div>
                    )}
                    {message.escalate && (
                        <div className="mt-2 flex items-center gap-2 rounded-md border border-amber-500/50 bg-amber-500/10 p-2 text-amber-700 dark:text-amber-400">
                            <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                            <p className="text-xs">Cette question nécessite l'avis d'un pharmacien. Voulez-vous être mis en relation ?</p>
                        </div>
                    )}
                  </div>
                  {message.sender === 'user' && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isLoading && (
                 <div className="flex items-end gap-2 justify-start">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="rounded-2xl rounded-bl-none bg-secondary px-4 py-3">
                        <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
                    </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <footer className="border-t p-4">
            <div className="relative">
              <Input
                placeholder="Posez votre question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="rounded-full pr-12"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full"
                onClick={handleSend}
                disabled={isLoading}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </footer>
        </div>
      </PopoverContent>
    </Popover>
  );
}
