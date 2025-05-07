import React, { useRef, useState } from 'react';
import { Animated, PanResponder, Dimensions, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { theme_colors } from '../../../utils/theme/theme_colors';
import ViewStyled from '../../../utils/ui/ViewStyled';
import TextStyled from '../../../utils/ui/TextStyled';
import adjustFontSize from '../../../utils/ui/adjustText';
import useTabBarStore from '../../../utils/tools/interface/tabBarStore';
import { private_name_routes } from '../../../utils/route/private_name_routes';
import { theme_textStyles } from '../../../utils/theme/theme_textStyles';
import useCartStore from '../../../utils/tools/interface/cartStore';
import useAuthStore from '../../../utils/tools/interface/authStore';
import { ordersService } from '../../../services/api/orders/ordersService';
import { toastService } from '../../../utils/tools/interface/toastService';
import useOrdersStore from '../../../utils/tools/interface/ordersStore';
import useAddressStore from '../../../utils/tools/interface/addressStore';

const ProcessingOrder = () => (
    <ViewStyled
        width={100}
        backgroundColor={theme_colors.transparent}
        style={{
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
        }}
    >
        <ActivityIndicator size="large" color={theme_colors.white} />
        <TextStyled
            fontFamily='SFPro-Bold'
            textAlign='center'
            fontSize={theme_textStyles.smedium}
            color={theme_colors.white}
            style={{
                marginTop: 20,
            }}
        >
            Creando tu pedido...
        </TextStyled>
        <TextStyled
            fontFamily='SFPro-Regular'
            textAlign='center'
            fontSize={theme_textStyles.small}
            color={theme_colors.white}
            style={{
                marginTop: 10,
                opacity: 0.8,
            }}
        >
            Por favor, espera un momento
        </TextStyled>
    </ViewStyled>
);

const ErrorState = ({ message, onReset }) => (
    <ViewStyled
        width={100}
        backgroundColor={theme_colors.transparent}
        style={{
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
        }}
    >
        <MaterialCommunityIcons
            name="alert-circle-outline"
            size={adjustFontSize(theme_textStyles.xlarge)}
            color={theme_colors.white}
        />
        <TextStyled
            fontFamily='SFPro-Bold'
            textAlign='center'
            fontSize={theme_textStyles.smedium}
            color={theme_colors.white}
            style={{
                marginTop: 20,
            }}
        >
            Error al procesar el pedido
        </TextStyled>
        <TextStyled
            fontFamily='SFPro-Regular'
            textAlign='center'
            fontSize={theme_textStyles.small}
            color={theme_colors.white}
            style={{
                marginTop: 10,
                opacity: 0.8,
                marginBottom: 20,
            }}
        >
            {message}
        </TextStyled>
        <ViewStyled
            width={60}
            height={7}
            backgroundColor={theme_colors.white}
            style={{
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
            }}
            onTouchEnd={onReset}
        >
            <TextStyled
                fontFamily='SFPro-Bold'
                textAlign='center'
                fontSize={theme_textStyles.smedium}
                color={theme_colors.primary}
            >
                Intentar de nuevo
            </TextStyled>
        </ViewStyled>
    </ViewStyled>
);

const SwipeIndicator = () => (
    <ViewStyled
        width={'100%'}
        height={'100%'}
        paddingTop={3}
        backgroundColor={theme_colors.transparent}
        style={{
            alignItems: 'center',
            justifyContent: 'flex-start',
        }}
    >
        <MaterialCommunityIcons
            name="chevron-up"
            size={adjustFontSize(theme_textStyles.large)}
            color={theme_colors.white}
        />
        <TextStyled
            fontFamily='SFPro-Bold'
            textAlign='center'
            fontSize={theme_textStyles.smedium}
            color={theme_colors.white}
            style={{
                width: "auto",
            }}
        >
            Desliza hacia arriba para confirmar
        </TextStyled>
    </ViewStyled>
);

export default function SwipeToConfirm({ branchId, tripPrice }) {
    const navigation = useNavigation();
    const screenHeight = (Dimensions.get('window').height + 30);

    const { changeColorStatusBar, changeScreenAnimationType } = useTabBarStore();
    const { cart, paymentMethod, myCashback: appliedCashback, billingInfo } = useCartStore();
    const { user } = useAuthStore();
    const { selectedAddress } = useAddressStore();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const animatedHeight = useRef(new Animated.Value(100)).current;
    const fadeAnim = useRef(new Animated.Value(1)).current;

    const {
        setOrders,
        setError: setOrdersError,
        setTotalPages,
        setCurrentPage
    } = useOrdersStore();

    const resetSwipeAnimation = () => {
        setError(null);
        setIsLoading(false);

        // Fade out current content
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            // Reset height
            Animated.timing(animatedHeight, {
                toValue: 100,
                duration: 500,
                useNativeDriver: false,
            }).start(() => {
                // Fade in new content
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }).start();
            });
        });
    };

    const initializeOrders = async () => {
        try {
            setIsLoading(true);
            const response = await ordersService.getClientOrders(user.id);

            if (response?.orders) {
                setOrders(response.orders);
                setTotalPages(1);
                setCurrentPage(0);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            setOrdersError(error);
            toastService.showErrorToast("No pudimos cargar tus pedidos. Por favor, intenta más tarde.");
        }
    };

    const createOrder = async () => {
        try {
            setIsLoading(true);
            changeColorStatusBar(theme_colors.success);

            const orderData = ordersService.formatOrderData(
                cart,
                user.id,
                branchId,
                paymentMethod.id,
                appliedCashback,
                tripPrice,
                selectedAddress.id,
                billingInfo
            );

            const response = await ordersService.createOrder(orderData);

            if (response.code === 'COD200') {
                changeScreenAnimationType("none");
                await initializeOrders();
                navigation.navigate(private_name_routes.empresas.orderConfirmed);
            } else {
                throw new Error(response.msg || "Error al crear el pedido");
            }
        } catch (error) {
            console.error('Error creating order:', error);
            changeColorStatusBar(theme_colors.white);
            setError(error.message || "Hubo un problema al procesar tu pedido");
            resetSwipeAnimation();
        }
    };

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => !isLoading && !error,
            onPanResponderMove: (e, gestureState) => {
                if (gestureState.dy < 0) {
                    const newHeight = Math.min(screenHeight, 100 - gestureState.dy);
                    animatedHeight.setValue(newHeight);
                }
            },
            onPanResponderRelease: (e, gestureState) => {
                if (gestureState.moveY < screenHeight * 0.2 || gestureState.vy < -0.5) {
                    Animated.timing(animatedHeight, {
                        toValue: screenHeight,
                        duration: 300,
                        useNativeDriver: false,
                    }).start(() => {
                        createOrder();
                    });
                } else {
                    resetSwipeAnimation();
                }
            },
        })
    ).current;

    const progressValue = animatedHeight.interpolate({
        inputRange: [100, screenHeight],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });

    const color1 = progressValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [theme_colors.white, theme_colors.lightGreen, theme_colors.green],
    });

    const color2 = progressValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [theme_colors.lightGreen, theme_colors.green, theme_colors.primary],
    });

    const color3 = progressValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [theme_colors.green, theme_colors.primary, theme_colors.darkPrimary],
    });

    return (
        <Animated.View style={{ marginTop: 'auto', height: animatedHeight }}>
            <AnimatedLinearGradient
                colors={[color1, color2, color3]}
                style={{ flex: 1, height: '100%' }}
            >
                <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
                    {isLoading ? (
                        <ProcessingOrder />
                    ) : error ? (
                        <ErrorState message={error} onReset={resetSwipeAnimation} />
                    ) : (
                        <ViewStyled
                            {...panResponder.panHandlers}
                            width={'100%'}
                            backgroundColor={theme_colors.transparent}
                            style={{
                                height: '100%',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                            }}
                        >
                            <SwipeIndicator />
                        </ViewStyled>
                    )}
                </Animated.View>
            </AnimatedLinearGradient>
        </Animated.View>
    );
}

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);