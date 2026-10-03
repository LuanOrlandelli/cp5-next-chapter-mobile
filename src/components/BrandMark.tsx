import React from 'react';
import Svg, { ClipPath, Defs, G, Path, Text as SvgText } from 'react-native-svg';
import { colors, fonts } from '../theme';
// Reconstrução vetorial baseada na captura; substituir pelo SVG original para equivalência exata.
export default function BrandMark() {
 return <Svg width="100%" height="100%" viewBox="0 0 320 225" accessibilityLabel="Símbolo Next Chapter">
  <Defs><ClipPath id="mark"><Path d="M5 121 C49 43 123 15 208 7 C266 3 307 29 313 68 C321 117 290 112 286 162 C281 211 235 220 190 211 C124 198 72 148 5 121Z" /></ClipPath></Defs>
  <G clipPath="url(#mark)" fill={colors.logo} stroke={colors.olive} strokeWidth=".6">
   <Path d="M5 121L39 61L58 51L58 85L75 40L97 32L76 103L57 113L40 80L26 124Z" />
   <Path d="M92 34L139 17L131 38L110 46L107 60L124 54L119 73L101 80L96 94L121 85L115 106L69 117Z" />
   <Path d="M137 18L164 9L180 34L196 4L226 0L195 52L219 82L187 99L174 75L157 109L128 113L156 57Z" />
   <Path d="M226 0C271-1 307 24 315 63L310 93L285 65C283 43 271 29 247 26L219 113L190 104L218 28L202 25Z" />
   <G transform="translate(25 83) rotate(17)"><SvgText x="0" y="91" fontFamily={fonts.black} fontWeight="900" fontSize="92" letterSpacing="-8" textLength="294" lengthAdjust="spacingAndGlyphs">CHAPTER</SvgText></G>
  </G>
 </Svg>;
}