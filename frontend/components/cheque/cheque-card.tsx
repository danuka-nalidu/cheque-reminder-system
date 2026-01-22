import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, ChequeColors } from '@/constants/theme';
import { Cheque } from '@/types/cheque.types';
import { formatCurrency } from '@/utils/currency.utils';
import { formatDateRelative } from '@/utils/date.utils';
import { getChequeColor } from '@/utils/color.utils';

interface ChequeCardProps {
  cheque: Cheque;
  onPress?: () => void;
}

export function ChequeCard({ cheque, onPress }: ChequeCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const chequeColors = ChequeColors[colorScheme ?? 'light'];
  const borderColor = getChequeColor(cheque, colorScheme);

  const getStatusLabel = () => {
    switch (cheque.status) {
      case 'overdue':
        return 'Overdue';
      case 'settled':
        return 'Settled';
      case 'pending':
        return 'Pending';
      default:
        return '';
    }
  };

  const getStatusColor = () => {
    switch (cheque.status) {
      case 'overdue':
        return chequeColors.overdue;
      case 'settled':
        return chequeColors.settled;
      case 'pending':
        return chequeColors.pending;
      default:
        return chequeColors.pending;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: chequeColors.card,
          borderLeftColor: borderColor,
          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
            },
            android: {
              elevation: 3,
            },
          }),
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.typeIconContainer}>
            <Ionicons
              name={
                cheque.type === 'incoming' ? 'arrow-down' : 'arrow-up'
              }
              size={20}
              color={borderColor}
            />
          </View>
          <View style={styles.headerText}>
            <Text style={[styles.amount, { color: colors.text }]}>
              {formatCurrency(cheque.amount)}
            </Text>
            <Text style={[styles.bankName, { color: colors.icon }]}>
              {cheque.bankName}
            </Text>
          </View>
        </View>

        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Ionicons name="calendar-outline" size={14} color={colors.icon} />
            <Text style={[styles.detailText, { color: colors.icon }]}>
              {formatDateRelative(cheque.settlementDate)}
            </Text>
          </View>

          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor() + '20' },
            ]}
          >
            <Text
              style={[styles.statusText, { color: getStatusColor() }]}
            >
              {getStatusLabel()}
            </Text>
          </View>
        </View>

        {cheque.payeePayer && (
          <View style={styles.payeeRow}>
            <Ionicons name="person-outline" size={14} color={colors.icon} />
            <Text
              style={[styles.payeeText, { color: colors.icon }]}
              numberOfLines={1}
            >
              {cheque.payeePayer}
            </Text>
          </View>
        )}
      </View>

      <Ionicons
        name="chevron-forward"
        size={20}
        color={colors.icon}
        style={styles.chevron}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  typeIconContainer: {
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  amount: {
    fontSize: 20,
    fontWeight: '700',
  },
  bankName: {
    fontSize: 14,
    marginTop: 2,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 13,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  payeeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  payeeText: {
    fontSize: 13,
    flex: 1,
  },
  chevron: {
    marginLeft: 8,
  },
});
