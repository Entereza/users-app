import React, { useState } from 'react'
import {
    CreditCardInput,
    CreditCardView,
    LiteCreditCardInput,
} from 'react-native-credit-card-input';
import ViewStyled from '../../utils/ui/ViewStyled';
import { theme_colors } from '../../utils/theme/theme_colors';
import { theme_textStyles } from '../../utils/theme/theme_textStyles';
import TextStyled from '../../utils/ui/TextStyled';
import { TextInput } from 'react-native';
import adjustFontSize from '../../utils/ui/adjustText';
import ButtonWithIcon from '../Buttons/ButtonWithIcon';

export default function AddCreditCard() {
    const [focusedField, setFocusedField] = useState();
    const [formData, setFormData] = useState({ valid: false, values: {} })

    const placeholders = {
        number: 'XXXX XXXX XXXX XXXX',
        expiry: 'MM/YY',
        cvc: 'CVC',
        name: 'Titular',
    };

    const handleCardInputChange = (formData) => {
        const { values, valid } = formData;
        setFormData({ valid, values });

        console.log('Card Data:', values);
        console.log('Is Card Valid?', valid);
    };

    const isValidCard = () => {
        return formData.valid && formData?.values?.name;
    }

    const handleSaveCard = () => {
        console.log('Card Data:', formData);
    }

    return (
        <ViewStyled
            width={90}
            backgroundColor={theme_colors.transparent}
            style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <ViewStyled
                borderRadius={1}
                marginBottom={1}
                paddingVertical={1}
                paddingHorizontal={3}
                height={4}
                backgroundColor={formData.valid ? theme_colors.success : Object.keys(formData.values || {}).length > 0 ? theme_colors.danger : `${theme_colors.grey}22`}
                style={{
                    width: 'auto',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <TextStyled
                    fontSize={theme_textStyles.smaller + .5}
                    color={theme_colors.white}
                    numberOfLines={2}
                    ellipsizeMode='tail'
                    style={{
                        fontFamily: 'SFPro-SemiBold',
                    }}
                >
                    {formData.valid ? 'Tarjeta válida' : Object.keys(formData.values || {}).length > 0 ? 'Tarjeta inválida' : 'Tarjeta incompleta'}
                </TextStyled>
            </ViewStyled>

            <CreditCardView
                placeholders={placeholders}
                focusedField={focusedField}
                name={formData?.values?.name}
                type={formData?.values?.type}
                number={formData?.values?.number}
                expiry={formData?.values?.expiry}
                cvc={formData?.values?.cvc}
                style={{
                    borderRadius: 10,
                    alignSelf: 'center',
                    shadowColor: theme_colors.primary,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                    elevation: 3,
                }}
            />

            <LiteCreditCardInput
                placeholderColor={theme_colors.grey}
                inputStyle={{
                    fontFamily: 'SFPro-Regular',
                }}
                placeholders={placeholders}
                onChange={handleCardInputChange}
                onFocusField={setFocusedField}
                style={{
                    width: '90%',
                    marginTop: 15,
                    borderRadius: 10,
                    backgroundColor: theme_colors.white,
                    shadowColor: theme_colors.black,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                    elevation: 3,
                }}
            />

            {
                formData.valid && (
                    <ViewStyled
                        marginTop={2}
                        backgroundColor={theme_colors.white}
                        style={{
                            width: '90%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <TextInput
                            keyboardType="default"
                            style={{
                                width: '100%',
                                height: 'auto',
                                fontSize: adjustFontSize(theme_textStyles.smedium),
                                paddingVertical: 10,
                                paddingHorizontal: 15,
                                borderRadius: 10,
                                backgroundColor: theme_colors.white,
                                shadowColor: theme_colors.black,
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.5,
                                shadowRadius: 2,
                                elevation: 3,
                                fontFamily: 'SFPro-Regular',
                            }}
                            placeholderTextColor={theme_colors.lightGrey2}
                            placeholder={placeholders.name}
                            value={formData?.values?.name}
                            onChangeText={(v) => setFormData({
                                ...formData,
                                values: {
                                    ...formData?.values || {},
                                    name: v,
                                }
                            })}
                            onFocus={() => setFocusedField('name')}
                            autoCorrect={false}
                            underlineColorAndroid={'transparent'}
                            testID="CC_NAME"
                        />
                    </ViewStyled>
                )
            }

            <ButtonWithIcon
                withIcon={false}

                onPress={handleSaveCard}
                borderWidth={1}
                borderColor={isValidCard() ? theme_colors.primary : theme_colors.lightGrey}
                backgroundColor={isValidCard() ? theme_colors.primary : theme_colors.lightGrey}
                colorText={theme_colors.white}
                borderRadius={1.5}
                fontSize={theme_textStyles.smedium}
                height={5}
                fontFamily={'SFPro-Bold'}
                textButton={'Guardar Tarjeta'}
                style={{
                    width: '90%',
                    marginTop: 15,
                }}
            />
        </ViewStyled>
    )
}