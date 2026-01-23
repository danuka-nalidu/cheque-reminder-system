import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, BorderRadius, Shadows } from '@/constants/theme';
import { Cheque } from '@/types/cheque.types';
import { ChequeCard } from '@/components/cheque/cheque-card';
import { formatDateForDisplay } from '@/utils/calendar.utils';
import { EmptyState } from '@/components/empty-state';

interface CalendarDaySheetProps {
  visible: boolean;
  onClose: () => void;
  selectedDate: string | null;
  cheques: Cheque[];
  onChequePress: (cheque: Cheque) => void;
}

export const CalendarDaySheet: React.FC<CalendarDaySheetProps> = ({
  visible,
  onClose,
  selectedDate,
  cheques,
  onChequePress,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const shadows = Shadows[colorScheme ?? 'light'];

  const displayDate = selectedDate
    ? formatDateForDisplay(selectedDate)
    : '';

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable
          style={[
            styles.sheet,
            {
              backgroundColor: colors.background,
              ...shadows.large,
            },
          ]}
          onPress={(e) => e.stopPropagation()}
        >
          {/* Handle bar */}
          <View style={styles.handleContainer}>
            <View
              style={[
                styles.handle,
                {
                  backgroundColor:
                    colorScheme === 'dark' ? '#4a5568' : '#d1d5db',
                },
              ]}
            />
          </View>

          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={[styles.dateText, { color: colors.text }]}>
                {displayDate}
              </Text>
              <Text style={[styles.countText, { color: colors.icon }]}>
                {cheques.length} {cheques.length === 1 ? 'cheque' : 'cheques'}
              </Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              style={[
                styles.closeButton,
                {
                  backgroundColor:
                    colorScheme === 'dark' ? '#374151' : '#f3f4f6',
                },
              ]}
            >
              <Ionicons name="close" size={20} color={colors.text} />
            </TouchableOpacity>
          </View>

          {/* Cheques list */}
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            {cheques.length > 0 ? (
              cheques.map((cheque) => (
                <ChequeCard
                  key={cheque.id}
                  cheque={cheque}
                  onPress={() => onChequePress(cheque)}
                />
              ))
            ) : (
              <EmptyState
                icon="calendar-outline"
                title="No cheques"
                message="No cheques scheduled for this date"
              />
            )}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    borderTopLeftRadius: BorderRadius.large,
    borderTopRightRadius: BorderRadius.large,
    maxHeight: '80%',
    paddingBottom: 20,
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  dateText: {
    fontSize: 20,
    fontWeight: '700',
  },
  countText: {
    fontSize: 14,
    marginTop: 2,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
