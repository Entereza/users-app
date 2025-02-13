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

export default function PersonalDataScreen() {
    const { user } = useAuthStore()
    const [isDisabled, setIsDisabled] = useState(true)

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
        if (user) {
            formik.setValues({
                names: user?.names || "",
                lastNames: user?.lastNames || "",
                phoneNumber: user?.phoneNumber.toString() || "",
                email: user?.email || "",
            });
        } else {
            formik.setValues({
                names: "",
                lastNames: "",
                phoneNumber: "",
                email: "",
            });
        }
    }, [user]);

    useEffect(() => {
        const formValues = formik.values;
        const hasChanges = (
            formValues.names !== (user?.names || "") ||
            formValues.lastNames !== (user?.lastNames || "") ||
            formValues.phoneNumber !== (user?.phoneNumber?.toString() || "") ||
            formValues.email !== (user?.email || "")
        );

        setIsDisabled(!hasChanges);
    }, [formik.values, user]);

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
                            <ProfileImage image={user?.image} canEdit />

                            <ProfileData userData={user} />

                            <ProfilePersonalData formik={formik} />

                            <ButtonWithIcon
                                disabled={isDisabled}
                                backgroundColor={isDisabled ? `${theme_colors.grey}22` : theme_colors.primary}
                                borderWidth={0}
                                colorText={theme_colors.white}
                                onPress={formik.handleSubmit}
                                borderRadius={1.5}
                                withIcon={false}
                                fontSize={theme_textStyles.medium}
                                fontFamily={'SFPro-Bold'}
                                textButton={'Guardar cambios'}
                                height={6}
                                style={{
                                    width: '95%',
                                    marginTop: 150
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