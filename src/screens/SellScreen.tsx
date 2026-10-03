import React, { useState } from 'react';
import { Image, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Back, Button, Pill } from '../components/UI';
import { colors, common, fonts } from '../theme';
import { conditions, estimate, money, validateSale } from '../domain/rules';
import type { Condition, Photo } from '../types';
export default function SellScreen({ back, submit, busy, notify }: { back: () => void; submit: (model: string, condition: Condition, photos: Photo[]) => Promise<boolean>; busy: boolean; notify: (title: string, message: string) => void }) {
  const [brand, setBrand] = useState(''); const [condition, setCondition] = useState<Condition>('Excelente'); const [photos, setPhotos] = useState<Photo[]>([]); const [error, setError] = useState('');
  const range = estimate(condition);
  async function pickPhotos() {
    try {
      if (photos.length >= 8) { setError('Você já selecionou o máximo de 8 fotos.'); return; }
      if (Platform.OS !== 'web') { const permission = await ImagePicker.requestMediaLibraryPermissionsAsync(); if (!permission.granted) { notify('Permissão necessária', 'Permita o acesso à galeria para selecionar as fotos da bolsa.'); return; } }
      const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], allowsMultipleSelection: true, selectionLimit: 8 - photos.length, quality: .65, base64: true });
      if (!result.canceled) {
        const accepted = result.assets.filter(a => (a.fileSize || 0) <= 6 * 1024 * 1024);
        if (accepted.length !== result.assets.length) setError('Algumas imagens ultrapassam 6 MB. Escolha fotos menores.'); else setError('');
        setPhotos(previous => [...previous, ...accepted.map(a => ({ uri: a.uri, base64: a.base64 || undefined, mimeType: a.mimeType || 'image/jpeg' }))].slice(0, 8));
      }
    } catch { notify('Não foi possível abrir a galeria', 'Tente novamente e confira as permissões do dispositivo.'); }
  }
  async function send() { const validation = validateSale(brand, photos.length); setError(validation || ''); if (validation) return; if (await submit(brand, condition, photos)) { setBrand(''); setPhotos([]); } }
  return <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}><View style={s.header}><Back onPress={back} pink /><Text style={s.title}>Vender minha bolsa</Text><Text style={[common.text, { color: colors.cream, marginTop: 5 }]}>Segurança, curadoria e o valor justo pela sua peça.</Text></View><View style={[common.body, { gap: 18 }]}>
    <Pressable accessibilityRole="button" accessibilityLabel="Adicionar fotos da bolsa" disabled={busy} onPress={pickPhotos} style={s.upload}><View style={s.uploadDot} /><Text style={common.text}>{photos.length ? `${photos.length} fotos selecionadas · Adicionar mais` : 'Adicionar fotos da bolsa'}</Text><Text style={s.hint}>Mín. 4 fotos: frente, verso, interior e etiqueta</Text></Pressable>
    {!!photos.length && <View style={s.previews}>{photos.map((photo, index) => <Pressable key={`${photo.uri}-${index}`} accessibilityRole="button" accessibilityLabel={`Remover foto ${index + 1}`} disabled={busy} onPress={() => setPhotos(previous => previous.filter((_, i) => i !== index))}><Image source={{ uri: photo.uri }} style={s.preview} /><Text style={s.remove}>Remover {index + 1}</Text></Pressable>)}</View>}
    <View style={{ gap: 7 }}><Text style={common.text}>Marca e modelo</Text><TextInput accessibilityLabel="Marca e modelo" value={brand} onChangeText={setBrand} editable={!busy} placeholder="Ex: Prada — Re-Edition 2005" placeholderTextColor={colors.sand} maxLength={120} style={common.input} /></View>
    <View style={{ gap: 7 }}><Text style={common.text}>Estado de conservação</Text><View style={s.conditions}>{conditions.map(item => <Pill key={item} label={item} compact selected={condition === item} onPress={() => !busy && setCondition(item)} />)}</View></View>
    <View style={s.estimate}><Text style={[common.text, { color: colors.cream, fontSize: 11 }]}>Estimativa de valor de venda</Text><Text style={s.value}>{money(range[0])} – {money(range[1])}</Text></View>
    {!!error && <Text accessibilityRole="alert" style={common.error}>{error}</Text>}<Button title={busy ? 'Enviando...' : 'Enviar para curadoria'} disabled={busy} onPress={send} />
  </View></ScrollView>;
}
const s = StyleSheet.create({ header: { backgroundColor: colors.brown, padding: 23, paddingTop: 18, paddingBottom: 23 }, title: { fontFamily: fonts.bold, fontSize: 21, color: colors.pink, marginTop: 8 }, upload: { backgroundColor: colors.white, borderWidth: 1.5, borderStyle: 'dashed', borderColor: colors.sand, borderRadius: 15, height: 167, alignItems: 'center', justifyContent: 'center', gap: 9 }, uploadDot: { width: 47, height: 47, borderRadius: 24, backgroundColor: colors.cream }, hint: { fontFamily: fonts.regular, fontSize: 10, color: colors.sand }, conditions: { flexDirection: 'row', gap: 8 }, estimate: { backgroundColor: colors.olive, borderRadius: 13, padding: 17, gap: 6 }, value: { fontFamily: fonts.bold, fontSize: 19, color: colors.pink }, previews: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 }, preview: { width: 67, height: 67, borderRadius: 8 }, remove: { fontFamily: fonts.regular, color: colors.brown, fontSize: 10, marginTop: 5 } });