import { LoginForm } from '@/components/login-form';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Login',
};

function LoginPage() {
  return (
    <div className="max-w-sm mx-auto space-y-6">
      <LoginForm />
      <div className="text-center">
        <Link
          href="/"
          className="underline text-sm text-muted-foreground hover:text-primary hover:no-underline"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
