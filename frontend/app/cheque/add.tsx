import React from 'react';
import { Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { ChequeFormData } from '@/types/cheque.types';
import { ChequeForm } from '@/components/cheque/cheque-form';

export default function AddChequeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleSubmit = (data: ChequeFormData) => {
    Alert.alert(
      'Success',
      'Cheque added successfully',
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
          title: 'Add Cheque',
          presentation: 'modal',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }}
      />
      <ChequeForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel="Add Cheque"
      />
    </>
  );
}
