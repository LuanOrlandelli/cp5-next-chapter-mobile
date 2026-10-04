import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Back, Button } from '../components/UI';
import { colors, common } from '../theme';
import { money } from '../domain/rules';
import { loadSalePhotos } from '../services/repository';
import type { Sale } from '../types';

export default function SaleDetailScreen({ sale, back }: { sale: Sale; back: () => void }) {
  const [photos, setPhotos] = useState<string[]>([]);
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    setLoading(true); setError(''); setPhotos([]); setSelected(0);
    loadSalePhotos(sale).then(urls => { if (active) setPhotos(urls); })
      .catch(e => { if (active) setError(e instanceof Error ? e.message : 'Não foi possível carregar as fotos.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [sale, attempt]);
  return <ScrollView contentContainerStyle={[common.body, { gap: 16 }]}>
    <Back onPress={back} />
    <Text accessibilityRole="header" style={common.heading}>{sale.brandModel}</Text>
    <Text style={common.label}>{sale.status}</Text>
    <View style={s.hero}>
      {loading ? <ActivityIndicator accessibilityLabel="Carregando fotos" color={colors.brown} /> : !error && photos[selected] ?
        <Image accessibilityLabel={`Foto ${selected + 1} de ${sale.brandModel}`} source={{ uri: photos[selected] }} resizeMode="contain" style={s.photo} onError={() => setError('Não foi possível exibir a foto. Tente carregá-la novamente.')} /> : null}
    </View>
    {!!error && <><Text accessibilityRole="alert" style={common.error}>{error}</Text><Button title="Carregar fotos novamente" onPress={() => setAttempt(value => value + 1)} /></>}
    {!loading && !error && <><Text style={common.text}>Foto {selected + 1} de {photos.length}</Text>
      <ScrollView horizontal contentContainerStyle={{ gap: 10 }} showsHorizontalScrollIndicator={false}>
        {photos.map((uri, index) => <Pressable key={`${attempt}-${index}`} accessibilityRole="button" accessibilityLabel={`Ver foto ${index + 1}`} accessibilityState={{ selected: selected === index }} onPress={() => setSelected(index)} style={[s.thumb, selected === index && { borderColor: colors.pink }]}>
          <Image source={{ uri }} resizeMode="contain" style={{ width: '100%', height: '100%' }} />
        </Pressable>)}
      </ScrollView></>}
    <Text style={common.label}>Estado de conservação</Text><Text style={common.text}>{sale.condition}</Text>
    <Text style={common.label}>Estimativa de venda</Text><Text style={common.text}>{money(sale.estimate[0])} – {money(sale.estimate[1])}</Text>
    <Text style={common.text}>A estimativa será confirmada após a avaliação da curadoria.</Text>
    <Text selectable style={common.text}>Envio {sale.id} - {new Date(sale.createdAt).toLocaleDateString('pt-BR')}</Text>
  </ScrollView>;
}
const s = StyleSheet.create({ hero: { height: 300, backgroundColor: colors.white, borderRadius: 16, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' }, photo: { width: '100%', height: '100%' }, thumb: { width: 70, height: 70, borderRadius: 10, borderWidth: 2, borderColor: colors.white, backgroundColor: colors.white, overflow: 'hidden' } });
