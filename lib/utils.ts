import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUserInitials(name: string) {
  const words = name.split(' ');

  if (words.length === 1) return words[0][0].toUpperCase();

  // For multiple words, use first letter of first and last words
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

import { DateTime } from 'luxon';

export function formatDate(dateString: string | null): string {
  if (!dateString) return '-';
  const dt = DateTime.fromISO(dateString);
  return dt.isValid ? dt.toFormat('MMM d, yyyy') : '-';
}

export function formatRelativeTime(dt: DateTime): string {
  const now = DateTime.now();
  const diff = now.diff(dt, ['days', 'hours', 'minutes', 'seconds']);

  const days = Math.floor(diff.days);
  const hours = Math.floor(diff.hours);
  const minutes = Math.floor(diff.minutes);
  const seconds = Math.floor(diff.seconds);

  if (days > 0) {
    return `${days} day${days !== 1 ? 's' : ''} ${hours} hr ago`;
  } else if (hours > 0) {
    return `${hours} hr ${minutes} min ago`;
  } else if (minutes > 0) {
    return `${minutes} min ${seconds} sec ago`;
  } else {
    return `${seconds} sec ago`;
  }
}

export function formatDateTime(dateString: string | null): {
  relativeTime: string;
  fullDateTime: string;
} | null {
  if (!dateString) return null;
  const dt = DateTime.fromISO(dateString);
  if (!dt.isValid) return null;

  return {
    relativeTime: formatRelativeTime(dt),
    fullDateTime: dt.toFormat('MMM dd, yyyy hh:mm:ss a'),
  };
}
