import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { AppModal } from './AppModal';
import { FormField } from './FormField';
import { AppButton } from '../AppButton';
import { spacing } from '../../theme/theme';

interface AddFoodModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (food: { name: string; servingSize: string; kcalPerServing: number }) => void;
}

export const AddFoodModal: React.FC<AddFoodModalProps> = ({ visible, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [servingSize, setServingSize] = useState('');
  const [kcal, setKcal] = useState('');

  const resetForm = () => {
    setName('');
    setServingSize('');
    setKcal('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const isValid = name.trim().length > 0 && servingSize.trim().length > 0 && Number(kcal) > 0;

  const handleSubmit = () => {
    if (!isValid) return;

    onSubmit({
      name: name.trim(),
      servingSize: servingSize.trim(),
      kcalPerServing: Number(kcal),
    });
    resetForm();
    onClose();
  };

  return (
    <AppModal visible={visible} title="Add Food" onClose={handleClose}>
      <FormField
        label="Food name"
        placeholder="e.g. Greek Yogurt"
        value={name}
        onChangeText={setName}
      />
      <FormField
        label="Serving size"
        placeholder="e.g. 1 cup"
        value={servingSize}
        onChangeText={setServingSize}
      />
      <FormField
        label="Calories per serving (kcal)"
        placeholder="e.g. 150"
        keyboardType="numeric"
        value={kcal}
        onChangeText={setKcal}
      />
      <AppButton
        label="Add Food"
        variant="solid"
        onPress={handleSubmit}
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
