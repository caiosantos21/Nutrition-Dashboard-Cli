import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, radius } from '../theme/theme';

interface ProgressTrackProps {
  /** valor entre 0 e 1 */
  progress: number;
}

/**
 * Trilha + preenchimento de progresso linear.
 * Peça de UI mínima e sem estado, reaproveitada por qualquer
 * componente que precise mostrar uma barra (macros, header, etc.).
 */
export const ProgressTrack: React.FC<ProgressTrackProps> = ({ progress }) => {
  const clamped = Math.max(0, Math.min(1, progress));

  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${clamped * 100}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    height: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.progressTrack,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: radius.pill,
    backgroundColor: colors.primaryGreen,
  },
});
