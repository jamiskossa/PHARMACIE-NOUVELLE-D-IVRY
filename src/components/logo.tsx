import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'group flex items-center gap-3 text-lg font-bold text-foreground',
        className
      )}
    >
      <Image
        src="/images/logo.png"
        alt="Pharmacie Nouvelle d'Ivry"
        width={40}
        height={40}
        className="transition-transform duration-300 group-hover:scale-105"
      />
      <span className="font-headline text-xl whitespace-nowrap">
        Pharmacie Nouvelle d'Ivry
      </span>
    </Link>
  );
}
