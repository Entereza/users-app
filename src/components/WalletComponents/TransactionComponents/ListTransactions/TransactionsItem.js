import { View, Text } from 'react-native'
import React from 'react'
import ImageStyled from '../../../../utils/ui/ImageStyled'
import { theme_colors } from '../../../../utils/theme/theme_colors'
import TextStyled from '../../../../utils/ui/TextStyled'
import ViewStyled from '../../../../utils/ui/ViewStyled'
import { theme_textStyles } from '../../../../utils/theme/theme_textStyles'

export default function TransactionsItem({ item }) {
    return (
        <ViewStyled
            width={95}
            height={10}
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
                source={{ uri: item?.image ? item.image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA58xZd7va4SXB177IZj9BXL9jOLCG4hkRcuwjeHArAw&s" }}
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
                        {item.name} - {item.sectorName}
                    </TextStyled>

                    <TextStyled
                        fontSize={theme_textStyles.small + .5}
                        color={theme_colors.black}
                        style={{
                            fontFamily: 'SFPro-SemiBold',
                            textAlign: 'right',
                        }}
                    >
                        BOB. {item.order.totalFinal}
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
                        color={theme_colors.grey}
                    >
                        {item.order.createdAt || "Sin registro"}
                    </TextStyled>

                    <TextStyled
                        fontSize={theme_textStyles.smaller + .5}
                        color={theme_colors.primary}
                        style={{
                            fontFamily: 'SFPro-Bold',
                        }}
                    >
                        + BOB. {item.cashback}
                    </TextStyled>
                </ViewStyled>
            </ViewStyled>
        </ViewStyled>
    )
}