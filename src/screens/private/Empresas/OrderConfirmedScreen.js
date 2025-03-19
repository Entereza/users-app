import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Easing, Image, TouchableOpacity } from 'react-native';
import { theme_colors } from '../../../utils/theme/theme_colors';
import { LinearGradient } from 'expo-linear-gradient';
import ViewStyled from '../../../utils/ui/ViewStyled';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import useTabBarStore from '../../../utils/tools/interface/tabBarStore';
import { private_name_routes } from '../../../utils/route/private_name_routes';
import TextStyled from '../../../utils/ui/TextStyled';
import { theme_textStyles } from '../../../utils/theme/theme_textStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import adjustFontSize from '../../../utils/ui/adjustText';
import useCartStore from '../../../utils/tools/interface/cartStore';
import ImageStyled from '../../../utils/ui/ImageStyled';
import { Audio, Video } from 'expo-av';
// import { Image} from 'expo-image'

const OrderSent = () => (
    <ViewStyled
        width={90}
        backgroundColor={theme_colors.transparent}
        style={{
            alignItems: 'center',
            justifyContent: 'center',
        }}
    >
        <MaterialCommunityIcons
            name="store-check-outline"
            size={adjustFontSize(theme_textStyles.xlarge + 3)}
            color={theme_colors.white}
        />
        <TextStyled
            fontFamily='SFPro-Bold'
            textAlign='center'
            fontSize={theme_textStyles.large}
            color={theme_colors.white}
            style={{
                marginTop: 20,
            }}
        >
            ¡Pedido enviado!
        </TextStyled>
        <TextStyled
            fontFamily='SFPro-Regular'
            textAlign='center'
            fontSize={theme_textStyles.smedium}
            color={theme_colors.white}
            style={{
                marginTop: 10,
                opacity: 0.8,
            }}
        >
            Tu pedido está siendo procesado
        </TextStyled>
    </ViewStyled>
);

const SinglePlayGif = ({
    gifSource,
    staticSource,
    duration = 1000,
    style,
    onFinish
}) => {
    const [isPlaying, setIsPlaying] = useState(true);
    const timerRef = useRef(null);

    useEffect(() => {
        restart();
        timerRef.current = setTimeout(() => {
            setIsPlaying(false);
            onFinish && onFinish();
        }, duration);

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [duration, onFinish]);

    // Función para reiniciar la animación
    const restart = () => {
        setIsPlaying(true);
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            setIsPlaying(false);
            onFinish && onFinish();
        }, duration);
    };

    return (
        <Image
            tintColor={theme_colors.white}
            resizeMode={isPlaying ? 'cover' : 'contain'}
            source={isPlaying ? gifSource : staticSource}
            style={[style]}
        />
    );
};

const OrderCompleted = ({ goToHomeScreen }) => {
    const soundRef = useRef(null);

    useEffect(() => {
        const loadSound = async () => {
            try {
                const { sound } = await Audio.Sound.createAsync(
                    require('../../../../assets/sounds/completed.mp3')
                );
                soundRef.current = sound;
                await sound.playAsync();
            } catch (error) {
                console.error('Error loading sound', error);
            }
        };

        setTimeout(() => {
            loadSound();
        }, 635);
    }, []);

    return (
        <ViewStyled
            width={90}
            backgroundColor={theme_colors.transparent}
            style={{
                alignItems: 'center',
                justifyContent: 'flex-start',
                paddingTop: 50,
            }}
        >
            <ViewStyled
                backgroundColor={theme_colors.transparent}
                style={{
                    width: '100%',
                    height: '35%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <SinglePlayGif
                    gifSource={require('../../../../assets/gifs/orderCompleted5.gif')}
                    staticSource={require('../../../../assets/images/orderCompletedStatic.png')}
                    duration={3500}
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                />
            </ViewStyled>

            <TextStyled
                fontFamily='SFPro-Bold'
                textAlign='center'
                fontSize={theme_textStyles.large}
                color={theme_colors.white}
                style={{
                    marginTop: 20,
                }}
            >
                ¡Pedido confirmado!
            </TextStyled>
            <TextStyled
                fontFamily='SFPro-Regular'
                textAlign='center'
                fontSize={theme_textStyles.smedium}
                color={theme_colors.white}
                style={{
                    marginTop: 10,
                    opacity: 0.8,
                    marginBottom: 30,
                }}
            >
                Tu pedido ha sido confirmado y está en preparación
            </TextStyled>

            <TouchableOpacity onPress={goToHomeScreen}>
                <ViewStyled
                    width={60}
                    height={7}
                    backgroundColor={theme_colors.white}
                    style={{
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <TextStyled
                        fontFamily='SFPro-Bold'
                        textAlign='center'
                        fontSize={theme_textStyles.smedium}
                        color={theme_colors.primary}
                    >
                        Continuar
                    </TextStyled>
                </ViewStyled>
            </TouchableOpacity>
        </ViewStyled>
    );
};

export default function OrderConfirmedScreen() {
    const navigation = useNavigation();
    const { toggleTabBar, changeColorStatusBar, changeScreenAnimationType } = useTabBarStore();
    const { clearCart } = useCartStore();

    const [startConfetti, setStartConfetti] = useState(false);
    const [showOrderCompleted, setShowOrderCompleted] = useState(false);

    const fadeAnimOrderSent = useRef(new Animated.Value(0)).current;
    const positionOrderSent = useRef(new Animated.Value(100)).current;
    const fadeAnimOrderCompleted = useRef(new Animated.Value(0)).current;
    const positionOrderCompleted = useRef(new Animated.Value(100)).current;

    const goToHomeScreen = () => {
        changeScreenAnimationType("fade");
        isGoingBack.current = true;
        clearCart();
        setTimeout(() => {
            toggleTabBar(true);
            changeColorStatusBar(theme_colors.white);
            navigation.navigate(private_name_routes.empresas.empresasHome);
        }, 0);
    };

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
        // Animación para OrderSent
        Animated.timing(fadeAnimOrderSent, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();

        Animated.timing(positionOrderSent, {
            toValue: 0,
            duration: 1000,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }).start(() => {
            setTimeout(() => {
                Animated.parallel([
                    Animated.timing(fadeAnimOrderSent, {
                        toValue: 0,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(positionOrderSent, {
                        toValue: -100,
                        duration: 1000,
                        easing: Easing.out(Easing.ease),
                        useNativeDriver: true,
                    })
                ]).start(() => {
                    setStartConfetti(true);
                    setShowOrderCompleted(true);
                });
            }, 2000);
        });
    }, []);

    useEffect(() => {
        if (showOrderCompleted) {
            // Animación para OrderCompleted
            Animated.timing(fadeAnimOrderCompleted, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }).start();

            Animated.timing(positionOrderCompleted, {
                toValue: 0,
                duration: 1000,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }).start();
        }
    }, [showOrderCompleted]);

    return (
        <LinearGradient
            colors={[theme_colors.success, theme_colors.primary, theme_colors.darkPrimary]}
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
                <Animated.View
                    style={{
                        opacity: fadeAnimOrderSent,
                        transform: [{ translateY: positionOrderSent }],
                        display: showOrderCompleted ? 'none' : 'flex'
                    }}
                >
                    <OrderSent />
                </Animated.View>

                {showOrderCompleted && (
                    <Animated.View
                        style={{
                            opacity: fadeAnimOrderCompleted,
                            transform: [{ translateY: positionOrderCompleted }],
                        }}
                    >
                        <OrderCompleted goToHomeScreen={goToHomeScreen} />
                    </Animated.View>
                )}
            </ViewStyled>
        </LinearGradient>
    );
} 