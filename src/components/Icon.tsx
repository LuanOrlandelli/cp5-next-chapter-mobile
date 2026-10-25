import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

export type IconName = 'home' | 'search' | 'sell' | 'exchange' | 'profile';

export default function Icon({ name, color, size = 24 }: { name: IconName; color: string; size?: number }) {
  return <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" accessible={false}>
    {name === 'home' && <Path d="M3 10.5 12 3l9 7.5M5 9v11h5v-6h4v6h5V9" />}
    {name === 'search' && <><Circle cx={10.5} cy={10.5} r={6.5} /><Path d="m16 16 5 5" /></>}
    {name === 'sell' && <><Path d="M5 8h14l1 12H4L5 8Zm4 0V6a3 3 0 0 1 6 0v2M12 11v6m-3-3h6" /></>}
    {name === 'exchange' && <Path d="M4 7h16m-4-4 4 4-4 4M20 17H4m4-4-4 4 4 4" />}
    {name === 'profile' && <><Circle cx={12} cy={7} r={4} /><Path d="M4 21v-2a8 8 0 0 1 16 0v2" /></>}
  </Svg>;
}
