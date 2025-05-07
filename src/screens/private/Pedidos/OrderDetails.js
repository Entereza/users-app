import React from 'react'
import { StyleSheet, BackHandler } from 'react-native'
import ViewStyled from '../../../utils/ui/ViewStyled'
import TextStyled from '../../../utils/ui/TextStyled'
import { theme_colors } from '../../../utils/theme/theme_colors'
import { theme_textStyles } from '../../../utils/theme/theme_textStyles'
import SafeAreaStyled from '../../../components/SafeAreaComponents/SafeAreaStyled'
import OrderProductsList from '../../../components/OrderComponents/OrderProductsList'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import useTabBarStore from '../../../utils/tools/interface/tabBarStore'
import HeaderInternalScreen from '../../../components/Header/HeaderInternalScreen'

export default function OrderDetails({ route }) {
    const { order } = route.params;
    const navigation = useNavigation();
    const { toggleTabBar } = useTabBarStore();

    const goBack = () => {
        toggleTabBar(true);
        navigation.goBack();
    };

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                goBack();
                return true;
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => {
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
            };
        }, [])
    );

    return (
        <SafeAreaStyled
            backgroundColor={theme_colors.white}
            styleArea={styles.safeArea}
            styleView={styles.startView}
        >
            <HeaderInternalScreen title={order.name || "Pedido"} />

            <ViewStyled
                width={'90%'}
                height={'0.2%'}
                backgroundColor={theme_colors.greyLine}
                style={{
                    alignSelf: 'center',
                    marginBottom: 20,
                    marginTop: 10
                }}
            />

            <ViewStyled
                backgroundColor={theme_colors.transparent}
                width={90}
                style={{
                    marginBottom: 20,
                }}
            >
                <ViewStyled
                    backgroundColor={theme_colors.transparent}
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <TextStyled
                        fontFamily='SFPro-Medium'
                        fontSize={theme_textStyles.small}
                        color={theme_colors.grey}
                    >
                        Total:
                    </TextStyled>
                    <TextStyled
                        fontFamily='SFPro-Medium'
                        fontSize={theme_textStyles.small}
                        color={theme_colors.black}
                    >
                        Bs. {order.order.totalFinal}
                    </TextStyled>
                </ViewStyled>

                <ViewStyled
                    backgroundColor={theme_colors.transparent}
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <TextStyled
                        fontFamily='SFPro-Medium'
                        fontSize={theme_textStyles.small}
                        color={theme_colors.grey}
                    >
                        Tarifa de Envío:
                    </TextStyled>
                    <TextStyled
                        fontFamily='SFPro-Medium'
                        fontSize={theme_textStyles.small}
                        color={theme_colors.black}
                    >
                        Bs. {order.order.deliveryFee}
                    </TextStyled>
                </ViewStyled>

                <ViewStyled
                    backgroundColor={theme_colors.transparent}
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <TextStyled
                        fontFamily='SFPro-Medium'
                        fontSize={theme_textStyles.small}
                        color={theme_colors.grey}
                    >
                        Tarifa de Servicio:
                    </TextStyled>
                    <TextStyled
                        fontFamily='SFPro-Medium'
                        fontSize={theme_textStyles.small}
                        color={theme_colors.black}
                    >
                        Bs. {order.order.serviceFee}
                    </TextStyled>
                </ViewStyled>

                {order.order.userCashback > 0 && (
                    <ViewStyled
                        backgroundColor={theme_colors.transparent}
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: 10,
                        }}
                    >
                        <TextStyled
                            fontFamily='SFPro-Medium'
                            fontSize={theme_textStyles.small}
                            color={theme_colors.grey}
                        >
                            Cashback:
                        </TextStyled>
                        <TextStyled
                            fontFamily='SFPro-Medium'
                            fontSize={theme_textStyles.small}
                            color={theme_colors.success}
                        >
                            - Bs. {order.order.userCashback}
                        </TextStyled>
                    </ViewStyled>
                )}

                <ViewStyled
                    backgroundColor={theme_colors.transparent}
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <TextStyled
                        fontFamily='SFPro-Bold'
                        fontSize={theme_textStyles.smedium}
                        color={theme_colors.grey}
                    >
                        Total Final:
                    </TextStyled>
                    <TextStyled
                        fontFamily='SFPro-Bold'
                        fontSize={theme_textStyles.smedium}
                        color={theme_colors.primary}
                    >
                        Bs. {order.order.totalFinal + order.order.deliveryFee + order.order.serviceFee - (order.order.userCashback || 0)}
                    </TextStyled>
                </ViewStyled>
            </ViewStyled>

            <OrderProductsList products={order.order.products} />
        </SafeAreaStyled>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: theme_colors.transparent,
        flex: 1,
    },
    startView: {
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 10
    },
});