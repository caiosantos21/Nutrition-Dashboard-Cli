/**
 * Design tokens centralizados.
 * Qualquer cor, espaçamento ou fonte usada no app deve vir daqui,
 * evitando valores "mágicos" espalhados pelos componentes.
 */

export const colors = {
  primaryGreen: '#3FA34D',
  primaryGreenDark: '#2E8B3E',
  headerBackground: '#E6F4E6',
  screenBackground: '#F5F6F5',
  cardBackground: '#FFFFFF',
  textPrimary: '#1A1A1A',
  textSecondary: '#5B5F5B',
  textMuted: '#8A8E8A',
  border: '#E5E7E5',
  progressTrack: '#D9E8D9',
  white: '#FFFFFF',
  error: '#D64545',
  errorBackground: '#FBEAEA',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  pill: 999,
} as const;

export const typography = {
  logo: { fontSize: 24, fontWeight: '700' as const },
  kcalValue: { fontSize: 32, fontWeight: '700' as const },
  kcalLabel: { fontSize: 12, fontWeight: '500' as const },
  goalLabel: { fontSize: 12, fontWeight: '500' as const },
  macroLabel: { fontSize: 13, fontWeight: '600' as const },
  macroValue: { fontSize: 13, fontWeight: '400' as const },
  tabLabel: { fontSize: 12, fontWeight: '700' as const },
  sectionTitle: { fontSize: 13, fontWeight: '700' as const },
  mealTitle: { fontSize: 15, fontWeight: '600' as const },
  mealSubItem: { fontSize: 13, fontWeight: '400' as const },
  mealKcal: { fontSize: 14, fontWeight: '600' as const },
  buttonLabel: { fontSize: 14, fontWeight: '700' as const },
};
