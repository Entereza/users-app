import React, { useState, useEffect } from 'react';
import {  TouchableOpacity, Text, Image } from 'react-native';
import ViewStyled from '../../utils/ui/ViewStyled';
import TextStyled from '../../utils/ui/TextStyled';
import { theme_colors } from '../../utils/theme/theme_colors';
import BiggerGeneralButton from '../Buttons/BiggerGeneralButton';

export default function PedidoCard ({ restaurante, monto, imagen, fecha, hora, onPress }){

    return (
        <ViewStyled
            style={{
                width: '98%',
                height: '18%',
                alignSelf: 'center',
                justifyContent: 'center',
                borderRadius: 15,
                borderWidth: 1,
                backgroundColor: theme_colors.white,
                borderColor: theme_colors.white,
                padding: 10,
                marginTop: 5,
                marginBottom: 15,
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
            <ViewStyled
                backgroundColor={theme_colors.transparent}
                style={{ 
                    width: '100%',
                    height: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <Image 
                    source={imagen}
                    style={{
                        alignSelf: 'center',
                        width: '26%',
                        height: '95%'
                    }}
                />

                <ViewStyled
                    width={'58%'}
                    height={'12%'}
                    backgroundColor={theme_colors.transparent}
                    style={{ 
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                >
                    <ViewStyled
                        width={'40%'}
                        backgroundColor={theme_colors.transparent}
                        style={{ 
                            justifyContent: 'center',
                            alignSelf: 'flex-start'
                        }}
                    >
                        <TextStyled
                            fontSize={8}
                            color={theme_colors.black}
                            style={{
                                fontFamily: 'SFPro-Bold',
                                marginBottom: 10                     
                            }}
                        >
                            {restaurante}
                        </TextStyled>

                        <TextStyled
                            fontSize={10}
                            color={theme_colors.black}
                            style={{
                                fontFamily: 'SFPro-Regular',
                            }}
                        >
                            <Text style={{ color: theme_colors.black, fontFamily: 'SFPro-SemiBold' }}>Total: </Text>
                            <Text>Bs. {monto} </Text>
                        </TextStyled>

                        <TextStyled
                            fontSize={10}
                            color={theme_colors.black}
                            style={{
                                fontFamily: 'SFPro-Regular',
                                marginTop: 2
                            }}
                        >
                            <Text style={{ color: theme_colors.black, fontFamily: 'SFPro-SemiBold' }}>Fecha: </Text>
                            <Text>{fecha} - {hora} </Text>
                        </TextStyled>
                    </ViewStyled>
                    
                    <ViewStyled
                        width={'18%'}
                        height={'13%'}
                        backgroundColor={theme_colors.transparent}
                        style={{
                            alignItems: 'center',
                            flexDirection: 'column-reverse'
                        }}
                    >
                        <TouchableOpacity
                            onPress={onPress}
                            style={{
                            alignSelf: 'stretch',
                            borderRadius: 5,
                            borderWidth: 1,
                            backgroundColor: theme_colors.primary,
                            borderColor: theme_colors.primary,
                            padding: 10,
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
                                fontSize={4.5}
                                color={theme_colors.white}
                                style={{
                                    width: "100%",
                                    fontFamily: 'SFPro-Bold'
                                }}
                            >
                                Repetir
                            </TextStyled>
                        </TouchableOpacity>
                    </ViewStyled>
                </ViewStyled>
            </ViewStyled>
        </ViewStyled>
    );
};