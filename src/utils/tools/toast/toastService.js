import Toast from 'react-native-root-toast';
import { theme_colors } from '../../theme/theme_colors';
import { theme_textStyles } from '../../theme/theme_textStyles';
import adjustFontSize from '../../ui/adjustText';

export const showToast = (
    message,
    position = Toast.positions.CENTER,
    textColor = theme_colors.white,
    backgroundColor = theme_colors.primary,
    duration = Toast.durations.SHORT
) => {
    Toast.show(message, {
        duration: duration,
        position: position,
        backgroundColor: backgroundColor,
        textColor: textColor,
        shadow: true,
        shadowColor: theme_colors.black,
        opacity: 1,
        containerStyle: {
            width: "auto",
            height: "auto",
            paddingVertical: 15,
            paddingHorizontal: 18,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
        },
        textStyle: {
            fontFamily: "SFPro-SemiBold",
            fontSize: adjustFontSize(theme_textStyles.smaller + .5),
        },
    });
}; 