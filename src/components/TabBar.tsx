import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TabItem, TabKey } from '../types/nutrition';
import { colors, spacing, typography } from '../theme/theme';

interface TabBarProps {
  tabs: TabItem[];
  activeTab: TabKey;
  onChangeTab: (key: TabKey) => void;
}

export const TabBar: React.FC<TabBarProps> = ({ tabs, activeTab, onChangeTab }) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = tab.key === activeTab;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabButton}
            onPress={() => onChangeTab(tab.key)}
            activeOpacity={0.7}
          >
            <Text style={[styles.label, isActive && styles.labelActive]}>{tab.label}</Text>
            {isActive && <View style={styles.underline} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  label: {
    ...typography.tabLabel,
    color: colors.textMuted,
  },
  labelActive: {
    color: colors.primaryGreen,
  },
  underline: {
    marginTop: spacing.xs,
    height: 2,
    width: '60%',
    backgroundColor: colors.primaryGreen,
  },
});
