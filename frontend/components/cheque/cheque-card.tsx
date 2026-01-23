import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, ChequeColors, BorderRadius, Shadows } from '@/constants/theme';
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
  const shadows = Shadows[colorScheme ?? 'light'];
  const borderColor = getChequeColor(cheque, colorScheme);

  // Animation values
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.97, {
      damping: 15,
      stiffness: 300,
    });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      damping: 15,
      stiffness: 300,
    });
  };

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
    <Animated.View style={animatedStyle}>
      <Pressable
        style={[
          styles.card,
          {
            backgroundColor: chequeColors.card,
            borderLeftColor: borderColor,
            borderRadius: BorderRadius.medium,
            ...shadows.medium,
          },
        ]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
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
      </Pressable>
    </Animated.View>
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
