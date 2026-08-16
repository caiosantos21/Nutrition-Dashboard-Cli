import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppModal } from './AppModal';
import { colors, spacing, typography } from '../../theme/theme';

interface AboutModalProps {
  visible: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ visible, onClose }) => {
  return (
    <AppModal visible={visible} title="About NutriTrack" onClose={onClose}>
      <View style={styles.row}>
        <Text style={styles.label}>Version</Text>
        <Text style={styles.value}>1.0.0</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Developer</Text>
        <Text style={styles.value}>Caio Almeida Santos</Text>
      </View>
      <Text style={styles.description}>
        NutriTrack helps you keep track of your daily meals, calories and
        macronutrients in a simple and visual way. Log your meals, save your
        favorite foods and adjust your daily goals whenever you need.
      </Text>
    </AppModal>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  label: {
    ...typography.macroLabel,
    color: colors.textSecondary,
  },
  value: {
    ...typography.macroLabel,
    color: colors.textPrimary,
  },
  description: {
    fontSize: 13,
    lineHeight: 19,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
});
