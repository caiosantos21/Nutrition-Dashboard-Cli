import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MacroNutrient } from '../types/nutrition';
import { colors, spacing, typography } from '../theme/theme';
import { ProgressTrack } from './ProgressTrack';

interface MacroBarProps {
  macro: MacroNutrient;
  /** Exibe a barra de progresso visual; se falso, mostra só o texto (ex: Protein no mock). */
  showBar?: boolean;
}

/**
 * Uma única linha reutilizável para qualquer macronutriente.
 * Elimina a repetição de JSX para Protein / Carbs / Fat.
 */
export const MacroBar: React.FC<MacroBarProps> = ({ macro, showBar = true }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>{macro.label}</Text>
        <Text style={styles.value}>
          {macro.current}
          {macro.unit} / {macro.goal}
          {macro.unit}
        </Text>
      </View>
      {showBar && <ProgressTrack progress={macro.current / macro.goal} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    ...typography.macroLabel,
    color: colors.textPrimary,
  },
  value: {
    ...typography.macroValue,
    color: colors.textSecondary,
  },
});
