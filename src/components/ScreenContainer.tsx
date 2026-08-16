import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { colors, spacing } from '../theme/theme';

interface ScreenContainerProps {
  children: React.ReactNode;
  footer?: React.ReactNode;
}

/**
 * Casca padrão para o corpo de qualquer aba: fundo cinza claro,
 * padding consistente e um rodapé fixo opcional (usado só na aba Today).
 * Evita repetir StyleSheet de scroll/padding em cada tela.
 */
export const ScreenContainer: React.FC<ScreenContainerProps> = ({ children, footer }) => (
  <View style={styles.wrapper}>
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
    {footer && <View style={styles.footer}>{footer}</View>}
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.screenBackground,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.xl,
  },
  footer: {
    backgroundColor: colors.screenBackground,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    paddingTop: spacing.sm,
  },
});
