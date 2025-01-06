import React from 'react';
import { theme_colors } from '../../utils/theme/theme_colors';
import TextStyled from '../../utils/ui/TextStyled';
import ViewStyled from '../../utils/ui/ViewStyled';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { private_name_routes } from '../../utils/route/private_name_routes';

export default function ResumeCard ({ title, productos, envio, cupon, cashback }) {

    const navigation = useNavigation();

    const goToCashbackScreen = () => {
        navigation.navigate(private_name_routes.empresas.cashbackScreen, {
            cashback: '14.50'
        });
    }

    return (
        <View
            backgroundColor={theme_colors.white}
            style={{
                width: '95%',
                marginTop: 15,
                borderRadius: 10,
                elevation: 50,
                shadowColor: theme_colors.black,
                shadowOffset: {
                    width: 1,
                    height: 1,
                },
                shadowOpacity: 0.15,
                shadowRadius: 4,
                alignItems: 'center',
                padding: 15
            }}
        >
            <View
                width={'100%'}
                backgroundColor={theme_colors.transparent}
                style={{
                    justifyContent: 'flex-start'
                }}
            >
                <TextStyled
                    fontSize={10}
                    color={theme_colors.black}
                    style={{
                        fontFamily: 'SFPro-Bold',
                    }}
                >
                    {title}
                </TextStyled>

                <View
                    width={'100%'}
                    height={'0.2%'}
                    backgroundColor={theme_colors.requiredGrey}
                    style={{
                        alignSelf: 'center',
                        marginTop: 10
                    }}
                />

                <View
                    backgroundColor={theme_colors.transparent}
                    style={{
                        marginTop: 8,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <TextStyled
                        fontSize={7}
                        color={theme_colors.black}
                        style={{
                            fontFamily: 'SFPro-Medium',
                        }}
                    >
                        Productos
                    </TextStyled>

                    <TextStyled
                        fontSize={7}
                        color={theme_colors.black}
                        style={{
                            fontFamily: 'SFPro-Medium',
                        }}
                    >
                        Bs. {productos}
                    </TextStyled>
                </View>

                <View
                    backgroundColor={theme_colors.transparent}
                    style={{
                        marginTop: 8,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <View
                        width={'28%'}
                        backgroundColor={theme_colors.transparent}
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <TextStyled
                            fontSize={7}
                            color={theme_colors.black}
                            style={{
                                fontFamily: 'SFPro-Medium',
                            }}
                        >
                            Envío
                        </TextStyled>

                        {envio === "0" && (
                            <View
                                width={'60%'}
                                backgroundColor={theme_colors.green}
                                style={{
                                    padding: 3,
                                    alignItems: 'center',
                                    borderRadius: 5,
                                    marginLeft: 10
                                }}
                            >
                                <TextStyled
                                    fontSize={4.5}
                                    color={theme_colors.white}
                                    style={{
                                        fontFamily: 'SFPro-Regular',
                                    }}
                                >
                                    Gratis
                                </TextStyled>
                            </View>
                        )}
                    </View>

                    <TextStyled
                        fontSize={7}
                        color={theme_colors.black}
                        style={{
                            fontFamily: 'SFPro-Medium',
                        }}
                    >
                        Bs. {envio}
                    </TextStyled>
                </View>

                <View
                    backgroundColor={theme_colors.transparent}
                    style={{
                        marginTop: 8,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <TextStyled
                        fontSize={7}
                        color={theme_colors.black}
                        style={{
                            fontFamily: 'SFPro-Medium',
                        }}
                    >
                        Cupón
                    </TextStyled>

                    <TextStyled
                        fontSize={7}
                        color={theme_colors.black}
                        style={{
                            fontFamily: 'SFPro-Medium',
                        }}
                    >
                        Bs. {cupon}
                    </TextStyled>
                </View>

                <View
                    backgroundColor={theme_colors.transparent}
                    style={{
                        marginTop: 8,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <TextStyled
                        fontSize={7}
                        color={theme_colors.primary}
                        style={{
                            fontFamily: 'SFPro-Bold',
                        }}
                    >
                        Mi cashback
                    </TextStyled>

                    {cashback === true ? (
                        <TouchableOpacity
                            onPress={goToCashbackScreen}
                            backgroundColor={theme_colors.white}
                            style={{
                                borderColor: theme_colors.greyLine,
                                borderWidth: 1,
                                padding: 3,
                                alignItems: 'center',
                                borderRadius: 5
                            }}
                        >
                            <TextStyled
                                fontSize={4.5}
                                color={theme_colors.secondary}
                                style={{
                                    fontFamily: 'SFPro-Medium',
                                }}
                            >
                                Seleccionar
                            </TextStyled>
                        </TouchableOpacity> 
                    ) : ( 
                        <TouchableOpacity
                            onPress={goToCashbackScreen}
                            backgroundColor={theme_colors.transparent}
                            style={{
                                alignItems: 'center',
                            }}
                        >
                            <TextStyled
                                fontSize={7}
                                color={theme_colors.primary}
                                style={{
                                    fontFamily: 'SFPro-Medium',
                                    textDecorationLine: 'underline',
                                }}
                            >
                                Bs. {cashback}
                            </TextStyled>
                        </TouchableOpacity>
                    )}
                </View>

                <View
                    backgroundColor={theme_colors.requiredGrey}
                    style={{
                        width: '100%',
                        height: 1,
                        marginTop: 8,
                        alignSelf: 'center'
                    }}
                />

                <View
                    backgroundColor={theme_colors.transparent}
                    style={{
                        marginTop: 8,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <TextStyled
                        fontSize={9}
                        color={theme_colors.black}
                        style={{
                            fontFamily: 'SFPro-Bold',
                        }}
                    >
                        Total
                    </TextStyled>

                    <TextStyled
                        fontSize={9}
                        color={theme_colors.black}
                        style={{
                            marginLeft: 15,
                            marginTop: 2,
                            fontFamily: 'SFPro-Bold',
                        }}
                    >
                        Bs. {productos}
                    </TextStyled>
                </View>
            </View>
        </View>
    );
};