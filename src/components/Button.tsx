import React, {ReactNode} from 'react';
import {StyleSheet, TextProps, TouchableOpacity, View} from 'react-native';
import Body from './Body';

interface IProps extends TextProps {
  bColor?: string;
  color?: string;
  text?: string;
  containerStyle?: object;
  renderContent?: () => ReactNode;
  loading?: boolean;
}

const Button: React.FC<IProps> = ({
  onPress,
  text,
  color = '#ddd',
  bColor = '#f55',
  containerStyle,
  loading,
}) => {
  return (
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
});

export default Button;
