import React from 'react';
import { TouchableOpacity } from 'react-native';
import { theme_colors } from '../../utils/theme/theme_colors';
import TextStyled from '../../utils/ui/TextStyled';
import ViewStyled from '../../utils/ui/ViewStyled';
import { FontAwesome5 } from '@expo/vector-icons';

export default function ReviewProduct ({ reseñas, kcal, tiempo }) {
    
    return (
        <ViewStyled
            width={75}
            backgroundColor={theme_colors.transparent}
            style={{ 
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 10
            }}
        >
            <ViewStyled
                width={15}
                backgroundColor={theme_colors.transparent}
                style={{ 
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <FontAwesome5
                    name={"star"}
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
                    {reseñas}
                </TextStyled>
            </ViewStyled>

            <ViewStyled
                width={22}
                backgroundColor={theme_colors.transparent}
                style={{ 
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <FontAwesome5
                    name={"fire"}
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
                    {kcal} kcal
                </TextStyled>
            </ViewStyled>

            <ViewStyled
                width={19}
                backgroundColor={theme_colors.transparent}
                style={{ 
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <FontAwesome5
                    name={"clock"}
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
        </ViewStyled>
    );
};