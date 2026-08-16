import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DailySummaryHeader } from '../components/DailySummaryHeader';
import { TabBar } from '../components/TabBar';
import { TodayScreen } from '../screens/TodayScreen';
import { HistoryScreen } from '../screens/HistoryScreen';
import { FoodsScreen } from '../screens/FoodsScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { useAppData } from '../context/AppDataContext';
import { tabs } from '../data/mockData';
import { TabKey } from '../types/nutrition';
import { colors } from '../theme/theme';

/**
 * Mapa tab -> tela. Adicionar uma nova aba no futuro é só
 * incluir uma entrada aqui e em `tabs` (mockData) — nada mais muda.
 */
const SCREENS: Record<TabKey, React.FC> = {
  today: TodayScreen,
  history: HistoryScreen,
  foods: FoodsScreen,
  settings: SettingsScreen,
};

export const AppShell: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('today');
  const { dailySummary } = useAppData();
  const ActiveScreen = SCREENS[activeTab];

  return (
    // edges inclui 'bottom' para respeitar a barra de gestos/navegação do
    // Android e não sobrepor os botões de ação (LOG FOOD, Add Meal, etc.)
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <DailySummaryHeader summary={dailySummary} />

      <TabBar tabs={tabs} activeTab={activeTab} onChangeTab={setActiveTab} />

      <ActiveScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.headerBackground,
  },
});
