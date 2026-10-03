import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { colors, common, fonts } from '../theme';
import { Pill, Button } from '../components/UI';
import BottomNav from '../components/BottomNav';
import ProductCard from '../components/ProductCard';
import { filterProducts } from '../domain/rules';
import type { Product, Screen } from '../types';
export default function HomeScreen({ products, openProduct, navigate, searching, setSearching, loading, error, retry }: { products: Product[]; favorites: string[]; openProduct: (p: Product) => void; navigate: (s: Screen) => void; searching: boolean; setSearching: (value: boolean) => void; loading: boolean; error: string; retry: () => void }) {
  const [query, setQuery] = useState(''); const [filter, setFilter] = useState('Todas');
  const visible = filterProducts(products, query);
  return <View style={{ flex: 1 }}><View style={s.header}><Text style={s.wordmark}>NEXT CHAPTER</Text><Pressable accessibilityRole="button" accessibilityLabel="Abrir perfil" onPress={() => navigate('profile')} style={s.profile}><View style={s.circle} /></Pressable></View>
    <ScrollView style={{ flex: 1 }} contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">
      <View style={s.filters}>{['Todas', 'Bolsas', 'Vender', 'Trocar'].map(label => <Pill key={label} label={label} selected={label === filter} onPress={() => label === 'Vender' ? navigate('sell') : label === 'Trocar' ? navigate('trade') : setFilter(label)} />)}</View>
      {searching && <TextInput autoFocus accessibilityLabel="Buscar bolsas" placeholder="Buscar por marca ou modelo" placeholderTextColor={colors.sand} value={query} onChangeText={setQuery} style={common.input} />}
      {loading ? <ActivityIndicator accessibilityLabel="Carregando catálogo" color={colors.olive} /> : error ? <View style={{ gap: 15 }}><Text style={common.error}>{error}</Text><Button title="Tentar novamente" onPress={retry} /></View> : <View style={s.grid}>{visible.map(p => <ProductCard key={p.id} product={p} onPress={() => openProduct(p)} />)}{!visible.length && <Text style={common.text}>Nenhuma bolsa encontrada. Experimente outra busca.</Text>}</View>}
    </ScrollView>
    <BottomNav selected={searching ? 'Buscar' : 'Início'} onSelect={label => { if (label === 'Buscar') setSearching(true); else if (label === 'Início') { setSearching(false); setQuery(''); } else navigate(label === 'Vender' ? 'sell' : label === 'Trocar' ? 'trade' : 'profile'); }} />
  </View>;
}
const s = StyleSheet.create({ header: { height: 92, backgroundColor: colors.olive, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', paddingHorizontal: 21, paddingBottom: 17 }, wordmark: { fontFamily: fonts.black, fontSize: 17, color: colors.pink }, profile: { width: 25, height: 25, alignItems: 'center', justifyContent: 'center' }, circle: { width: 20, height: 20, borderRadius: 20, borderWidth: 2, borderColor: colors.cream }, content: { padding: 21, gap: 27, flexGrow: 1 }, filters: { flexDirection: 'row', gap: 10 }, grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 15 } });