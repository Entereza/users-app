import React from 'react'
import { TouchableOpacity } from 'react-native'
import ViewStyled from '../../../utils/ui/ViewStyled'
import { theme_colors } from '../../../utils/theme/theme_colors'
import TextStyled from '../../../utils/ui/TextStyled'
import { theme_textStyles } from '../../../utils/theme/theme_textStyles'
import useOrdersStore from '../../../utils/tools/interface/ordersStore'
import ImageStyled from '../../../utils/ui/ImageStyled'
import { LinearGradient } from 'expo-linear-gradient';
import { heightPercentageToDP } from 'react-native-responsive-screen'
import ButtonWithIcon from '../../Buttons/ButtonWithIcon'


export default function ActiveOrderBanner({ order, onPress }) {
    // console.log('order: ', order)
    const { getOrderStatusText } = useOrdersStore();

    const statusOrders = {
        created: "created",
        accepted: "accepted",
        pickup: "pickup",
        store: "store",
        taken: "taken",
        picked: "picked",
        delivering: "delivering",
        arrived: "arrived",
        completed: "completed"
    }

    const status = order?.order?.status;
    // const status = statusOrders.arrived;

    const getOrderGif = (status) => {
        switch (status) {
            case statusOrders.created:
                return require('../../../../assets/gifs/chef.gif')
            case statusOrders.accepted:
                return require('../../../../assets/gifs/mix.gif')
            case statusOrders.pickup:
                return require('../../../../assets/gifs/mix.gif')
            case statusOrders.taken:
                return require('../../../../assets/gifs/mix.gif')
            case statusOrders.store:
                return require('../../../../assets/gifs/mix.gif')
            case statusOrders.picked:
                return require('../../../../assets/gifs/food-delivery.gif')
            case statusOrders.delivering:
                return require('../../../../assets/gifs/food-delivery.gif')
            case statusOrders.arrived:
                return require('../../../../assets/gifs/checked.gif')
            default:
                return require('../../../../assets/gifs/chef.gif')
        }
    }

    return (
        <LinearGradient
            dither={false}
            colors={[`${theme_colors.primary}90`, theme_colors.white]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.8, y: 0 }}
            style={{
                borderRadius: 15,
            }}
        >
            <ViewStyled
                width={90}
                height={20}
                paddingHorizontal={6}
                backgroundColor={theme_colors.transparent}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: 15,
                    borderWidth: 0.3,
                    borderColor: theme_colors.greyLine
                }}
            >
                <ViewStyled
                    backgroundColor={theme_colors.transparent}
                    style={{
                        width: '60%',
                        height: '80%',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        gap: 6
                    }}
                >
                    <TextStyled
                        fontSize={theme_textStyles.xlarge}
                        color={theme_colors.black}
                        fontFamily='SFPro-Medium'
                        numberOfLines={2}
                        style={{
                            letterSpacing: 0.4
                        }}
                    >
                        {getOrderStatusText(status)}
                    </TextStyled>

                    <ButtonWithIcon
                        withIcon={false}

                        onPress={onPress}
                        borderWidth={0}
                        backgroundColor={theme_colors.dark}
                        colorText={theme_colors.white}
                        borderRadius={50}
                        fontSize={theme_textStyles.small + .5}
                        height={5}
                        fontFamily={'SFPro-SemiBold'}
                        textButton={'Ver Detalles'}
                        style={{
                            width: '70%',
                        }}
                    />
                </ViewStyled>

                <ViewStyled
                    backgroundColor={theme_colors.transparent}
                    style={{
                        width: '35%',
                        height: '70%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <ImageStyled
                        borderRadius={1.5}
                        source={getOrderGif(status)}
                        style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'cover'
                        }}
                    />
                </ViewStyled>
            </ViewStyled>
        </LinearGradient>
    )
}