import React, {memo} from 'react';
import {View, ViewStyle, StyleSheet} from 'react-native';
import Body from './Body';
import BackButton from './BackButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface IHeader {
  title: string;
  style?: ViewStyle;
}

const Header = ({title, style}: IHeader) => {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View
      style={[styles.container, {marginTop: safeAreaInsets.top + 26}, style]}>
      <BackButton />

      <Body
        color="rgba(36, 55, 87, 1)"
        center
        size={25}
        bold
        style={styles.title}>
        {title}
      </Body>
    </View>
  );
};
export default memo(Header);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginBottom: 30,
  },
  title: {
    maxWidth: '75%',
    flex: 0,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
  },
});
