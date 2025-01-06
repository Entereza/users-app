import React, { useState } from 'react';
import TextStyled from '../../utils/ui/TextStyled';
import ViewStyled from '../../utils/ui/ViewStyled';
import { TouchableOpacity } from 'react-native';
import { theme_colors } from '../../utils/theme/theme_colors';

const MoreText = ({ text }) => {
    const maxLength = 70;
        
    const [showFullText, setShowFullText] = useState(false);

    const displayText = text.length <= maxLength || showFullText ? text : `${text.slice(0, maxLength)}...`;

    const handleToggle = () => {
        setShowFullText(!showFullText);
    };

    return (
        <ViewStyled 
            width={'90%'}
            backgroundColor={theme_colors.transparent}
            style={{
                marginTop: 15
            }}
        >
            <TextStyled 
                fontFamily='SFPro-Regular'
                fontSize={7}
                color={theme_colors.black}
            >
                {displayText} {!showFullText && text.length > maxLength && (
                <TextStyled 
                    onPress={handleToggle}
                    color={theme_colors.primary}
                    fontFamily='SFPro-Medium'
                    fontSize={7}
                    style={{
                        alignSelf: 'center',
                        justifyContent: 'center'
                    }}
                > 
                    Más
                </TextStyled>
                )}
            </TextStyled>
        </ViewStyled>
    );
};

export default MoreText;