import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import ViewStyled from '../../utils/ui/ViewStyled'
import TextStyled from '../../utils/ui/TextStyled'
import { theme_colors } from '../../utils/theme/theme_colors'
import { heightPercentageToDP } from 'react-native-responsive-screen'
import ButtonWithIcon from '../Buttons/ButtonWithIcon'
import AddressSelectionCard from '../Cards/AddressSelectionCard'
import useAddressStore from '../../utils/tools/interface/addressStore'
import Toast from 'react-native-root-toast'
import adjustFontSize from '../../utils/ui/adjustText'
import { theme_textStyles } from '../../utils/theme/theme_textStyles'
import { private_name_routes } from '../../utils/route/private_name_routes'
import { useNavigation } from '@react-navigation/native'
import useTabBarStore from '../../utils/tools/interface/tabBarStore'
import { showToast } from '../../utils/tools/toast/toastService'

export default function ListCompletedAddressed({ listAddresses = [], goBack }) {
    const { selectedAddress: selectedAddressStore, setSelectedAddress: setSelectedAddressStore } = useAddressStore()
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [isDisabled, setIsDisabled] = useState(true)
    const navigation = useNavigation()
    const { changeColorStatusBar } = useTabBarStore()

    const onPressSelect = (address) => {
        if (selectedAddressStore?.id === address.id) {
            setSelectedAddress(null)
            setIsDisabled(true)
        } else {
            setSelectedAddress(address)
            setIsDisabled(false)
        }
    }

    const handleSelectAddress = () => {
        setIsDisabled(true)
        setSelectedAddressStore(selectedAddress)
        showToast(
            'Ubicación seleccionada',
            Toast.positions.BOTTOM,
            theme_colors.white,
            theme_colors.primary
        );
        setSelectedAddress(null)
        goBack()
    }

    const goToAddAddress = () => {
        changeColorStatusBar(theme_colors.transparent);
        navigation.navigate(private_name_routes.empresas.addAddress)
    }

    return (
        <ViewStyled
            backgroundColor={theme_colors.transparent}
            marginTop={1}
            marginBottom={2}
            borderRadius={2}
            paddingVertical={1}
            style={{
                width: '100%',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <ViewStyled
                height={4}
                marginBottom={1}
                backgroundColor={theme_colors.transparent}
                style={{
                    width: '90%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <TextStyled
                    fontFamily='SFPro-Bold'
                    textAlign='left'
                    fontSize={theme_textStyles.medium}
                    color={theme_colors.primary}
                    numberOfLines={1}
                    ellipsizeMode='tail'
                >
                    Selecciona
                </TextStyled>

                <ButtonWithIcon
                    withIcon={true}
                    iconName='plus'
                    MaterialIcons
                    onPress={goToAddAddress}
                    borderWidth={1}
                    borderColor={theme_colors.lightGrey}
                    backgroundColor={theme_colors.transparent}
                    colorText={theme_colors.primary}
                    borderRadius={1.5}
                    fontSize={theme_textStyles.smaller + .5}
                    sizeIcon={theme_textStyles.smedium}
                    marginRightIcon={1}
                    width={45}
                    height={4}
                    fontFamily={'SFPro-SemiBold'}
                    textButton={'Agregar Ubicación'}
                />
            </ViewStyled>

            <ViewStyled
                width={'90%'}
                height={'0.2%'}
                backgroundColor={theme_colors.greyLine}
                style={{
                    alignSelf: 'center',
                    marginBottom: 20,
                    marginTop: 10
                }}
            />

            {listAddresses.length > 0 ? (
                <FlatList
                    contentContainerStyle={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingBottom: heightPercentageToDP(10),
                    }}
                    horizontal={false}
                    scrollEnabled={true}
                    data={listAddresses}
                    renderItem={({ item, index }) =>
                        <AddressSelectionCard
                            key={index}
                            item={item}
                            isSelected={
                                selectedAddress
                                    ? selectedAddress?.id === item.id
                                    : selectedAddressStore?.id === item.id
                            }
                            onPressSelect={() => onPressSelect(item)}
                        />
                    }
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <ViewStyled
                    backgroundColor={theme_colors.transparent}
                    width={90}
                    height={5}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <TextStyled
                        fontFamily='SFPro-Italic'
                        textAlign='center'
                        fontSize={theme_textStyles.smedium}
                        color={theme_colors.grey}
                        style={{
                            width: "100%",
                        }}
                    >
                        Aún no tienes ninguna ubicación
                    </TextStyled>
                </ViewStyled>
            )}

            <ButtonWithIcon
                withIcon={false}

                onPress={handleSelectAddress}
                borderWidth={1}
                borderColor={isDisabled ? theme_colors.lightGrey : theme_colors.primary}
                backgroundColor={isDisabled ? theme_colors.lightGrey : theme_colors.primary}
                colorText={theme_colors.white}
                borderRadius={1.5}
                fontSize={theme_textStyles.medium}
                height={6}
                fontFamily={'SFPro-Bold'}
                textButton={'Elegir Ubicación'}
                style={{
                    width: '95%',
                    marginTop: 'auto',
                }}
            />
        </ViewStyled>
    )
}