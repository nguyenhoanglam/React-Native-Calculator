import React from 'react';
import {StyleSheet} from 'react-native';
import Button from './Button';
import {Colors} from '../themes/Colors';

export default function DigitButton(props) {
  return (
    <Button
      {...props}
      style={[styles.root, props.style]}
      textStyle={[styles.text, props.textStyle]}
    />
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.black,
  },
  text: {
    color: Colors.white,
  },
});
