import { StyleSheet } from 'react-native';
export const colors = { olive: '#4B4D34', pink: '#E58DB3', logo: '#FFC5F1', cream: '#F4E6DA', brown: '#4B342B', sand: '#ACA077', rose: '#C67D97', badge: '#778653', white: '#FFFFFF', price: '#C6537D' };
export const fonts = { regular: 'Inter_400Regular', medium: 'Inter_500Medium', bold: 'Inter_700Bold', black: 'Inter_900Black' };
export const common = StyleSheet.create({
  text: { fontFamily: fonts.regular, fontSize: 13, color: colors.brown },
  heading: { fontFamily: fonts.bold, fontSize: 22, color: colors.brown },
  label: { fontFamily: fonts.bold, fontSize: 14, color: colors.brown },
  body: { padding: 22, gap: 16 },
  input: { backgroundColor: colors.white, borderRadius: 12, minHeight: 42, paddingHorizontal: 15, fontFamily: fonts.regular, color: colors.brown, fontSize: 13 },
  error: { fontFamily: fonts.medium, fontSize: 12, color: '#9B2142', marginTop: 8 },
});