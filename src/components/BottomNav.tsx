import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../theme';
import Icon, { type IconName } from './Icon';
const items: { label: string; icon: IconName }[] = [
  { label: 'Início', icon: 'home' },
  { label: 'Buscar', icon: 'search' },
  { label: 'Vender', icon: 'sell' },
  { label: 'Trocar', icon: 'exchange' },
  { label: 'Perfil', icon: 'profile' },
];
export default function BottomNav({ selected, onSelect }: { selected: string; onSelect: (label: string) => void }) {
  return <View style={s.bar}>{items.map(({ label, icon }) => <Pressable key={label} accessibilityRole="button" accessibilityLabel={label} accessibilityState={{ selected: label === selected }} onPress={() => onSelect(label)} style={s.item}><Icon name={icon} color={label === selected ? colors.pink : colors.sand} /><Text style={[s.label, label === selected && { color: colors.brown }]}>{label}</Text></Pressable>)}</View>;
}
const s = StyleSheet.create({ bar: { height: 86, backgroundColor: colors.white, flexDirection: 'row', justifyContent: 'space-around', paddingTop: 20, paddingBottom: 12 }, item: { width: 60, minHeight: 44, alignItems: 'center', gap: 5 }, label: { fontFamily: fonts.regular, color: colors.sand, fontSize: 9 } });
