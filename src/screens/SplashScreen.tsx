import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BrandMark from '../components/BrandMark';
import { Button } from '../components/UI';
import { colors, fonts } from '../theme';
export default function SplashScreen({ onStart }: { onStart: () => void }) {
  return <View style={s.root}><View style={s.mark}><BrandMark /></View><Text style={s.title}>NEXT{'\n'}CHAPTER</Text><Text style={s.tagline}>TODA PEÇA MERECE UM{'\n'}PRÓXIMO CAPÍTULO</Text><Button title="Começar" onPress={onStart} style={s.button} /><Text style={s.year}>2026</Text></View>;
}
const s = StyleSheet.create({ root: { flex: 1, backgroundColor: colors.olive, alignItems: 'center', minHeight: 660 }, mark: { width: 310, height: 230, marginTop: 64 }, title: { fontFamily: fonts.black, fontSize: 54, lineHeight: 52, textAlign: 'center', color: colors.pink, marginTop: 29 }, tagline: { fontFamily: fonts.regular, fontSize: 13, lineHeight: 17, letterSpacing: 1, textAlign: 'center', color: colors.cream, marginTop: 22 }, button: { width: 153, marginTop: 18 }, year: { position: 'absolute', bottom: 38, left: 25, fontFamily: fonts.regular, fontSize: 12, color: colors.sand } });