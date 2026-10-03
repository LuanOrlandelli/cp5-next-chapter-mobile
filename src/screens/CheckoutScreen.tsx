import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Back, Button, Pill } from '../components/UI';
import { colors, common } from '../theme';
import { checkoutAmounts, money } from '../domain/rules';
import { newRequestId } from '../services/repository';
import type { Product } from '../types';
export default function CheckoutScreen({ product, credit, back, initialCredit, confirm, busy }: { product: Product; credit: number; back: () => void; initialCredit: boolean; confirm: (apply: boolean, requestId: string) => void; busy: boolean }) {
  const [useCredit, setUseCredit] = useState(initialCredit); const [requestId] = useState(newRequestId); const amount = checkoutAmounts(product.price, credit, useCredit);
  return <ScrollView contentContainerStyle={[common.body, { gap: 20 }]}><Back onPress={back} /><Text style={common.heading}>Seu próximo capítulo</Text><Text style={common.label}>{product.brand} · {product.model}</Text><View style={{ height: 170, backgroundColor: colors.sand, borderRadius: 15 }} /><Text style={common.text}>Compra de demonstração. Não há pagamento real, cobrança ou envio de produto.</Text><Text style={common.label}>Crédito disponível: {money(credit)}</Text><Pill label={useCredit ? '✓ Usar meu crédito' : 'Usar meu crédito'} selected={useCredit} onPress={() => !busy && setUseCredit(v => !v)} /><View style={{ gap: 12 }}><Text style={common.text}>Valor da peça: {money(amount.total)}</Text><Text style={common.text}>Crédito aplicado: {money(amount.creditUsed)}</Text><Text style={common.heading}>Pagamento simulado: {money(amount.paid)}</Text><Text style={common.text}>Saldo após a compra: {money(amount.remainingCredit)}</Text></View><Button title={busy ? 'Confirmando...' : 'Confirmar compra simulada'} disabled={busy} onPress={() => confirm(useCredit, requestId)} /></ScrollView>;
}