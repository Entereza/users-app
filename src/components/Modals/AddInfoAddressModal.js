import React, { useState } from 'react'
import { Modal, Pressable } from 'react-native'
import { theme_colors } from '../../utils/theme/theme_colors'
import ViewStyled from '../../utils/ui/ViewStyled'
import AddInfoAddressData from '../AdressComponents/AddInfoAddressData'
import ButtonWithIcon from '../Buttons/ButtonWithIcon'
import { schemaAddInfoAddress } from '../../utils/tools/interface/schemasFormik'
import { useFormik } from 'formik'
import { theme_textStyles } from '../../utils/theme/theme_textStyles'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import adjustFontSize from '../../utils/ui/adjustText'
import useAddressStore from '../../utils/tools/interface/addressStore'

export default function AddInfoAddressModal({
    open,
    handleCloseModal,
    goBackNavigation,
    dataLocation
}) {
    const [isLoading, setIsLoading] = useState(false)
    const { listAddresses, addNewAddress } = useAddressStore()

    const formik = useFormik({
        initialValues: {
            nameAddress: "",
            referencesAddress: "",
        },
        validationSchema: schemaAddInfoAddress,
        validateOnChange: true,
        onSubmit: async (values) => {
            setIsLoading(true)
            try {
                const dataAddInfoAddress = {
                    id: listAddresses.length + 1,
                    nameAddress: values.nameAddress,
                    referencesAddress: values.referencesAddress,
                    latitude: dataLocation.latitude,
                    longitude: dataLocation.longitude,
                };

                console.log(dataAddInfoAddress)

                await addNewAddress(dataAddInfoAddress)
            } catch (err) {
                console.log('Error on saving address: ', err)
            } finally {
                setTimeout(() => {
                    formik.resetForm()
                    setIsLoading(false)
                    handleCloseModal()
                    goBackNavigation()
                }, 1000);
            }
        }
    });

    const isDisabled = (formik.dirty && !formik.isValid)

    return (
        <Modal
            visible={open}
            onRequestClose={isLoading ? null : handleCloseModal}
            animationType="fade"
            transparent={true}
        >
            <ViewStyled
                backgroundColor={theme_colors.backgroundModal}
                paddingBottom={1.5}
                style={{
                    height: '100%',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    position: 'relative'
                }}
            >
                <Pressable
                    onPress={handleCloseModal}
                    style={{
                        top: 0,
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
                        textButton={isLoading ? 'Guardando...' : 'Guardar ubicación'}
                        height={6}
                        style={{
                            width: '90%',
                            marginTop: 10
                        }}
                    />
                </ViewStyled>
            </ViewStyled>
        </Modal>
    )
}