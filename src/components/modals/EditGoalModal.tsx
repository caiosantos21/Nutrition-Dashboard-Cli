import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { AppModal } from './AppModal';
import { FormField } from './FormField';
import { AppButton } from '../AppButton';
import { spacing } from '../../theme/theme';

interface EditGoalModalProps {
  visible: boolean;
  label: string;
  unit: string;
  currentValue: number;
  onClose: () => void;
  onSave: (value: number) => void;
}

/**
 * Modal único reaproveitado pelas 4 metas editáveis em Settings
 * (Daily Calorie Goal, Protein, Carbs, Fat) — muda apenas label/unit/valor.
 */
export const EditGoalModal: React.FC<EditGoalModalProps> = ({
  visible,
  label,
  unit,
  currentValue,
  onClose,
  onSave,
}) => {
  const [value, setValue] = useState(String(currentValue));

  useEffect(() => {
    if (visible) {
      setValue(String(currentValue));
    }
  }, [visible, currentValue]);

  const isValid = Number(value) > 0;

  const handleSave = () => {
    if (!isValid) return;
    onSave(Number(value));
    onClose();
  };

  return (
    <AppModal visible={visible} title={`Edit ${label}`} onClose={onClose}>
      <FormField
        label={`${label} (${unit})`}
        keyboardType="numeric"
        value={value}
        onChangeText={setValue}
        autoFocus
      />
      <AppButton
        label="Save"
        variant="solid"
        onPress={handleSave}
        style={[styles.submitButton, !isValid && styles.disabled]}
      />
    </AppModal>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    marginTop: spacing.sm,
  },
  disabled: {
    opacity: 0.5,
  },
});
