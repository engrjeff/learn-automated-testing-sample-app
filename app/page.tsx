import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1 className="font-extrabold text-4xl mb-4" data-testid="hero-title">
        Let us learn automated web testing!
      </h1>
      <p className="mb-6" data-testid="hero-subtitle">
        This is a sample app for learning automated web app testing.
      </p>
      <Button asChild size="lg" data-testid="login-link">
        <Link href="/login">Log In</Link>
      </Button>
    </div>
  );
}
