import React, { useEffect } from 'react'
import * as Notifications from 'expo-notifications'
import { useDispatch } from 'react-redux';
import WalletCongrats from '../wallet/WalletCongrats';
import { useNavigation } from '@react-navigation/native';
import { __authGetInfo } from '../../redux/actions/authActions';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export default function NotificacionWallet() {
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const [modalCongrats, setModalCongrats] = React.useState(false)

    const [messageCongrats, setMessageCongrats] = React.useState('')

    const handleCloseModal = () => {
        setMessageCongrats('')
        setModalCongrats(false)
        dispatch(__authGetInfo())

        navigation.reset({
            index: 0,
            routes: [{ name: 'WalletScreen' }]
        });
    }

    function handleNotificationResponse(response) {
        const data = response.notification.request.content.data;
        console.log('Data del contenido de la notificación:', data);

        showModalNotificationCongrats({ dataNotification: data });
    }

    const showModalNotificationCongrats = async ({ dataNotification }) => {
        console.log('DataNotificationShow: ', dataNotification)
        const lastReceivedMessage = dataNotification;
        setModalCongrats(true)

        if (lastReceivedMessage) {
            setMessageCongrats(lastReceivedMessage)
        } else {
            console.log("No message received yet");
        }
    }

    useEffect(() => {
        const receivedSubscription = Notifications.addNotificationReceivedListener(notification => {
            console.log('Received notification: ', notification);
            // Aquí puedes manejar la notificación cuando llega estando dentro de la app
            const data = notification.request.content.data;
            showModalNotificationCongrats({ dataNotification: data });
        });

        const responseSubscription = Notifications.addNotificationResponseReceivedListener(response => {
            // Aquí puedes manejar la notificación cuando el usuario la presiona
            handleNotificationResponse(response);
            console.log('Notification response: ', response);
        });

        return () => {
            receivedSubscription.remove();
            responseSubscription.remove();
        };
    }, []);

    return (
        <>
            <WalletCongrats show={modalCongrats} onShow={handleCloseModal} messageNotification={messageCongrats} />
        </>
    );
}