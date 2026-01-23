import React from 'react';
import { StyleSheet } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, CalendarColors } from '@/constants/theme';
import { MarkedDates } from '@/utils/calendar.utils';

interface CalendarViewProps {
  markedDates: MarkedDates;
  onDayPress: (date: DateData) => void;
  selectedDate?: string;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  markedDates,
  onDayPress,
  selectedDate,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const calendarColors = CalendarColors[colorScheme ?? 'light'];

  // Merge selected date with marked dates
  const enhancedMarkedDates = {
    ...markedDates,
    ...(selectedDate && {
      [selectedDate]: {
        ...markedDates[selectedDate],
        selected: true,
        selectedColor: calendarColors.selectedDay,
      },
    }),
  };

  return (
    <Calendar
      markingType="multi-dot"
      markedDates={enhancedMarkedDates}
      onDayPress={onDayPress}
      theme={{
        backgroundColor: colors.background,
        calendarBackground: colors.background,
        textSectionTitleColor: colors.text,
        selectedDayBackgroundColor: calendarColors.selectedDay,
        selectedDayTextColor: '#ffffff',
        todayTextColor: calendarColors.todayText,
        dayTextColor: colors.text,
        textDisabledColor: colorScheme === 'dark' ? '#4a5568' : '#d1d5db',
        dotColor: calendarColors.pending,
        selectedDotColor: '#ffffff',
        arrowColor: colors.tint,
        monthTextColor: colors.text,
        indicatorColor: colors.tint,
        textDayFontFamily: 'System',
        textMonthFontFamily: 'System',
        textDayHeaderFontFamily: 'System',
        textDayFontWeight: '400',
        textMonthFontWeight: '600',
        textDayHeaderFontWeight: '500',
        textDayFontSize: 20,
        textMonthFontSize: 22,
        textDayHeaderFontSize: 16,
      }}
      style={styles.calendar}
      enableSwipeMonths={true}
    />
  );
};

const styles = StyleSheet.create({
  calendar: {
    paddingHorizontal: 8,
  },
});
