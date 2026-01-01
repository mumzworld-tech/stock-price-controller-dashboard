'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

import { GoogleIcon } from '@/components/icons/google.icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { authClient } from '@/lib/auth-client';
import { getErrorMessage } from '@/lib/auth-errors';
import Logo from '@/public/img/logo.png';

function SignInContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: callbackUrl,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fafafa] dark:bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Image src={Logo} alt="Logo" width={64} height={64} className="rounded-lg" />
          </div>
          <CardTitle className="text-2xl">Welcome to SPCS Dashboard</CardTitle>
          <CardDescription>Sign in with your Mumzworld Google account to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{getErrorMessage(error)}</div>
          )}
          <Button variant="outline" className="w-full" size="lg" onClick={handleGoogleSignIn}>
            <GoogleIcon className="mr-2 h-5 w-5" />
            Sign in with Google
          </Button>
          <p className="text-center text-xs text-muted-foreground">Only @mumzworld.com email addresses are allowed</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <SignInContent />
    </Suspense>
  );
}
