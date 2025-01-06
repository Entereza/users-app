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

export default function PersonalDataScreen() {
    const { user } = useAuthStore()
    const [userData, setUserData] = useState(null)
    const [isDisabled, setIsDisabled] = useState(true)
    const { nameRouteBack } = useTabBarStore()
    const navigation = useNavigation();

    const goBack = () => {
        isGoingBack.current = true;
        if (nameRouteBack === private_name_routes.billetera.billeteraHome) {
            navigation.navigate(private_name_routes.billetera.billeteraStack, {
                screen: private_name_routes.billetera.profileScreen
            });
        } else if (nameRouteBack === private_name_routes.empresas.empresasHome) {
            navigation.navigate(private_name_routes.empresas.empresasStack, {
                screen: private_name_routes.empresas.profileScreen
            });
        } else {
            navigation.goBack()
        }
    };

    const isGoingBack = useRef(false);

    useFocusEffect(
        useCallback(() => {
            setUserData(user)

            const onBackPress = (e) => {
                if (!isGoingBack.current) {
                    e.preventDefault();
                }
            };

            navigation.addListener('beforeRemove', onBackPress);

            return () => {
                setUserData(null)
                navigation.removeListener('beforeRemove', onBackPress);
            };
        }, [navigation])
    );

    const formik = useFormik({
        initialValues: {
            names: "",
            lastNames: "",
            phoneNumber: "",
            email: "",
        },
        validationSchema: schemaEditProfile,
        validateOnChange: true,
        onSubmit: async (values) => {
            try {
                const dataEditProfile = {
                    names: values.names,
                    lastNames: values.lastNames,
                    email: values.email,
                    phoneNumber: values.phoneNumber,
                };

            } catch (err) {
                console.log('Error on editProfile: ', err)
            }
        }
    });

    useEffect(() => {
        if (userData) {
            formik.setValues({
                names: userData?.names || "",
                lastNames: userData?.lastNames || "",
                phoneNumber: userData?.phoneNumber.toString() || "",
                email: userData?.email || "",
            });
        } else {
            formik.setValues({
                names: "",
                lastNames: "",
                phoneNumber: "",
                email: "",
            });
        }
    }, [userData]);

    useEffect(() => {
        const formValues = formik.values;
        const hasChanges = (
            formValues.names !== (userData?.names || "") ||
            formValues.lastNames !== (userData?.lastNames || "") ||
            formValues.phoneNumber !== (userData?.phoneNumber?.toString() || "") ||
            formValues.email !== (userData?.email || "")
        );

        setIsDisabled(!hasChanges);
    }, [formik.values, userData]);

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
            <HeaderDefaultScreen title={"Datos Personales"} onPress={goBack} />

            <KeyboardAwareScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                enableOnAndroid={true}
                enableAutomaticScroll={true}
                extraScrollHeight={20}
            >
            {
                !userData
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
                            fontSize={7.5}
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
                        <ProfileImage image={userData?.image} />

                        <ProfileData userData={userData} />

                        <ProfilePersonalData formik={formik} />

                        <ButtonWithIcon
                            disabled={isDisabled}
                            backgroundColor={isDisabled ? `${theme_colors.grey}22` : theme_colors.primary}
                            borderWidth={0}
                            colorText={theme_colors.white}
                            onPress={formik.handleSubmit}
                            borderRadius={1.5}
                            withIcon={false}
                            fontSize={8.5}
                            fontFamily={'SFPro-Bold'}
                            textButton={'Guardar cambios'}
                            height={6}
                            style={{ 
                                width: '95%',
                                bottom: 10,
                                marginBottom: 15
                            }}
                        />
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