import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, ChequeColors } from '@/constants/theme';
import { mockCheques } from '@/data/mockCheques';
import { StatCard } from '@/components/cheque/stat-card';
import { ChequeCard } from '@/components/cheque/cheque-card';
import { formatCurrency } from '@/utils/currency.utils';
import { isUpcoming } from '@/utils/date.utils';

export default function DashboardScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const chequeColors = ChequeColors[colorScheme ?? 'light'];

  // Calculate statistics
  const pendingCheques = mockCheques.filter((c) => c.status === 'pending');
  const overdueCheques = mockCheques.filter((c) => c.status === 'overdue');

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const settledThisMonth = mockCheques.filter(
    (c) =>
      c.status === 'settled' &&
      c.dateCreated.getMonth() === currentMonth &&
      c.dateCreated.getFullYear() === currentYear
  );

  const totalPendingAmount = pendingCheques.reduce(
    (sum, c) => sum + c.amount,
    0
  );
  const totalOverdueAmount = overdueCheques.reduce(
    (sum, c) => sum + c.amount,
    0
  );
  const totalSettledAmount = settledThisMonth.reduce(
    (sum, c) => sum + c.amount,
    0
  );

  // Get upcoming cheques (next 7 days)
  const upcomingCheques = mockCheques
    .filter((c) => c.status !== 'settled' && isUpcoming(c.settlementDate))
    .sort((a, b) => a.settlementDate.getTime() - b.settlementDate.getTime())
    .slice(0, 4);

  // Calculate total incoming vs outgoing
  const totalIncoming = mockCheques
    .filter((c) => c.type === 'incoming' && c.status !== 'settled')
    .reduce((sum, c) => sum + c.amount, 0);
  const totalOutgoing = mockCheques
    .filter((c) => c.type === 'outgoing' && c.status !== 'settled')
    .reduce((sum, c) => sum + c.amount, 0);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Dashboard</Text>
        <Text style={[styles.subtitle, { color: colors.icon }]}>
          Track your cheques at a glance
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.statsContainer}
      >
        <StatCard
          title="Pending"
          count={pendingCheques.length}
          amount={totalPendingAmount}
          icon="time-outline"
          color={chequeColors.pending}
        />
        <StatCard
          title="Overdue"
          count={overdueCheques.length}
          amount={totalOverdueAmount}
          icon="alert-circle-outline"
          color={chequeColors.overdue}
        />
        <StatCard
          title="Settled This Month"
          count={settledThisMonth.length}
          amount={totalSettledAmount}
          icon="checkmark-circle-outline"
          color={chequeColors.settled}
        />
      </ScrollView>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Upcoming Cheques
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/cheques')}
            style={styles.viewAllButton}
          >
            <Text style={[styles.viewAllText, { color: colors.tint }]}>
              View All
            </Text>
            <Ionicons name="chevron-forward" size={16} color={colors.tint} />
          </TouchableOpacity>
        </View>

        {upcomingCheques.length > 0 ? (
          <View style={styles.upcomingList}>
            {upcomingCheques.map((cheque) => (
              <ChequeCard
                key={cheque.id}
                cheque={cheque}
                onPress={() => router.push(`/cheque/${cheque.id}`)}
              />
            ))}
          </View>
        ) : (
          <View
            style={[
              styles.emptyCard,
              { backgroundColor: chequeColors.card },
            ]}
          >
            <Ionicons
              name="calendar-outline"
              size={32}
              color={colors.icon}
            />
            <Text style={[styles.emptyText, { color: colors.icon }]}>
              No upcoming cheques in the next 7 days
            </Text>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Quick Stats
        </Text>
        <View
          style={[
            styles.quickStatsCard,
            { backgroundColor: chequeColors.card },
          ]}
        >
          <View style={styles.quickStatRow}>
            <View style={styles.quickStatItem}>
              <View style={styles.quickStatHeader}>
                <Ionicons
                  name="arrow-down"
                  size={20}
                  color={chequeColors.incoming}
                />
                <Text style={[styles.quickStatLabel, { color: colors.icon }]}>
                  Total Incoming
                </Text>
              </View>
              <Text
                style={[
                  styles.quickStatAmount,
                  { color: chequeColors.incoming },
                ]}
              >
                {formatCurrency(totalIncoming)}
              </Text>
            </View>

            <View style={styles.quickStatDivider} />

            <View style={styles.quickStatItem}>
              <View style={styles.quickStatHeader}>
                <Ionicons
                  name="arrow-up"
                  size={20}
                  color={chequeColors.outgoing}
                />
                <Text style={[styles.quickStatLabel, { color: colors.icon }]}>
                  Total Outgoing
                </Text>
              </View>
              <Text
                style={[
                  styles.quickStatAmount,
                  { color: chequeColors.outgoing },
                ]}
              >
                {formatCurrency(totalOutgoing)}
              </Text>
            </View>
          </View>

          <View style={[styles.netRow, { borderTopColor: chequeColors.border }]}>
            <Text style={[styles.netLabel, { color: colors.icon }]}>
              Net Position
            </Text>
            <Text
              style={[
                styles.netAmount,
                {
                  color:
                    totalIncoming - totalOutgoing >= 0
                      ? chequeColors.incoming
                      : chequeColors.outgoing,
                },
              ]}
            >
              {formatCurrency(totalIncoming - totalOutgoing)}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
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
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  statsContainer: {
    paddingHorizontal: 16,
    gap: 12,
    paddingBottom: 8,
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  upcomingList: {
    gap: 0,
  },
  emptyCard: {
    padding: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 14,
    marginTop: 12,
    textAlign: 'center',
  },
  quickStatsCard: {
    borderRadius: 12,
    padding: 20,
    marginTop: 12,
  },
  quickStatRow: {
    flexDirection: 'row',
    gap: 20,
  },
  quickStatItem: {
    flex: 1,
  },
  quickStatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  quickStatLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
  quickStatAmount: {
    fontSize: 22,
    fontWeight: '700',
  },
  quickStatDivider: {
    width: 1,
    backgroundColor: '#e5e7eb',
  },
  netRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
  },
  netLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  netAmount: {
    fontSize: 24,
    fontWeight: '700',
  },
});
