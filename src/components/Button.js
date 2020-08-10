import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

import {BUTTON_PADDING, BUTTON_SIZE} from '../constants/Sizes';

export default function Button({children, onPress, style, textStyle}) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.root, style]}>
      <Text children={children} style={[styles.text, textStyle]} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    margin: BUTTON_PADDING,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
  },
});
