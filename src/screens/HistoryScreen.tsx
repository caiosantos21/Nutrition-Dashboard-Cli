import React from 'react';
import { InfoRow } from '../components/InfoRow';
import { ScreenContainer } from '../components/ScreenContainer';
import { SectionTitle } from '../components/SectionTitle';
import { historyEntries } from '../data/mockData';

export const HistoryScreen: React.FC = () => {
  return (
    <ScreenContainer>
      <SectionTitle>PAST DAYS</SectionTitle>

      {historyEntries.map((entry) => (
        <InfoRow
          key={entry.id}
          title={entry.weekday}
          subtitle={entry.date}
          rightText={`${entry.kcalConsumed} / ${entry.kcalGoal} kcal`}
        />
      ))}
    </ScreenContainer>
  );
};
