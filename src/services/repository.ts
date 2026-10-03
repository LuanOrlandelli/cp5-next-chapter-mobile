import AsyncStorage from '@react-native-async-storage/async-storage';
import fixtures from '../data/products.json';
import { supabase, getUserId, assertDataConfiguration } from './supabase';
import { initialState, validateState, checkoutAmounts, estimate, validateSale } from '../domain/rules';
import type { Condition, DemoState, Exchange, Order, Photo, Product, Sale } from '../types';
const STORAGE_KEY = 'next-chapter:demo:v1';
export const localProducts = fixtures as Product[];
const id = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
let localQueue: Promise<unknown> = Promise.resolve();
async function localMutation<T>(change: (state: DemoState) => T): Promise<T> {
  const task = localQueue.then(async () => {
    const state = await readLocal();
    const result = change(state);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return result;
  });
  localQueue = task.catch(() => undefined);
  return task;
}
async function readLocal(): Promise<DemoState> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return initialState();
  const state: unknown = JSON.parse(raw);
  if (!validateState(state)) throw new Error('Dados locais inválidos. Limpe os dados do aplicativo para iniciar novamente.');
  return state;
}
function check(error: { message: string } | null) { if (error) throw new Error(error.message); }
export async function loadProducts(): Promise<Product[]> {
  assertDataConfiguration();
  if (!supabase) return localProducts;
  const { data, error } = await supabase.from('products').select('*').order('position');
  check(error);
  if (!data?.length) throw new Error('Catálogo vazio. Execute o schema e o seed no Supabase.');
  return data as Product[];
}
export async function loadState(): Promise<DemoState> {
  assertDataConfiguration();
  if (!supabase) return readLocal();
  const userId = await getUserId();
  const setup = await supabase.rpc('initialize_demo'); check(setup.error);
  const results = await Promise.all([
    supabase.from('wallets').select('credit').eq('user_id', userId).single(),
    supabase.from('eligible_pieces').select('id,name,credit').eq('user_id', userId).order('position'),
    supabase.from('favorites').select('product_id').eq('user_id', userId),
    supabase.from('sales').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
    supabase.from('orders').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
    supabase.from('exchanges').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
  ]);
  results.forEach(r => check(r.error));
  const [wallet, pieces, favorites, sales, orders, exchanges] = results;
  return { version: 1, credit: wallet.data!.credit, eligible: pieces.data!, favorites: favorites.data!.map(f => f.product_id),
    sales: sales.data!.map(s => ({ id: s.id, brandModel: s.brand_model, condition: s.condition, photos: s.photos, estimate: [s.estimate_low, s.estimate_high], status: s.status, createdAt: s.created_at })),
    orders: orders.data!.map(o => ({ id: o.id, productId: o.product_id, productName: o.product_name, total: o.total, creditUsed: o.credit_used, paid: o.paid, createdAt: o.created_at })),
    exchanges: exchanges.data!.map(e => ({ id: e.id, pieceId: e.piece_id, pieceName: e.piece_name, status: e.status, createdAt: e.created_at })) };
}
export async function toggleFavorite(productId: string, selected: boolean) {
  if (!supabase) return localMutation(s => { s.favorites = selected ? Array.from(new Set([...s.favorites, productId])) : s.favorites.filter(f => f !== productId); });
  const userId = await getUserId();
  const result = selected ? await supabase.from('favorites').upsert({ user_id: userId, product_id: productId }) : await supabase.from('favorites').delete().eq('user_id', userId).eq('product_id', productId);
  check(result.error);
}
function decodeBase64(value: string): Uint8Array {
  const binary = atob(value); return Uint8Array.from(binary, char => char.charCodeAt(0));
}
export async function submitSale(brandModel: string, condition: Condition, photos: Photo[]) {
  const validation = validateSale(brandModel, photos.length); if (validation) throw new Error(validation);
  const saleId = id(); const range = estimate(condition);
  if (!supabase) return localMutation(s => { const sale: Sale = { id: saleId, brandModel: brandModel.trim(), condition, photos: photos.map(p => p.base64 ? `data:${p.mimeType || 'image/jpeg'};base64,${p.base64}` : p.uri), estimate: range, status: 'Em curadoria', createdAt: new Date().toISOString() }; s.sales.unshift(sale); return sale.id; });
  const userId = await getUserId(); const paths: string[] = [];
  try {
    for (const [index, photo] of photos.entries()) {
      const path = `${userId}/${saleId}/${index}`;
      const bytes = photo.base64 ? decodeBase64(photo.base64) : await (await fetch(photo.uri)).arrayBuffer();
      const upload = await supabase.storage.from('sale-photos').upload(path, bytes, { contentType: photo.mimeType || 'image/jpeg' });
      check(upload.error); paths.push(path);
    }
    const result = await supabase.from('sales').insert({ id: saleId, user_id: userId, brand_model: brandModel.trim(), condition, photos: paths, estimate_low: range[0], estimate_high: range[1] });
    check(result.error); return saleId;
  } catch (error) {
    if (paths.length) await supabase.storage.from('sale-photos').remove(paths);
    throw error;
  }
}
export async function purchase(product: Product, useCredit: boolean, requestId: string) {
  if (!supabase) return localMutation(s => {
    const existing = s.orders.find(o => o.id === requestId); if (existing) return existing;
    const amounts = checkoutAmounts(product.price, s.credit, useCredit);
    const order: Order = { id: requestId, productId: product.id, productName: `${product.brand} ${product.model}`, total: amounts.total, creditUsed: amounts.creditUsed, paid: amounts.paid, createdAt: new Date().toISOString() };
    s.credit = amounts.remainingCredit; s.orders.unshift(order); return order;
  });
  await getUserId();
  const result = await supabase.rpc('place_demo_order', { product: product.id, apply_credit: useCredit, request_id: requestId }); check(result.error);
  return result.data;
}
export async function requestExchange(pieceId: string) {
  if (!supabase) return localMutation(s => {
    const piece = s.eligible.find(p => p.id === pieceId); if (!piece) throw new Error('Peça não encontrada.');
    if (s.exchanges.some(e => e.pieceId === pieceId)) throw new Error('Você já solicitou a troca desta peça.');
    const exchange: Exchange = { id: id(), pieceId, pieceName: piece.name, status: 'Solicitada', createdAt: new Date().toISOString() }; s.exchanges.unshift(exchange); return exchange.id;
  });
  await getUserId(); const result = await supabase.rpc('request_demo_exchange', { piece: pieceId }); check(result.error); return result.data;
}
export const newRequestId = id;