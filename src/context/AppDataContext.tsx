import React, { createContext, useContext, useMemo, useState } from 'react';
import {
  AppSettings,
  DailySummary,
  FoodItem,
  Meal,
  MealFoodEntry,
  Units,
} from '../types/nutrition';
import {
  defaultSettings,
  initialFoods,
  initialMacroConsumption,
  initialMeals,
} from '../data/mockData';
import { getWeightUnit } from '../utils/units';

interface MealInput {
  title: string;
  foods: MealFoodEntry[];
}

interface NewFoodInput {
  name: string;
  servingSize: string;
  kcalPerServing: number;
}

interface AppDataContextValue {
  dailySummary: DailySummary;
  meals: Meal[];
  foods: FoodItem[];
  settings: AppSettings;
  addMeal: (meal: MealInput) => void;
  updateMeal: (id: string, meal: MealInput) => void;
  removeMeal: (id: string) => void;
  addFood: (food: NewFoodInput) => void;
  removeFood: (id: string) => void;
  updateGoal: (key: keyof Omit<AppSettings, 'units'>, value: number) => void;
  updateUnits: (units: Units) => void;
}

const AppDataContext = createContext<AppDataContextValue | undefined>(undefined);

let idCounter = 1000; // evita colisão com os ids mockados iniciais

const generateId = (): string => String(idCounter++);

const sumFoodsKcal = (foods: MealFoodEntry[]): number =>
  foods.reduce((total, food) => total + food.kcal, 0);

/**
 * Único lugar da aplicação que guarda estado mutável (refeições, alimentos,
 * metas). Telas e componentes apenas leem daqui e chamam as ações —
 * nenhuma tela mantém sua própria cópia dos dados.
 */
export const AppDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [meals, setMeals] = useState<Meal[]>(initialMeals);
  const [foods, setFoods] = useState<FoodItem[]>(initialFoods);
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [macroConsumption] = useState(initialMacroConsumption);

  const addMeal = (meal: MealInput) => {
    setMeals((prev) => [
      { id: generateId(), title: meal.title, foods: meal.foods, kcal: sumFoodsKcal(meal.foods) },
      ...prev,
    ]);
  };

  const updateMeal = (id: string, meal: MealInput) => {
    setMeals((prev) =>
      prev.map((existing) =>
        existing.id === id
          ? { ...existing, title: meal.title, foods: meal.foods, kcal: sumFoodsKcal(meal.foods) }
          : existing,
      ),
    );
  };

  const removeMeal = (id: string) => {
    setMeals((prev) => prev.filter((meal) => meal.id !== id));
  };

  const addFood = (food: NewFoodInput) => {
    setFoods((prev) => [{ id: generateId(), ...food }, ...prev]);
  };

  const removeFood = (id: string) => {
    setFoods((prev) => prev.filter((food) => food.id !== id));
  };

  const updateGoal = (key: keyof Omit<AppSettings, 'units'>, value: number) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const updateUnits = (units: Units) => {
    setSettings((prev) => ({ ...prev, units }));
  };

  const dailySummary: DailySummary = useMemo(() => {
    // kcal consumido é sempre a soma real das refeições do dia — nunca um valor fixo.
    const kcalConsumed = meals.reduce((total, meal) => total + meal.kcal, 0);
    const weightUnit = getWeightUnit(settings.units);

    return {
      kcalConsumed,
      kcalGoal: settings.dailyCalorieGoal,
      protein: {
        label: 'Protein',
        current: macroConsumption.proteinConsumed,
        goal: settings.proteinGoal,
        unit: weightUnit,
      },
      carbs: {
        label: 'Carbs',
        current: macroConsumption.carbsConsumed,
        goal: settings.carbsGoal,
        unit: weightUnit,
      },
      fat: {
        label: 'Fat',
        current: macroConsumption.fatConsumed,
        goal: settings.fatGoal,
        unit: weightUnit,
      },
    };
  }, [meals, macroConsumption, settings]);

  const value: AppDataContextValue = {
    dailySummary,
    meals,
    foods,
    settings,
    addMeal,
    updateMeal,
    removeMeal,
    addFood,
    removeFood,
    updateGoal,
    updateUnits,
  };

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
};

export const useAppData = (): AppDataContextValue => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData deve ser usado dentro de um AppDataProvider');
  }
  return context;
};
