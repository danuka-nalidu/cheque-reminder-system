import { format, formatDistanceToNow, differenceInDays, isPast, isToday, isTomorrow } from 'date-fns';

export function formatDate(date: Date): string {
  return format(date, 'MMM dd, yyyy');
}

export function formatDateShort(date: Date): string {
  return format(date, 'MMM dd');
}

export function formatDateRelative(date: Date): string {
  if (isToday(date)) {
    return 'Today';
  }

  if (isTomorrow(date)) {
    return 'Tomorrow';
  }

  const daysUntil = differenceInDays(date, new Date());

  if (daysUntil < 0) {
    return `${Math.abs(daysUntil)} days ago`;
  }

  if (daysUntil <= 7) {
    return `In ${daysUntil} days`;
  }

  return formatDate(date);
}

export function isOverdue(date: Date): boolean {
  return isPast(date) && !isToday(date);
}

export function getDaysUntil(date: Date): number {
  return differenceInDays(date, new Date());
}

export function isUpcoming(date: Date, daysAhead: number = 7): boolean {
  const daysUntil = getDaysUntil(date);
  return daysUntil >= 0 && daysUntil <= daysAhead;
}
