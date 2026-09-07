export const meterBasePrices = { mini: 75, touch: 85, mirror: 95 } as const;
export type MeterId = keyof typeof meterBasePrices;
export function calculateQuote(input: { meter: MeterId; period: number; mpos: boolean; dispatch: string; extra: boolean }) {
  if (!(input.meter in meterBasePrices) || ![6, 12, 24].includes(input.period) || !['none', 'phone', 'tablet'].includes(input.dispatch) || typeof input.mpos !== 'boolean' || typeof input.extra !== 'boolean') throw new Error('Invalid package configuration');
  const discount = input.period === 24 ? 20 : input.period === 12 ? 10 : 0;
  const price = meterBasePrices[input.meter] - discount;
  const dispatchPrice = input.dispatch === 'phone' ? 43 : input.dispatch === 'tablet' ? 61 : 0;
  const monthly = Math.round((price + (input.mpos ? 34 : 0) + dispatchPrice + (input.extra ? 8.2 : 0)) * 100) / 100;
  return { discount, price, dispatchPrice, monthly, total: Math.round((monthly * input.period + 150) * 100) / 100 };
}
