import React, { useState } from 'react'
import ViewStyled from '../ui/ViewStyled';
import ImageStyled from '../ui/ImageStyled';
import TextStyled from '../ui/TextStyled'
import { Pressable, Linking, Platform, Modal, View, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AlertStyled from '../ui/AlertStyled';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { theme } from '../../utils/theme';
import adjustFontSize from '../../utils/adjustText';
import { Skeleton, HStack, Center, NativeBaseProvider } from "native-base";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ImageProfile() {
    const User = useSelector(state => state.auth)
    const formDataGet = new FormData();

    const [skeletonImage, setSkeletonImage] = React.useState(true)

    const packageName = 'com.entereza.client'; // Reemplaza con el nombre del paquete de la aplicación

    const openSettings = () => {
        console.log('android or ios')
        if (Platform.OS === 'android') {
            Linking.openSettings();
        } else {
            Linking.openURL(`app-settings:${packageName}`);
        }
    };

    const [showAlert, setShowAlert] = React.useState(false)
    const [alertText, setAlertText] = React.useState({
        title: '',
        message: '',
        type: 'success',
        handleAcept: '',
        showCancelButton: ''
    })
    const handleCloseAlert = () => setShowAlert(false)

    const SkeletonImage = () => {
        return (
            <NativeBaseProvider>
                <Center w="100%" paddingTop={1}>
                    <HStack
                        backgroundColor={theme.transparent}
                        space={1}
                        _dark={{
                            borderColor: "coolGray.500"
                        }}
                        _light={{
                            borderColor: "coolGray.200"
                        }}>
                        <Skeleton
                            speed={1}
                            w={widthPercentageToDP(31)}
                            h={heightPercentageToDP(15)}
                            borderRadius={heightPercentageToDP(7.4)}
                            startColor={theme.skeleton}
                            endColor={theme.secondary}
                            maxW={112}
                            maxHeight={112}
                        />
                    </HStack>
                </Center>
            </NativeBaseProvider>
        )
    }

    const [showImage, setShowImage] = React.useState(null);
    const [operationImg, setOperationImg] = React.useState('A');

    const permissionResultImage = async () => {
        setSkeletonImage(true)

        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        console.log('Permisos Result: ', permissionResult)
        if (permissionResult.granted === true) {
            pickImage()
        } else {
            setShowAlert(true)
            setAlertText({
                title: 'Ha ocurrido un error',
                message: 'Entereza necesita permiso para acceder a la galería de imágenes.',
                type: 'error',
                handleAcept: openSettings,
                showCancelButton: true
            })
            setSkeletonImage(false)
        }
    };

    const [modal, setModal] = useState(false);

    const CloseModals = () => {
        console.log('Close')
        setModal(false)
    }

    const handleOnModal = () => {
        setModal(true)
    }

    const takeNewImage = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();

        if (status === 'granted') {
            console.log('Camera permission accepted');

            try {
                const token = await AsyncStorage.getItem('ENT-TKN')
                const codeUser = await User.info.usuarioBean?.codigo_usuario

                let result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                });

                if (!result.canceled) {
                    setShowImage('')

                    const imageUri = result.assets[0].uri;
                    const imageName = imageUri.split('/').pop();

                    const formData = new FormData();
                    formData.append('codigoUsuario', codeUser);
                    formData.append('imagen', { uri: imageUri, name: imageName, type: 'image/jpeg' });
                    formData.append('operacion', operationImg);

                    const res = await fetch("https://enterezabol.com:8443/entereza/user_img", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${token}`
                        },
                        body: formData
                    });
                    const { entereza, img } = await res.json()

                    //A poner nueva
                    //B editar imagen
                    //C extraer
                    //D eliminar imagen

                    if (entereza.codeError === 'COD200') {
                        console.log('Res: ', entereza)
                        if (operationImg === 'D') {
                            setShowImage(null)
                        } else {
                            showImageProfile()
                        }
                    } else {
                        console.log('Image Results Error: ', entereza)
                        setShowAlert(true)
                        setAlertText({
                            title: 'Error al guardar imagen',
                            message: 'Por favor, intente nuevamente en unos minutos.',
                            type: 'error',
                            handleAcept: handleCloseAlert,
                            showCancelButton: false
                        })
                    }
                } else {
                    console.log('Image Results Error: ', result.assets)
                }
            } catch (error) {
                console.error('Error opening camera:', error);
            }
        } else {
            console.log('Camera permission denied');
        }
    };

    const pickImage = async () => {
        try {
            const token = await AsyncStorage.getItem('ENT-TKN')
            const codeUser = await User.info.usuarioBean?.codigo_usuario

            // No permissions request is necessary for launching the image library
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });


            if (!result.canceled) {
                setShowImage('')

                const imageUri = result.assets[0].uri;
                const imageName = imageUri.split('/').pop();

                const formData = new FormData();
                formData.append('codigoUsuario', codeUser);
                formData.append('imagen', { uri: imageUri, name: imageName, type: 'image/jpeg' });
                formData.append('operacion', operationImg);

                const res = await fetch("https://enterezabol.com:8443/entereza/user_img", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    },
                    body: formData
                });
                const { entereza, img } = await res.json()

                //A poner nueva
                //B editar imagen
                //C extraer
                //D eliminar imagen

                if (entereza.codeError === 'COD200') {
                    console.log('Res: ', entereza)
                    if (operationImg === 'D') {
                        setShowImage(null)
                    } else {
                        showImageProfile()
                    }
                } else {
                    console.log('Image Results Error: ', entereza)
                    setShowAlert(true)
                    setAlertText({
                        title: 'Error al guardar imagen',
                        message: 'Por favor, intente nuevamente en unos minutos.',
                        type: 'error',
                        handleAcept: handleCloseAlert,
                        showCancelButton: false
                    })
                }
            } else {
                console.log('Image Results Error: ', result.assets)
            }
        } catch (error) {
            console.log('Image Results Error2: ', error)
        }
        setSkeletonImage(false)
    };

    const showImageProfile = async () => {
        setSkeletonImage(true)
        try {
            const token = await AsyncStorage.getItem('ENT-TKN')
            const codeUser = await User.info.usuarioBean?.codigo_usuario

            formDataGet.append('codigoUsuario', codeUser);
            formDataGet.append('operacion', 'C');

            const res = await fetch("https://enterezabol.com:8443/entereza/user_img", {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                },
                body: formDataGet
            });

            const { entereza, img } = await res.json()

            if (entereza.codeError === 'COD200') {
                setOperationImg('B')
                setShowImage(img)
                console.log('showImageProfile Results: ', entereza.msgError, '- ', img)
            } else {
                console.log('Error Show Image: ', entereza)
            }
        } catch (error) {
            console.log('Error showImageProfile: ', error)
        } finally {
            setSkeletonImage(false)
        }
    }

    React.useEffect(() => {
        if (User !== null) {
            showImageProfile()
        }
    }, [User])

    return (
        <>
            {
                showAlert
                && (
                    <AlertStyled
                        widthModal={70}
                        heightModal={30}
                        title={alertText.title}
                        message={alertText.message}
                        type={alertText.type}
                        showCancelButton={alertText.showCancelButton}
                        onConfirmPressed={alertText.handleAcept}
                        onCancelPressed={handleCloseAlert}
                        showCloseButton={false}
                    />
                )
            }

            <ViewStyled
                backgroundColor={theme.transparent}
                width={34}
                height={16}
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {
                    skeletonImage
                        ? SkeletonImage()
                        : <ViewStyled
                            width={31}
                            height={15}
                            borderRadius={heightPercentageToDP(7.4)}
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                                maxWidth: 112,
                                maxHeight: 112
                            }}
                        >
                            <ImageStyled
                                source={showImage ? { uri: showImage } : require('../../assets/profile/ProfileIcon.png')}
                                borderRadius={heightPercentageToDP(7.4)}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    resizeMode: 'cover',
                                }}
                            />
                        </ViewStyled>
                }
                {
                    skeletonImage
                        ? <></>
                        : <ViewStyled
                            backgroundColor={theme.transparent}
                            width={10}
                            height={5}
                            borderRadius={heightPercentageToDP(2.5)}
                            style={{
                                position: 'absolute',
                                top: heightPercentageToDP(9),
                                left: widthPercentageToDP(23),
                                alignItems: 'center',
                                justifyContent: 'center',
                                maxWidth: 37,
                                maxHeight: 37
                            }}
                        >
                            <Pressable
                                onPress={handleOnModal}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                            >
                                <ImageStyled
                                    borderRadius={heightPercentageToDP(2.5)} // <-- Agrega esta propiedad
                                    source={require('../../assets/profile/plus.png')}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        resizeMode: 'cover',
                                    }}
                                />
                            </Pressable>
                        </ViewStyled>
                }
            </ViewStyled>

            <Modal
                visible={modal}
                animationType='fade'
                transparent={true}
            >
                <Pressable onPress={CloseModals}>
                    <ViewStyled
                        backgroundColor='#000000AA'
                        style={{
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <Pressable onPress={(event) => event.stopPropagation()}>
                            <ViewStyled
                                width={100}
                                height={20}
                                backgroundColor={theme.background}
                                style={{
                                    alignItems: "center",
                                    justifyContent: "flex-end",
                                    borderTopRightRadius: 45,
                                    borderTopLeftRadius: 45,
                                }}
                            >
                                <Pressable onPress={takeNewImage}>
                                    <View style={styles.pressableContainer}>
                                        <View style={{ marginLeft: 100 }} />
                                        <MaterialCommunityIcons style={{ flex: 1 }} name="camera" size={24} color={theme.secondary} />
                                        <TextStyled style={{ flex: 5 }}>Sacar foto nueva</TextStyled>
                                    </View>
                                </Pressable>
                                <View style={styles.divider} />
                                <Pressable onPress={permissionResultImage}>
                                    <View style={styles.pressableContainer}>
                                        <View style={{ marginLeft: 100 }} />
                                        <MaterialCommunityIcons style={{ flex: 1 }} name="view-gallery-outline" size={24} color={theme.secondary} />
                                        <TextStyled style={{ flex: 5 }}>Seleccionar imagen</TextStyled>
                                    </View>
                                </Pressable>
                            </ViewStyled>
                        </Pressable>
                    </ViewStyled>
                </Pressable>
            </Modal>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    pressableContainer: {
        width: 350,
        height: 40,
        margin: 10,
        backgroundColor: theme.background,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        flexDirection: 'row',
    },
    divider: {
        height: 1,
        width: 350,
        opacity: 0.2,
        backgroundColor: theme.secondary,
    },
});