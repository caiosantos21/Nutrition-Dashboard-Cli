import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme/theme';

interface ToggleRowProps {
  label: string;
  subLabel?: string;
  rightText?: string;
  selected: boolean;
  onPress: () => void;
}

/**
 * Linha com estado selecionado/não selecionado (borda verde + checkmark).
 * Extraída para ser reaproveitada pelo SelectModal (Units) e pelo seletor
 * de alimentos do modal de refeição, evitando duplicar o mesmo estilo.
 */
export const ToggleRow: React.FC<ToggleRowProps> = ({
  label,
  subLabel,
  rightText,
  selected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.option, selected && styles.optionSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.textColumn}>
        <Text style={[styles.optionLabel, selected && styles.optionLabelSelected]}>{label}</Text>
        {subLabel && <Text style={styles.subLabel}>{subLabel}</Text>}
      </View>
      <View style={styles.rightColumn}>
        {rightText && <Text style={styles.rightText}>{rightText}</Text>}
        {selected && <Text style={styles.checkmark}>✓</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  optionSelected: {
    borderColor: colors.primaryGreen,
    backgroundColor: colors.headerBackground,
  },
  textColumn: {
    flexShrink: 1,
  },
  optionLabel: {
    ...typography.mealTitle,
    color: colors.textPrimary,
  },
  optionLabelSelected: {
    color: colors.primaryGreenDark,
  },
  subLabel: {
    ...typography.mealSubItem,
    color: colors.textSecondary,
    marginTop: 2,
  },
  rightColumn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightText: {
    ...typography.mealSubItem,
    color: colors.textSecondary,
    marginRight: spacing.sm,
  },
  checkmark: {
    color: colors.primaryGreen,
    fontWeight: '700',
  },
});
