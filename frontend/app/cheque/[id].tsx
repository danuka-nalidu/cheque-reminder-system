import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, ChequeColors } from '@/constants/theme';
import { mockCheques } from '@/data/mockCheques';
import { formatCurrency } from '@/utils/currency.utils';
import { formatDate } from '@/utils/date.utils';
import { getChequeColor } from '@/utils/color.utils';
import { Button } from '@/components/ui/button';

export default function ChequeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const chequeColors = ChequeColors[colorScheme ?? 'light'];

  const cheque = mockCheques.find((c) => c.id === id);

  if (!cheque) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Stack.Screen
          options={{
            title: 'Cheque Details',
            headerStyle: { backgroundColor: colors.background },
            headerTintColor: colors.text,
          }}
        />
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: colors.text }]}>
            Cheque not found
          </Text>
        </View>
      </View>
    );
  }

  const borderColor = getChequeColor(cheque, colorScheme);

  const handleEdit = () => {
    router.push(`/cheque/edit/${cheque.id}`);
  };

  const handleMarkAsSettled = () => {
    Alert.alert(
      'Mark as Settled',
      'This cheque will be marked as settled.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            Alert.alert('Success', 'Cheque marked as settled');
            router.back();
          },
        },
      ]
    );
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Cheque',
      'Are you sure you want to delete this cheque? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Success', 'Cheque deleted');
            router.back();
          },
        },
      ]
    );
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

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          title: 'Cheque Details',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }}
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.header,
            {
              backgroundColor: borderColor + '15',
              borderLeftColor: borderColor,
            },
          ]}
        >
          <View style={styles.headerContent}>
            <View style={styles.typeIconContainer}>
              <Ionicons
                name={cheque.type === 'incoming' ? 'arrow-down' : 'arrow-up'}
                size={32}
                color={borderColor}
              />
            </View>
            <View style={styles.headerText}>
              <Text style={[styles.typeLabel, { color: borderColor }]}>
                {cheque.type === 'incoming' ? 'Incoming' : 'Outgoing'}
              </Text>
              <Text style={[styles.amount, { color: colors.text }]}>
                {formatCurrency(cheque.amount)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: colors.icon }]}>
              Bank Name
            </Text>
            <Text style={[styles.detailValue, { color: colors.text }]}>
              {cheque.bankName}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: colors.icon }]}>
              Settlement Date
            </Text>
            <Text style={[styles.detailValue, { color: colors.text }]}>
              {formatDate(cheque.settlementDate)}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: colors.icon }]}>
              Status
            </Text>
            <Text style={[styles.detailValue, { color: borderColor }]}>
              {getStatusLabel()}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: colors.icon }]}>
              Date Created
            </Text>
            <Text style={[styles.detailValue, { color: colors.text }]}>
              {formatDate(cheque.dateCreated)}
            </Text>
          </View>

          {cheque.chequeNumber && (
            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: colors.icon }]}>
                Cheque Number
              </Text>
              <Text style={[styles.detailValue, { color: colors.text }]}>
                {cheque.chequeNumber}
              </Text>
            </View>
          )}

          {cheque.payeePayer && (
            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: colors.icon }]}>
                {cheque.type === 'incoming' ? 'Payer' : 'Payee'}
              </Text>
              <Text style={[styles.detailValue, { color: colors.text }]}>
                {cheque.payeePayer}
              </Text>
            </View>
          )}

          {cheque.notes && (
            <View style={styles.notesContainer}>
              <Text style={[styles.detailLabel, { color: colors.icon }]}>
                Notes
              </Text>
              <Text
                style={[
                  styles.notesValue,
                  { color: colors.text, backgroundColor: chequeColors.cardSecondary },
                ]}
              >
                {cheque.notes}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={[styles.footer, { borderTopColor: chequeColors.border }]}>
        <Button
          title="Edit"
          variant="secondary"
          onPress={handleEdit}
          style={styles.footerButton}
        />
        {cheque.status !== 'settled' && (
          <Button
            title="Mark Settled"
            onPress={handleMarkAsSettled}
            style={styles.footerButton}
          />
        )}
        <Button
          title="Delete"
          variant="danger"
          onPress={handleDelete}
          style={styles.footerButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 16,
  },
  header: {
    borderLeftWidth: 6,
    padding: 24,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeIconContainer: {
    marginRight: 16,
  },
  headerText: {
    flex: 1,
  },
  typeLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  amount: {
    fontSize: 32,
    fontWeight: '700',
  },
  detailsContainer: {
    padding: 24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'right',
    flex: 1,
    marginLeft: 16,
  },
  notesContainer: {
    marginTop: 16,
  },
  notesValue: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
    padding: 12,
    borderRadius: 8,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    borderTopWidth: 1,
  },
  footerButton: {
    flex: 1,
  },
});
