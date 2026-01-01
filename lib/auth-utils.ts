/**
 * Validates if an email address belongs to the mumzworld.com domain.
 * @param email - The email address to validate
 * @returns true if the email ends with @mumzworld.com, false otherwise
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false;
  }
  return email.toLowerCase().endsWith('@mumzworld.com');
}
