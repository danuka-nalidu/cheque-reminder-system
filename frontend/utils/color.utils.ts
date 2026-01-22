import { Cheque, ChequeStatus, ChequeType } from '@/types/cheque.types';
import { ColorSchemeName } from 'react-native';

export const ChequeColors = {
  light: {
    incoming: '#10b981',  // Green
    outgoing: '#ef4444',  // Red
    overdue: '#f59e0b',   // Yellow/Amber
    settled: '#6b7280',   // Gray
    pending: '#3b82f6',   // Blue
  },
  dark: {
    incoming: '#34d399',  // Light green
    outgoing: '#f87171',  // Light red
    overdue: '#fbbf24',   // Light yellow/amber
    settled: '#9ca3af',   // Light gray
    pending: '#60a5fa',   // Light blue
  },
};

export function getChequeColor(
  cheque: Cheque,
  colorScheme: ColorSchemeName
): string {
  const colors = ChequeColors[colorScheme ?? 'light'];

  // Priority: overdue > settled > type-based
  if (cheque.status === 'overdue') {
    return colors.overdue;
  }

  if (cheque.status === 'settled') {
    return colors.settled;
  }

  // For pending: incoming=green, outgoing=red
  return cheque.type === 'incoming' ? colors.incoming : colors.outgoing;
}

export function getChequeStatusColor(
  status: ChequeStatus,
  colorScheme: ColorSchemeName
): string {
  const colors = ChequeColors[colorScheme ?? 'light'];

  switch (status) {
    case 'overdue':
      return colors.overdue;
    case 'settled':
      return colors.settled;
    case 'pending':
      return colors.pending;
    default:
      return colors.pending;
  }
}

export function getChequeTypeColor(
  type: ChequeType,
  colorScheme: ColorSchemeName
): string {
  const colors = ChequeColors[colorScheme ?? 'light'];
  return type === 'incoming' ? colors.incoming : colors.outgoing;
}
