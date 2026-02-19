'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Boxes,
  FileText,
  Contact,
  Users,
  MessageSquare,
  Video,
  Settings,
  LogOut,
  User as UserIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/logo';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useAuthContext } from '@/contexts/auth-context';
import { Skeleton } from './ui/skeleton';
import { Button } from './ui/button';
import { signOut } from 'firebase/auth';
import { useAuth } from '@/firebase';
import { useRouter } from 'next/navigation';

const adminNavItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Produits', href: '/dashboard/produits', icon: Package },
  { name: 'Stock', href: '/dashboard/stock', icon: Boxes },
  { name: 'Blog', href: '/dashboard/blog', icon: FileText },
  { name: 'Annuaire', href: '/dashboard/annuaire', icon: Contact },
  { name: 'Utilisateurs', href: '/dashboard/utilisateurs', icon: Users },
  { name: 'Messagerie', href: '/dashboard/messagerie', icon: MessageSquare },
  { name: 'RDV Visio', href: '/dashboard/rdv-visio', icon: Video },
];

const collaboratorNavItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Produits', href: '/dashboard/produits', icon: Package },
  { name: 'Stock', href: '/dashboard/stock', icon: Boxes },
  { name: 'Blog', href: '/dashboard/blog', icon: FileText },
  { name: 'Annuaire', href: '/dashboard/annuaire', icon: Contact },
  { name: 'Messagerie', href: '/dashboard/messagerie', icon: MessageSquare },
  { name: 'RDV Visio', href: '/dashboard/rdv-visio', icon: Video },
];

const clientNavItems = [
  { name: 'Mon Profil', href: '/dashboard/profil', icon: UserIcon },
  { name: 'Mes Commandes', href: '/dashboard/commandes', icon: Package },
  { name: 'Mes Messages', href: '/dashboard/messagerie', icon: MessageSquare },
  { name: 'Mes RDV', href: '/dashboard/rdv-visio', icon: Video },
];

const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('');

const SidebarSkeleton = () => (
  <aside className="hidden h-screen w-64 flex-col border-r bg-secondary/50 lg:flex">
    <div className="flex h-16 items-center border-b px-6">
      <Logo />
    </div>
    <div className="flex-1 px-4 py-4 space-y-2">
      {[...Array(8)].map((_, i) => (
        <Skeleton key={i} className="h-9 w-full rounded-lg" />
      ))}
    </div>
    <div className="mt-auto border-t p-4">
       <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
          </div>
       </div>
    </div>
  </aside>
);


export function DashboardSidebar() {
  const pathname = usePathname();
  const { user, role, isLoading } = useAuthContext();
  const auth = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/connexion');
  };

  if (isLoading) {
    return <SidebarSkeleton />;
  }

  const navItems =
    role === 'admin'
      ? adminNavItems
      : role === 'collaborateur'
      ? collaboratorNavItems
      : clientNavItems;

  return (
    <aside className="hidden h-screen w-64 flex-col border-r bg-secondary/50 lg:flex">
      <div className="flex h-16 items-center border-b px-6">
        <Logo />
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto">
        <nav className="flex-1 space-y-1 px-4 py-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                pathname === item.href && 'bg-primary/10 text-primary'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto border-t p-4">
        <div className="flex items-center gap-3">
            {user && (
                <>
                <Avatar className="h-10 w-10">
                    <AvatarImage src={user.photoURL} alt={`${user.prenom} ${user.nom}`} />
                    <AvatarFallback>{getInitials(`${user.prenom} ${user.nom}`)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="text-sm font-semibold">{user.prenom} {user.nom}</p>
                    <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                </div>
                </>
            )}
        </div>
        <Separator className="my-4" />
        <Link
          href="/dashboard/parametres"
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
            pathname === '/dashboard/parametres' && 'bg-primary/10 text-primary'
          )}
        >
          <Settings className="h-5 w-5" />
          Paramètres
        </Link>
        <Button variant="ghost" onClick={handleLogout} className="flex w-full justify-start items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
          <LogOut className="h-5 w-5" />
          Déconnexion
        </Button>
      </div>
    </aside>
  );
}
