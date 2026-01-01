import { betterAuth, type User } from 'better-auth';

import { isValidEmail } from './auth-utils';

export const auth = betterAuth({
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET!,
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
    },
  },
  account: {
    accountLinking: {
      enabled: true,
    },
  },
  callbacks: {
    async onOAuthUserCreated({ user }: { user: User }) {
      // Validate email domain on user creation
      if (!user.email || !isValidEmail(user.email)) {
        throw new Error('access_denied');
      }
    },
  },
});
