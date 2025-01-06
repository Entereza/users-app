import React from 'react'
import { theme_colors } from '../../utils/theme/theme_colors'
import ViewStyled from '../../utils/ui/ViewStyled'
import ProfileImage from './ProfileImage'
import ProfileData from './ProfileData'
import ProfileOptions from './ProfileOptions'
import ProfileCloseSession from './ProfileCloseSession'
import { useNavigation } from '@react-navigation/native'
import { private_name_routes } from '../../utils/route/private_name_routes'
import useAuthStore from '../../utils/tools/interface/authStore'

export default function InfoProfileUser() {
    const navigation = useNavigation()
    const { user } = useAuthStore()

    const goToPersonalDataScreen = () => {
        navigation.navigate(private_name_routes.profile.profileStack, {
            screen: private_name_routes.profile.editProfile,
        });
    }

    const goToChangePassword = () => {
        navigation.navigate(private_name_routes.profile.changePassword)
    }

    const profileOptions = [
        {
            id: 1,
            nameOption: "Datos Personales",
            iconOption: "account",
            onPress: () => goToPersonalDataScreen(),
        },
        {
            id: 2,
            nameOption: "Cambiar Contraseña",
            iconOption: "lock",
            onPress: () => goToChangePassword(),
        },
        {
            id: 3,
            nameOption: "¿Necesitas ayuda?",
            iconOption: "phone",
            onPress: null,
        },
        {
            id: 4,
            nameOption: "Registra tu negocio",
            iconOption: "store",
            onPress: null,
        },
        {
            id: 5,
            nameOption: "Términos y Condiciones",
            iconOption: "file-document-multiple",
            onPress: null,
        },
        {
            id: 6,
            nameOption: "Compartir con amigos",
            iconOption: "share-variant",
            onPress: null,
        },
    ]

    return (
        <ViewStyled
            width={100}
            backgroundColor={theme_colors.transparent}
            style={{
                height: 'auto',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <ProfileImage image={user?.image} />

            <ProfileData userData={user} />

            <ProfileOptions profileOptions={profileOptions} />

            <ProfileCloseSession />
        </ViewStyled>
    )
}