import React, { useState } from 'react';
import ViewStyled from '../../utils/ui/ViewStyled';
import TextStyled from '../../utils/ui/TextStyled';
import { Fontisto } from '@expo/vector-icons';
import { theme_colors } from '../../utils/theme/theme_colors';

export default function ProductOptions({ product }) {

    const [isChecked, setIsChecked] = useState(false);

    const toggleCheckbox = () => {
        setIsChecked(!isChecked);
    };

    return (
        <ViewStyled
            backgroundColor={theme_colors.transparent}
            style={{
                justifyContent: 'center',
            }}
        >
            <ViewStyled
                width={'82%'}
                backgroundColor={theme_colors.transparent}
                style={{ 
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 10
                }}
            >
                <TextStyled
                    fontSize={7}
                    color={theme_colors.black}
                    style={{
                        fontFamily: 'SFPro-Regular',
                    }}
                >
                    {product}
                </TextStyled>

                <Fontisto 
                    name={isChecked ? 'checkbox-active': 'checkbox-passive'} 
                    size={18} 
                    color={isChecked ? theme_colors.primary : theme_colors.grey} 
                    onPress={toggleCheckbox}
                    style={{
                        marginLeft: 10
                    }}
                />
            </ViewStyled>

            <ViewStyled
                width={'82%'}
                height={0.2}
                backgroundColor={theme_colors.requiredGrey}
                style={{ 
                    alignItems: 'center',
                    marginTop: 10
                }}
            />
        </ViewStyled>
    );
};