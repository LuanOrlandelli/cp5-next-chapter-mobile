import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import ProductPhoto from './ProductPhoto';
import { Badge } from './UI';
import { money } from '../domain/rules';
import { colors, fonts } from '../theme';
import type { Product } from '../types';
export default function ProductCard({ product, onPress }: { product: Product; onPress: () => void }) {
  return <Pressable accessibilityRole="button" accessibilityLabel={`${product.brand} ${product.model}, ${money(product.price)}`} onPress={onPress} style={({ pressed }) => [s.card, { opacity: pressed ? .8 : 1 }]}>
    <ProductPhoto product={product} style={s.image}>{product.authenticated && <Badge />}</ProductPhoto>
    <View style={s.info}><Text style={s.brand}>{product.brand}</Text><Text style={s.model}>{product.model}</Text><Text style={s.price}>{money(product.price)}</Text></View>
  </Pressable>;
}
const s = StyleSheet.create({ card: { width: '48%', overflow: 'hidden', borderTopLeftRadius: 13, borderTopRightRadius: 13, borderBottomLeftRadius: 3, borderBottomRightRadius: 3, backgroundColor: colors.white }, image: { height: 146, padding: 10 }, info: { height: 62, paddingHorizontal: 11, paddingTop: 9 }, brand: { fontFamily: fonts.bold, fontSize: 12, color: colors.brown }, model: { fontFamily: fonts.regular, fontSize: 10, color: colors.brown, marginTop: 2 }, price: { fontFamily: fonts.bold, fontSize: 13, color: colors.price, marginTop: 2 } });