import React from 'react';
import { theme_colors } from '../../utils/theme/theme_colors';
import TextStyled from '../../utils/ui/TextStyled';
import ViewStyled from '../../utils/ui/ViewStyled';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity, Image, View } from 'react-native';

export default function CashbackCard ({ cashback, onPress }) {
    
    return (
        <View
            style={{
                backgroundColor: theme_colors.white,
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
                        fontSize={10}
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
                        fontSize={10}
                        color={theme_colors.grey}
                        style={{
                            marginTop: 10,
                            fontFamily: 'SFPro-SemiBold',
                        }}
                    >
                        Este Cashback se recargará para tu siguiente compra (10%)
                    </TextStyled>

                    <TextStyled
                        fontSize={7}
                        color={theme_colors.primary}
                        style={{
                            marginTop: 10,
                            fontFamily: 'SFPro-Bold',
                        }}
                    >
                        Bs. {cashback}
                    </TextStyled>
                </View>
            </View>
        </View>
    );
};