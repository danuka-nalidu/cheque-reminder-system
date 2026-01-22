import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, ChequeColors } from '@/constants/theme';
import { mockCheques } from '@/data/mockCheques';
import { FilterType } from '@/types/cheque.types';
import { ChequeCard } from '@/components/cheque/cheque-card';
import { FilterChips } from '@/components/cheque/filter-chips';
import { EmptyState } from '@/components/empty-state';
import { FAB } from '@/components/ui/fab';

export default function ChequesScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const chequeColors = ChequeColors[colorScheme ?? 'light'];

  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCheques = useMemo(() => {
    let result = mockCheques;

    // Apply filter
    switch (activeFilter) {
      case 'incoming':
        result = result.filter((c) => c.type === 'incoming');
        break;
      case 'outgoing':
        result = result.filter((c) => c.type === 'outgoing');
        break;
      case 'pending':
        result = result.filter((c) => c.status === 'pending');
        break;
      case 'overdue':
        result = result.filter((c) => c.status === 'overdue');
        break;
      case 'settled':
        result = result.filter((c) => c.status === 'settled');
        break;
      default:
        break;
    }

    // Apply search (visual only for now)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.bankName.toLowerCase().includes(query) ||
          c.payeePayer?.toLowerCase().includes(query) ||
          c.chequeNumber?.toLowerCase().includes(query)
      );
    }

    // Sort by settlement date (upcoming first)
    return result.sort(
      (a, b) => a.settlementDate.getTime() - b.settlementDate.getTime()
    );
  }, [activeFilter, searchQuery]);

  const handleAddCheque = () => {
    router.push('/cheque/add');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Cheques</Text>
        <View
          style={[
            styles.searchContainer,
            {
              backgroundColor: chequeColors.card,
              borderColor: chequeColors.border,
            },
          ]}
        >
          <Ionicons name="search" size={20} color={colors.icon} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search cheques..."
            placeholderTextColor={colorScheme === 'dark' ? '#6b7280' : '#9ca3af'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <FilterChips
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {filteredCheques.length > 0 ? (
        <FlatList
          data={filteredCheques}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ChequeCard
              cheque={item}
              onPress={() => router.push(`/cheque/${item.id}`)}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <EmptyState
          icon="document-text-outline"
          title="No cheques found"
          message={
            activeFilter === 'all'
              ? 'Start by adding your first cheque'
              : `No ${activeFilter} cheques to display`
          }
          actionLabel={activeFilter === 'all' ? 'Add Cheque' : undefined}
          onAction={activeFilter === 'all' ? handleAddCheque : undefined}
        />
      )}

      <FAB icon="add" onPress={handleAddCheque} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  listContent: {
    padding: 16,
  },
});
