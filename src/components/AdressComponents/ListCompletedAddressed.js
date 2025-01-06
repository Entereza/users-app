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

export default function ListCompletedAddressed({ listAddresses = [] }) {
    const { selectedAddress: selectedAddressStore, setSelectedAddress: setSelectedAddressStore } = useAddressStore()
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [isDisabled, setIsDisabled] = useState(true)

    const onPressSelect = (address) => {
        if (selectedAddressStore?.id === address.id) {
            setSelectedAddress(null)
            setIsDisabled(true)
        } else {
            setSelectedAddress(address)
            setIsDisabled(false)
        }
    }

    const onPressEdit = (address) => {
        console.log('address for edit: ', address)
    }

    //
    const handleMessage = (message, position = Toast.positions.CENTER, textColor = theme_colors.white, backgroundColor = theme_colors.primary, duration = Toast.durations.SHORT) => {
        Toast.show(message, {
            duration: duration,
            position: position,
            backgroundColor: backgroundColor,
            textColor: textColor,
            shadow: true,
            shadowColor: theme_colors.black,
            opacity: 1,
            containerStyle: {
                width: "auto",
                height: "auto",
                paddingVertical: 15,
                paddingHorizontal: 18,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
            },
            textStyle: {
                fontFamily: "SFPro-SemiBold",
                fontSize: adjustFontSize(11),
            },
        });
    };

    const handleSelectAddress = () => {
        setIsDisabled(true)
        setSelectedAddressStore(selectedAddress)
        handleMessage('Ubicación seleccionada', Toast.positions.BOTTOM)
        setSelectedAddress(null)
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
                    fontSize={10}
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
                    onPress={() => { }}
                    borderWidth={1}
                    borderColor={theme_colors.lightGrey}
                    backgroundColor={theme_colors.transparent}
                    colorText={theme_colors.primary}
                    borderRadius={1.5}
                    fontSize={4}
                    sizeIcon={15}
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
                        onPressEdit={() => onPressEdit(item)}
                    />
                }
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            />

            <ButtonWithIcon
                withIcon={false}

                onPress={handleSelectAddress}
                borderWidth={1}
                borderColor={isDisabled ? theme_colors.lightGrey : theme_colors.primary}
                backgroundColor={isDisabled ? theme_colors.lightGrey : theme_colors.primary}
                colorText={theme_colors.white}
                borderRadius={1.5}
                fontSize={8}
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