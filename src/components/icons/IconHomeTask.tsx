import React, {memo} from 'react';
import {Image, View, StyleSheet} from 'react-native';

interface IconHomeTaskProps {
  color?: string;
  height?: number;
}
const IconHomeTask = ({color = '#aaa', height = 50}: IconHomeTaskProps) => (
  <View>
    <Image
      style={[styles.icon, {tintColor: color, height: height}]}
      source={require('../../public/checklist.png')}
    />
  </View>
);

export default memo(IconHomeTask);

const styles = StyleSheet.create({
  icon: {
    aspectRatio: 0.5,
    resizeMode: 'contain',
  },
});
