import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../theme';
const items = ['Início', 'Buscar', 'Vender', 'Trocar', 'Perfil'];
export default function BottomNav({ selected, onSelect }: { selected: string; onSelect: (label: string) => void }) {
  return <View style={s.bar}>{items.map(label => <Pressable key={label} accessibilityRole="button" accessibilityLabel={label} accessibilityState={{ selected: label === selected }} onPress={() => onSelect(label)} style={s.item}><View style={[s.dot, label === selected && { backgroundColor: colors.pink }]} /><Text style={[s.label, label === selected && { color: colors.brown }]}>{label}</Text></Pressable>)}</View>;
}
const s = StyleSheet.create({ bar: { height: 86, backgroundColor: colors.white, flexDirection: 'row', justifyContent: 'space-around', paddingTop: 25, paddingBottom: 12 }, item: { width: 60, alignItems: 'center', gap: 5 }, dot: { width: 19, height: 19, borderRadius: 20, backgroundColor: colors.sand }, label: { fontFamily: fonts.regular, color: colors.sand, fontSize: 9 } });