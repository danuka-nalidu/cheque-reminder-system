import { format, parseISO } from 'date-fns';

/**
 * Calendar utility functions
 */

export type ChequeStatus = 'pending' | 'settled' | 'overdue';

export interface CalendarMark {
  marked: boolean;
  dots?: Array<{
    key: string;
    color: string;
  }>;
  selected?: boolean;
  selectedColor?: string;
}

export interface MarkedDates {
  [date: string]: CalendarMark;
}

/**
 * Formats a date string to YYYY-MM-DD format for calendar
 */
export const formatDateForCalendar = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'yyyy-MM-dd');
};

/**
 * Formats a date string for display (e.g., "Jan 15, 2024")
 */
export const formatDateForDisplay = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'MMM dd, yyyy');
};

/**
 * Gets the priority color for a date based on cheque statuses
 * Priority: overdue > pending > settled
 */
export const getPriorityColor = (
  statuses: ChequeStatus[],
  colorScheme: 'light' | 'dark'
): string => {
  const colors = {
    light: {
      overdue: '#f59e0b',
      pending: '#10b981',
      settled: '#6b7280',
    },
    dark: {
      overdue: '#fbbf24',
      pending: '#34d399',
      settled: '#9ca3af',
    },
  };

  if (statuses.includes('overdue')) {
    return colors[colorScheme].overdue;
  }
  if (statuses.includes('pending')) {
    return colors[colorScheme].pending;
  }
  return colors[colorScheme].settled;
};

/**
 * Determines if a date should be marked as overdue
 */
export const isOverdue = (settlementDate: Date | string, status: string): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dateObj = typeof settlementDate === 'string' ? parseISO(settlementDate) : settlementDate;
  dateObj.setHours(0, 0, 0, 0);

  return dateObj < today && status !== 'cleared';
};
