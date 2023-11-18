import React, {memo, useCallback, useState} from 'react';
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TextProps,
  View,
} from 'react-native';
import {useField, useFormikContext} from 'formik';
import Body from './Body';

interface IProps extends TextProps {
  placeholder?: string;
  containerStyle?: object;
  label?: string;
  name: string;
  maxLength?: number;
  backgroundColor?: string;
  container2Style?: object;
  parolInput?: boolean;
  validate?: (value: string) => string | undefined;
  keyboardType?: KeyboardTypeOptions;
  hideError?: boolean;
  secureTextEntry?: boolean;
  position?: 'top' | 'center' | 'bottom';
  cardNum?: boolean;
  visual?: boolean;
  numberOfLines?: number;
}

const FormikInput: React.FC<IProps> = ({
  placeholder,
  name,
  validate,
  secureTextEntry,
  keyboardType,
  label,
  containerStyle,
  maxLength,
  hideError,
  position = '',
  visual,
  numberOfLines = 1,
  ...attributes
}) => {
  const [leftFocus, setLeftFocus] = useState(false);
  const [field, meta, helpers] = useField({name, validate});
  const {submitCount} = useFormikContext();

  const onFocus = useCallback(() => {
    setLeftFocus(true);
    helpers.setTouched(false);
  }, [helpers]);

  const onBlur = useCallback(() => {
    setLeftFocus(false);
  }, []);

  const onChangeText = useCallback(async (value: string) => {
    if (!visual) {
      helpers.setValue(value);
    }
  }, []);

  const showError = (submitCount || leftFocus) && meta.error && !hideError;

  const containerStyles = [
    styles.inputBox,
    {
      backgroundColor: !leftFocus
        ? 'rgba(255, 255, 255, 0.5)'
        : 'rgba(255, 255, 255, 0.3)',
      borderTopLeftRadius: ['bottom', 'center'].includes(position) ? 0 : 10,
      borderTopRightRadius: ['bottom', 'center'].includes(position) ? 0 : 10,
      borderTopWidth: ['bottom', 'center'].includes(position) ? 0 : 1,

      borderBottomLeftRadius: ['top', 'center'].includes(position) ? 0 : 10,
      borderBottomRightRadius: ['top', 'center'].includes(position) ? 0 : 10,
    },
    containerStyle,
  ];

  return (
    <View style={[containerStyles, {height: numberOfLines * 70}]}>
      {label && (
        <Body
          size={13}
          color={leftFocus ? 'rgba(161, 173, 191, 1)' : 'rgba(87, 87, 87, 1)'}
          medium
          style={styles.label}>
          {label}
        </Body>
      )}

      <TextInput
        onFocus={onFocus}
        onBlur={onBlur}
        style={styles.input}
        value={String(field.value)}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        multiline={true}
        placeholderTextColor="rgba(0, 0, 0, 0.46)"
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        maxLength={maxLength}
        numberOfLines={numberOfLines}
        {...attributes}
      />
      {showError ? (
        <View style={{position: 'absolute', bottom: 0}}>
          <Text style={styles.errorText}>{meta.error}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    width: '100%',
    height: 76,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#E8E8F0',
  },
  inputBox2: {
    width: '100%',
    height: 76,
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: 'gray',
  },
  input: {
    fontSize: 15,
    color: 'rgba(36, 55, 87, 1)',
    width: '100%',
    height: '100%',
    paddingTop: 36,
    paddingBottom: 18,
    paddingHorizontal: 31,
    fontFamily: 'Gilroy-Light',
  },
  label: {
    position: 'absolute',
    left: 31,
    top: 10,
  },
  errorText: {
    marginTop: 10,
    color: 'red',
    marginHorizontal: 16,
    fontFamily: 'Gilroy-Light',
    fontSize: 13,
  },
});

export default memo(FormikInput);
