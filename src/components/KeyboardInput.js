import React, {useRef} from 'react';
import {TextInput, StyleSheet} from 'react-native';

export default function KeyboardInput({onKeyPress}) {
  const inputRef = useRef(null);

  const handleKeyPress = (e) => {
    if (onKeyPress) {
      onKeyPress(e.nativeEvent.key);
    }
  };

  const handleSubmitKeyPress = () => {
    if (onKeyPress) {
      onKeyPress('Enter');
    }
  };

  const handleInputBlur = () => {
    inputRef.current.focus();
  };

  return (
    <TextInput
      ref={inputRef}
      value=""
      onKeyPress={handleKeyPress}
      onSubmitEditing={handleSubmitKeyPress}
      showSoftInputOnFocus={false}
      style={styles.input}
      autoFocus={true}
      onBlur={handleInputBlur}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: 0,
    height: 0,
  },
});
