import React from 'react'
import { TouchableOpacity } from 'react-native'
import { theme_colors } from '../../../utils/theme/theme_colors'
import ViewStyled from '../../../utils/ui/ViewStyled'
import TextStyled from '../../../utils/ui/TextStyled'
import { theme_textStyles } from '../../../utils/theme/theme_textStyles'

export default function SelectTransactionType({
    onPress,
    type,
    isSelected,
    activeColor = theme_colors.primary,
    inactiveColor = theme_colors.grey
}) {
    return (
        <TouchableOpacity
            onPress={onPress}
        >
            <ViewStyled
                paddingVertical={0.2}
                paddingHorizontal={1}
                backgroundColor={theme_colors.transparent}
                style={{
                    width: 'auto',
                    height: 'auto',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: isSelected ? activeColor : inactiveColor
                }}
            >
                <TextStyled
                    fontSize={theme_textStyles.small}
                    color={isSelected ? activeColor : inactiveColor}
                    fontFamily={isSelected ? 'SFPro-Bold' : 'SFPro-Medium'}
                >
                    {type}
                </TextStyled>
            </ViewStyled>
        </TouchableOpacity>
    )
}