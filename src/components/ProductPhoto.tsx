import React from 'react';
import { Image, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { productImage } from '../data/productImages';
import type { Product } from '../types';
type PhotoItem = Pick<Product, 'id'> & { brand?: string; model?: string; name?: string };
export default function ProductPhoto({ product, style, children }: { product: PhotoItem; style?: StyleProp<ViewStyle>; children?: React.ReactNode }) {
 const source = productImage(product.id);
 return <View style={[s.frame, style]}>{source && <Image source={source} accessibilityLabel={`Foto de ${product.name || `${product.brand} ${product.model}`}`} resizeMode="contain" style={s.photo} />}{children}</View>;
}
const s = StyleSheet.create({ frame: { backgroundColor: '#FFFFFF', overflow: 'hidden' }, photo: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' } });
