import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
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
        const storedUserString = await AsyncStorage.getItem('user');
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
            <NavigationContainer>
                <StatusBar backgroundColor={user ? colorStatusBar : theme_colors.dark} animated={true} hidden={false} />
                {
                    user
                        ? <PrivateNavigation />
                        : <PublicNavigation />
                }
            </NavigationContainer>
        )
    }
}
