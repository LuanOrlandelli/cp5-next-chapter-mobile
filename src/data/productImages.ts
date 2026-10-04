import type { ImageSourcePropType } from 'react-native';
// Assets empacotados: funcionam tanto com catálogo local quanto com Supabase.
const images: Record<string, ImageSourcePropType> = {
 'chanel-classic': require('../../assets/products/chanel-classic.jpg'),
 'lv-neverfull': require('../../assets/products/lv-neverfull.jpg'),
 'dior-lady': require('../../assets/products/dior-lady.jpg'),
 'gucci-marmont': require('../../assets/products/gucci-marmont.jpg'),
};
export const productImage = (id: string) => images[id];