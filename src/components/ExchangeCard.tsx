import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, common } from '../theme';
import type { Exchange } from '../types';
export default function ExchangeCard({ exchange, onPress }: { exchange: Exchange; onPress: () => void }) {
 return <Pressable accessibilityRole="button" accessibilityLabel={`${exchange.pieceName} · ${exchange.status}`} accessibilityHint="Abrir detalhes e foto da troca" onPress={onPress} style={({ pressed }) => [s.card, { opacity: pressed ? .75 : 1 }]}>
   <Text style={common.label}>{exchange.pieceName} · {exchange.status}</Text>
   <Text style={common.text}>Solicitação {exchange.id}</Text>
   <Text style={common.text}>{new Date(exchange.createdAt).toLocaleDateString('pt-BR')}</Text>
 </Pressable>;
}
const s = StyleSheet.create({ card: { backgroundColor: colors.pink, padding: 16, borderRadius: 16, gap: 7 } });
