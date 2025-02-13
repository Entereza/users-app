import React from 'react';
import ViewStyled from '../../utils/ui/ViewStyled';
import TextStyled from '../../utils/ui/TextStyled';
import { theme_colors } from '../../utils/theme/theme_colors';
import { theme_textStyles } from '../../utils/theme/theme_textStyles';

export default function DeliverySelection({ cost, time }) {

    return (
        <ViewStyled
            marginTop={2}
            width={'75%'}
            backgroundColor={theme_colors.transparent}
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10
            }}
        >
            <ViewStyled
                backgroundColor={theme_colors.transparent}
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <TextStyled
                    fontSize={theme_textStyles.small + .5}
                    color={theme_colors.black}
                    fontFamily='SFPro-SemiBold'
                    style={{
                        marginBottom: 5
                    }}
                >
                    Envío:
                </TextStyled>
                <TextStyled
                    fontSize={theme_textStyles.small + .5}
                    color={theme_colors.black}
                    fontFamily='SFPro-Regular'
                    style={{
                        marginBottom: 5,
                        marginLeft: 5
                    }}
                >
                    Bs. {cost}
                </TextStyled>
            </ViewStyled>

            <ViewStyled
                backgroundColor={theme_colors.transparent}
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <TextStyled
                    fontSize={theme_textStyles.small + .5}
                    color={theme_colors.black}
                    fontFamily='SFPro-SemiBold'
                    style={{
                        marginBottom: 5
                    }}
                >
                    Tiempo:
                </TextStyled>
                <TextStyled
                    fontSize={theme_textStyles.small + .5}
                    color={theme_colors.black}
                    fontFamily='SFPro-Regular'
                    style={{
                        marginBottom: 5,
                        marginLeft: 5
                    }}
                >
                    {time} min
                </TextStyled>
            </ViewStyled>
        </ViewStyled>
    );
};