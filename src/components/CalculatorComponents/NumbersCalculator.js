import React from 'react'
import { theme_colors } from '../../utils/theme/theme_colors'
import ViewStyled from '../../utils/ui/ViewStyled'
import NumberButton from './NumberButton';

export default function NumbersCalculator({
    onPress,
}) {
    const buttons = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        ['.', 0, '<']
    ];


    return (
        <ViewStyled
            width={90}
            height={38}
            backgroundColor={theme_colors.transparent}
            style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {buttons.map((row, rowIndex) => (
                <ViewStyled
                    key={rowIndex}
                    backgroundColor={theme_colors.transparent}
                    style={{
                        width: 'auto',
                        height: 'auto',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {row.map((number) => (
                        <NumberButton key={number} value={number} onPress={onPress} />
                    ))}
                </ViewStyled>
            ))}
        </ViewStyled>
    )
}