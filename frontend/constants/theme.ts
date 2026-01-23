/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform, ViewStyle } from 'react-native';

// Updated modern color palette
const tintColorLight = '#2563eb';
const tintColorDark = '#60a5fa';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#f8fafc',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    surface: '#ffffff',
    surfaceSecondary: '#f1f5f9',
  },
  dark: {
    text: '#ECEDEE',
    background: '#0f172a',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    surface: '#1e293b',
    surfaceSecondary: '#0f172a',
  },
};

export const ChequeColors = {
  light: {
    incoming: '#10b981',  // Green
    outgoing: '#ef4444',  // Red
    overdue: '#f59e0b',   // Yellow/Amber
    settled: '#6b7280',   // Gray
    pending: '#10b981',   // Green (for pending status)
    border: '#e5e7eb',    // Light gray border
    card: '#ffffff',      // Card background
    cardSecondary: '#f9fafb', // Secondary card background
  },
  dark: {
    incoming: '#34d399',  // Light green
    outgoing: '#f87171',  // Light red
    overdue: '#fbbf24',   // Light yellow/amber
    settled: '#9ca3af',   // Light gray
    pending: '#34d399',   // Light green (for pending status)
    border: '#374151',    // Dark gray border
    card: '#1f2937',      // Card background
    cardSecondary: '#111827', // Secondary card background
  },
};

// Calendar-specific colors for date markers
export const CalendarColors = {
  light: {
    overdue: '#f59e0b',    // Red dot for overdue cheques
    pending: '#10b981',    // Green dot for pending cheques
    settled: '#6b7280',    // Gray dot for settled cheques
    selectedDay: '#2563eb',
    todayText: '#2563eb',
  },
  dark: {
    overdue: '#fbbf24',    // Light amber for overdue
    pending: '#34d399',    // Light green for pending
    settled: '#9ca3af',    // Light gray for settled
    selectedDay: '#60a5fa',
    todayText: '#60a5fa',
  },
};

// Gradient definitions for modern UI
export const Gradients = {
  light: {
    primary: ['#2563eb', '#3b82f6'] as const,
    success: ['#10b981', '#059669'] as const,
    warning: ['#f59e0b', '#d97706'] as const,
    danger: ['#ef4444', '#dc2626'] as const,
    card: ['#ffffff', '#f8fafc'] as const,
  },
  dark: {
    primary: ['#3b82f6', '#60a5fa'] as const,
    success: ['#059669', '#10b981'] as const,
    warning: ['#d97706', '#f59e0b'] as const,
    danger: ['#dc2626', '#ef4444'] as const,
    card: ['#1e293b', '#0f172a'] as const,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

// Shadow utilities for consistent elevation across the app
export const Shadows = {
  light: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    } as ViewStyle,
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    } as ViewStyle,
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 12,
      elevation: 5,
    } as ViewStyle,
  },
  dark: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 2,
    } as ViewStyle,
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
    } as ViewStyle,
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 12,
      elevation: 6,
    } as ViewStyle,
  },
};

// Border radius constants for consistent styling
export const BorderRadius = {
  small: 6,
  medium: 12,
  large: 16,
  xlarge: 24,
};
