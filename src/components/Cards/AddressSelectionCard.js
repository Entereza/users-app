import React from 'react';
import ViewStyled from '../../utils/ui/ViewStyled';
import { theme_colors } from '../../utils/theme/theme_colors';
import { FontAwesome6, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import TextStyled from '../../utils/ui/TextStyled';
import { Alert, Pressable } from 'react-native';
import adjustFontSize from '../../utils/ui/adjustText';
import { theme_textStyles } from '../../utils/theme/theme_textStyles';
import { useNavigation } from '@react-navigation/native';
import { private_name_routes } from '../../utils/route/private_name_routes';
import { locationsService } from '../../services/api/empresas/locationsService';
import useAddressStore from '../../utils/tools/interface/addressStore';

export default function AddressSelectionCard({ item, isSelected, onPressSelect, canDoActions = true }) {
    const colorIcon = isSelected ? theme_colors.primary : theme_colors.grey
    const iconName = isSelected ? "checkbox-marked-circle-outline" : 'checkbox-blank-circle-outline'
    const colorText = theme_colors.black
    const colorSubtitle = theme_colors.grey

    const navigation = useNavigation()
    const { deleteAddress } = useAddressStore()

    const onPressEdit = () => {
        navigation.navigate(private_name_routes.empresas.editAddress, { location: item })
    }

    const onDelete = async () => {
        Alert.alert(
            "Eliminar ubicación",
            "¿Estás seguro de que deseas eliminar esta ubicación?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await locationsService.deleteLocation(item.id)
                            deleteAddress(item.id)
                        } catch (error) {
                            console.error('Error deleting location:', error)
                            Alert.alert(
                                "Error",
                                "No se pudo eliminar la ubicación",
                                [{ text: "OK" }]
                            )
                        }
                    }
                }
            ]
        )
    }

    return (
        <ViewStyled
            width={95}
            height={10}
            paddingHorizontal={1}
            marginBottom={1}
            backgroundColor={theme_colors.transparent}
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <Pressable onPress={onPressSelect} style={{ flex: 1, height: '100%', marginRight: 10 }}>
                <ViewStyled
                    borderRadius={2}
                    paddingHorizontal={3.5}
                    backgroundColor={theme_colors.white}
                    style={{
                        width: '100%',
                        height: '90%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        shadowColor: theme_colors.black,
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.5,
                        shadowRadius: 2,
                        elevation: 3,
                    }}
                >
                    <Octicons name={"location"} size={adjustFontSize(theme_textStyles.large)} color={colorIcon} />

                    <ViewStyled
                        marginLeft={1}
                        paddingHorizontal={2}
                        height={7}
                        backgroundColor={theme_colors.transparent}
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                        }}
                    >
                        <TextStyled
                            fontSize={theme_textStyles.small}
                            color={colorText}
                            numberOfLines={2}
                            ellipsizeMode='tail'
                            style={{
                                fontFamily: 'SFPro-SemiBold',
                            }}
                        >
                            {item.nameAddress}
                        </TextStyled>

                        <TextStyled
                            fontSize={theme_textStyles.smaller + .5}
                            color={colorSubtitle}
                            numberOfLines={1}
                            ellipsizeMode='tail'
                            style={{
                                fontFamily: 'SFPro-Regular',
                            }}
                        >
                            {item.referencesAddress}
                        </TextStyled>
                    </ViewStyled>

                    <MaterialCommunityIcons name={iconName} size={adjustFontSize(theme_textStyles.smedium)} color={colorIcon} />
                </ViewStyled>
            </Pressable>

            {
                canDoActions && (
                    <>
                        <ActionIcon
                            icon="pencil"
                            color={theme_colors.grey}
                            onPress={onPressEdit}
                        />
                        <ActionIcon
                            icon="trash-can"
                            color={`${theme_colors.danger}99`}
                            onPress={onDelete}
                        />
                    </>
                )
            }
        </ViewStyled >
    );
}

const ActionIcon = ({ icon, color, onPress }) => (
    <Pressable
        onPress={onPress}
        style={{
            width: 'auto',
            height: '70%',
        }}
    >
        <ViewStyled
            backgroundColor={theme_colors.transparent}
            paddingHorizontal={1.2}
            style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <FontAwesome6 name={icon} size={adjustFontSize(theme_textStyles.smedium)} color={color} />
        </ViewStyled>
    </Pressable>
);