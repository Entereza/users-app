import React from 'react';
import { theme_colors } from '../../utils/theme/theme_colors';
import TextStyled from '../../utils/ui/TextStyled';
import ViewStyled from '../../utils/ui/ViewStyled';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';

export default function FacturacionCard ({ title, icon, info, info2, onPress }) {
    
    return (
        <View
            backgroundColor={theme_colors.white}
            style={{
                width: '95%',
                marginTop: 15,
                borderRadius: 10,
                elevation: 50,
                shadowColor: theme_colors.black,
                shadowOffset: {
                    width: 1,
                    height: 1,
                },
                shadowOpacity: 0.15,
                shadowRadius: 4,
                alignItems: 'center',
                padding: 15
            }}
        >
            <View
                width={'100%'}
                backgroundColor={theme_colors.transparent}
                style={{
                    justifyContent: 'flex-start'
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

                <View
                    width={'100%'}
                    height={1}
                    backgroundColor={theme_colors.requiredGrey}
                    style={{
                        alignSelf: 'center',
                        marginTop: 10
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
                    <View
                        backgroundColor={theme_colors.transparent}
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            marginTop: 10
                        }}
                    >
                        <Ionicons name={icon} size={20} color="black" />

                        <TextStyled
                            fontSize={7}
                            color={theme_colors.black}
                            style={{
                                marginLeft: 15,
                                fontFamily: 'SFPro-Bold',
                            }}
                        >
                            {info}
                        </TextStyled>

                        <TextStyled
                            fontSize={7}
                            color={theme_colors.grey}
                            style={{
                                marginLeft: 15,
                                fontFamily: 'SFPro-Medium',
                            }}
                        >
                            {info2}
                        </TextStyled>
                    </View>

                    <TouchableOpacity
                        onPress={onPress}
                        style={{
                            justifyContent: 'flex-end'
                        }}
                    >
                        <AntDesign name="edit" size={20} color={theme_colors.primary} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};