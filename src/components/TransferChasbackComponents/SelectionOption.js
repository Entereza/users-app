import { View, Text } from 'react-native'
import React from 'react'
import ViewStyled from '../../utils/ui/ViewStyled'
import { theme_colors } from '../../utils/theme/theme_colors'
import SelectOptionItem from './SelectOptionItem'

export default function SelectionOption({
    nameOption1,
    nameOption2,
    optionSelected,
    onPress
}) {
    return (
        <ViewStyled
            width={95}
            height={6}
            paddingHorizontal={4}
            marginTop={1}
            backgroundColor={theme_colors.transparent}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <SelectOptionItem
                onPress={onPress}
                isActive={optionSelected}
                nameOption={nameOption1}
            />

            {
                nameOption2 && (
                    <SelectOptionItem
                        onPress={onPress}
                        isActive={!optionSelected}
                        nameOption={nameOption2}
                    />
                )
            }
        </ViewStyled>
    )
}