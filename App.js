/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  Platform,
} from 'react-native';
import ResultDisplay from './src/components/ResultDisplay';
import KeyboardInput from './src/components/KeyboardInput';
import DigitButton from './src/components/DigitButton';
import OperatorButton from './src/components/OperatorButton';

import {Colors} from './src/themes/Colors';
import DeviceInfo from 'react-native-device-info';

import {BUTTON_ZERO_WIDTH, BUTTON_CLEAR_WIDTH} from './src/constants/Sizes';

const INITIAL_DISPLAY_VALUE = '0';

const CalculatorOperations = {
  '/': (prevValue, nextValue) => prevValue / nextValue,
  '*': (prevValue, nextValue) => prevValue * nextValue,
  '+': (prevValue, nextValue) => prevValue + nextValue,
  '-': (prevValue, nextValue) => prevValue - nextValue,
  '=': (prevValue, nextValue) => nextValue,
};

const App = () => {
  const [value, setValue] = useState(null);
  const [displayValue, setDisplayValue] = useState(INITIAL_DISPLAY_VALUE);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const handleKeyPress = (pressedKey) => {
    let key = pressedKey;
    if (key === 'Enter') {
      key = '=';
    }

    if (/\d/.test(key)) {
      inputDigit(parseInt(key, 10));
    } else if (key in CalculatorOperations) {
      inputOperator(key);
    } else if (key === '.') {
      inputDot();
    } else if (key === 'Backspace') {
      clearLastChar();
    } else if (key === 'Clear') {
      clearAll();
    }
  };

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplayValue(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplayValue(
        displayValue === INITIAL_DISPLAY_VALUE
          ? String(digit)
          : displayValue + digit,
      );
    }
  };

  const inputDot = () => {
    if (!/\./.test(displayValue)) {
      setDisplayValue(displayValue + '.');
      setWaitingForOperand(false);
    }
  };

  const inputOperator = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (!value) {
      setValue(inputValue);
    } else if (operator && !waitingForOperand) {
      const currentValue = value || 0;
      const newValue = CalculatorOperations[operator](currentValue, inputValue);
      setValue(newValue);
      setDisplayValue(String(newValue));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const clearLastChar = () => {
    setDisplayValue(
      displayValue.substring(0, displayValue.length - 1) ||
        INITIAL_DISPLAY_VALUE,
    );
  };

  const clearAll = () => {
    setValue(null);
    setDisplayValue(INITIAL_DISPLAY_VALUE);
    setOperator(null);
    setWaitingForOperand(false);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {DeviceInfo.isEmulator() && Platform.OS === 'ios' ? (
            <KeyboardInput onKeyPress={handleKeyPress} />
          ) : null}
          <ResultDisplay text={displayValue} />
          <View style={styles.buttonRow}>
            <DigitButton
              onPress={() => handleKeyPress('Clear')}
              style={styles.clearButton}>
              CLEAR
            </DigitButton>
            <OperatorButton onPress={() => inputOperator('/')}>
              ÷
            </OperatorButton>
          </View>
          <View style={styles.buttonRow}>
            <DigitButton onPress={() => inputDigit(1)}>1</DigitButton>
            <DigitButton onPress={() => inputDigit(2)}>2</DigitButton>
            <DigitButton onPress={() => inputDigit(3)}>3</DigitButton>
            <OperatorButton onPress={() => inputOperator('*')}>
              x
            </OperatorButton>
          </View>
          <View style={styles.buttonRow}>
            <DigitButton onPress={() => inputDigit(4)}>4</DigitButton>
            <DigitButton onPress={() => inputDigit(5)}>5</DigitButton>
            <DigitButton onPress={() => inputDigit(6)}>6</DigitButton>
            <OperatorButton onPress={() => inputOperator('-')}>
              -
            </OperatorButton>
          </View>
          <View style={styles.buttonRow}>
            <DigitButton onPress={() => inputDigit(7)}>7</DigitButton>
            <DigitButton onPress={() => inputDigit(8)}>8</DigitButton>
            <DigitButton onPress={() => inputDigit(9)}>9</DigitButton>
            <OperatorButton onPress={() => inputOperator('+')}>
              +
            </OperatorButton>
          </View>
          <View style={styles.buttonRow}>
            <DigitButton
              onPress={() => inputDigit(0)}
              style={styles.zeroButton}>
              0
            </DigitButton>
            <DigitButton onPress={() => inputDot()}>.</DigitButton>
            <OperatorButton onPress={() => inputOperator('=')}>
              =
            </OperatorButton>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    height: '100%',
    justifyContent: 'flex-end',
    backgroundColor: Colors.lighter,
  },
  result: {
    fontSize: 40,
    textAlign: 'right',
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 32,
    color: Colors.white,
    backgroundColor: Colors.black,
  },
  buttonRow: {
    flexDirection: 'row',
  },
  zeroButton: {
    width: BUTTON_ZERO_WIDTH,
  },
  clearButton: {
    width: BUTTON_CLEAR_WIDTH,
  },
});

export default App;
