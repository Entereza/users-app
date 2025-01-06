import React from 'react';
import ViewStyled from '../../utils/ui/ViewStyled';
import TextStyled from '../../utils/ui/TextStyled';
import { theme_colors } from '../../utils/theme/theme_colors';
import { ImageBackground, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function CreditCard({ bank, number, name, expiry, cvv }) {
  return (
    <ImageBackground
        source={require('../../../assets/creditCard.png')}
        style={{
            padding: 20,
        }}  
    >
        <ViewStyled
            backgroundColor={theme_colors.transparent}
            style={{ 
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}
        >
            <ViewStyled
                width={'50%'}
                backgroundColor={theme_colors.transparent}
                style={{
                    alignContent: 'center',
                    justiFyContent: 'center'
                }}
            >
                <TextStyled
                    style={{
                        color: 'white',
                        fontSize: 20,
                        marginBottom: 20,
                        fontFamily: 'SFPro-Bold'
                    }}  
                > 
                    {bank}
                </TextStyled>

                <TextStyled
                    style={{
                        color: 'white',
                        fontSize: 18,
                        marginBottom: 20,
                        fontFamily: 'SFPro-Bold'
                    }}  
                > 
                    {number}
                </TextStyled>

                <TextStyled
                    style={{
                        color: 'white',
                        fontSize: 14,
                        marginBottom: 10,
                        fontFamily: 'SFPro-Medium'
                    }}  
                > 
                    Vence el {expiry}
                </TextStyled>

                <TextStyled
                    style={{
                        color: 'white',
                        fontSize: 14,
                        marginBottom: 10,
                        fontFamily: 'SFPro-Bold',
                        textTransform: 'uppercase',
                    }}  
                > 
                    {name}
                </TextStyled>
            </ViewStyled>

            <ViewStyled
                backgroundColor={theme_colors.transparent}
                style={{
                    alignItems: 'flex-end',
                    position: 'relative',
                }}
            >
                <TouchableOpacity
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 30,
                        backgroundColor: 'rgba(28, 28, 28, 0.2)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 10,
                    }}
                >
                    <FontAwesome name='trash-o' size={20} color={theme_colors.white} />
                </TouchableOpacity>

                <Image
                    source={require('../../../assets/visa.png')}
                    style={{
                        position: 'absolute',
                        bottom: 0,
                    }}
                />
            </ViewStyled>
        </ViewStyled>
    </ImageBackground>
  );
};