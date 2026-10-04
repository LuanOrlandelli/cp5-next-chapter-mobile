import React from 'react';
import { ScrollView, Text } from 'react-native';
import ProductPhoto from '../components/ProductPhoto';
import { Back } from '../components/UI';
import { common } from '../theme';
import { money } from '../domain/rules';
import type { EligiblePiece, Exchange } from '../types';
export default function ExchangeDetailScreen({ exchange, piece, back }: { exchange: Exchange; piece?: EligiblePiece; back: () => void }) {
 return <ScrollView contentContainerStyle={[common.body, { gap: 16 }]}>
   <Back onPress={back} /><Text accessibilityRole="header" style={common.heading}>{exchange.pieceName}</Text>
   <ProductPhoto product={{ id: exchange.pieceId, name: exchange.pieceName }} style={{ height: 300, borderRadius: 16 }} />
   <Text style={common.label}>Status da troca</Text><Text style={common.text}>{exchange.status}</Text>
   <Text style={common.text}>{exchange.status === 'Realizada' ? 'Esta troca foi concluída.' : 'Sua solicitação aguarda a avaliação da curadoria. Após aprovação, você receberá a proposta para escolher outra peça.'}</Text>
   {piece && <><Text style={common.label}>Estimativa de crédito</Text><Text style={common.text}>{money(piece.credit)}</Text></>}
   {exchange.status === 'Solicitada' && <Text style={common.text}>O crédito e a taxa administrativa serão confirmados após avaliação. Nenhum crédito foi liberado por esta solicitação.</Text>}
   <Text selectable style={common.text}>Solicitação {exchange.id}</Text><Text style={common.text}>Enviada em {new Date(exchange.createdAt).toLocaleDateString('pt-BR')}</Text>
 </ScrollView>;
}
