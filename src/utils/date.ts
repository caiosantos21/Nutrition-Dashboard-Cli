/**
 * Formata a data atual no padrão "SAT, AUG 15", usado no header.
 * Isolado em util para não depender de libs externas de data.
 */
export const formatHeaderDate = (date: Date = new Date()): string => {
  const weekday = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
  const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const day = date.getDate();
  return `${weekday}, ${month} ${day}`;
};
