import React, { useState, useEffect } from 'react';
import {  ImageBackground, TouchableOpacity } from 'react-native';
import ViewStyled from '../../utils/ui/ViewStyled';
import TextStyled from '../../utils/ui/TextStyled';
import { theme_colors } from '../../utils/theme/theme_colors';
import { FontAwesome } from '@expo/vector-icons';

export default function EmpresaCard ({ restaurante, sucursales, cashback, imagen, imagenP, estado, tiempo, costo, onPress }){

    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                width: '92%',
                alignItems: 'center',
                borderRadius: 10,
                borderWidth: 1,
                backgroundColor: theme_colors.white,
                borderColor: theme_colors.white,
                padding: 8,
                marginRight: 5,
                marginTop: 5,
                marginBottom: 5,
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
                    borderRadius: 10,
                    overflow: 'hidden',
                    marginTop: 5
                }}
            >
                <ImageBackground
                    source={require("../../../assets/empresaPortada.png")}
                    style={{
                        height: 120,
                        resizeMode: 'contain',
                    }}
                >
                    <ViewStyled
                        backgroundColor={theme_colors.transparent}
                        style={{
                            width: '100%',
                            flex: 1,
                            justifyContent: 'flex-end',
                            marginBottom: 10,
                            marginLeft: '70%'
                        }}
                    >
                        <ViewStyled
                            style={{ 
                                width: 85,
                                height: 40,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10,
                                marginRight: 15,
                                backgroundColor: theme_colors.secondary
                            }}
                        >
                            <TextStyled
                                fontSize={10}
                                color={theme_colors.white}
                                style={{
                                    fontFamily: 'SFPro-Bold'
                                }}
                            >
                                Cashback {cashback}%
                            </TextStyled>
                        </ViewStyled>
                    </ViewStyled>
                </ImageBackground>
            </ViewStyled>

            <ViewStyled
                style={{
                    width: '100%',
                    backgroundColor: theme_colors.transparent,
                    padding: 10,
                    justifyContent: 'flex-end',
                }}
            >
                <TextStyled
                    fontSize={7.5}
                    color={theme_colors.black}
                    style={{
                        fontFamily: 'SFPro-Bold'
                    }}
                >
                    {restaurante}
                </TextStyled>

                <ViewStyled
                    width={60}
                    backgroundColor={theme_colors.transparent}
                    style={{ 
                        marginTop: 5,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <ViewStyled
                        width={20}
                        backgroundColor={theme_colors.transparent}
                        style={{ 
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <FontAwesome
                            name={"clock-o"}
                            color={theme_colors.primary}
                            size={15}
                        />
                        <TextStyled
                            fontSize={10}
                            color={theme_colors.grey}
                            style={{
                                fontFamily: 'SFPro-Regular'
                            }}
                        >
                            {tiempo} min
                        </TextStyled>
                    </ViewStyled>

                    <ViewStyled
                        width={15}
                        backgroundColor={theme_colors.transparent}
                        style={{ 
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <FontAwesome
                            name={"motorcycle"}
                            color={theme_colors.primary}
                            size={15}
                        />
                        <TextStyled
                            fontSize={10}
                            color={theme_colors.grey}
                            style={{
                                fontFamily: 'SFPro-Regular'
                            }}
                        >
                            Bs. {costo}
                        </TextStyled>
                    </ViewStyled>

                    <ViewStyled
                        width={15}
                        backgroundColor={theme_colors.transparent}
                        style={{ 
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        { estado === "Abierto" ? (
                            <FontAwesome
                                name={"unlock"}
                                color={theme_colors.primary}
                                size={15}
                            />
                        ) : (
                            <FontAwesome
                                name={"lock"}
                                color={theme_colors.primary}
                                size={15}
                            />
                        )}

                        <TextStyled
                            fontSize={10}
                            color={theme_colors.grey}
                            style={{
                                fontFamily: 'SFPro-Regular'
                            }}
                        >
                            {estado}
                        </TextStyled>
                    </ViewStyled>
                </ViewStyled>
            </ViewStyled>

        </TouchableOpacity>
    );
};