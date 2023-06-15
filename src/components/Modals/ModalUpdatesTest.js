import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, Modal, Platform } from 'react-native';
import { theme } from '../../utils/theme';
import ViewStyled from '../ui/ViewStyled';
import ImageStyled from '../ui/ImageStyled';
import TextStyled from '../ui/TextStyled';
import ButtonNext from '../Btn/ButtonNext';

export default function ModalUpdateTest({ isModalVisible }) {
    return (
        <>
            <Modal
                visible={isModalVisible}
                animationType="fade"
                transparent={false}
            >
                <ViewStyled
                    width={100}
                    height={100}
                    backgroundColor={theme.dark}
                    paddingTop={5}
                    style={{
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}
                >
                    <ViewStyled
                        width={100}
                        height={45}
                        backgroundColor={theme.transparent}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <ImageStyled
                            style={{
                                resizeMode: 'contain',
                                width: '100%',
                                height: '100%'
                            }}
                            source={require('../../../assets/img/UpdateEntereza.png')}
                        />
                    </ViewStyled>

                    <ViewStyled
                        width={100}
                        height={30}
                        marginTop={5}
                        backgroundColor={theme.transparent}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <TextStyled
                            textAlign='center'
                            fontFamily='BRFirmaBold'
                            fontWeight='bold'
                            color={theme.secondary}
                            fontSize={20}
                            style={{
                                width: '90%',
                                marginTop: 10,
                                marginBottom: 10,
                            }}
                        >
                            Nueva Versión Disponible
                        </TextStyled>
                        <TextStyled
                            textAlign='center'
                            color={theme.primary}
                            fontSize={16}
                            style={{
                                width: '90%',
                                marginBottom: 10,
                            }}
                        >
                            {
                                'Actualizando la aplicación...'
                            }
                        </TextStyled>

                        <ActivityIndicator size="large" color={theme.primary} style={{ marginTop: 15 }} />
                    </ViewStyled>
                </ViewStyled>

            </Modal>
        </>
    );
};