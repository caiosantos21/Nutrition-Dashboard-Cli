import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { colors, spacing, typography } from '../theme/theme';

interface SectionTitleProps {
  children: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => (
  <Text style={styles.title}>{children}</Text>
);

const styles = StyleSheet.create({
  title: {
    ...typography.sectionTitle,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
});
