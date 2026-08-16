import React from 'react';
import { AppModal } from './AppModal';
import { ToggleRow } from './ToggleRow';

interface SelectModalProps {
  visible: boolean;
  title: string;
  options: string[];
  selected: string;
  onClose: () => void;
  onSelect: (option: string) => void;
}

/**
 * Modal genérico de escolha única. Hoje é usado só para "Units",
 * mas serve para qualquer seletor futuro sem precisar de um modal novo.
 */
export const SelectModal: React.FC<SelectModalProps> = ({
  visible,
  title,
  options,
  selected,
  onClose,
  onSelect,
}) => {
  return (
    <AppModal visible={visible} title={title} onClose={onClose}>
      {options.map((option) => (
        <ToggleRow
          key={option}
          label={option}
          selected={option === selected}
          onPress={() => {
            onSelect(option);
            onClose();
          }}
        />
      ))}
    </AppModal>
  );
};
