/* eslint-disable react-native/no-inline-styles */
import React, {ReactNode} from 'react';
import {StyleSheet, TextProps, TouchableOpacity, View} from 'react-native';
import Body from './Body';

interface IButton extends TextProps {
  bColor?: string;
  color?: string;
  text?: string;
  containerStyle?: object;
  renderContent?: () => ReactNode;
  loading?: boolean;
  bottom?: boolean;
}

const Button = ({
  onPress,
  text,
  color = '#fff',
  bColor = '#f55',
  containerStyle,
  loading,
  bottom = false,
}: IButton) => {
  return (
    <View style={bottom && styles.bottom}>
      <TouchableOpacity
        disabled={loading}
        activeOpacity={0.7}
        onPress={onPress}
        style={[
          {
            marginBottom: 15,
            width: '100%',
          },
          containerStyle,
        ]}>
        <View style={[styles.button, {backgroundColor: bColor}]}>
          <Body semiBold color={color} size={15}>
            {text}
          </Body>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 55,
    justifyContent: 'center',
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
});

export default Button;
