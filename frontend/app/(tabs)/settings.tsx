import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  Platform,
} from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, ChequeColors } from '@/constants/theme';
import { Button } from '@/components/ui/button';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const chequeColors = ChequeColors[colorScheme ?? 'light'];

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
        <Text style={[styles.subtitle, { color: colors.icon }]}>
          Manage your app preferences
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Notifications
        </Text>
        <View
          style={[
            styles.settingCard,
            { backgroundColor: chequeColors.card },
          ]}
        >
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                Enable Notifications
              </Text>
              <Text style={[styles.settingDescription, { color: colors.icon }]}>
                Receive reminders for upcoming cheques
              </Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{
                false: colorScheme === 'dark' ? '#374151' : '#d1d5db',
                true: colors.tint,
              }}
              thumbColor="#ffffff"
            />
          </View>

          <View style={[styles.divider, { backgroundColor: chequeColors.border }]} />

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                Morning Reminder
              </Text>
              <Text style={[styles.settingDescription, { color: colors.icon }]}>
                9:00 AM
              </Text>
            </View>
            <Text style={[styles.settingValue, { color: colors.icon }]}>
              Visual Only
            </Text>
          </View>

          <View style={[styles.divider, { backgroundColor: chequeColors.border }]} />

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                Evening Reminder
              </Text>
              <Text style={[styles.settingDescription, { color: colors.icon }]}>
                6:00 PM
              </Text>
            </View>
            <Text style={[styles.settingValue, { color: colors.icon }]}>
              Visual Only
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Data Management
        </Text>
        <View
          style={[
            styles.settingCard,
            { backgroundColor: chequeColors.card },
          ]}
        >
          <Button
            title="Export Data"
            variant="outline"
            disabled
            style={styles.dataButton}
          />
          <Button
            title="Import Data"
            variant="outline"
            disabled
            style={styles.dataButton}
          />
        </View>
        <Text style={[styles.helperText, { color: colors.icon }]}>
          Data management features are coming soon
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          About
        </Text>
        <View
          style={[
            styles.settingCard,
            { backgroundColor: chequeColors.card },
          ]}
        >
          <View style={styles.aboutRow}>
            <Text style={[styles.aboutLabel, { color: colors.icon }]}>
              App Name
            </Text>
            <Text style={[styles.aboutValue, { color: colors.text }]}>
              Cheque Reminder
            </Text>
          </View>

          <View style={[styles.divider, { backgroundColor: chequeColors.border }]} />

          <View style={styles.aboutRow}>
            <Text style={[styles.aboutLabel, { color: colors.icon }]}>
              Version
            </Text>
            <Text style={[styles.aboutValue, { color: colors.text }]}>
              1.0.0 (Mockup)
            </Text>
          </View>

          <View style={[styles.divider, { backgroundColor: chequeColors.border }]} />

          <View style={styles.aboutRow}>
            <Text style={[styles.aboutLabel, { color: colors.icon }]}>
              Built with
            </Text>
            <Text style={[styles.aboutValue, { color: colors.text }]}>
              React Native & Expo
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.icon }]}>
          This is a UI mockup. No data is saved or synced.
        </Text>
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
  section: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  settingCard: {
    borderRadius: 12,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
  },
  settingValue: {
    fontSize: 13,
    fontStyle: 'italic',
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  dataButton: {
    marginBottom: 8,
  },
  helperText: {
    fontSize: 12,
    marginTop: 8,
    fontStyle: 'italic',
  },
  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  aboutLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  aboutValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
