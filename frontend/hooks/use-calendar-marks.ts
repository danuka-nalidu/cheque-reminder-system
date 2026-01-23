import { useMemo } from 'react';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Cheque } from '@/types/cheque.types';
import {
  formatDateForCalendar,
  MarkedDates,
  CalendarMark,
  isOverdue,
} from '@/utils/calendar.utils';
import { CalendarColors } from '@/constants/theme';

/**
 * Hook to process cheques into calendar marks with colored dots
 *
 * Priority system:
 * - Red: Any overdue cheques (highest priority)
 * - Green: Any pending cheques
 * - Gray: Only settled cheques (lowest priority)
 */
export const useCalendarMarks = (cheques: Cheque[]): MarkedDates => {
  const colorScheme = useColorScheme();
  const colors = CalendarColors[colorScheme ?? 'light'];

  const markedDates = useMemo(() => {
    const marks: MarkedDates = {};

    // Group cheques by settlement date
    const chequesByDate = new Map<string, Cheque[]>();

    cheques.forEach((cheque) => {
      const dateKey = formatDateForCalendar(cheque.settlementDate);
      const existing = chequesByDate.get(dateKey) || [];
      chequesByDate.set(dateKey, [...existing, cheque]);
    });

    // Create marks for each date
    chequesByDate.forEach((chequesForDate, dateKey) => {
      const statuses = chequesForDate.map((c) => {
        // Check if overdue based on date and status
        if (isOverdue(c.settlementDate, c.status)) {
          return 'overdue';
        }
        return c.status;
      });

      // Determine unique statuses for dots
      const uniqueStatuses = Array.from(new Set(statuses));

      // Create dots based on priority
      const dots = [];

      if (uniqueStatuses.includes('overdue')) {
        dots.push({ key: 'overdue', color: colors.overdue });
      }
      if (uniqueStatuses.includes('pending')) {
        dots.push({ key: 'pending', color: colors.pending });
      }
      if (uniqueStatuses.includes('settled')) {
        dots.push({ key: 'settled', color: colors.settled });
      }

      // Limit to 3 dots maximum
      marks[dateKey] = {
        marked: true,
        dots: dots.slice(0, 3),
      };
    });

    return marks;
  }, [cheques, colors]);

  return markedDates;
};

/**
 * Hook to get cheques for a specific date
 */
export const useChequesForDate = (
  cheques: Cheque[],
  selectedDate: string | null
): Cheque[] => {
  return useMemo(() => {
    if (!selectedDate) return [];

    return cheques.filter((cheque) => {
      const dateKey = formatDateForCalendar(cheque.settlementDate);
      return dateKey === selectedDate;
    });
  }, [cheques, selectedDate]);
};
