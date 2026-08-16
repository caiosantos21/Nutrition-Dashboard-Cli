import {
  AppSettings,
  FoodItem,
  HistoryEntry,
  MacroConsumption,
  Meal,
  TabItem,
} from '../types/nutrition';

/**
 * Estes valores são apenas o estado INICIAL do app (seed).
 * O estado real e mutável (adicionar/remover refeição, editar metas, etc.)
 * vive em `AppDataContext`, não aqui.
 */

/** kcal consumido é derivado da soma das refeições no context — não é seed. */
export const initialMacroConsumption: MacroConsumption = {
  proteinConsumed: 80,
  carbsConsumed: 200,
  fatConsumed: 50,
};

export const defaultSettings: AppSettings = {
  dailyCalorieGoal: 2000,
  proteinGoal: 120,
  carbsGoal: 250,
  fatGoal: 70,
  units: 'Metric',
};

export const initialFoods: FoodItem[] = [
  { id: '1', name: 'Oatmeal with berries', kcalPerServing: 280, servingSize: '1 bowl' },
  { id: '2', name: 'Grilled Chicken Breast', kcalPerServing: 231, servingSize: '100 g' },
  { id: '3', name: 'Whole Wheat Bread', kcalPerServing: 81, servingSize: '1 slice' },
  { id: '4', name: 'Almonds', kcalPerServing: 164, servingSize: '28 g' },
  { id: '5', name: '2% Milk', kcalPerServing: 122, servingSize: '1 cup' },
  { id: '6', name: 'Olive Oil Dressing', kcalPerServing: 119, servingSize: '1 tbsp' },
];

// Refeições iniciais montadas a partir dos próprios alimentos cadastrados acima,
// já no novo formato (lista de MealFoodEntry em vez de texto livre).
export const initialMeals: Meal[] = [
  {
    id: '1',
    title: 'Oatmeal with berries',
    foods: [
      { foodId: '5', name: '2% Milk', kcal: 122 },
      { foodId: '4', name: 'Almonds', kcal: 164 },
    ],
    kcal: 286,
  },
  {
    id: '2',
    title: 'Grilled Chicken Salad',
    foods: [
      { foodId: '2', name: 'Grilled Chicken Breast', kcal: 231 },
      { foodId: '3', name: 'Whole Wheat Bread', kcal: 81 },
      { foodId: '6', name: 'Olive Oil Dressing', kcal: 119 },
    ],
    kcal: 431,
  },
];

export const historyEntries: HistoryEntry[] = [
  { id: '1', date: 'Feb 1', weekday: 'Sunday', kcalConsumed: 1500, kcalGoal: 2000 },
  { id: '2', date: 'Jan 31', weekday: 'Saturday', kcalConsumed: 1980, kcalGoal: 2000 },
  { id: '3', date: 'Jan 30', weekday: 'Friday', kcalConsumed: 2150, kcalGoal: 2000 },
  { id: '4', date: 'Jan 29', weekday: 'Thursday', kcalConsumed: 1870, kcalGoal: 2000 },
  { id: '5', date: 'Jan 28', weekday: 'Wednesday', kcalConsumed: 1620, kcalGoal: 2000 },
];

export const tabs: TabItem[] = [
  { key: 'today', label: 'TODAY' },
  { key: 'history', label: 'HISTORY' },
  { key: 'foods', label: 'FOODS' },
  { key: 'settings', label: 'SETTINGS' },
];
