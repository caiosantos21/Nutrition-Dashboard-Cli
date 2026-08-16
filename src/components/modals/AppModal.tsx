import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme/theme';

interface AppModalProps {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

/**
 * Casca de modal usada por todos os modais do app (Add Meal, Add Food,
 * editar meta, unidades, sobre o app). Evita repetir Modal + backdrop +
 * cabeçalho + botão de fechar em cada um.
 */
export const AppModal: React.FC<AppModalProps> = ({ visible, title, onClose, children }) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onClose} hitSlop={10}>
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
          </View>
          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: radius.lg,
    padding: spacing.xl,
    maxHeight: '85%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.mealTitle,
    fontSize: 17,
    color: colors.textPrimary,
  },
  closeIcon: {
    fontSize: 18,
    color: colors.textMuted,
  },
});
