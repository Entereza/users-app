import React from 'react';
import ViewStyled from '../../utils/ui/ViewStyled';
import TextStyled from '../../utils/ui/TextStyled';
import { theme_colors } from '../../utils/theme/theme_colors';

export default function DeliverySelection({ cost, time }) {

    return ( 
        <ViewStyled
            width={'60%'}
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
                    fontSize={4.5}
                    color={theme_colors.black}
                    fontFamily='SFPro-SemiBold'
                    style={{
                        marginBottom: 5
                    }}
                >
                    Envío:
                </TextStyled>
                <TextStyled
                    fontSize={4.5}
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
                    fontSize={4.5}
                    color={theme_colors.black}
                    fontFamily='SFPro-SemiBold'
                    style={{
                        marginBottom: 5
                    }}
                >
                    Tiempo:
                </TextStyled>
                <TextStyled
                    fontSize={4.5}
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