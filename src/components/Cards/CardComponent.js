import React, { useState } from 'react';
import ViewStyled from '../../utils/ui/ViewStyled';
import TextStyled from '../../utils/ui/TextStyled';
import { theme_colors } from '../../utils/theme/theme_colors';
import ShowDetailsButton from '../Buttons/ShowDetailsButton';
import { Image, TouchableOpacity } from 'react-native';

export default function CardComponent ({ restaurant, date, price, cashback, image }){

    return (
        <>
            <ViewStyled
                style={{
                    width: '100%',
                    alignSelf: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderRadius: 15,
                    backgroundColor: theme_colors.transparent,
                    marginBottom: 10
                }}
            >
                <Image
                    source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA58xZd7va4SXB177IZj9BXL9jOLCG4hkRcuwjeHArAw&s"}}
                    style={{
                        width: '15%',
                        height: '100%',
                        borderRadius: 10
                    }}
                />

                <ViewStyled
                    style={{
                        width: '80%',
                        backgroundColor: theme_colors.transparent,
                        margin: 10
                    }}
                >
                    <ViewStyled
                        backgroundColor={theme_colors.transparent}
                        style={{ 
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}
                    >
                        <TextStyled
                            fontSize={7}
                            color={theme_colors.black}
                            style={{
                                fontFamily: 'SFPro-SemiBold',
                                textAlign: 'left',
                            }}
                        >
                            {restaurant}
                        </TextStyled>

                        <TextStyled
                            fontSize={7}
                            color={theme_colors.black}
                            style={{
                                fontFamily: 'SFPro-SemiBold',
                                textAlign: 'right',
                            }}
                        >
                            BOB. {price}
                        </TextStyled>
                    </ViewStyled>
                    
                    <ViewStyled
                        backgroundColor={theme_colors.transparent}
                        style={{ 
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}
                    >
                        <TextStyled
                            fontSize={4}
                            color={theme_colors.grey}
                            style={{
                                marginTop: 8
                            }}
                        >
                            {date}
                        </TextStyled>

                        <TextStyled
                            fontSize={4}
                            color={theme_colors.primary}
                            style={{
                                marginTop: 8,
                                fontFamily: 'SFPro-Bold',
                            }}
                        >
                            + BOB. {cashback}
                        </TextStyled>
                    </ViewStyled>
                </ViewStyled>
            </ViewStyled>

            <ViewStyled
                style={{
                    width: '98%',
                    height: '0.5%',
                    backgroundColor: theme_colors.requiredGrey,
                    marginBottom: 10
                }}
            />
        </>
    );
};