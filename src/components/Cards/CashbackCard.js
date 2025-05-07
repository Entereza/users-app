import React from 'react';
import { theme_colors } from '../../utils/theme/theme_colors';
import TextStyled from '../../utils/ui/TextStyled';
import ViewStyled from '../../utils/ui/ViewStyled';
import { Image, View } from 'react-native';
import { theme_textStyles } from '../../utils/theme/theme_textStyles';
import useCartStore from '../../utils/tools/interface/cartStore';

export default function CashbackCard() {
    const { cart, myCashback, cashbackBusiness } = useCartStore();
    const totalPrice = cart.reduce((sum, item) => sum + (item.totalPrice * item.quantity), 0);

    const cashback = totalPrice * (cashbackBusiness / 100)

    return (
        <View
            style={{
                backgroundColor: theme_colors.white,
                width: '95%',
                marginTop: 15,
                borderRadius: 10,
                alignItems: 'center',
                padding: 15,
                shadowColor: theme_colors.black,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
                elevation: 3,
            }}
        >
            <View
                width={'100%'}
                backgroundColor={theme_colors.transparent}
                style={{
                    justifyContent: 'flex-start'
                }}
            >
                <View
                    width={'100%'}
                    backgroundColor={theme_colors.transparent}
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <TextStyled
                        fontSize={theme_textStyles.medium}
                        color={theme_colors.black}
                        style={{
                            fontFamily: 'SFPro-Bold',
                        }}
                    >
                        Cashback
                    </TextStyled>

                    <Image
                        source={require('../../../assets/cashback.png')}
                    />
                </View>

                <View
                    width={'100%'}
                    height={1}
                    backgroundColor={theme_colors.requiredGrey}
                    style={{
                        alignSelf: 'center',
                        marginTop: 8
                    }}
                />

                <View
                    width={'100%'}
                    backgroundColor={theme_colors.transparent}
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <TextStyled
                        width={'60%'}
                        fontSize={theme_textStyles.small}
                        color={theme_colors.grey}
                        style={{
                            marginTop: 10,
                            fontFamily: 'SFPro-SemiBold',
                        }}
                    >
                        Este Cashback se recargará para tu siguiente compra (10%)
                    </TextStyled>

                    <TextStyled
                        fontSize={theme_textStyles.medium}
                        color={theme_colors.primary}
                        style={{
                            marginTop: 10,
                            fontFamily: 'SFPro-Bold',
                        }}
                    >
                        Bs. {cashback.toFixed(2)}
                    </TextStyled>
                </View>
            </View>
        </View>
    );
};