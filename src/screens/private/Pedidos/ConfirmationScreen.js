import React, { useState, useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { theme_colors } from '../../../utils/theme/theme_colors';
import ViewStyled from '../../../utils/ui/ViewStyled';
import TextStyled from '../../../utils/ui/TextStyled';
import { useNavigation } from '@react-navigation/native';
import { private_name_routes } from '../../../utils/route/private_name_routes';
import { Image, ImageBackground, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ConfirmationScreen() {

    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timeout);
    }, []); 

    const goToFollowOrderScreen = () => {
        navigation.navigate(private_name_routes.empresas.followOrder);
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
                        Enviando orden...
                    </TextStyled>
                </ViewStyled>
            </LinearGradient>
        );
    }

    return (
        <LinearGradient
            colors={[theme_colors.green, theme_colors.primary]}
            style={{
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <View
                style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: theme_colors.transparent,
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
                    style={{
                        top: '-48%',
                        width: '80%',
                        backgroundColor: theme_colors.transparent,
                        borderColor: theme_colors.green,
                        borderWidth: 2,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 30,
                    }}
                >
                    <TextStyled style={{ fontSize: 24, color: theme_colors.white, fontFamily: 'SFPro-Bold', marginBottom: 10 }}>Orden completada</TextStyled>

                    <MaterialIcons name="check-circle" size={60} color="white" />

                    <TextStyled style={{ fontSize: 20, color: theme_colors.white, fontFamily: 'SFPro-Bold', marginTop: 30, marginBottom: 10 }}>Cashback ganado:</TextStyled>
                    
                    <TextStyled style={{ fontSize: 30, color: theme_colors.white, fontFamily: 'SFPro-Bold', marginBottom: 15 }}>Bs. 2,50</TextStyled>
                    
                    <TouchableOpacity
                        onPress={goToFollowOrderScreen}
                        style={{
                            width: '90%',
                            borderRadius: 10,
                            borderWidth: 1,
                            backgroundColor: theme_colors.white,
                            borderColor: theme_colors.white,
                            padding: 10,
                            marginTop: 15,
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
                        <TextStyled style={{ textAlign: 'center', fontSize: 16, color: theme_colors.secondary, fontFamily: 'SFPro-Bold' }}>Ver mi pedido</TextStyled>
                    </TouchableOpacity>
                </ViewStyled>
            </View>
        </LinearGradient>
    );
}
