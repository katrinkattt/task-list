import React, {memo} from 'react';
import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Body from './Body';

interface IBackButton {
  color?: string;
  style?: ViewStyle;
}
function BackButton({color = '#eee', style}: IBackButton) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={[styles.button, {...style}]}
      activeOpacity={0.7}>
      <Body color={color} size={28}>
        ⇐
      </Body>
    </TouchableOpacity>
  );
}
export default memo(BackButton);

const styles = StyleSheet.create({
  button: {
    marginTop: -8,
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#E8E8F0',
  },
});
