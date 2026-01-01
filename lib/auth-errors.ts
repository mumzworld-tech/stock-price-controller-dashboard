const errorMessages: Record<string, string> = {
  access_denied: 'Only @mumzworld.com email addresses are allowed.',
  oauth_error: 'Authentication failed. Please try again.',
  OAuthCallback: 'Authentication failed. Please try again.',
  OAuthAccountNotLinked: 'This account is already linked to another user.',
};

/**
 * Returns a user-friendly error message for the given error code.
 * @param errorCode - The error code from the authentication flow
 * @returns A user-friendly error message
 */
export function getErrorMessage(errorCode: string): string {
  return errorMessages[errorCode] || 'An error occurred during sign-in.';
}
