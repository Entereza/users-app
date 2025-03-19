import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import useCartStore from '../../utils/tools/interface/cartStore';
import ViewStyled from '../../utils/ui/ViewStyled'
import { theme_colors } from '../../utils/theme/theme_colors'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import TextStyled from '../../utils/ui/TextStyled';
import { theme_textStyles } from '../../utils/theme/theme_textStyles';
import ButtonWithIcon from './ButtonWithIcon';
import { useNavigation } from '@react-navigation/native';
import { private_name_routes } from '../../utils/route/private_name_routes';

export default function ButtonGoToCart({ branchId, tripPrice, cashbackBusiness }) {
    const { cart, setTripPrice, setCashbackBusiness } = useCartStore();
    const translateY = useRef(new Animated.Value(100)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    const navigation = useNavigation()

    const goToCartScreen = () => {
        navigation.navigate(private_name_routes.empresas.carritoHome, {
            branchId: branchId,
        })
        setTripPrice(tripPrice)
        setCashbackBusiness(cashbackBusiness)
    }

    useEffect(() => {
        if (cart.length > 0) {
            Animated.parallel([
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(translateY, {
                    toValue: 100,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [cart]);

    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

    const totalPrice = cart.reduce((sum, item) => {
        const itemPrice = item.price || 0;
        const itemQuantity = item.quantity || 1;
        return sum + (itemPrice * itemQuantity);
    }, 0);

    return (
        <Animated.View
            style={{
                transform: [{ translateY }],
                opacity,
                width: widthPercentageToDP(90),
                height: 'auto',
                backgroundColor: theme_colors.primary,
                paddingVertical: 10,
                paddingHorizontal: 15,
                alignItems: 'center',
                justifyContent: 'flex-start',
                borderRadius: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'absolute',
                bottom: 10,
                shadowColor: theme_colors.black,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
                elevation: 3,
            }}
        >
            <ViewStyled
                backgroundColor={theme_colors.transparent}
                style={{
                    flex: 1,
                    height: 'auto',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                }}
            >
                <TextStyled
                    fontFamily='SFPro-Regular'
                    textAlign='left'
                    fontSize={theme_textStyles.small}
                    color={theme_colors.textGrey}
                >
                    {`${totalItems} ${totalItems === 1 ? 'producto' : 'productos'}`}
                </TextStyled>
                <TextStyled
                    fontFamily='SFPro-Bold'
                    textAlign='left'
                    fontSize={theme_textStyles.large}
                    color={theme_colors.white}
                >
                    {`BOB. ${totalPrice.toFixed(2)}`}
                </TextStyled>
            </ViewStyled>

            <ButtonWithIcon
                withIcon={true}
                iconName='shopping-bag'
                FontAwesome
                onPress={goToCartScreen}
                borderWidth={0}
                borderRadius={1.5}
                backgroundColor={theme_colors.white}
                colorText={theme_colors.primary}
                fontSize={theme_textStyles.smedium}
                sizeIcon={theme_textStyles.medium}
                marginRightIcon={8}
                width={40}
                height={6}
                fontFamily={'SFPro-Bold'}
                textButton={'Ir al carrito'}
            />
        </Animated.View>
    );
}