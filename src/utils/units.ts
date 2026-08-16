import { Units } from '../types/nutrition';

/**
 * Apenas troca o RÓTULO da unidade de peso (g / oz) conforme a preferência
 * do usuário — não converte o valor numérico, por decisão de produto.
 */
export const getWeightUnit = (units: Units): string => (units === 'Metric' ? 'g' : 'oz');
