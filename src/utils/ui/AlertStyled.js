import React from 'react'
import { Modal, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TextStyled from './TextStyled'
import ViewStyled from './ViewStyled'
import { theme_colors } from '../theme/theme_colors';
import adjustFontSize from './adjustText';
import { theme_textStyles } from '../theme/theme_textStyles';

const alertTypes = {
    success: { color: theme_colors.success, icon: "check-circle" },
    error: { color: theme_colors.danger, icon: "alert-circle" },
    warning: { color: theme_colors.warning, icon: "alert" },
    info: { color: theme_colors.info, icon: "information" },
    dark: { color: theme_colors.black, icon: "alert-circle" },
};

export default function AlertStyled({
    widthModal = 80,
    heightModal = 35,
    widthText = '95%',
    heightText = 20,
    type = 'success',
    title = "Example title",
    message = "Example message Example message Example message Example message Example message",
    showCancelButton = true,
    showConfirmButton = true,
    showConfirmButtonWidth = '70%',
    textCancelButton = "Cancelar",
    textConfirmButton = "Aceptar",
    onCancelPressed = () => { },
    onConfirmPressed = () => { },
    widthCancel = '40%',
    widthConfirm = '55%',
    showCloseButton = true,
    showAlert,
    onClose
}) {
    const { color, icon, size = theme_textStyles.xlarge + 4 } = alertTypes[type] || alertTypes.success;

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={showAlert}
            style={{
                zIndex: 4
            }}
        >
            <ViewStyled
                width={100}
                height={100}
                backgroundColor={theme_colors.backgroundModal}
                style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <ViewStyled
                    width={widthModal}
                    backgroundColor={theme_colors.white}
                    borderRadius={2}
                    paddingVertical={2}
                    style={{
                        height: 'auto',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {
                        showCloseButton && (
                            <TouchableOpacity
                                style={{
                                    position: 'absolute',
                                    right: '4%',
                                    top: '6%',
                                    zIndex: 2,
                                }}
                                onPress={onClose}
                            >
                                <MaterialCommunityIcons name="close" size={adjustFontSize(theme_textStyles.xlarge)} color={theme_colors.black} />
                            </TouchableOpacity>
                        )
                    }
                    <ViewStyled
                        backgroundColor={theme_colors.transparent}
                        marginBottom={2}
                        style={{
                            width: widthText,
                            height: 'auto',
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                        }}
                    >
                        <MaterialCommunityIcons name={icon} size={adjustFontSize(size)} color={color} />

                        <TextStyled
                            fontSize={theme_textStyles.medium}
                            textAlign='center'
                            fontFamily='SFPro-Bold'
                            color={color}
                            style={{
                                width: '100%',
                            }}
                        >
                            {title}
                        </TextStyled>
                        <TextStyled
                            fontFamily='SFPro-Medium'
                            fontSize={theme_textStyles.smedium}
                            textAlign='center'
                            color={theme_colors.black}
                            style={{
                                marginTop: 5,
                                width: '100%',
                            }}
                        >
                            {message}
                        </TextStyled>
                    </ViewStyled>

                    <ViewStyled
                        backgroundColor={theme_colors.transparent}
                        height={6}
                        style={{
                            width: widthText,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        {
                            showCancelButton &&
                            <TouchableOpacity onPress={onCancelPressed}
                                style={{
                                    marginRight: 10,
                                    width: widthCancel,
                                    height: '100%'
                                }}
                            >
                                <ViewStyled
                                    backgroundColor={theme_colors.white}
                                    borderRadius={2}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderWidth: 1,
                                        borderColor: theme_colors.danger
                                    }}
                                >
                                    <TextStyled
                                        fontSize={theme_textStyles.medium}
                                        color={theme_colors.danger}
                                        fontFamily='SFPro-SemiBold'
                                        textAlign={'center'}
                                        style={{
                                            width: '90%',
                                        }}
                                    >
                                        {textCancelButton}
                                    </TextStyled>
                                </ViewStyled>
                            </TouchableOpacity>
                        }

                        {
                            showConfirmButton
                            &&
                            <TouchableOpacity onPress={onConfirmPressed}
                                style={{
                                    width: widthConfirm,
                                    height: '100%'
                                }}
                            >
                                <ViewStyled
                                    backgroundColor={theme_colors.primary}
                                    borderRadius={2}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <TextStyled
                                        fontSize={theme_textStyles.medium}
                                        color={theme_colors.white}
                                        fontFamily='SFPro-Bold'
                                        textAlign='center'
                                        style={{
                                            width: '90%'
                                        }}
                                    >
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