import React, { useState } from 'react';
import { MealCard } from '../components/MealCard';
import { AppButton } from '../components/AppButton';
import { PlusIcon } from '../components/PlusIcon';
import { ScreenContainer } from '../components/ScreenContainer';
import { SectionTitle } from '../components/SectionTitle';
import { MealFormModal } from '../components/modals/MealFormModal';
import { useAppData } from '../context/AppDataContext';
import { Meal } from '../types/nutrition';

// 'new' = modal aberto para criar; um Meal = modal aberto para editar aquele item; null = fechado.
type MealModalTarget = 'new' | Meal | null;

export const TodayScreen: React.FC = () => {
  const { meals, removeMeal } = useAppData();
  const [modalTarget, setModalTarget] = useState<MealModalTarget>(null);

  return (
    <ScreenContainer footer={<AppButton label="LOG FOOD" variant="solid" />}>
      <SectionTitle>MEALS</SectionTitle>

      {meals.map((meal) => (
        <MealCard
          key={meal.id}
          meal={meal}
          onPress={setModalTarget}
          onDelete={removeMeal}
        />
      ))}

      <AppButton
        label="Add Meal"
        variant="outline"
        icon={<PlusIcon />}
        onPress={() => setModalTarget('new')}
      />

      <MealFormModal
        visible={modalTarget !== null}
        meal={modalTarget === 'new' ? null : modalTarget}
        onClose={() => setModalTarget(null)}
      />
    </ScreenContainer>
  );
};
