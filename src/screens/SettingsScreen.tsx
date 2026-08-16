import React, { useState } from 'react';
import { InfoRow } from '../components/InfoRow';
import { ScreenContainer } from '../components/ScreenContainer';
import { SectionTitle } from '../components/SectionTitle';
import { EditGoalModal } from '../components/modals/EditGoalModal';
import { SelectModal } from '../components/modals/SelectModal';
import { AboutModal } from '../components/modals/AboutModal';
import { useAppData } from '../context/AppDataContext';
import { AppSettings } from '../types/nutrition';
import { getWeightUnit } from '../utils/units';

type GoalKey = keyof Omit<AppSettings, 'units'>;

interface GoalRowConfig {
  key: GoalKey;
  label: string;
  /** Metas de peso (protein/carbs/fat) trocam de rótulo com Metric/Imperial; kcal não. */
  isWeightGoal: boolean;
}

const GOAL_ROWS: GoalRowConfig[] = [
  { key: 'dailyCalorieGoal', label: 'Daily Calorie Goal', isWeightGoal: false },
  { key: 'proteinGoal', label: 'Protein Goal', isWeightGoal: true },
  { key: 'carbsGoal', label: 'Carbs Goal', isWeightGoal: true },
  { key: 'fatGoal', label: 'Fat Goal', isWeightGoal: true },
];

const UNIT_OPTIONS = ['Metric', 'Imperial'];

export const SettingsScreen: React.FC = () => {
  const { settings, updateGoal, updateUnits } = useAppData();
  const [editingGoal, setEditingGoal] = useState<GoalRowConfig | null>(null);
  const [isUnitsVisible, setUnitsVisible] = useState(false);
  const [isAboutVisible, setAboutVisible] = useState(false);

  const weightUnit = getWeightUnit(settings.units);
  const unitFor = (row: GoalRowConfig) => (row.isWeightGoal ? weightUnit : 'kcal');

  return (
    <ScreenContainer>
      <SectionTitle>PREFERENCES</SectionTitle>

      {GOAL_ROWS.map((row) => (
        <InfoRow
          key={row.key}
          title={row.label}
          rightText={`${settings[row.key]} ${unitFor(row)}`}
          showChevron
          onPress={() => setEditingGoal(row)}
        />
      ))}

      <InfoRow
        title="Units"
        rightText={settings.units}
        showChevron
        onPress={() => setUnitsVisible(true)}
      />

      <InfoRow title="About NutriTrack" showChevron onPress={() => setAboutVisible(true)} />

      {editingGoal && (
        <EditGoalModal
          visible={!!editingGoal}
          label={editingGoal.label}
          unit={unitFor(editingGoal)}
          currentValue={settings[editingGoal.key]}
          onClose={() => setEditingGoal(null)}
          onSave={(value) => updateGoal(editingGoal.key, value)}
        />
      )}

      <SelectModal
        visible={isUnitsVisible}
        title="Units"
        options={UNIT_OPTIONS}
        selected={settings.units}
        onClose={() => setUnitsVisible(false)}
        onSelect={(option) => updateUnits(option as AppSettings['units'])}
      />

      <AboutModal visible={isAboutVisible} onClose={() => setAboutVisible(false)} />
    </ScreenContainer>
  );
};
