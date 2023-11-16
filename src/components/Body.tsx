import React, {ReactElement, ReactNode} from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';

interface IProps extends TextProps {
  children:
    | ReactNode
    | ReactElement
    | string
    | string[]
    | number
    | (string | number)[];
  center?: boolean;
  size?: number;
  style?: object;
  numberOfLines?: number;
  color?: string;
  opacity?: number;
  bold?: boolean;
  light?: boolean;
  semiBold?: boolean;
  medium?: boolean;
  flex?: boolean;
  right?: boolean;
  regular?: boolean;
}

const Body: React.FC<IProps> = ({
  size = 16,
  children,
  style,
  numberOfLines,
  color = '#444',
  center = false,
  opacity = 1,
  light = false,
  bold = false,
  semiBold = false,
  medium = true,
  flex = false,
  right = false,
  regular = false,
  ...attributes
}) => {
  console.log('color', color);

  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        styles.default,
        {fontSize: size, color: color},
        center && styles.center,
        right && styles.right,
        bold && styles.bold,
        semiBold && styles.semiBold,
        light && styles.light,
        medium && styles.medium,
        regular && styles.regular,
        flex && styles.flex,
        style,
        {opacity},
      ]}
      {...attributes}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  default: {
    fontFamily: 'Gilroy-Regular',
    fontWeight: '400',
  },
  center: {
    textAlign: 'center',
  },
  right: {
    textAlign: 'right',
  },
  bold: {
    fontFamily: 'Gilroy-Bold',
  },
  medium: {
    fontWeight: '500',
  },
  semiBold: {
    fontFamily: 'Gilroy-SemiBold',
  },
  regular: {
    fontFamily: 'Gilroy-Regular',
    fontWeight: '400',
  },
  flex: {flex: 1},
  light: {
    fontFamily: 'Gilroy-Light',
  },
});

export default Body;
