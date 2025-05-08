'use client';

import { AlertCircleIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

const EMAIL = 'jeffkim@test.com';
const PASSWORD = '@kimjep';

export function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const [loading, setLoading] = React.useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    if (email !== EMAIL) {
      setError('Invalid credentials.');
      return;
    }

    if (password !== PASSWORD) {
      setError('Invalid credentials.');
      return;
    }

    if (email === EMAIL && password === PASSWORD) {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        router.push('/tasks');
      }, 1500);
    }
  }

  return (
    <form
      data-testid="login-form"
      aria-describedby={error ? 'login-error' : undefined}
      onSubmit={handleSubmit}
      onChange={() => setError('')}
    >
      <fieldset className="space-y-4 disabled:opacity-90" disabled={loading}>
        <h1>Log in your account to continue.</h1>
        {error ? (
          <Alert variant="destructive">
            <AlertCircleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription id="login-error" data-testid="login-error">
              {error}
            </AlertDescription>
          </Alert>
        ) : null}
        <div className="space-y-2">
          <Label htmlFor="login-email">Email</Label>
          <Input
            type="email"
            id="login-email"
            name="login-email"
            data-testid="email-input"
            placeholder="email@example.com"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="login-password">Password</Label>
          <Input
            type="password"
            id="login-password"
            name="login-password"
            data-testid="password-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </div>
        <div className="pt-4">
          <Button type="submit" className="w-full">
            {loading ? 'Loggin in...' : 'Log In'}
          </Button>
        </div>
      </fieldset>
    </form>
  );
}
