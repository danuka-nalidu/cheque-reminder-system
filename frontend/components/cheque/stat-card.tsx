import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, Gradients, BorderRadius, Shadows } from '@/constants/theme';
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
  const gradients = Gradients[colorScheme ?? 'light'];
  const shadows = Shadows[colorScheme ?? 'light'];

  return (
    <View style={[styles.cardWrapper, shadows.medium]}>
      <LinearGradient
        colors={gradients.card}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
          <Ionicons name={icon} size={24} color={color} />
        </View>

        <Text style={[styles.title, { color: colors.icon }]}>{title}</Text>

        <Text style={[styles.count, { color: colors.text }]}>{count}</Text>

        <Text style={[styles.amount, { color: color }]}>
          {formatCurrency(amount)}
        </Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    borderRadius: BorderRadius.medium,
    overflow: 'hidden',
  },
  card: {
    padding: 16,
    minWidth: 140,
    borderRadius: BorderRadius.medium,
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
