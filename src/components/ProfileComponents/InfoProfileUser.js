import React from 'react'
import { Image, Linking, Share } from 'react-native'
import { theme_colors } from '../../utils/theme/theme_colors'
import ViewStyled from '../../utils/ui/ViewStyled'
import ProfileImage from './ProfileImage'
import ProfileData from './ProfileData'
import ProfileOptions from './ProfileOptions'
import ProfileCloseSession from './ProfileCloseSession'
import { useNavigation } from '@react-navigation/native'
import { private_name_routes } from '../../utils/route/private_name_routes'
import useAuthStore from '../../utils/tools/interface/authStore'
import { toastService } from '../../utils/tools/interface/toastService'
import * as FileSystem from 'expo-file-system'
import * as MediaLibrary from 'expo-media-library'
import * as Sharing from 'expo-sharing'

export default function InfoProfileUser() {
    const navigation = useNavigation()
    const { user } = useAuthStore()

    const goToPersonalDataScreen = () => {
        navigation.navigate(private_name_routes.profile.editProfile);
    }

    const goToTransferHistoryScreen = () => {
        navigation.navigate(private_name_routes.profile.transferHistoryScreen);
    };


    const goToChangePassword = () => {
        navigation.navigate(private_name_routes.profile.changePassword)
    }

    const goToHelp = () => {
        const message = `Hola! Mi nombre es ${user?.names}, necesito ayuda con Entereza.`;
        const whatsappUrl = `whatsapp://send?phone=59175469425&text=${encodeURIComponent(message)}`;
        Linking.openURL(whatsappUrl).catch(err => {
            toastService.showErrorToast('No se pudo abrir WhatsApp');
        });
    }

    const goToRegisterBusiness = () => {
        Linking.openURL('https://docs.google.com/forms/d/e/1FAIpQLScgvPQIPtKH7V6ivix01xESDIsdcKZtbJXiznlKScBeoZREPA/viewform');
    }

    const goToTermsAndConditions = () => {
        Linking.openURL('https://docs.google.com/document/d/1ImMXE5n6aj3xaIfJ9xvh3bd5eIzg8w__bB5ftBm3xVw/edit?usp=sharing');
    }

    const goToShare = async () => {
        try {
            // Verificar si el dispositivo soporta compartir
            const isAvailable = await Sharing.isAvailableAsync();
            if (!isAvailable) {
                toastService.showErrorToast('Compartir no está disponible en este dispositivo');
                return;
            }

            // URL de la imagen
            const imageUrl = "https://verdadcontinta.com/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-08-at-11.18.58-1.jpeg";

            // Mensaje para compartir
            const message = `¡Hola! Te invito a descargar Entereza, la app boliviana que te devuelve dinero por tus compras y ahora también ofrece servicio de delivery. Con Entereza, obtienes reembolsos en efectivo al comprar en negocios locales afiliados y puedes pedir tus productos favoritos para recibirlos en casa.​

Descarga la app:

Android: https://play.google.com/store/apps/details?id=com.entereza.client

iOS: https://apps.apple.com/bo/app/entereza/id6443708697

¡Únete a la comunidad de Entereza y empieza a ahorrar mientras disfrutas de tus compras con delivery!`;

            // Compartir usando el diálogo nativo
            await Share.share(
                {
                    message: message,
                    url: imageUrl,
                    title: 'Compartir Entereza'
                },
                {
                    dialogTitle: 'Compartir Entereza',
                    subject: 'Únete a Entereza',
                    tintColor: theme_colors.primary,
                }
            );

        } catch (error) {
            console.error('Error al compartir:', error);
            toastService.showErrorToast('No se pudo compartir la aplicación');
        }
    }

    const profileOptions = [
        {
            id: 1,
            nameOption: "Datos Personales",
            iconOption: "account",
            onPress: () => goToPersonalDataScreen(),
        },
        ...(user?.password ? [{
            id: 2,
            nameOption: "Cambiar Contraseña",
            iconOption: "lock",
            onPress: () => goToChangePassword(),
        }] : []),
        {
            id: 3,
            nameOption: "Ver Transferencias",
            iconOption: "history",
            onPress: goToTransferHistoryScreen,
        },
        {
            id: 4,
            nameOption: "¿Necesitas ayuda?",
            iconOption: "phone",
            onPress: goToHelp,
        },
        {
            id: 5,
            nameOption: "Registra tu negocio",
            iconOption: "store",
            onPress: goToRegisterBusiness,
        },
        {
            id: 6,
            nameOption: "Términos y Condiciones",
            iconOption: "file-document-multiple",
            onPress: goToTermsAndConditions,
        },
        {
            id: 7,
            nameOption: "Compartir con amigos",
            iconOption: "share-variant",
            onPress: goToShare,
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