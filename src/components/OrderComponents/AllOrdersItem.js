import React from 'react'
import { Pressable, TouchableOpacity } from 'react-native'
import ViewStyled from '../../utils/ui/ViewStyled'
import TextStyled from '../../utils/ui/TextStyled'
import ImageStyled from '../../utils/ui/ImageStyled'
import { theme_colors } from '../../utils/theme/theme_colors'
import { theme_textStyles } from '../../utils/theme/theme_textStyles'

const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${day}/${month}/${year} - ${hours}:${minutes} ${ampm}`;
};

export default function AllOrdersItem({ item, onRepeat }) {
    return (
        <Pressable
            onPress={() => onRepeat(item)}
        >
            <ViewStyled
                backgroundColor={theme_colors.white}
                width={90}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: 16,
                    padding: 16,
                    marginVertical: 8,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3,
                }}
            >
                <ViewStyled
                    backgroundColor={theme_colors.transparent}
                    style={{
                        width: '20%',
                        aspectRatio: 1,
                        borderRadius: 10,
                        overflow: 'hidden',
                        marginRight: 10
                    }}
                >
                    <ImageStyled
                        style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'cover',
                        }}
                        source={item.imageUrl ? { uri: item.imageUrl } : require('../../../assets/images/products/emptyPromo.png')}
                    />
                </ViewStyled>

                <ViewStyled
                    backgroundColor={theme_colors.transparent}
                    style={{
                        flex: 1,
                    }}
                >
                    <TextStyled
                        fontFamily='SFPro-Bold'
                        fontSize={theme_textStyles.smedium}
                        color={theme_colors.dark}
                        style={{
                            marginBottom: 4,
                        }}
                    >
                        {item.companyName}
                    </TextStyled>

                    <TextStyled
                        fontFamily='SFPro-Medium'
                        fontSize={theme_textStyles.small}
                        color={theme_colors.black}
                        style={{
                            marginBottom: 2,
                        }}
                    >
                        Total: Bs. {item.totalFinal}
                    </TextStyled>

                    <TextStyled
                        fontSize={theme_textStyles.smaller + .5}
                        color={theme_colors.black}
                    >
                        Fecha: {formatDate(item.date)}
                    </TextStyled>
                </ViewStyled>

                <TouchableOpacity
                    style={{
                        backgroundColor: theme_colors.primary,
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        borderRadius: 8,
                        position: 'absolute',
                        right: 10,
                        bottom: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <TextStyled
                        fontSize={theme_textStyles.smaller}
                        color={theme_colors.white}
                        fontFamily='SFPro-Bold'
                    >
                        Repetir
                    </TextStyled>
                </TouchableOpacity>
            </ViewStyled>
        </Pressable>
    )
}