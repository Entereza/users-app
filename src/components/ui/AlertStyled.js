import React from 'react'
import { Modal, TouchableOpacity } from 'react-native'

import { EvilIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import { theme } from '../../utils/theme'
import TextStyled from './TextStyled'
import ViewStyled from './ViewStyled'
import adjustFontSize from '../../utils/adjustText';

export default function AlertStyled({
    widthModal = 80,
    heightModal = 35,
    widthText = 70,
    heightText = 20,
    type = 'success',
    title = "Example title",
    message = "Example message Example message Example message Example message Example message",
    showCancelButton = true,
    showConfirmButton = true,
    textCancelButton = "Cancelar",
    textConfirmButton = "Aceptar",
    onCancelPressed = () => { },
    onConfirmPressed = () => { },
    widthCancel = 26,
    showCloseButton = true,
    showAlert,
    onClose
}) {

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={showAlert}
        >
            <ViewStyled
                backgroundColor='#000000AA'
                style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <ViewStyled
                    width={widthModal}
                    height={type === 'maps' ? heightModal + 3 : heightModal}
                    backgroundColor='#ffffff'
                    borderRadius={2}

                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {
                        showCloseButton
                        && (
                            <TouchableOpacity
                                style={{
                                    position: 'absolute',
                                    right: '4%',
                                    top: '6%',
                                    zIndex: 2,
                                }}
                                onPress={onClose}
                            >
                                <EvilIcons name="close" size={adjustFontSize(26)} color={theme.tertiary} />
                            </TouchableOpacity>
                        )
                    }
                    <ViewStyled
                        backgroundColor={theme.transparent}
                        width={widthText}
                        height={heightText}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <MaterialCommunityIcons
                            name={
                                type === 'success'
                                    ? "check-circle"
                                    : type === 'error'
                                        ? "alert-circle"
                                        : type === 'warning'
                                            ? "alert"
                                            : type === 'info'
                                                ? "information"
                                                : type === 'maps'
                                                    ? "google-maps"
                                                    : "google-downasaur"
                            }
                        size={type === 'maps' ? adjustFontSize(42) : adjustFontSize(30)}
                        color={
                            type === 'success'
                                ? theme.success
                                : type === 'error'
                                    ? theme.danger
                                    : type === 'warning'
                                        ? theme.warning
                                        : type === 'info'
                                            ? theme.info
                                            : type === 'maps'
                                                ? theme.secondary
                                                : theme.purple
                        }
                        />
                        <TextStyled
                            fontSize={type === 'maps' ? 18 : 16}
                            textAlign='center'
                            color={
                                type === 'success'
                                    ? theme.success
                                    : type === 'error'
                                        ? theme.danger
                                        : type === 'warning'
                                            ? theme.warning
                                            : type === 'info'
                                                ? theme.info
                                                : type === 'maps'
                                                    ? theme.secondary
                                                    : theme.purple
                            }
                            fontWeight={'bold'}
                            style={{
                                width: '90%',
                                marginTop: 5,
                            }}
                        >
                            {title}
                        </TextStyled>
                        <TextStyled
                            fontSize={14}
                            textAlign='center'
                            color={theme.tertiary}
                            style={{
                                marginTop: 8,
                                width: '95%',
                            }}
                        >
                            {message}
                        </TextStyled>
                    </ViewStyled>
                    <ViewStyled
                        backgroundColor={theme.transparent}
                        width={widthText}
                        marginTop={type === 'maps' ? 3 : 0}
                        height={6}
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        {
                            showCancelButton
                            &&
                            <TouchableOpacity onPress={onCancelPressed} style={{ marginRight: 10 }}>
                                <ViewStyled
                                    width={widthCancel}
                                    height={5}
                                    backgroundColor={theme.danger}
                                    borderRadius={2}
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <TextStyled
                                        fontSize={13}
                                        color={theme.primary}
                                        textAlign={'center'}
                                        style={{
                                            marginBottom: 3,
                                            // fontFamily: 'Raleway',
                                            width: '90%',
                                        }}>
                                        {textCancelButton}
                                    </TextStyled>
                                </ViewStyled>
                            </TouchableOpacity>
                        }

                        {
                            showConfirmButton
                            &&
                            <TouchableOpacity onPress={onConfirmPressed}>
                                <ViewStyled
                                    width={26}
                                    height={5}
                                    backgroundColor='#888cf3'
                                    borderRadius={2}
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <TextStyled
                                        fontSize={13}
                                        color={theme.primary}
                                        textAlign='center'
                                        style={{
                                            marginBottom: 3,
                                            // fontFamily: 'Raleway',
                                            width: '90%'
                                        }}>
                                        {textConfirmButton}
                                    </TextStyled>
                                </ViewStyled>
                            </TouchableOpacity>
                        }
                    </ViewStyled>
                </ViewStyled>
            </ViewStyled>
        </Modal>
    )
}