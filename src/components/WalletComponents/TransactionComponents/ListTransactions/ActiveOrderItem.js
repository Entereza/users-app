import React from 'react'
import { TouchableOpacity } from 'react-native'
import ImageStyled from '../../../../utils/ui/ImageStyled'
import { theme_colors } from '../../../../utils/theme/theme_colors'
import TextStyled from '../../../../utils/ui/TextStyled'
import ViewStyled from '../../../../utils/ui/ViewStyled'
import { theme_textStyles } from '../../../../utils/theme/theme_textStyles'
import useOrdersStore from '../../../../utils/tools/interface/ordersStore'

export default function ActiveOrderItem({ order, onPress }) {
    const { getOrderStatusText } = useOrdersStore();

    // console.log('order: ', order)

    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                width: '100%',
                alignSelf: 'center',
            }}
        >
            <ViewStyled
                width={95}
                height={12}
                marginBottom={1}
                paddingHorizontal={0.2}
                style={{
                    borderBottomWidth: 1,
                    borderColor: theme_colors.lightGrey,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    alignSelf: 'center',
                    backgroundColor: theme_colors.transparent,
                }}
            >
                <ImageStyled
                    width={17}
                    borderRadius={1.5}
                    source={{ uri: order?.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA58xZd7va4SXB177IZj9BXL9jOLCG4hkRcuwjeHArAw&s" }}
                    style={{
                        height: '72%',
                        resizeMode: 'cover'
                    }}
                />

                <ViewStyled
                    marginLeft={1}
                    paddingHorizontal={1}
                    style={{
                        flex: 1,
                        height: '70%',
                        backgroundColor: theme_colors.transparent,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <ViewStyled
                        marginBottom={0.5}
                        backgroundColor={theme_colors.transparent}
                        style={{
                            width: '100%',
                            height: 'auto',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <TextStyled
                            fontSize={theme_textStyles.small + .5}
                            color={theme_colors.black}
                            style={{
                                fontFamily: 'SFPro-SemiBold',
                                textAlign: 'left',
                            }}
                        >
                            {order.restaurant || "Restaurante"}
                        </TextStyled>

                        <TextStyled
                            fontSize={theme_textStyles.small + .5}
                            color={theme_colors.black}
                            style={{
                                fontFamily: 'SFPro-SemiBold',
                                textAlign: 'right',
                            }}
                        >
                            BOB. {order.totalFinal.toFixed(2)}
                        </TextStyled>
                    </ViewStyled>

                    <ViewStyled
                        backgroundColor={theme_colors.transparent}
                        style={{
                            width: '100%',
                            height: 'auto',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <TextStyled
                            fontSize={theme_textStyles.smaller + .5}
                            color={theme_colors.primary}
                            style={{
                                fontFamily: 'SFPro-Bold',
                            }}
                        >
                            {getOrderStatusText(order.status)}
                        </TextStyled>

                        <TextStyled
                            fontSize={theme_textStyles.smaller + .5}
                            color={theme_colors.primary}
                            style={{
                                fontFamily: 'SFPro-Bold',
                            }}
                        >
                            + BOB. {order.cashback.toFixed(2)}
                        </TextStyled>
                    </ViewStyled>
                </ViewStyled>
            </ViewStyled>
        </TouchableOpacity>
    )
} 