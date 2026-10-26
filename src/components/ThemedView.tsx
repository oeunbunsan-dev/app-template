import React from 'react';
import { View as RNView, ViewProps as RNViewProps, ViewStyle, StyleProp } from 'react-native';
import { useAppSettings } from '../context/AppSettingsContext';

export interface ThemedViewProps extends RNViewProps {
  variant?: 'background' | 'surface' | 'card';
  style?: StyleProp<ViewStyle>;
}

export const ThemedView: React.FC<ThemedViewProps> = ({
  children,
  variant = 'background',
  style,
  ...props
}) => {
  const { theme } = useAppSettings();

  let backgroundColor = theme.colors.background;
  if (variant === 'surface') backgroundColor = theme.colors.surface;
  if (variant === 'card') backgroundColor = theme.colors.card;

  return (
    <RNView style={[{ backgroundColor }, style]} {...props}>
      {children}
    </RNView>
  );
};
