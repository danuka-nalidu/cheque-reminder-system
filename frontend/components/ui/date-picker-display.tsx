import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, ChequeColors } from '@/constants/theme';
import { formatDate } from '@/utils/date.utils';
import { Ionicons } from '@expo/vector-icons';

interface DatePickerDisplayProps {
  label?: string;
  value: Date;
  onChange: (date: Date) => void;
  error?: string;
  minimumDate?: Date;
  maximumDate?: Date;
}

export function DatePickerDisplay({
  label,
  value,
  onChange,
  error,
  minimumDate,
  maximumDate,
}: DatePickerDisplayProps) {
  const [show, setShow] = useState(false);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const chequeColors = ChequeColors[colorScheme ?? 'light'];

  const handleChange = (_event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShow(false);
    }
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      )}
      <TouchableOpacity
        style={[
          styles.inputContainer,
          {
            backgroundColor: chequeColors.card,
            borderColor: error ? '#ef4444' : chequeColors.border,
          },
        ]}
        onPress={showDatepicker}
      >
        <Ionicons
          name="calendar-outline"
          size={20}
          color={colors.icon}
          style={styles.icon}
        />
        <Text style={[styles.text, { color: colors.text }]}>
          {formatDate(value)}
        </Text>
      </TouchableOpacity>
      {error && <Text style={styles.error}>{error}</Text>}
      {show && (
        <DateTimePicker
          value={value}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          themeVariant={colorScheme ?? 'light'}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 16,
  },
  error: {
    fontSize: 12,
    color: '#ef4444',
    marginTop: 4,
  },
});
