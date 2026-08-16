import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme/theme';

interface FormFieldProps extends TextInputProps {
  label: string;
}

/**
 * Label + TextInput padronizados. Reaproveitado em AddMealModal,
 * AddFoodModal e EditGoalModal para não repetir estilo de input.
 */
export const FormField: React.FC<FormFieldProps> = ({ label, style, ...inputProps }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor={colors.textMuted}
        {...inputProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.macroLabel,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 15,
    color: colors.textPrimary,
    backgroundColor: colors.screenBackground,
  },
});
