import React from 'react';
import {View} from 'react-native';
import Header from '../components/Header';
import Body from '../components/Body';

export const EditorTaskScreen = () => {
  return (
    <>
      <Header title="Редактировать" />
      <View>
        <Body color="#fff" size={24}>
          EditorTask
        </Body>
      </View>
    </>
  );
};

// const styles = StyleSheet.create({
//   EditorTaskText: {
//     fontSize: 20,
//     fontWeight: '600',
//   },
// });
