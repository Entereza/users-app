import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Linking } from 'react-native';
import * as Notifications from 'expo-notifications';
import PrivateNavigation from './private/PrivateNavigation';
import useAuthStore from '../utils/tools/interface/authStore';
import LoaderScreen from '../screens/LoaderScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { theme_colors } from '../utils/theme/theme_colors';
import useTabBarStore from '../utils/tools/interface/tabBarStore';
import PublicNavigation from './public/PublicNavigation';

export default function AppNavigation() {
    const { user, getUserData, isChecking, setIsChecking } = useAuthStore()

    const checkUser = async () => {
        const storedUserString = await AsyncStorage.getItem('userData');
        if (!storedUserString) {
            setIsChecking(false)
            return;
        }
        await getUserData();
        setIsChecking(false)
    };

    const { colorStatusBar, toggleTabBar, changeColorStatusBar } = useTabBarStore();

    React.useEffect(() => {
        checkUser();
        toggleTabBar(true)
    }, []);

    useEffect(() => {
        if (isChecking) {
            changeColorStatusBar(theme_colors.dark)
        } else {
            changeColorStatusBar(theme_colors.white)
        }
    }, [isChecking])

    if (isChecking) {
        return (
            <LoaderScreen />
        )
    } else {
        return (
            <NavigationContainer
                linking={{
                    config: {
                        // Configuration for linking
                    },
                    async getInitialURL() {
                        // Check if app was opened from a deep link
                        const url = await Linking.getInitialURL();
                        console.log('Initial URL:', url);

                        if (url != null) {
                            return url;
                        }

                        // Handle URL from expo push notifications
                        const response = await Notifications.getLastNotificationResponseAsync();
                        console.log('Last notification response:', response);
                        return response?.notification.request.content.data.url;
                    },
                    subscribe(listener) {
                        const onReceiveURL = ({ url }) => {
                            console.log('Received deep link URL:', url);
                            listener(url);
                        };

                        // Listen to incoming links from deep linking
                        const eventListenerSubscription = Linking.addEventListener('url', onReceiveURL);

                        // Listen to expo push notifications
                        const subscription = Notifications.addNotificationResponseReceivedListener(response => {
                            const url = response.notification.request.content.data.url;
                            console.log('Received notification URL:', url);
                            listener(url);
                        });

                        return () => {
                            // Clean up the event listeners
                            // console.log('Cleaning up event listeners');
                            // eventListenerSubscription.remove();
                            // subscription.remove();
                        };
                    },
                }}>
                <StatusBar backgroundColor={user ? colorStatusBar : theme_colors.dark} style={user ? 'dark' : 'light'} animated={true} hidden={false} />
                {
                    user
                        ? <PrivateNavigation />
                        : <PublicNavigation />
                }
            </NavigationContainer>
        )
    }
}
