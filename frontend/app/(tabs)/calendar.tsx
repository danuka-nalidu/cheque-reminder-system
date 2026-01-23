import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { DateData } from 'react-native-calendars';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { CalendarView } from '@/components/calendar/calendar-view';
import { CalendarLegend } from '@/components/calendar/calendar-legend';
import { CalendarDaySheet } from '@/components/calendar/calendar-day-sheet';
import { useCalendarMarks, useChequesForDate } from '@/hooks/use-calendar-marks';
import { mockCheques } from '@/data/mockCheques';
import { Cheque } from '@/types/cheque.types';

export default function CalendarScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [sheetVisible, setSheetVisible] = useState(false);

  // Get marked dates from cheques
  const markedDates = useCalendarMarks(mockCheques);

  // Get cheques for selected date
  const selectedCheques = useChequesForDate(mockCheques, selectedDate);

  const handleDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);

    // Only show sheet if there are cheques on this date
    const chequesForDay = mockCheques.filter((cheque) => {
      const dateKey = cheque.settlementDate.toISOString().split('T')[0];
      return dateKey === day.dateString;
    });

    if (chequesForDay.length > 0) {
      setSheetVisible(true);
    }
  };

  const handleCloseSheet = () => {
    setSheetVisible(false);
  };

  const handleChequePress = (cheque: Cheque) => {
    setSheetVisible(false);
    // Navigate to cheque detail screen (to be implemented)
    // router.push(`/cheques/${cheque.id}`);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <CalendarLegend />
      <CalendarView
        markedDates={markedDates}
        onDayPress={handleDayPress}
        selectedDate={selectedDate || undefined}
      />

      <CalendarDaySheet
        visible={sheetVisible}
        onClose={handleCloseSheet}
        selectedDate={selectedDate}
        cheques={selectedCheques}
        onChequePress={handleChequePress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
  },
});
