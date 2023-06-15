import React, { useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'

import { Formik } from 'formik'
import { useSelector } from 'react-redux'

import TextInputStyled from '../components/ui/TextInputStyled'
import ViewStyled from '../components/ui/ViewStyled'
import { theme } from '../utils/theme'
import ButtonTextStyled from '../components/ui/ButtonTextStyled'
import { fetchWithToken } from '../utils/fetchWithToken'
import { codeErrors } from '../utils/codeErrors'
import { schemaChangePassword } from '../utils/schemas'
import ImageStyled from '../components/ui/ImageStyled'
import AlertStyled from '../components/ui/AlertStyled'
import { useNavigation } from '@react-navigation/native'
import ProfileOptionsPassword from '../components/profile/ProfileOptionsPassword'
import adjustFontSize from '../utils/adjustText'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import ProfileOptionsInfo from '../components/profile/ProfileOptionsInfo'

export default function PersonalInfo({ route }) {
    const { enterezaAccount, buttonOpen } = route.params;

    console.log('enterezaAccount: ', enterezaAccount)

    const navigation = useNavigation()

    const [showAlert, setShowAlert] = useState(false)
    const [alertText, setAlertText] = useState({
        title: '',
        message: '',
        type: 'success',
        back: false
    })

    const handleCloseAlert = () => setShowAlert(false)
    const handleOnCloseAlertAndGoBack = () => {
        setShowAlert(false)
        navigation.goBack()
    }

    const DeleteAccount = () => {
        navigation.navigate('DeleteAccount');
    }

    const handleChangePassword = () => {
        navigation.navigate('ProfilePassword');
    }

    const handleChangeName = () => {
        navigation.navigate('ProfileName');
    }

    const handleCompletePerfil = () => {
        navigation.navigate('CompletePerfil')
    }

    return (
        <ScrollView
            contentContainerStyle={{
                flexGrow: 1,
            }}
            showsVerticalScrollIndicator={false}
            scrollToOverflowEnabled={false}
        >
            {
                showAlert
                && (
                    <AlertStyled
                        widthModal={70}
                        heightModal={30}
                        heightText={20}
                        title={alertText.title}
                        message={alertText.message}
                        type={alertText.type}
                        showCancelButton={false}
                        onConfirmPressed={alertText.back ? handleOnCloseAlertAndGoBack : handleCloseAlert}
                        showCloseButton={false}
                    />
                )
            }
            <ViewStyled
                backgroundColor={theme.background}
                width={100}
                height={100}
                style={{
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}
            >
                <ViewStyled
                    backgroundColor={theme.transparent}
                    marginTop={1}
                    width={100}
                    height={50}
                    style={{
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}
                >
                    <ProfileOptionsInfo
                        title='Actualizar Datos'
                        onPress={handleChangeName}
                    >
                        <MaterialCommunityIcons
                            name="account-circle-outline"
                            size={adjustFontSize(26)}
                            color={theme.secondary}
                            style={{
                                ...styles.optionIcon,
                                backgroundColor: `${theme.secondary}30`
                            }}
                        />
                    </ProfileOptionsInfo>

                    {
                        buttonOpen
                            ? <ProfileOptionsInfo
                                title='Completar Perfil'
                                onPress={handleCompletePerfil}
                            >
                                <MaterialCommunityIcons
                                    name={"account-alert"}
                                    size={adjustFontSize(26)}
                                    color={"#FF9085"}
                                    style={{
                                        ...styles.optionIcon,
                                        backgroundColor: `${'#FF9085'}30`
                                    }}
                                />
                            </ProfileOptionsInfo>
                            : <></>
                    }

                    <ProfileOptionsPassword
                        title='Cambiar Contraseña'
                        nextScreen={true}
                        onPress={handleChangePassword}
                        entereza={enterezaAccount}
                    >
                        <MaterialCommunityIcons
                            name="lock-reset"
                            size={adjustFontSize(26)}
                            color="#76D978"
                            style={{
                                ...styles.optionIcon,
                                backgroundColor: `${'#76D978'}30`
                            }}
                        />
                    </ProfileOptionsPassword>

                    <ProfileOptionsInfo
                        title={'Eliminar Cuenta'}
                        onPress={DeleteAccount}
                    >
                        <Ionicons
                            name="trash-bin-outline"
                            size={adjustFontSize(26)}
                            color={theme.danger}
                            style={{
                                ...styles.optionIcon,
                                backgroundColor: `${theme.danger}30`,
                            }}
                        />
                    </ProfileOptionsInfo>
                </ViewStyled>
            </ViewStyled>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    optionIcon: {
        padding: '2%',
        marginRight: '3%',
        borderRadius: 10,
    }
})