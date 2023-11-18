import React, {memo} from 'react';
import {View, ViewStyle, StyleSheet} from 'react-native';
import Body from './Body';
import BackButton from './BackButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors} from '../theme/colorTheme';

interface IHeader {
  title: string;
  style?: ViewStyle;
}

const Header = ({title, style}: IHeader) => {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View
      style={[styles.container, {marginTop: safeAreaInsets.top + 26}, style]}>
      <BackButton color={colors.accent} />
      <Body color={colors.accent} center size={22} bold style={styles.title}>
        {title}
      </Body>
      <Body color={colors.accent} center size={25} bold style={styles.title}>
        …
      </Body>
    </View>
  );
};
export default memo(Header);

const styles = StyleSheet.create({
  container: {
    // width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginBottom: 30,
  },
  title: {
    maxWidth: '75%',
    flex: 0,
  },
});
