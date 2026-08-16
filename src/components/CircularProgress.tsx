import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors, typography } from '../theme/theme';

interface CircularProgressProps {
  size?: number;
  strokeWidth?: number;
  progress: number; // 0 a 1
  value: string;
  valueLabel: string;
  topLabel: string;
}

/**
 * Anel de progresso genérico baseado em SVG.
 * Não conhece regras de negócio de nutrição, apenas desenha
 * um percentual — pode ser reaproveitado em qualquer outra métrica circular.
 */
export const CircularProgress: React.FC<CircularProgressProps> = ({
  size = 140,
  strokeWidth = 10,
  progress,
  value,
  valueLabel,
  topLabel,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedProgress = Math.max(0, Math.min(1, progress));
  const strokeDashoffset = circumference * (1 - clampedProgress);
  const center = size / 2;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.topLabel}>{topLabel}</Text>
      <View style={{ width: size, height: size }}>
        <Svg width={size} height={size}>
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke={colors.progressTrack}
            strokeWidth={strokeWidth}
            fill="none"
          />
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke={colors.primaryGreen}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            rotation="-90"
            origin={`${center}, ${center}`}
          />
        </Svg>
        <View style={[StyleSheet.absoluteFill, styles.centerContent]}>
          <Text style={styles.value}>{value}</Text>
          <Text style={styles.valueLabel}>{valueLabel}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  topLabel: {
    ...typography.goalLabel,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    ...typography.kcalValue,
    color: colors.textPrimary,
  },
  valueLabel: {
    ...typography.kcalLabel,
    color: colors.textSecondary,
  },
});
