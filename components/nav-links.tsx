'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav data-test="app-nav" className="flex items-center gap-6 lg:ml-auto">
      <Button
        asChild
        variant="link"
        data-testid="nav-about-link"
        data-active={pathname === '/about'}
        className="text-foreground px-0 data-[active=true]:underline"
      >
        <Link href="/about">About</Link>
      </Button>
      <Button
        asChild
        variant="link"
        data-testid="nav-contact-link"
        data-active={pathname === '/contact'}
        className="text-foreground px-0 data-[active=true]:underline"
      >
        <Link href="/contact">Contact</Link>
      </Button>
      <Button asChild data-testid="nav-contact-login">
        <Link href="/login">Log In</Link>
      </Button>
    </nav>
  );
}
