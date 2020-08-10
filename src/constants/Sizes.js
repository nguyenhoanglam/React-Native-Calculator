import {Dimensions} from 'react-native';

export const BUTTON_PADDING = 4;

export const BUTTON_SIZE =
  (Dimensions.get('window').width - BUTTON_PADDING * 8) / 4;

export const BUTTON_ZERO_WIDTH = BUTTON_SIZE * 2 + 2 * BUTTON_PADDING;

export const BUTTON_CLEAR_WIDTH = BUTTON_SIZE * 3 + 4 * BUTTON_PADDING;
