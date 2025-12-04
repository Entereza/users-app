import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ViewStyled from '../../utils/ui/ViewStyled'
import { theme_colors } from '../../utils/theme/theme_colors'
import useTabBarStore from '../../utils/tools/interface/tabBarStore';
import { Platform } from 'react-native';

export default function SafeAreaStyled({
    width = 100,
    height = 100,
    backgroundColor = theme_colors.primary,
    children,
    styleArea,
    styleView,
    edges = 'top',
}) {
    const { colorStatusBar } = useTabBarStore();

    return (
        <SafeAreaView edges={[edges]} style={[styleArea, { backgroundColor: Platform.OS === 'ios' ? colorStatusBar : theme_colors.transparent }]}>
            <ViewStyled
                backgroundColor={backgroundColor}
                width={width}
                height={height}
                style={styleView}
            >
                {
                    children
                }
            </ViewStyled>
        </SafeAreaView>
    )
}