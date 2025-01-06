import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';
import { theme_colors } from '../../../utils/theme/theme_colors';
import { LinearGradient } from 'expo-linear-gradient';
import ViewStyled from '../../../utils/ui/ViewStyled';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import useTabBarStore from '../../../utils/tools/interface/tabBarStore';
import TransferSended from '../../../components/TransferChasbackComponents/PayComponents/TransferSended';
import TransferCompleted from '../../../components/TransferChasbackComponents/PayComponents/TransferCompleted';
import { private_name_routes } from '../../../utils/route/private_name_routes';

export default function TransferConfirmedScreen() {
    const navigation = useNavigation();
    const { toggleTabBar, changeColorStatusBar, changeScreenAnimationType } = useTabBarStore();

    const [startConfetti, setStartConfetti] = useState(false);
    const [showTransferCompleted, setShowTransferCompleted] = useState(false);
    const [justifyContent, setJustifyContent] = useState('center');

    const fadeAnimTransferSended = useRef(new Animated.Value(0)).current;
    const positionTransferSended = useRef(new Animated.Value(100)).current;
    const fadeAnimTransferCompleted = useRef(new Animated.Value(0)).current;
    const positionTransferCompleted = useRef(new Animated.Value(100)).current;

    const goToHomeScreen = () => {
        changeScreenAnimationType("fade");
        isGoingBack.current = true;
        setTimeout(() => {
            toggleTabBar(true);
            changeColorStatusBar(theme_colors.white);
            navigation.navigate(private_name_routes.billetera.billeteraHome);
        }, 0);
    }

    const isGoingBack = useRef(false);

    useFocusEffect(
        useCallback(() => {
            const onBackPress = (e) => {
                if (!isGoingBack.current) {
                    e.preventDefault();
                }
            };

            navigation.addListener('beforeRemove', onBackPress);

            return () => {
                navigation.removeListener('beforeRemove', onBackPress);
            };
        }, [navigation])
    );

    useEffect(() => {
        // Animación para TransferSended
        Animated.timing(fadeAnimTransferSended, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();

        Animated.timing(positionTransferSended, {
            toValue: 0,
            duration: 1000,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }).start(() => {
            setTimeout(() => {
                Animated.parallel([
                    Animated.timing(fadeAnimTransferSended, {
                        toValue: 0,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(positionTransferSended, {
                        toValue: -100,
                        duration: 1000,
                        easing: Easing.out(Easing.ease),
                        useNativeDriver: true,
                    })
                ]).start(() => {
                    setStartConfetti(true);
                    setShowTransferCompleted(true);
                    setJustifyContent('flex-start');
                });
            }, 2000);
        });
    }, []);

    useEffect(() => {
        if (showTransferCompleted) {
            // Animación para TransferCompleted
            Animated.timing(fadeAnimTransferCompleted, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }).start();

            Animated.timing(positionTransferCompleted, {
                toValue: 0,
                duration: 1000,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }).start();
        }
    }, [showTransferCompleted]);

    return (
        <LinearGradient
            colors={[theme_colors.green, theme_colors.primary, theme_colors.darkPrimary]}
            style={{
                marginTop: 'auto',
            }}
        >
            <ViewStyled
                width={100}
                backgroundColor={theme_colors.transparent}
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                }}
            >
                {/* <ConfetiRain count={200} duration={1000} startStopAnimation={startConfetti} setStartStopAnimation={setStartConfetti} /> */}

                <Animated.View
                    style={{
                        opacity: fadeAnimTransferSended,
                        transform: [{ translateY: positionTransferSended }],
                        display: showTransferCompleted ? 'none' : 'flex'
                    }}
                >
                    <TransferSended />
                </Animated.View>

                {showTransferCompleted && (
                    <Animated.View
                        style={{
                            opacity: fadeAnimTransferCompleted,
                            transform: [{ translateY: positionTransferCompleted }],
                        }}
                    >
                        <TransferCompleted goToHomeScreen={goToHomeScreen} />
                    </Animated.View>
                )}
            </ViewStyled>
        </LinearGradient>
    );
}