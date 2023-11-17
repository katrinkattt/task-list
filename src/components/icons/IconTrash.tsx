import React, {memo} from 'react';
import {Image, View, StyleSheet} from 'react-native';

interface IconTrashProps {
  color?: string;
  height?: number;
}

const IconTrash = ({color = '#aaa', height = 40}: IconTrashProps) => (
  <View>
    <Image
      style={[styles.icon, {tintColor: color, height: height}]}
      source={require('../../public/trash.png')}
    />
  </View>
);
const styles = StyleSheet.create({
  icon: {
    aspectRatio: 0.5,
    resizeMode: 'contain',
  },
});
export default memo(IconTrash);
