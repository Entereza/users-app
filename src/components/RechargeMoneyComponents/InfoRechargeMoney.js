import React from 'react'
import { theme_colors } from '../../utils/theme/theme_colors'
import ViewStyled from '../../utils/ui/ViewStyled'
import { ImageBackground } from 'react-native'
import TextStyled from '../../utils/ui/TextStyled'
import ImageStyled from '../../utils/ui/ImageStyled'
import { theme_textStyles } from '../../utils/theme/theme_textStyles'

export default function InfoRechargeMoney() {
    return (
        <ViewStyled
            backgroundColor={theme_colors.black}
            width={95}
            height={16}
            marginTop={1}
            borderRadius={1.5}
            marginBottom={2}
            style={{
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <ImageBackground
                source={require('../../../assets/Lines/LinesBG.png')}
                style={{
                    width: '100%',
                    height: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    resizeMode: 'contain',
                }}
            >
                <ViewStyled
                    backgroundColor={theme_colors.transparent}
                    paddingLeft={5}
                    style={{
                        width: '70%',
                        height: '95%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <TextStyled
                        fontFamily='SFPro-Bold'
                        textAlign='left'
                        fontSize={theme_textStyles.smedium + 0.5}
                        color={theme_colors.white}
                        numberOfLines={2}
                        style={{
                            width: "100%",
                        }}
                    >
                        {'¿Sabías qué?'}
                    </TextStyled>

                    <TextStyled
                        fontFamily='SFPro-Regular'
                        textAlign='left'
                        fontSize={theme_textStyles.smedium}
                        color={theme_colors.white}
                        style={{
                            width: "100%",
                        }}
                    >
                        Al recargar dinero obtendrás un
                        <TextStyled
                            fontFamily='SFPro-Bold'
                            textAlign='left'
                            fontSize={theme_textStyles.smedium + 0.5}
                            color={theme_colors.white}
                            style={{
                                width: "100%",
                            }}
                        >
                            {' 5% más '}
                        </TextStyled>
                        del valor total que recargues.
                    </TextStyled>
                </ViewStyled>

                <ViewStyled
                    backgroundColor={theme_colors.transparent}
                    style={{
                        width: '30%',
                        height: '75%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <ImageStyled
                        source={require('../../../assets/images/RechargePercentage.png')}
                        style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'contain',
                        }}
                    />
                </ViewStyled>
            </ImageBackground>
        </ViewStyled>
    )
}