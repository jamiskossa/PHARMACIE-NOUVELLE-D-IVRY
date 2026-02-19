import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AIChatButton } from '@/components/ai-chat-button';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { AuthProvider } from '@/contexts/auth-context';

export const metadata: Metadata = {
  title: "Pharmacie Nouvelle d'Ivry",
  description: 'Votre pharmacie digitale nouvelle génération.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <FirebaseClientProvider>
          <AuthProvider>
            {children}
            <Toaster />
            <AIChatButton />
          </AuthProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
