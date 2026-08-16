import React, { useState } from 'react';
import { InfoRow } from '../components/InfoRow';
import { AppButton } from '../components/AppButton';
import { PlusIcon } from '../components/PlusIcon';
import { ScreenContainer } from '../components/ScreenContainer';
import { SectionTitle } from '../components/SectionTitle';
import { AddFoodModal } from '../components/modals/AddFoodModal';
import { useAppData } from '../context/AppDataContext';

export const FoodsScreen: React.FC = () => {
  const { foods, addFood, removeFood } = useAppData();
  const [isAddFoodVisible, setAddFoodVisible] = useState(false);

  return (
    <ScreenContainer>
      <SectionTitle>SAVED FOODS</SectionTitle>

      {foods.map((food) => (
        <InfoRow
          key={food.id}
          title={food.name}
          subtitle={food.servingSize}
          rightText={`${food.kcalPerServing} kcal`}
          onDelete={() => removeFood(food.id)}
        />
      ))}

      <AppButton
        label="Add Food"
        variant="outline"
        icon={<PlusIcon />}
        onPress={() => setAddFoodVisible(true)}
      />

      <AddFoodModal
        visible={isAddFoodVisible}
        onClose={() => setAddFoodVisible(false)}
        onSubmit={addFood}
      />
    </ScreenContainer>
  );
};
