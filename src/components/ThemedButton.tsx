import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleProp,
  TouchableOpacityProps,
} from 'react-native';
import { ThemedText } from './ThemedText';
import { useAppSettings } from '../context/AppSettingsContext';

export interface ThemedButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  icon?: React.ReactNode;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const ThemedButton: React.FC<ThemedButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  icon,
  loading = false,
  disabled,
  style,
  textStyle,
  ...props
}) => {
  const { theme, scale } = useAppSettings();

  let backgroundColor = theme.colors.primary;
  let textColor = '#FFFFFF';
  let borderWidth = 0;
  let borderColor = 'transparent';

  switch (variant) {
    case 'secondary':
      backgroundColor = theme.colors.secondary;
      textColor = '#FFFFFF';
      break;
    case 'outline':
      backgroundColor = 'transparent';
      textColor = theme.colors.primary;
      borderWidth = 1.5;
      borderColor = theme.colors.primary;
      break;
    case 'danger':
      backgroundColor = theme.colors.danger;
      textColor = '#FFFFFF';
      break;
    case 'ghost':
      backgroundColor = 'transparent';
      textColor = theme.colors.text;
      break;
  }

  const paddingVertical = size === 'small' ? 8 : size === 'large' ? 16 : 12;
  const paddingHorizontal = size === 'small' ? 14 : size === 'large' ? 24 : 18;
  const textSize = size === 'small' ? 13 : size === 'large' ? 16 : 14;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          backgroundColor: disabled ? theme.colors.border : backgroundColor,
          borderColor: disabled ? theme.colors.border : borderColor,
          borderWidth,
          paddingVertical,
          paddingHorizontal,
        },
        style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : (
        <>
          {icon}
          <ThemedText
            bold
            style={[
              {
                color: disabled ? theme.colors.textMuted : textColor,
                fontSize: scale(textSize),
                marginLeft: icon ? 8 : 0,
              },
              textStyle,
            ]}
          >
            {title}
          </ThemedText>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
});
