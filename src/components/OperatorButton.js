import React from 'react';
import {StyleSheet} from 'react-native';
import Button from './Button';
import {Colors} from '../themes/Colors';

export default function OperatorButton(props) {
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
    backgroundColor: Colors.pink,
  },
  text: {
    color: Colors.white,
  },
});
