import { DashboardSidebar } from '@/components/dashboard-sidebar';
import { UserNav } from '@/components/user-nav';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { PanelLeft } from 'lucide-react';
import { Logo } from '@/components/logo';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4">
           <div className="lg:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button size="icon" variant="outline">
                        <PanelLeft className="h-5 w-5" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 p-0">
                    <SheetTitle className="sr-only">Menu</SheetTitle>
                    <SheetDescription className="sr-only">A sidebar menu for navigating the dashboard.</SheetDescription>
                    <DashboardSidebar />
                </SheetContent>
            </Sheet>
           </div>
           <div>
             <Logo />
           </div>
          <div className="flex items-center gap-4">
            <UserNav />
          </div>
        </header>
        <main className="flex-1 overflow-auto bg-secondary/50 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
