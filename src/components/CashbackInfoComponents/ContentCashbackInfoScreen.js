import React from 'react'
import { ImageBackground } from 'react-native'
import ViewStyled from '../../utils/ui/ViewStyled'
import { theme_colors } from '../../utils/theme/theme_colors'
import ImageStyled from '../../utils/ui/ImageStyled'
import TextStyled from '../../utils/ui/TextStyled'
import ButtonWithIcon from '../Buttons/ButtonWithIcon'
import { theme_textStyles } from '../../utils/theme/theme_textStyles'

export default function ContentCashbackInfoScreen({ onPress }) {
    return (
        <ViewStyled
            backgroundColor={theme_colors.transparent}
            width={100}
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}
        >
            <ImageBackground
                source={require('../../../assets/Lines/LinesCashbackBg.png')}
                style={{
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    resizeMode: 'contain'
                }}
            >
                <ViewStyled
                    backgroundColor={theme_colors.transparent}
                    style={{
                        width: '75%',
                        height: '40%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <ImageStyled
                        source={require('../../../assets/cashbackImage.png')}
                        style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'contain',
                        }}
                    />
                </ViewStyled>

                <ViewStyled
                    backgroundColor={`${theme_colors.backgroundLightGrey}22`}
                    width={95}
                    paddingVertical={2}
                    paddingHorizontal={4}
                    borderRadius={3}
                    marginTop={1}
                    style={{
                        height: 'auto',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <TextStyled
                        fontFamily='SFPro-Regular'
                        textAlign='left'
                        fontSize={theme_textStyles.xlarge}
                        color={theme_colors.white}
                        numberOfLines={3}
                        style={{
                            width: "100%",
                        }}
                    >
                        {'El cashback es\n'}
                        <TextStyled
                            fontFamily='SFPro-Heavy'
                            textAlign='left'
                            fontSize={theme_textStyles.xlarge + 2}
                            color={theme_colors.secondary}
                            numberOfLines={3}
                            style={{
                                width: "100%",
                            }}
                        >
                            Dinero de vuelta
                        </TextStyled>
                    </TextStyled>

                    <TextStyled
                        fontFamily='SFPro-Regular'
                        textAlign='left'
                        fontSize={theme_textStyles.smedium}
                        color={theme_colors.textGrey}
                        style={{
                            width: "100%",
                        }}
                    >
                        Con Entereza, un porcentaje de tu compra se te devuelve para que puedas utilizarlo en tu siguiente compra, porcentaje que te
                        otorga la empresa para fidelizarte.
                    </TextStyled>

                    <ViewStyled
                        backgroundColor={theme_colors.transparent}
                        marginTop={2}
                        width={12}
                        height={8}
                        style={{
                            alignSelf: 'flex-start',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                        }}
                    >
                        <ImageStyled
                            source={require('../../../assets/icons/logoWhiteEntereza.png')}
                            style={{
                                width: '100%',
                                height: '100%',
                                resizeMode: 'contain',
                            }}
                        />
                    </ViewStyled>
                </ViewStyled>

                <ButtonWithIcon
                    withIcon={false}

                    onPress={onPress}
                    borderWidth={1}
                    borderColor={theme_colors.white}
                    backgroundColor={theme_colors.transparent}
                    colorText={theme_colors.white}
                    borderRadius={1.5}
                    fontSize={theme_textStyles.medium}
                    height={6}
                    fontFamily={'SFPro-Bold'}
                    textButton={'Entendido'}
                    style={{
                        width: '95%',
                        marginTop: 'auto',
                        marginBottom: 10
                    }}
                />
            </ImageBackground>
        </ViewStyled>
    )
}