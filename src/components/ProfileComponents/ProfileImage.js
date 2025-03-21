import React from 'react'
import ViewStyled from '../../utils/ui/ViewStyled'
import { theme_colors } from '../../utils/theme/theme_colors'
import ImageStyled from '../../utils/ui/ImageStyled'
import { MaterialIcons } from '@expo/vector-icons'
import adjustFontSize from '../../utils/ui/adjustText'
import { theme_textStyles } from '../../utils/theme/theme_textStyles'
import { Pressable } from 'react-native'
import { heightPercentageToDP } from 'react-native-responsive-screen'

export default function ProfileImage({
    image,
    canEdit = false,
    onImagePress,
}) {
    return (
        <ViewStyled
            backgroundColor={theme_colors.transparent}
            marginTop={1}
            marginBottom={2}
            style={{
                width: 'auto',
                height: 'auto',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <ImageStyled
                width={100}
                height={100}
                borderRadius={1.5}
                source={image ? { uri: image } : require('../../../assets/images/DefaultProfileUser.png')}
                style={{
                    maxHeight: 100,
                    maxWidth: 100,
                    borderWidth: 0.2,
                    borderColor: theme_colors.grey,
                    position: "relative"
                }}
                resizeMode="cover"
            />

            {canEdit &&
                <Pressable
                    onPress={onImagePress}
                    style={{
                        width: 'auto',
                        height: 'auto',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 1,
                        borderColor: theme_colors.primary,
                        position: "absolute",
                        borderRadius: heightPercentageToDP(1),
                        bottom: -5,
                        right: -5
                    }}
                >
                    <ViewStyled
                        borderRadius={1}
                        paddingHorizontal={1}
                        paddingVertical={0.5}
                        backgroundColor={theme_colors.white}
                    >
                        <MaterialIcons
                            name="edit"
                            size={adjustFontSize(theme_textStyles.medium)}
                            color={theme_colors.primary}
                        />
                    </ViewStyled>
                </Pressable>
            }
        </ViewStyled>
    )
}