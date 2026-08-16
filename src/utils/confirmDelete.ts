import { Alert } from 'react-native';

/**
 * Gera um handler de exclusão com confirmação nativa (Alert),
 * reaproveitado por qualquer lista que precise de "excluir item"
 * (refeições, alimentos, etc.) sem duplicar o texto do alerta.
 */
export const confirmDelete = (itemLabel: string, onConfirm: () => void): void => {
  Alert.alert(
    `Delete "${itemLabel}"?`,
    'This action cannot be undone.',
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: onConfirm },
    ],
    { cancelable: true },
  );
};
