import React, {useState, useEffect} from 'react';
import {Text, StyleSheet} from 'react-native';

import {Colors} from '../themes/Colors';
import {BUTTON_PADDING} from '../constants/Sizes';

export default function ResultDisplay({text}) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  return <Text style={styles.text}>{displayText}</Text>;
}

const styles = StyleSheet.create({
  text: {
    width: '100%',
    fontSize: 56,
    color: Colors.black,
    textAlign: 'right',
    padding: BUTTON_PADDING * 4,
  },
});
