import React from 'react'
import { Pressable, TouchableOpacity } from 'react-native'
import ViewStyled from '../../../utils/ui/ViewStyled'
import { theme_colors } from '../../../utils/theme/theme_colors'
import TextStyled from '../../../utils/ui/TextStyled'
import { theme_textStyles } from '../../../utils/theme/theme_textStyles'
import useOrdersStore from '../../../utils/tools/interface/ordersStore'
import ImageStyled from '../../../utils/ui/ImageStyled'
import { LinearGradient } from 'expo-linear-gradient';
import { heightPercentageToDP } from 'react-native-responsive-screen'
import ButtonWithIcon from '../../Buttons/ButtonWithIcon'
import OrderProgressBar from '../OrderProgressBar'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import adjustFontSize from '../../../utils/ui/adjustText'


export default function ActiveOrderBanner({ order, onPress }) {
    // console.log('order: ', order)
    const { getOrderStatusText, getOrderStatusSubtle } = useOrdersStore();

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
        <Pressable onPress={onPress}>
            <ViewStyled
                width={90}
                height={20}
                paddingLeft={4}
                paddingRight={2}
                backgroundColor={theme_colors.white}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: 15,
                    borderWidth: 0.3,
                    borderColor: theme_colors.greyLine,
                    elevation: 2,
                    shadowColor: theme_colors.black,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    position: 'relative',
                }}
            >
                <ViewStyled
                    backgroundColor={theme_colors.transparent}
                    style={{
                        width: '100%',
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                    }}
                >
                    <ViewStyled
                        backgroundColor={theme_colors.transparent}
                        style={{
                            width: '100%',
                            height: 'auto',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                        }}
                    >
                        <TextStyled
                            fontFamily='SFPro-SemiBold'
                            textAlign='left'
                            fontSize={theme_textStyles.medium + .5}
                            color={theme_colors.dark}
                        >
                            {getOrderStatusText(order?.order?.status || "completed")}
                        </TextStyled>

                        <TextStyled
                            fontFamily='SFPro-Regular'
                            textAlign='left'
                            fontSize={theme_textStyles.small}
                            color={theme_colors.black}
                            style={{
                                marginTop: 3
                            }}
                        >
                            {getOrderStatusSubtle(order?.order?.status || "completed")}
                        </TextStyled>
                    </ViewStyled>

                    <OrderProgressBar status={order?.order?.status || "completed"} />
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
        </Pressable>
    )
}