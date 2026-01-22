import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, ChequeColors } from '@/constants/theme';
import { ChequeFormData, ChequeType } from '@/types/cheque.types';
import { Input } from '@/components/ui/input';
import { DatePickerDisplay } from '@/components/ui/date-picker-display';
import { Button } from '@/components/ui/button';

interface ChequeFormProps {
  initialData?: ChequeFormData;
  onSubmit: (data: ChequeFormData) => void;
  onCancel: () => void;
  submitLabel?: string;
}

export function ChequeForm({
  initialData,
  onSubmit,
  onCancel,
  submitLabel = 'Save Cheque',
}: ChequeFormProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const chequeColors = ChequeColors[colorScheme ?? 'light'];

  const [type, setType] = useState<ChequeType>(
    initialData?.type || 'incoming'
  );
  const [amount, setAmount] = useState(initialData?.amount || '');
  const [bankName, setBankName] = useState(initialData?.bankName || '');
  const [settlementDate, setSettlementDate] = useState(
    initialData?.settlementDate || new Date()
  );
  const [chequeNumber, setChequeNumber] = useState(
    initialData?.chequeNumber || ''
  );
  const [payeePayer, setPayeePayer] = useState(
    initialData?.payeePayer || ''
  );
  const [notes, setNotes] = useState(initialData?.notes || '');

  const [errors, setErrors] = useState<{
    amount?: string;
    bankName?: string;
  }>({});

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }

    if (!bankName.trim()) {
      newErrors.bankName = 'Please enter bank name';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit({
        type,
        amount,
        bankName: bankName.trim(),
        settlementDate,
        chequeNumber: chequeNumber.trim() || undefined,
        payeePayer: payeePayer.trim() || undefined,
        notes: notes.trim() || undefined,
      });
    }
  };

  const isFormValid = amount && bankName.trim();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.typeSelector}>
          <TouchableOpacity
            style={[
              styles.typeButton,
              {
                backgroundColor:
                  type === 'incoming' ? chequeColors.incoming : chequeColors.card,
                borderColor:
                  type === 'incoming' ? chequeColors.incoming : chequeColors.border,
              },
            ]}
            onPress={() => setType('incoming')}
          >
            <Text
              style={[
                styles.typeButtonText,
                {
                  color: type === 'incoming' ? '#ffffff' : colors.text,
                },
              ]}
            >
              Incoming
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.typeButton,
              {
                backgroundColor:
                  type === 'outgoing' ? chequeColors.outgoing : chequeColors.card,
                borderColor:
                  type === 'outgoing' ? chequeColors.outgoing : chequeColors.border,
              },
            ]}
            onPress={() => setType('outgoing')}
          >
            <Text
              style={[
                styles.typeButtonText,
                {
                  color: type === 'outgoing' ? '#ffffff' : colors.text,
                },
              ]}
            >
              Outgoing
            </Text>
          </TouchableOpacity>
        </View>

        <Input
          label="Amount (LKR)"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholder="0.00"
          error={errors.amount}
        />

        <Input
          label="Bank Name"
          value={bankName}
          onChangeText={setBankName}
          placeholder="e.g., Commercial Bank"
          error={errors.bankName}
        />

        <DatePickerDisplay
          label="Settlement Date"
          value={settlementDate}
          onChange={setSettlementDate}
        />

        <Input
          label="Cheque Number (Optional)"
          value={chequeNumber}
          onChangeText={setChequeNumber}
          placeholder="e.g., CHQ-001234"
        />

        <Input
          label={type === 'incoming' ? 'Payer (Optional)' : 'Payee (Optional)'}
          value={payeePayer}
          onChangeText={setPayeePayer}
          placeholder={
            type === 'incoming'
              ? 'Who is paying you?'
              : 'Who are you paying?'
          }
        />

        <Input
          label="Notes (Optional)"
          value={notes}
          onChangeText={setNotes}
          placeholder="Additional notes..."
          multiline
          numberOfLines={4}
          style={styles.notesInput}
        />
      </ScrollView>

      <View style={[styles.footer, { borderTopColor: chequeColors.border }]}>
        <Button
          title="Cancel"
          variant="secondary"
          onPress={onCancel}
          style={styles.footerButton}
        />
        <Button
          title={submitLabel}
          onPress={handleSubmit}
          disabled={!isFormValid}
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
  scrollContent: {
    padding: 16,
  },
  typeSelector: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
  },
  typeButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  notesInput: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 14,
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
