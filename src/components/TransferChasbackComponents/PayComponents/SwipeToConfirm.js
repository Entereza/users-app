import React, { useRef } from 'react';
import { Animated, PanResponder, Dimensions } from 'react-native';
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

export default function SwipeToConfirm({ branchId }) {
    const navigation = useNavigation();
    const { changeColorStatusBar, changeScreenAnimationType } = useTabBarStore();
    const { height: screenHeight } = Dimensions.get('window');
    const animatedHeight = useRef(new Animated.Value(100)).current;
    const { cart, paymentMethod, myCashback: appliedCashback, serviceFee } = useCartStore();
    const { user } = useAuthStore();
    const {
        setOrders,
        setIsLoading,
        setError,
        setTotalPages,
        setCurrentPage
    } = useOrdersStore();

    const resetSwipeAnimation = () => {
        Animated.timing(animatedHeight, {
            toValue: 100,
            duration: 500,
            useNativeDriver: false,
        }).start();
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
            setError(error);
            toastService.showErrorToast("No pudimos cargar tus pedidos. Por favor, intenta más tarde.");
        } finally {
            setIsLoading(false);
        }
    };

    const createOrder = async () => {
        try {
            // Formatear los datos del pedido
            const orderData = ordersService.formatOrderData(
                cart,
                user.id,
                branchId,
                paymentMethod.id,
                appliedCashback,
            );

            console.log('Order Data: ', orderData)

            // Enviar el pedido al backend
            const response = await ordersService.createOrder(orderData);

            console.log('response createOrder: ', response)

            if (response.code === 'COD200') {
                changeColorStatusBar(theme_colors.success);
                changeScreenAnimationType("none");
                initializeOrders();
                navigation.navigate(private_name_routes.empresas.orderConfirmed);
            } else {
                toastService.showErrorToast(response.msg || "Error al crear el pedido");
                resetSwipeAnimation();
            }
        } catch (error) {
            console.error('Error creating order:', error);
            toastService.showErrorToast("Hubo un problema al procesar tu pedido");
            resetSwipeAnimation();
        }
    };

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
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
                style={{ flex: 1 }}
            >
                <ViewStyled
                    {...panResponder.panHandlers}
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
            </AnimatedLinearGradient>
        </Animated.View>
    );
}

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);