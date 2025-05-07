import React, { useCallback, useEffect, useRef, useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ViewStyled from "../../../utils/ui/ViewStyled";
import { theme_colors } from "../../../utils/theme/theme_colors";
import HeaderDefaultScreen from "../../../components/Header/HeaderDefaultScreen";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import useTabBarStore from '../../../utils/tools/interface/tabBarStore';
import { private_name_routes } from '../../../utils/route/private_name_routes';
import ProfileImage from '../../../components/ProfileComponents/ProfileImage';
import ProfileData from '../../../components/ProfileComponents/ProfileData';
import ProfilePersonalData from '../../../components/ProfileComponents/ProfilePersonalData';
import useAuthStore from '../../../utils/tools/interface/authStore';
import { useFormik } from 'formik';
import { schemaEditProfile } from '../../../utils/tools/interface/schemasFormik';
import { ActivityIndicator, StyleSheet } from 'react-native';
import TextStyled from '../../../utils/ui/TextStyled';
import ButtonWithIcon from '../../../components/Buttons/ButtonWithIcon';
import { theme_textStyles } from '../../../utils/theme/theme_textStyles';
import { userService } from '../../../services/api/users/userService';
import { showToast } from '../../../utils/tools/toast/toastService';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-root-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PersonalDataScreen() {
    const { user, setUserData } = useAuthStore()
    const [isDisabled, setIsDisabled] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null)
    const navigation = useNavigation();
    const isGoingBack = useRef(false);

    useFocusEffect(
        useCallback(() => {
            const onBackPress = (e) => {
                if (!isGoingBack.current) {
                    isGoingBack.current = true;
                    e.preventDefault();
                    navigation.goBack();
                }
            };

            navigation.addListener('beforeRemove', onBackPress);

            return () => {
                navigation.removeListener('beforeRemove', onBackPress);
                isGoingBack.current = false;
            };
        }, [navigation])
    );

    const handleImagePick = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0]);
        }
    };

    const formik = useFormik({
        initialValues: {
            names: "",
            lastNames: "",
            phoneNumber: "",
            email: "",
            carnet: "",
        },
        validationSchema: schemaEditProfile,
        validateOnChange: true,
        onSubmit: async (values) => {
            try {
                setIsLoading(true);

                const dataEditProfile = {
                    names: values.names,
                    lastnames: values.lastNames,
                    email: user?.email || values.email,
                    phoneNumber: values.phoneNumber,
                    carnet: values.carnet || "",
                };

                if (selectedImage) {
                    dataEditProfile.image = selectedImage;
                }

                const response = await userService.updateProfile(user.id, dataEditProfile);

                console.log('updateProfile: ', response);

                if (response && response.code === 'COD200') {
                    // Actualizar los datos del usuario en el estado global y AsyncStorage
                    const updatedUserData = {
                        ...user,
                        names: response.client.names,
                        lastNames: response.client.lastnames,
                        email: response.client.email,
                        phoneNumber: response.client.phoneNumber,
                        carnet: response.client.carnet || "",
                        image: response.client.img || null,
                        cashback: response.client.cashback,
                        expo: response.client.expo,
                        google: response.client.google,
                        appleId: response.client.appleId,
                        recover: response.client.recover,
                        status: response.client.status
                    };

                    setUserData(updatedUserData);
                    await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));

                    navigation.goBack();
                    showToast(response.msg, Toast.positions.BOTTOM, theme_colors.white, theme_colors.success);
                } else {
                    showToast(response?.msg || 'Error al actualizar datos', Toast.positions.BOTTOM, theme_colors.white, theme_colors.danger);
                }
            } catch (err) {
                console.log('Error on editProfile: ', err);
                showToast('Error al actualizar datos', Toast.positions.BOTTOM, theme_colors.white, theme_colors.danger);
            } finally {
                setIsLoading(false);
            }
        }
    });

    useEffect(() => {
        if (user) {
            formik.setValues({
                names: user?.names || "",
                lastNames: user?.lastNames || "",
                phoneNumber: user?.phoneNumber?.toString() || "",
                email: user?.email || "",
                carnet: user?.carnet || "",
            });
        } else {
            formik.setValues({
                names: "",
                lastNames: "",
                phoneNumber: "",
                email: "",
                carnet: "",
            });
        }
    }, [user]);

    useEffect(() => {
        const formValues = formik.values;
        const hasChanges = (
            formValues.names !== (user?.names || "") ||
            formValues.lastNames !== (user?.lastNames || "") ||
            formValues.phoneNumber !== (user?.phoneNumber?.toString() || "") ||
            formValues.email !== (user?.email || "") ||
            formValues.carnet !== (user?.carnet || "") ||
            selectedImage !== null
        );

        setIsDisabled(!hasChanges || isLoading);
    }, [formik.values, user, selectedImage, isLoading]);

    return (
        <ViewStyled
            backgroundColor={theme_colors.white}
            width={100}
            style={{
                height: '100%',
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}
        >
            <HeaderDefaultScreen title={"Datos Personales"} />

            <KeyboardAwareScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                enableOnAndroid={true}
                enableAutomaticScroll={true}
                extraScrollHeight={20}
            >
                {
                    !user
                        ? <ViewStyled
                            backgroundColor={theme_colors.transparent}
                            width={100}
                            marginTop={3}
                            style={{
                                height: 'auto',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <TextStyled
                                fontSize={theme_textStyles.medium}
                                color={theme_colors.primary}
                                fontFamily='SFPro-SemiBold'
                            >
                                {`Cargando datos personales...`}
                            </TextStyled>

                            <ActivityIndicator
                                size="large"
                                color={theme_colors.primary}
                                style={{ marginTop: 10 }}
                            />
                        </ViewStyled>
                        : <>
                            <ProfileImage
                                image={selectedImage?.uri || user?.image}
                                canEdit
                                onImagePress={handleImagePick}
                            />

                            <ProfileData userData={user} />

                            <ProfilePersonalData formik={formik} />

                            {
                                !isDisabled &&
                                <ButtonWithIcon
                                    disabled={isDisabled || isLoading}
                                    loading={isLoading}
                                    backgroundColor={isDisabled && !isLoading ? `${theme_colors.grey}22` : theme_colors.primary}
                                    borderWidth={0}
                                    colorText={theme_colors.white}
                                    onPress={formik.handleSubmit}
                                    borderRadius={1.5}
                                    withIcon={false}
                                    fontSize={theme_textStyles.medium}
                                    fontFamily={'SFPro-Bold'}
                                    textButton={isLoading ? 'Guardando...' : 'Guardar cambios'}
                                    height={6}
                                    style={{
                                        width: '95%',
                                        marginTop: 150
                                    }}
                                />
                            }
                        </>
                }
            </KeyboardAwareScrollView>
        </ViewStyled>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingBottom: 20,
    },
});