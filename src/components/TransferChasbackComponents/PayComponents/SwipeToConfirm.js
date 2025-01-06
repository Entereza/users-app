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

export default function SwipeToConfirm() {
    const navigation = useNavigation();
    const { changeColorStatusBar, changeScreenAnimationType } = useTabBarStore();
    const { height: screenHeight } = Dimensions.get('window');
    const animatedHeight = useRef(new Animated.Value(100)).current;

    const goToTransferConfirmed = () => {
        changeColorStatusBar(theme_colors.green);
        changeScreenAnimationType("none")
        navigation.navigate(private_name_routes.billetera.transferConfirmedScreen);
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
                        goToTransferConfirmed();
                    });
                } else {
                    Animated.timing(animatedHeight, {
                        toValue: 100,
                        duration: 500,
                        useNativeDriver: false,
                    }).start();
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