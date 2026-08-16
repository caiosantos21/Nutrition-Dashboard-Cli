import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Meal } from '../types/nutrition';
import { colors, radius, spacing, typography } from '../theme/theme';
import { confirmDelete } from '../utils/confirmDelete';

interface MealCardProps {
  meal: Meal;
  onPress?: (meal: Meal) => void;
  onDelete?: (id: string) => void;
}

export const MealCard: React.FC<MealCardProps> = ({ meal, onPress, onDelete }) => {
  const Wrapper = onPress ? TouchableOpacity : View;

  const handleDelete = () => {
    if (onDelete) {
      confirmDelete(meal.title, () => onDelete(meal.id));
    }
  };

  return (
    <Wrapper style={styles.card} onPress={() => onPress?.(meal)} activeOpacity={0.7}>
      <View style={styles.textColumn}>
        <Text style={styles.title}>{meal.title}</Text>
        {meal.foods.map((food) => (
          <Text key={food.foodId} style={styles.item}>
            {food.name}
          </Text>
        ))}
      </View>
      <View style={styles.rightColumn}>
        <Text style={styles.kcal}>{meal.kcal} kcal</Text>
        {onDelete && (
          <TouchableOpacity onPress={handleDelete} hitSlop={8} style={styles.deleteButton}>
            <Text style={styles.deleteIcon}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: colors.cardBackground,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  textColumn: {
    flexShrink: 1,
  },
  title: {
    ...typography.mealTitle,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  item: {
    ...typography.mealSubItem,
    color: colors.textSecondary,
  },
  rightColumn: {
    alignItems: 'flex-end',
  },
  kcal: {
    ...typography.mealKcal,
    color: colors.textPrimary,
  },
  deleteButton: {
    marginTop: spacing.sm,
  },
  deleteIcon: {
    fontSize: 14,
    color: colors.textMuted,
  },
});
