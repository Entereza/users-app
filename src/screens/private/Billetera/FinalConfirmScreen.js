import React, { useState, useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { theme_colors } from '../../../utils/theme/theme_colors';
import ViewStyled from '../../../utils/ui/ViewStyled';
import TextStyled from '../../../utils/ui/TextStyled';
import { useNavigation, useRoute } from '@react-navigation/native';
import { private_name_routes } from '../../../utils/route/private_name_routes';
import { Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function FinalConfirmScreen() {

    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timeout);
    }, []); 

    const goToBilleteraHomeScreen = () => {
        navigation.navigate(private_name_routes.billetera.billeteraHome);
    }

    if (loading) {
        return (
            <LinearGradient
              colors={[theme_colors.green, theme_colors.primary]}
            >
                <ViewStyled
                    width={'100%'}
                    height={'100%'}
                    backgroundColor={theme_colors.transparent}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <TextStyled
                        fontSize={30}
                        color={theme_colors.white}
                        fontFamily='SFPro-Bold'
                        style={{textAlign: 'center'}}
                    >
                        Enviando transferencia...
                    </TextStyled>
                </ViewStyled>
            </LinearGradient>
        );
    }

    return (
        <LinearGradient
            colors={[theme_colors.green, theme_colors.primary]}
        >
            <ViewStyled
                width={'100%'}
                height={'100%'}
                backgroundColor={theme_colors.transparent}
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Image
                    source={require('../../../../assets/confetti.png')}
                    style={{
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        top: '-8%'
                    }}
                    resizeMode='contain'
                />

                <ViewStyled
                    width={'80%'}
                    height={'50%'}
                    style={{
                        top: '-48%',
                        backgroundColor: theme_colors.transparent,
                        borderColor: theme_colors.green,
                        borderWidth: 2,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 25,
                        marginBottom: 25,
                        padding: 30
                    }}
                >
                    <TextStyled
                        fontSize={12}
                        color={theme_colors.white}
                        fontFamily='SFPro-Bold'
                        style={{
                            marginBottom: 20,
                            textAlign: 'center'
                        }}
                    >
                        Transferencia Completada
                    </TextStyled>

                    <MaterialIcons name="check-circle" size={60} color="white" />

                    <TouchableOpacity
                        onPress={goToBilleteraHomeScreen}
                        style={{
                            width: '100%',
                            alignSelf: 'center',
                            borderRadius: 10,
                            borderWidth: 1,
                            backgroundColor: theme_colors.white,
                            borderColor: theme_colors.white,
                            padding: 10,
                            marginTop: 20,
                            elevation: 50,
                            shadowColor: theme_colors.black,
                            shadowOffset: {
                                width: 2,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                        }}
                    >
                        <TextStyled
                            textAlign='center'
                            fontSize={8}
                            color={theme_colors.secondary}
                            style={{
                                fontFamily: 'SFPro-Bold'
                            }}
                        >
                            Ir al menú
                        </TextStyled>
                    </TouchableOpacity>

                    <TouchableOpacity
                        // onPress={goToFollowOrderScreen}
                        style={{
                            width: '100%',
                            alignSelf: 'center',
                            borderRadius: 10,
                            borderWidth: 1,
                            backgroundColor: theme_colors.transparent,
                            borderColor: theme_colors.greyLine,
                            padding: 10,
                            marginTop: 20,
                            elevation: 50,
                            shadowColor: theme_colors.black,
                            shadowOffset: {
                                width: 2,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                        }}
                    >
                        <TextStyled
                            textAlign='center'
                            fontSize={8}
                            color={theme_colors.white}
                            style={{
                                fontFamily: 'SFPro-Bold'
                            }}
                        >
                            Compartir comprobante
                        </TextStyled>
                    </TouchableOpacity>
                </ViewStyled>
            </ViewStyled>
        </LinearGradient>
    );
}
