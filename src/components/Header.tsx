import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from './ThemedText';
import { useAppSettings } from '../context/AppSettingsContext';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showBack = false,
  rightAction,
}) => {
  const router = useRouter();
  const { theme } = useAppSettings();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.headerBackground,
          borderBottomColor: theme.colors.border,
        },
      ]}
    >
      <View style={styles.left}>
        {showBack && (
          <TouchableOpacity
            onPress={() => router.back()}
            style={[styles.backButton, { backgroundColor: theme.colors.surface }]}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="chevron-back" size={22} color={theme.colors.text} />
          </TouchableOpacity>
        )}
        <View style={styles.textContainer}>
          <ThemedText variant="title" bold numberOfLines={1}>
            {title}
          </ThemedText>
          {subtitle ? (
            <ThemedText variant="caption" colorType="secondary" numberOfLines={1}>
              {subtitle}
            </ThemedText>
          ) : null}
        </View>
      </View>
      {rightAction && <View style={styles.right}>{rightAction}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  right: {
    marginLeft: 12,
  },
});
