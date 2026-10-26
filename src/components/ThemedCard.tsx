import React from 'react';
import { View, StyleSheet, ViewStyle, ViewProps, StyleProp } from 'react-native';
import { useAppSettings } from '../context/AppSettingsContext';

export interface ThemedCardProps extends ViewProps {
  bordered?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const ThemedCard: React.FC<ThemedCardProps> = ({
  children,
  bordered = true,
  style,
  ...props
}) => {
  const { theme } = useAppSettings();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.card,
          borderColor: bordered ? theme.colors.cardBorder : 'transparent',
          shadowColor: theme.isDark ? '#000000' : '#64748B',
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 2,
  },
});
