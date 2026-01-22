import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, ChequeColors } from '@/constants/theme';
import { formatCurrency } from '@/utils/currency.utils';

interface StatCardProps {
  title: string;
  count: number;
  amount: number;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

export function StatCard({ title, count, amount, icon, color }: StatCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const chequeColors = ChequeColors[colorScheme ?? 'light'];

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: chequeColors.card,
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
    >
      <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
        <Ionicons name={icon} size={24} color={color} />
      </View>

      <Text style={[styles.title, { color: colors.icon }]}>{title}</Text>

      <Text style={[styles.count, { color: colors.text }]}>{count}</Text>

      <Text style={[styles.amount, { color: color }]}>
        {formatCurrency(amount)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    minWidth: 140,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  count: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  amount: {
    fontSize: 14,
    fontWeight: '600',
  },
});
