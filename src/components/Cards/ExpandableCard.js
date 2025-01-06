import React, { useState } from 'react';
import { Text, View } from 'react-native';
import ProductOptions from './ProductOptions';
import { AntDesign } from '@expo/vector-icons';
import ViewStyled from '../../utils/ui/ViewStyled';
import TextStyled from '../../utils/ui/TextStyled';
import { theme_colors } from '../../utils/theme/theme_colors';

export default function  ExpandableCard ({ title, max, required }) {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <View
            width={'99%'}
            backgroundColor={theme_colors.white}
            style={{ 
                justifyContent: 'center',
                marginTop: 15,
                padding: 15,
                borderRadius: 15,
                shadowColor: theme_colors.black,
                shadowOffset: {
                    width: 1,
                    height: 1,
                },
                shadowOpacity: 0.2,
                shadowRadius: 4,
            }}
        >
            <ViewStyled
                width={'83%'}
                backgroundColor={theme_colors.transparent}
                style={{ 
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <ViewStyled
                    width={'35%'}
                    backgroundColor={theme_colors.transparent}
                    style={{ 
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <TextStyled
                        fontSize={10}
                        color={theme_colors.black}
                        style={{
                            fontFamily: 'SFPro-Bold',
                        }}
                    >
                        {title}
                    </TextStyled>

                    <TextStyled
                        fontSize={7}
                        color={theme_colors.black}
                        style={{
                            fontFamily: 'SFPro-Medium',
                        }}
                    >
                        ({max})
                    </TextStyled>
                </ViewStyled>

                <ViewStyled
                    width={'30%'}
                    backgroundColor={theme_colors.transparent}
                    style={{ 
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}
                >
                    {required && (
                        <ViewStyled
                            width={'16%'}
                            backgroundColor={theme_colors.requiredGrey}
                            style={{
                                padding: 5,
                                alignItems: 'center',
                                borderRadius: 5
                            }}
                        >
                            <TextStyled
                                fontSize={10}
                                color={theme_colors.grey}
                                style={{
                                    fontFamily: 'SFPro-Regular',
                                }}
                            >
                                Requerido
                            </TextStyled>
                        </ViewStyled>
                    )}

                    <AntDesign 
                        name={expanded ? 'up' : 'down'} 
                        size={20} 
                        color={theme_colors.primary} 
                        onPress={toggleExpand}
                        style={{
                            marginLeft: 10
                        }}
                    />
                </ViewStyled>
            </ViewStyled>

            {expanded && (
                <>
                    <ProductOptions product={"Miel ajo y especias"}/>
                    <ProductOptions product={"Miel ajo y especias"}/>
                    <ProductOptions product={"Miel ajo y especias"}/>
                    <ProductOptions product={"Miel ajo y especias"}/>
                </>
            )}
        </View>
    );
};