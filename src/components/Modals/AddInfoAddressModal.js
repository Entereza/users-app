import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, Modal, Platform, Pressable, StyleSheet } from 'react-native'
import { theme_colors } from '../../utils/theme/theme_colors'
import ViewStyled from '../../utils/ui/ViewStyled'
import AddInfoAddressData from '../AdressComponents/AddInfoAddressData'
import ButtonWithIcon from '../Buttons/ButtonWithIcon'
import { schemaAddInfoAddress } from '../../utils/tools/interface/schemasFormik'
import { useFormik } from 'formik'
import { theme_textStyles } from '../../utils/theme/theme_textStyles'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import adjustFontSize from '../../utils/ui/adjustText'
import { locationsService } from '../../services/api/empresas/locationsService'
import { showToast } from '../../utils/tools/toast/toastService'
import Toast from 'react-native-root-toast'
import useAuthStore from '../../utils/tools/interface/authStore'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { heightPercentageToDP } from 'react-native-responsive-screen'
import SafeAreaStyled from '../SafeAreaComponents/SafeAreaStyled'

export default function AddInfoAddressModal({
    open,
    handleCloseModal,
    goBackNavigation,
    dataLocation,
    initialData,
    isEditing = false
}) {
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuthStore();
    const { top } = useSafeAreaInsets();

    const formik = useFormik({
        initialValues: {
            nameAddress: isEditing ? initialData.nameAddress : "",
            referencesAddress: isEditing ? initialData.referencesAddress : "",
        },
        validationSchema: schemaAddInfoAddress,
        validateOnChange: true,
        onSubmit: async (values) => {
            setIsLoading(true);
            try {
                const locationData = {
                    clientId: user.id,
                    lat: dataLocation.latitude,
                    lng: dataLocation.longitude,
                    placeName: values.nameAddress,
                    references: values.referencesAddress
                };

                if (isEditing) {
                    await locationsService.updateLocation(initialData.id, locationData);
                    showToast('Ubicación actualizada exitosamente', Toast.positions.BOTTOM);
                } else {
                    await locationsService.createLocation(locationData);
                    showToast('Ubicación guardada exitosamente', Toast.positions.BOTTOM);
                }

                formik.resetForm();
                handleCloseModal();
                goBackNavigation();
            } catch (err) {
                console.error('Error on saving address:', err);
                showToast(
                    `No se pudo ${isEditing ? 'actualizar' : 'guardar'} la ubicación`,
                    Toast.positions.BOTTOM,
                    theme_colors.white,
                    theme_colors.danger
                );
            } finally {
                setIsLoading(false);
            }
        }
    });

    const isDisabled = (formik.dirty && !formik.isValid);

    return (
        <Modal
            visible={open}
            onRequestClose={isLoading ? null : handleCloseModal}
            animationType="fade"
            transparent={true}
        >
            <SafeAreaStyled
                backgroundColor={theme_colors.backgroundModal}
                styleArea={styles.safeArea}
                styleView={styles.container}
            >
                <Pressable
                    onPress={handleCloseModal}
                    style={{
                        top: Platform.OS === 'ios' ? top + 5 : 10,
                        left: 10,
                        position: 'absolute',
                        zIndex: 2
                    }}
                >
                    <ViewStyled
                        width={12}
                        height={6}
                        borderRadius={1.2}
                        backgroundColor={theme_colors.white}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: theme_colors.primary
                        }}
                    >
                        <MaterialCommunityIcons
                            name="close"
                            size={adjustFontSize(theme_textStyles.xlarge)}
                            color={theme_colors.primary}
                        />
                    </ViewStyled>
                </Pressable>

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{
                        width: '100%',
                        height: '100%',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}
                >
                    <ViewStyled
                        width={95}
                        paddingVertical={2}
                        borderRadius={2}
                        backgroundColor={theme_colors.white}
                        style={{
                            height: 'auto',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <AddInfoAddressData formik={formik} disabled={isLoading} />

                        <ButtonWithIcon
                            disabled={isDisabled || isLoading}
                            backgroundColor={isDisabled ? `${theme_colors.grey}22` : theme_colors.primary}
                            loading={isLoading}
                            borderWidth={0}
                            colorText={theme_colors.white}
                            onPress={formik.handleSubmit}
                            borderRadius={1.5}
                            withIcon={false}
                            fontSize={theme_textStyles.medium}
                            fontFamily={'SFPro-Bold'}
                            textButton={isLoading
                                ? (isEditing ? 'Actualizando...' : 'Guardando...')
                                : (isEditing ? 'Actualizar ubicación' : 'Guardar ubicación')
                            }
                            height={6}
                            style={{
                                width: '90%',
                                marginTop: 10
                            }}
                        />
                    </ViewStyled>
                </KeyboardAvoidingView>
            </SafeAreaStyled>
        </Modal>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: theme_colors.transparent,
        flex: 1,
    },
    container: {
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'relative',
        paddingBottom: heightPercentageToDP(2)
    },
});