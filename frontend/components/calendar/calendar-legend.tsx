import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, CalendarColors, BorderRadius, Shadows } from '@/constants/theme';

export const CalendarLegend: React.FC = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const calendarColors = CalendarColors[colorScheme ?? 'light'];
  const shadows = Shadows[colorScheme ?? 'light'];

  const legendItems = [
    { label: 'Overdue', color: calendarColors.overdue },
    { label: 'Pending', color: calendarColors.pending },
    { label: 'Settled', color: calendarColors.settled },
  ];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderRadius: BorderRadius.medium,
          ...shadows.small,
        },
      ]}
    >
      {legendItems.map((item, index) => (
        <View key={item.label} style={styles.legendItem}>
          <View
            style={[
              styles.dot,
              {
                backgroundColor: item.color,
              },
            ]}
          />
          <Text
            style={[
              styles.label,
              {
                color: colors.text,
              },
            ]}
          >
            {item.label}
          </Text>
          {index < legendItems.length - 1 && (
            <View
              style={[
                styles.separator,
                {
                  backgroundColor: colorScheme === 'dark' ? '#374151' : '#e5e7eb',
                },
              ]}
            />
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
  },
  separator: {
    width: 1,
    height: 16,
    marginLeft: 12,
  },
});
