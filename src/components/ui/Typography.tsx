import React from 'react';
import { Text, TextStyle } from 'react-native';
import { ColorPalette } from '~data/interfaces/color.interfaces';
import { FontStyles } from '~data/interfaces/fonts.interfaces';
import { fonts } from '~themes/fonts';
import { useAuth } from '~utils/tokenHandling';


interface TypographyProps {
  children: React.ReactNode;
  color?: keyof ColorPalette;
  font?: keyof FontStyles;
  style?: TextStyle | TextStyle[];
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
}

export const Typography = ({
  children = '',
  color = 'textPrimary',
  font = 'bodyMediumRegular',
  style = null,
  numberOfLines,
  ellipsizeMode,
}: TypographyProps) => {
  
  const { theme } = useAuth();


  const typographyStyle: TextStyle = {
    color: theme[color],
    ...fonts[font],
  };

  return (
    <Text
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      style={[typographyStyle, style]}>
      {children}
    </Text>
  );
};