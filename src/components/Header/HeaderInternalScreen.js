import React from 'react'
import ViewStyled from '../../utils/ui/ViewStyled'
import { theme_colors } from '../../utils/theme/theme_colors'
import { Pressable } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import adjustFontSize from '../../utils/ui/adjustText'
import TextStyled from '../../utils/ui/TextStyled'
import { useNavigation } from '@react-navigation/native'
import useTabBarStore from '../../utils/tools/interface/tabBarStore'
import { theme_textStyles } from '../../utils/theme/theme_textStyles'

export default function HeaderInternalScreen({ title, onPress }) {
    const navigation = useNavigation();
    const { toggleTabBar } = useTabBarStore();

    const goBack = () => {
        toggleTabBar(true)
        navigation.goBack();
    };

    return (
        <ViewStyled
            backgroundColor={theme_colors.white}
            width={100}
            height={8}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottomWidth: 0.5,
                borderColor: theme_colors.lightGrey,
                position: 'relative'
            }}
        >
            <Pressable
                onPress={onPress ? onPress : goBack}
                style={{
                    left: 10,
                    position: 'absolute',
                    zIndex: 2
                }}
            >
                <ViewStyled
                    width={11}
                    height={5.5}
                    borderRadius={50}
                    backgroundColor={theme_colors.transparent}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',

                        borderWidth: 1,
                        borderColor: theme_colors.primary
                    }}
                >
                    <MaterialCommunityIcons
                        name="arrow-left"
                        size={adjustFontSize(theme_textStyles.xlarge)}
                        color={theme_colors.primary}
                    />
                </ViewStyled>
            </Pressable>

            <ViewStyled
                backgroundColor={theme_colors.transparent}
                style={{
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <TextStyled
                    fontFamily='SFPro-Bold'
                    textAlign={'center'}
                    fontSize={theme_textStyles.medium}
                    color={theme_colors.black}
                    style={{
                        width: '100%'
                    }}
                >
                    {title}
                </TextStyled>
            </ViewStyled>
        </ViewStyled>
    )
}