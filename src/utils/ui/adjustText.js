import { PixelRatio, Dimensions, Platform } from 'react-native';

const { width: deviceWidth } = Dimensions.get('window');

const adjustFontSize = (size) => {
    const scaleFactor = PixelRatio.get();
    let adjustedSize = size * scaleFactor;

    const MIN_FONT_SIZE = 1;
    const MAX_FONT_SIZE = 999;

    if (Platform.isPad || deviceWidth >= 600) {
        adjustedSize *= 3.2;
    } else if (deviceWidth > 400) {
        adjustedSize *= 1.2;
    }

    return Math.max(Math.min(adjustedSize, MAX_FONT_SIZE), MIN_FONT_SIZE);
};

export default adjustFontSize;
