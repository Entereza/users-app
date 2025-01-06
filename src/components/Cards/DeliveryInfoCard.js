import React from 'react';
import { TouchableOpacity } from 'react-native';
import { theme_colors } from '../../utils/theme/theme_colors';
import TextStyled from '../../utils/ui/TextStyled';
import ViewStyled from '../../utils/ui/ViewStyled';
import { FontAwesome } from '@expo/vector-icons';

export default function DeliveryInfoCard ({ tiempo, costo, cashback, onPress }) {
    
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                width: "92%",
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                borderWidth: 1,
                backgroundColor: theme_colors.white,
                borderColor: theme_colors.white,
                marginBottom: 10,
                marginTop: 15,
                elevation: 50,
                shadowColor: theme_colors.black,
                shadowOffset: {
                    width: 5,
                    height: 10,
                },
                shadowOpacity: 0.2,
                shadowRadius: 15,
            }}
        >
            <ViewStyled
                width={75}
                backgroundColor={theme_colors.transparent}
                style={{ 
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <ViewStyled
                    width={20}
                    backgroundColor={theme_colors.transparent}
                    style={{ 
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <FontAwesome
                        name={"motorcycle"}
                        color={theme_colors.primary}
                        size={18}
                    />
                    <TextStyled
                        fontSize={7}
                        color={theme_colors.grey}
                        style={{
                            fontFamily: 'SFPro-Regular'
                        }}
                    >
                        Bs. {costo}
                    </TextStyled>
                </ViewStyled>

                <ViewStyled
                    width={25}
                    backgroundColor={theme_colors.transparent}
                    style={{ 
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <FontAwesome
                        name={"clock-o"}
                        color={theme_colors.primary}
                        size={18}
                    />
                    <TextStyled
                        fontSize={7}
                        color={theme_colors.grey}
                        style={{
                            fontFamily: 'SFPro-Regular'
                        }}
                    >
                        {tiempo} min
                    </TextStyled>
                </ViewStyled>

                <ViewStyled
                    width={15}
                    backgroundColor={theme_colors.transparent}
                    style={{ 
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <FontAwesome
                        name={"money"}
                        color={theme_colors.primary}
                        size={18}
                    />
                    <TextStyled
                        fontSize={7}
                        color={theme_colors.grey}
                        style={{
                            fontFamily: 'SFPro-Regular'
                        }}
                    >
                        {cashback}%
                    </TextStyled>
                </ViewStyled>
            </ViewStyled>
        </TouchableOpacity>
    );
};