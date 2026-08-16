import React from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { colors, radius, spacing, typography } from '../theme/theme';

interface AppButtonProps {
  label: string;
  onPress?: () => void;
  variant?: 'solid' | 'outline';
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Botão único usado tanto para o "LOG FOOD" (variant solid, largo)
 * quanto para o "Add Meal" (variant outline, com ícone).
 */
export const AppButton: React.FC<AppButtonProps> = ({
  label,
  onPress,
  variant = 'solid',
  icon,
  style,
}) => {
  const isSolid = variant === 'solid';

  return (
    <TouchableOpacity
      style={[styles.base, isSolid ? styles.solid : styles.outline, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        {icon}
        <Text style={[styles.label, isSolid ? styles.labelSolid : styles.labelOutline]}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  solid: {
    backgroundColor: colors.primaryGreen,
  },
  outline: {
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.border,
  },
  content: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
  },
  label: {
    ...typography.buttonLabel,
  },
  labelSolid: {
    color: colors.white,
  },
  labelOutline: {
    color: colors.textPrimary,
  },
});
