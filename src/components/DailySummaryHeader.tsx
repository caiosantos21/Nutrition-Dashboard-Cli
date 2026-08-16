import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DailySummary } from '../types/nutrition';
import { CircularProgress } from './CircularProgress';
import { MacroBar } from './MacroBar';
import { ProgressTrack } from './ProgressTrack';
import { colors, spacing, typography } from '../theme/theme';
import { formatHeaderDate } from '../utils/date';

interface DailySummaryHeaderProps {
  summary: DailySummary;
}

export const DailySummaryHeader: React.FC<DailySummaryHeaderProps> = ({ summary }) => {
  const kcalLeft = summary.kcalGoal - summary.kcalConsumed;
  const progress = summary.kcalConsumed / summary.kcalGoal;
  const progressPercent = Math.round(progress * 100);
  // Data calculada em tempo real — o horário fica a cargo da barra de status do sistema.
  const currentDate = useMemo(() => formatHeaderDate(), []);

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{currentDate}</Text>

      <View style={styles.logoRow}>
        <Text style={styles.logo}>NutriTrack</Text>
        <Text style={styles.leaf}>🌿</Text>
      </View>

      <View style={styles.summaryRow}>
        <CircularProgress
          progress={progress}
          value={String(kcalLeft)}
          valueLabel="kcal left"
          topLabel={`${progressPercent}% of daily goal`}
        />

        <View style={styles.macrosColumn}>
          {/* Linhas de texto (sem barra), como no mock: Protein e Carbs */}
          <MacroBar macro={summary.protein} showBar={false} />
          <MacroBar macro={summary.carbs} showBar={false} />

          {/* Barras visuais de progresso: Carbs e Fat */}
          <Text style={styles.barOnlyLabel}>Carbs</Text>
          <ProgressTrack progress={summary.carbs.current / summary.carbs.goal} />

          <Text style={styles.barOnlyLabel}>Fat</Text>
          <ProgressTrack progress={summary.fat.current / summary.fat.goal} />

          <Text style={styles.fatFooterValue}>
            {summary.fat.current}
            {summary.fat.unit} / {summary.fat.goal}
            {summary.fat.unit}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.headerBackground,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  date: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logo: {
    ...typography.logo,
    color: colors.textPrimary,
  },
  leaf: {
    fontSize: 18,
    marginLeft: spacing.xs,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  macrosColumn: {
    flex: 1,
    marginLeft: spacing.xl,
  },
  barOnlyLabel: {
    ...typography.macroLabel,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  fatFooterValue: {
    ...typography.macroValue,
    color: colors.textSecondary,
    textAlign: 'right',
  },
});
