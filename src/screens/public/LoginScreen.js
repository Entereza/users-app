import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ViewStyled from '../../utils/ui/ViewStyled';
import { theme_colors } from '../../utils/theme/theme_colors';
import ImageStyled from '../../utils/ui/ImageStyled';
import TextStyled from '../../utils/ui/TextStyled';
import { theme_textStyles } from '../../utils/theme/theme_textStyles';
import TermsConditions from '../../components/public/Auth/TermsConditions';
import TextInputStyled from '../../utils/ui/TextInputStyled';

export default function LoginScreen() {
    const insets = useSafeAreaInsets();

    return (
        <ViewStyled
            backgroundColor={theme_colors.dark}
            style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
            }}
        >
            <ViewStyled
                width={80}
                height={20}
                backgroundColor={theme_colors.transparent}
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ImageStyled
                    source={require('../../../assets/icons/IconColorsEntereza.png')}
                    style={{
                        resizeMode: 'contain',
                        width: '100%',
                        height: '100%'
                    }}
                />
            </ViewStyled>

            <TextStyled
                textAlign='center'
                fontFamily='Artegra-Light'
                fontSize={theme_textStyles.medium}
                color={theme_colors.white}
                style={{
                    marginTop: 10,
                    width: "100%",
                }}
            >
                {'Inicia sesión con '}
                <TextStyled
                    fontFamily='Artegra-Bold'
                    textAlign='center'
                    fontSize={theme_textStyles.large}
                    color={theme_colors.primary}
                    style={{
                        width: "100%",
                    }}
                >
                    {'Entereza'}
                </TextStyled>
            </TextStyled>

            <TextInputStyled
                ref={userRef}
                autoCapitalize='characters'
                value={formik.values.userName}
                label='Código Movil'
                placeholder="Ingresa tu código movil"
                onChangeText={text => formik.setFieldValue('userName', text.toUpperCase())}
                onBlur={() => formik.setFieldTouched('userName')}
                errorMessage={formik.touched.userName && formik.errors.userName}
                placeholderTextColor={styles.textPlaceholder}
                labelStyle={styles.labelInput}
                containerStyle={styles.containerInput}
                inputStyle={styles.inputText}
                sizeIcon={styles.sizeIcon}
                colorIcon={styles.colorIcon}
                errorStyle={styles.errorText}
                returnKeyType='next'
                onSubmitEditing={() => inputs[0].focus()}
            />

            <TermsConditions />
        </ViewStyled>
    )
}