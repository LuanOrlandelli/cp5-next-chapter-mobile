import type { ImageSourcePropType } from 'react-native';
// Assets empacotados: funcionam tanto com catálogo local quanto com Supabase.
const images: Record<string, ImageSourcePropType> = {
 'chanel-classic': require('../../assets/products/chanel-classic-standard.png'),
 'lv-neverfull': require('../../assets/products/lv-neverfull-standard.png'),
 'dior-lady': require('../../assets/products/dior-lady-standard.png'),
 'gucci-marmont': require('../../assets/products/gucci-marmont-standard.png'),
 'lv-speedy': require('../../assets/products/lv-speedy-standard.png'),
 'mk-selma': require('../../assets/products/mk-selma-standard.png'),
};
export const productImage = (id: string) => images[id];