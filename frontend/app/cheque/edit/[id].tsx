import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { ChequeFormData } from '@/types/cheque.types';
import { mockCheques } from '@/data/mockCheques';
import { ChequeForm } from '@/components/cheque/cheque-form';

export default function EditChequeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const cheque = mockCheques.find((c) => c.id === id);

  if (!cheque) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Stack.Screen
          options={{
            title: 'Edit Cheque',
            presentation: 'modal',
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

  const initialData: ChequeFormData = {
    type: cheque.type,
    amount: cheque.amount.toString(),
    bankName: cheque.bankName,
    settlementDate: cheque.settlementDate,
    chequeNumber: cheque.chequeNumber,
    payeePayer: cheque.payeePayer,
    notes: cheque.notes,
  };

  const handleSubmit = (data: ChequeFormData) => {
    Alert.alert(
      'Success',
      'Cheque updated successfully',
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Edit Cheque',
          presentation: 'modal',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }}
      />
      <ChequeForm
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel="Update Cheque"
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
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
});
