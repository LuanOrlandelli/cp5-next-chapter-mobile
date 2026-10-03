import type { Condition, DemoState, Product } from '../types';
export const money = (cents: number) => 'R$ ' + new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 }).format(cents / 100);
export const preciseMoney = (cents: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100);
export const conditions: Condition[] = ['Novo', 'Excelente', 'Bom', 'Usado'];
export function estimate(condition: Condition): [number, number] {
  const multiplier = { Novo: 1.15, Excelente: 1, Bom: .8, Usado: .6 }[condition];
  return [Math.round(350000 * multiplier), Math.round(420000 * multiplier)];
}
export function validateSale(brandModel: string, photoCount: number): string | null {
  if (brandModel.trim().length < 3) return 'Informe a marca e o modelo da bolsa (mínimo de 3 caracteres).';
  if (brandModel.trim().length > 120) return 'Use até 120 caracteres para marca e modelo.';
  if (photoCount < 4) return 'Adicione pelo menos 4 fotos: frente, verso, interior e etiqueta.';
  if (photoCount > 8) return 'Envie no máximo 8 fotos.';
  return null;
}
export function checkoutAmounts(price: number, credit: number, useCredit: boolean) {
  if (!Number.isSafeInteger(price) || price <= 0 || !Number.isSafeInteger(credit) || credit < 0) throw new Error('Valores inválidos.');
  const creditUsed = useCredit ? Math.min(price, credit) : 0;
  return { total: price, creditUsed, paid: price - creditUsed, remainingCredit: credit - creditUsed };
}
export function filterProducts(products: Product[], query: string, favorites?: string[]) {
  const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const term = normalize(query.trim());
  return products.filter(p => (!favorites || favorites.includes(p.id)) && normalize(`${p.brand} ${p.model} ${p.detail}`).includes(term));
}
export function initialState(): DemoState {
  return { version: 1, credit: 124000, eligible: [{ id: 'lv-speedy', name: 'Louis Vuitton Speedy 30', credit: 62000 }, { id: 'mk-selma', name: 'Michael Kors Selma', credit: 31000 }], favorites: [], sales: [], orders: [], exchanges: [] };
}
export function validateState(value: unknown): value is DemoState {
  if (!value || typeof value !== 'object') return false;
  const s = value as DemoState;
  return s.version === 1 && Number.isSafeInteger(s.credit) && s.credit >= 0 && Array.isArray(s.eligible) && Array.isArray(s.favorites) && Array.isArray(s.sales) && Array.isArray(s.orders) && Array.isArray(s.exchanges);
}