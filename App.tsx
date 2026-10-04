import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, AppState, BackHandler, Platform, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { supabase, dataMode } from './src/services/supabase';
import { useFonts } from 'expo-font';
import { Inter_400Regular } from '@expo-google-fonts/inter/400Regular';
import { Inter_500Medium } from '@expo-google-fonts/inter/500Medium';
import { Inter_700Bold } from '@expo-google-fonts/inter/700Bold';
import { Inter_900Black } from '@expo-google-fonts/inter/900Black';
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import SellScreen from './src/screens/SellScreen';
import TradeInScreen from './src/screens/TradeInScreen';
import ExchangeProgramScreen from './src/screens/ExchangeProgramScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SaleDetailScreen from './src/screens/SaleDetailScreen';
import ExchangeDetailScreen from './src/screens/ExchangeDetailScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';
import { Dialog } from './src/components/UI';
import { colors, common } from './src/theme';
import { initialState } from './src/domain/rules';
import * as repository from './src/services/repository';
import type { Condition, DemoState, Exchange, Photo, Product, Sale, Screen } from './src/types';
export default function App() {
  const [fontsLoaded, fontError] = useFonts({ Inter_400Regular, Inter_500Medium, Inter_700Bold, Inter_900Black });
  const [route, setRoute] = useState<Screen>('splash'); const history = useRef<Screen[]>([]);
  const [products, setProducts] = useState<Product[]>([]); const [state, setState] = useState<DemoState>(initialState);
  const [product, setProduct] = useState<Product | null>(null); const [loading, setLoading] = useState(true); const [loadError, setLoadError] = useState('');
  const [sale, setSale] = useState<Sale | null>(null);
  const [exchange, setExchange] = useState<Exchange | null>(null);
  const [busy, setBusy] = useState(false); const busyRef = useRef(false); const [searching, setSearching] = useState(false); const [useCredit, setUseCredit] = useState(false); const [piece, setPiece] = useState<string>();
  const [dialog, setDialog] = useState({ title: '', message: '' }); const notify = (title: string, message: string) => setDialog({ title, message });
  const load = useCallback(async () => { setLoading(true); setLoadError(''); try { const [catalog, snapshot] = await Promise.all([repository.loadProducts(), repository.loadState()]); setProducts(catalog); setState(snapshot); } catch (e) { setLoadError(e instanceof Error ? e.message : 'Não foi possível carregar os dados.'); } finally { setLoading(false); } }, []);
  useEffect(() => { void load(); }, [load]);
  useEffect(() => { const client = supabase; if (Platform.OS === 'web' || !client) return; if (AppState.currentState === 'active') client.auth.startAutoRefresh(); const subscription = AppState.addEventListener('change', status => status === 'active' ? client.auth.startAutoRefresh() : client.auth.stopAutoRefresh()); return () => { subscription.remove(); client.auth.stopAutoRefresh(); }; }, []);
  const navigate = useCallback((next: Screen) => { if (next !== 'home' && (loading || loadError)) { setDialog({ title: 'Dados indisponíveis', message: loading ? 'Aguarde o carregamento do catálogo.' : 'Volte ao catálogo e toque em Tentar novamente.' }); return; } if (next !== route) { history.current.push(route); setRoute(next); } }, [route, loading, loadError]);
  const back = useCallback(() => { if (busyRef.current) return; setRoute(history.current.pop() || 'home'); }, []);
  useEffect(() => { const listener = BackHandler.addEventListener('hardwareBackPress', () => { if (route === 'splash' || (route === 'home' && !history.current.length)) return false; back(); return true; }); return () => listener.remove(); }, [route, back]);
  function openProduct(p: Product) { setProduct(p); navigate('detail'); }
  function openExchange(item: Exchange) { setExchange(item); navigate('exchange'); }
  async function mutate(action: () => Promise<unknown>, success: () => void): Promise<boolean> {
    if (busyRef.current || loading || loadError) { if (loadError) notify('Dados indisponíveis', 'Volte ao catálogo e tente carregar os dados novamente.'); return false; }
    busyRef.current = true; setBusy(true);
    try { await action(); } catch (error) { notify('Não foi possível concluir', error instanceof Error ? error.message : 'Tente novamente.'); busyRef.current = false; setBusy(false); return false; }
    try { setState(await repository.loadState()); } catch { setLoadError('A operação foi registrada, mas o histórico não pôde ser atualizado. Volte ao catálogo e toque em Tentar novamente.'); }
    success(); busyRef.current = false; setBusy(false); return true;
  }
  async function submit(brand: string, condition: Condition, photos: Photo[]) {
    let saleId = '';
    return mutate(async () => { saleId = await repository.submitSale(brand, condition, photos); }, () => notify('Peça enviada para curadoria', `Sua peça foi salva ${dataMode === 'Supabase' ? 'no Supabase' : 'neste navegador'}. Código: ${saleId}. A estimativa é demonstrativa e será confirmada após avaliação. Consulte o andamento em Perfil.`));
  }
  async function request(pieceId: string) { return mutate(() => repository.requestExchange(pieceId), () => notify('Troca solicitada', 'Sua solicitação foi registrada. A curadoria irá avaliar a peça antes de confirmar o crédito e a taxa administrativa. Acompanhe em Perfil.')); }
  if (!fontsLoaded && !fontError) return <View style={s.loading}><ActivityIndicator color={colors.pink} /></View>;
  if (fontError) return <View style={s.loading}><Text style={common.error}>Não foi possível carregar as fontes. Reabra o aplicativo.</Text></View>;
  return <SafeAreaProvider><SafeAreaView style={s.viewport} edges={['top', 'bottom']}><StatusBar style={route === 'splash' || route === 'home' || route === 'sell' || route === 'program' ? 'light' : 'dark'} /><View style={s.app}>
    {route === 'splash' && <SplashScreen onStart={() => { history.current = []; setRoute('home'); }} />}
    {route === 'home' && <HomeScreen products={products} favorites={state.favorites} openProduct={openProduct} navigate={navigate} searching={searching} setSearching={setSearching} loading={loading} error={loadError} retry={() => void load()} />}
    {route === 'detail' && product && <ProductDetailScreen product={product} back={back} buy={() => navigate('checkout')} favorite={state.favorites.includes(product.id)} toggleFavorite={() => void mutate(() => repository.toggleFavorite(product.id, !state.favorites.includes(product.id)), () => {})} busy={busy} />}
    {route === 'sell' && <SellScreen back={back} submit={submit} busy={busy} notify={notify} />}
    {route === 'trade' && <TradeInScreen state={state} back={back} useCredit={() => { setUseCredit(true); setSearching(false); navigate('home'); }} program={pieceId => { setPiece(pieceId); navigate('program'); }} />}
    {route === 'program' && <ExchangeProgramScreen state={state} back={back} initialPiece={piece} request={request} busy={busy} openExchange={openExchange} />}
    {route === 'profile' && <ProfileScreen state={state} products={products} back={back} openProduct={openProduct} openSale={item => { setSale(item); navigate('sale'); }} openExchange={openExchange} />}
    {route === 'sale' && sale && <SaleDetailScreen sale={sale} back={back} />}
    {route === 'exchange' && exchange && <ExchangeDetailScreen exchange={exchange} piece={state.eligible.find(p => p.id === exchange.pieceId)} back={back} />}
    {route === 'checkout' && product && <CheckoutScreen product={product} credit={state.credit} back={back} initialCredit={useCredit} busy={busy} confirm={(apply, requestId) => void mutate(() => repository.purchase(product, apply, requestId), () => { setUseCredit(false); history.current = ['home']; setRoute('profile'); notify('Compra simulada concluída', 'Pedido registrado e saldo atualizado. Esta demonstração não realiza cobranças.'); })} />}
    <Dialog title={dialog.title} message={dialog.message} onClose={() => setDialog({ title: '', message: '' })} />
  </View></SafeAreaView></SafeAreaProvider>;
}
const s = StyleSheet.create({ viewport: { flex: 1, backgroundColor: '#FFFFFF', alignItems: 'center' }, app: { flex: 1, width: '100%', maxWidth: Platform.OS === 'web' ? 390 : undefined, backgroundColor: colors.cream, overflow: 'hidden' }, loading: { flex: 1, backgroundColor: colors.olive, justifyContent: 'center', alignItems: 'center' } });
