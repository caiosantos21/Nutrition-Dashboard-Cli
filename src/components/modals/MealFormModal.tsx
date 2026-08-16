import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppModal } from './AppModal';
import { FormField } from './FormField';
import { ToggleRow } from './ToggleRow';
import { AppButton } from '../AppButton';
import { SectionTitle } from '../SectionTitle';
import { useAppData } from '../../context/AppDataContext';
import { Meal } from '../../types/nutrition';
import { colors, radius, spacing, typography } from '../../theme/theme';

interface MealFormModalProps {
  visible: boolean;
  /** Quando presente, o modal edita essa refeição em vez de criar uma nova. */
  meal?: Meal | null;
  onClose: () => void;
}

/**
 * Um único modal cobre tanto "Add Meal" quanto "editar refeição existente":
 * o usuário escolhe alimentos já cadastrados em Foods (em vez de digitar
 * texto livre), o total de kcal é calculado automaticamente, e a refeição
 * não pode ultrapassar o quanto ainda resta da meta diária de calorias.
 */
export const MealFormModal: React.FC<MealFormModalProps> = ({ visible, meal, onClose }) => {
  const { foods, meals, settings, addMeal, updateMeal } = useAppData();
  const isEditMode = !!meal;

  const [title, setTitle] = useState('');
  const [selectedFoodIds, setSelectedFoodIds] = useState<Set<string>>(new Set());

  // Sempre que o modal abre (para um alimento novo ou para editar outra
  // refeição), reinicializa o formulário com os dados corretos.
  useEffect(() => {
    if (!visible) return;
    setTitle(meal?.title ?? '');
    setSelectedFoodIds(new Set(meal?.foods.map((f) => f.foodId) ?? []));
  }, [visible, meal]);

  const toggleFood = (foodId: string) => {
    setSelectedFoodIds((prev) => {
      const next = new Set(prev);
      if (next.has(foodId)) {
        next.delete(foodId);
      } else {
        next.add(foodId);
      }
      return next;
    });
  };

  const selectedFoods = useMemo(
    () => foods.filter((food) => selectedFoodIds.has(food.id)),
    [foods, selectedFoodIds],
  );

  const totalKcal = selectedFoods.reduce((sum, food) => sum + food.kcalPerServing, 0);

  // Quanto resta da meta diária, sem contar a própria refeição sendo editada
  // (senão ela seria descontada duas vezes).
  const otherMealsKcal = meals
    .filter((m) => !isEditMode || m.id !== meal!.id)
    .reduce((sum, m) => sum + m.kcal, 0);
  const remainingBudget = settings.dailyCalorieGoal - otherMealsKcal;
  const isOverBudget = totalKcal > remainingBudget;

  const isValid = title.trim().length > 0 && selectedFoods.length > 0 && !isOverBudget;

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = () => {
    if (!isValid) return;

    const foodEntries = selectedFoods.map((food) => ({
      foodId: food.id,
      name: food.name,
      kcal: food.kcalPerServing,
    }));

    if (isEditMode) {
      updateMeal(meal!.id, { title: title.trim(), foods: foodEntries });
    } else {
      addMeal({ title: title.trim(), foods: foodEntries });
    }
    onClose();
  };

  return (
    <AppModal visible={visible} title={isEditMode ? 'Edit Meal' : 'Add Meal'} onClose={handleClose}>
      <FormField
        label="Meal name"
        placeholder="e.g. Grilled Chicken Salad"
        value={title}
        onChangeText={setTitle}
      />

      <SectionTitle>FOODS</SectionTitle>

      {foods.length === 0 ? (
        <Text style={styles.emptyText}>
          No foods saved yet. Add foods in the Foods tab first.
        </Text>
      ) : (
        <ScrollView style={styles.foodsList} nestedScrollEnabled showsVerticalScrollIndicator={false}>
          {foods.map((food) => (
            <ToggleRow
              key={food.id}
              label={food.name}
              subLabel={food.servingSize}
              rightText={`${food.kcalPerServing} kcal`}
              selected={selectedFoodIds.has(food.id)}
              onPress={() => toggleFood(food.id)}
            />
          ))}
        </ScrollView>
      )}

      <View style={styles.totalsRow}>
        <Text style={styles.totalsLabel}>Total</Text>
        <Text style={[styles.totalsValue, isOverBudget && styles.totalsValueError]}>
          {totalKcal} kcal
        </Text>
      </View>

      {isOverBudget ? (
        <Text style={styles.errorText}>
          This meal goes {totalKcal - remainingBudget} kcal over your remaining daily budget
          ({remainingBudget} kcal left).
        </Text>
      ) : (
        <Text style={styles.helperText}>{remainingBudget} kcal left in your daily goal.</Text>
      )}

      <AppButton
        label={isEditMode ? 'Save Changes' : 'Add Meal'}
        variant="solid"
        onPress={handleSubmit}
        style={[styles.submitButton, !isValid && styles.disabled]}
      />
    </AppModal>
  );
};

const styles = StyleSheet.create({
  foodsList: {
    maxHeight: 240,
  },
  emptyText: {
    ...typography.mealSubItem,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  totalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: spacing.sm,
    paddingTop: spacing.md,
  },
  totalsLabel: {
    ...typography.mealTitle,
    color: colors.textPrimary,
  },
  totalsValue: {
    ...typography.mealTitle,
    color: colors.textPrimary,
  },
  totalsValueError: {
    color: colors.error,
  },
  helperText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  errorText: {
    fontSize: 12,
    color: colors.error,
    backgroundColor: colors.errorBackground,
    borderRadius: radius.sm,
    padding: spacing.sm,
    marginTop: spacing.xs,
  },
  submitButton: {
    marginTop: spacing.lg,
  },
  disabled: {
    opacity: 0.5,
  },
});
