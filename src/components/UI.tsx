import React from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { colors, common, fonts } from '../theme';
export function Button({ title, onPress, disabled = false, small = false, dark = false, style, testID }: { title: string; onPress: () => void; disabled?: boolean; small?: boolean; dark?: boolean; style?: StyleProp<ViewStyle>; testID?: string }) {
  return <Pressable accessibilityRole="button" accessibilityLabel={title} accessibilityState={{ disabled }} testID={testID} onPress={onPress} disabled={disabled} style={({ pressed }) => [s.button, small && s.small, dark && { backgroundColor: colors.olive }, { opacity: disabled ? .5 : pressed ? .75 : 1 }, style]}><Text style={[s.buttonText, small && { fontSize: 12 }, dark && { color: colors.pink }]}>{title}</Text></Pressable>;
}
export function Back({ onPress, pink = false }: { onPress: () => void; pink?: boolean }) {
  return <Pressable accessibilityRole="button" accessibilityLabel="Voltar" onPress={onPress} style={s.back}><View style={[s.chevron, { borderColor: pink ? colors.pink : colors.brown }]} /></Pressable>;
}
export function Pill({ label, selected = false, onPress, compact = false }: { label: string; selected?: boolean; onPress?: () => void; compact?: boolean }) {
  const content = <Text style={[common.text, { fontSize: compact ? 10 : 13 }]}>{label}</Text>;
  const style = [s.pill, compact && { paddingHorizontal: 11, paddingVertical: 7 }, selected && { backgroundColor: colors.pink }];
  return onPress ? <Pressable accessibilityRole="button" accessibilityLabel={label} accessibilityState={{ selected }} onPress={onPress} style={style}>{content}</Pressable> : <View style={style}>{content}</View>;
}
export function Badge({ full = false }: { full?: boolean }) { return <View style={[s.badge, full && { paddingVertical: 6 }]}><Text style={[s.badgeText, full && { fontSize: 10 }]}>{full ? '✓ Autenticado por LegitGrails' : '✓ Autenticado'}</Text></View>; }
export function Dialog({ title, message, onClose }: { title: string; message: string; onClose: () => void }) {
  return <Modal visible={!!title} transparent animationType="fade" onRequestClose={onClose}><View style={s.overlay}><View accessibilityViewIsModal style={s.dialog}><Text accessibilityRole="header" style={common.heading}>{title}</Text><ScrollView style={{ maxHeight: 320 }}><Text style={[common.text, { lineHeight: 21 }]}>{message}</Text></ScrollView><Button title="Entendi" onPress={onClose} /></View></View></Modal>;
}
const s = StyleSheet.create({
  button: { minHeight: 48, borderRadius: 30, backgroundColor: colors.pink, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 }, small: { minHeight: 31, paddingHorizontal: 17, alignSelf: 'flex-start' }, buttonText: { fontFamily: fonts.bold, fontSize: 15, color: colors.brown },
  back: { width: 32, height: 36, justifyContent: 'center', paddingLeft: 5 }, chevron: { width: 14, height: 14, borderLeftWidth: 2, borderBottomWidth: 2, transform: [{ rotate: '45deg' }] },
  pill: { backgroundColor: colors.white, paddingHorizontal: 16, paddingVertical: 9, borderRadius: 20, alignItems: 'center' },
  badge: { backgroundColor: colors.badge, borderRadius: 18, alignSelf: 'flex-start', paddingHorizontal: 7, paddingVertical: 3 }, badgeText: { fontFamily: fonts.bold, color: colors.white, fontSize: 8 },
  overlay: { flex: 1, backgroundColor: '#00000066', justifyContent: 'center', alignItems: 'center', padding: 25 }, dialog: { backgroundColor: colors.cream, width: '100%', maxWidth: 350, padding: 24, borderRadius: 18, gap: 20 },
});