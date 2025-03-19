import Toast from 'react-native-root-toast';
import { theme_colors } from '../../theme/theme_colors';
import adjustFontSize from '../../ui/adjustText';
import { theme_textStyles } from '../../theme/theme_textStyles';

/**
 * Muestra un mensaje Toast con estilos personalizados
 * @param {string} message - Mensaje a mostrar
 * @param {number} position - Posición del Toast (Toast.positions.BOTTOM, Toast.positions.CENTER, Toast.positions.TOP)
 * @param {string} textColor - Color del texto
 * @param {string} backgroundColor - Color de fondo
 * @param {number} duration - Duración del Toast (Toast.durations.SHORT, Toast.durations.LONG)
 */
export const showToast = (
  message,
  position = Toast.positions.BOTTOM,
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

/**
 * Muestra un mensaje de éxito
 * @param {string} message - Mensaje a mostrar
 * @param {number} position - Posición del Toast
 */
export const showSuccessToast = (message, position = Toast.positions.BOTTOM) => {
  showToast(message, position, theme_colors.white, theme_colors.success);
};

/**
 * Muestra un mensaje de error
 * @param {string} message - Mensaje a mostrar
 * @param {number} position - Posición del Toast
 */
export const showErrorToast = (message, position = Toast.positions.BOTTOM) => {
  showToast(message, position, theme_colors.white, theme_colors.danger);
};

/**
 * Muestra un mensaje de advertencia
 * @param {string} message - Mensaje a mostrar
 * @param {number} position - Posición del Toast
 */
export const showWarningToast = (message, position = Toast.positions.BOTTOM) => {
  showToast(message, position, theme_colors.white, theme_colors.warning);
};

/**
 * Muestra un mensaje informativo
 * @param {string} message - Mensaje a mostrar
 * @param {number} position - Posición del Toast
 */
export const showInfoToast = (message, position = Toast.positions.BOTTOM) => {
  showToast(message, position, theme_colors.white, theme_colors.info);
};

export const toastService = {
  showToast,
  showSuccessToast,
  showErrorToast,
  showWarningToast,
  showInfoToast
}; 