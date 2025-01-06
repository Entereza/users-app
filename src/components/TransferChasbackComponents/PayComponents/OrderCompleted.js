import React from 'react'
import ViewStyled from '../../../utils/ui/ViewStyled'
import { theme_colors } from '../../../utils/theme/theme_colors'
import TextStyled from '../../../utils/ui/TextStyled'
import { Octicons } from '@expo/vector-icons'
import adjustFontSize from '../../../utils/ui/adjustText'
import ButtonWithIcon from '../../Buttons/ButtonWithIcon'

export default function OrderCompleted({ goToOrderScreen, cashbackAmount }) {
    return (
        <ViewStyled
            width={100}
            height={100}
            backgroundColor={theme_colors.transparent}
            style={{
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <ViewStyled
                width={85}
                paddingTop={3}
                paddingBottom={3.5}
                borderRadius={2}
                backgroundColor={theme_colors.transparent}
                style={{
                    height: 'auto',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 2.5,
                    borderColor: theme_colors.green
                }}
            >
                <ViewStyled
                    backgroundColor={theme_colors.transparent}
                    marginBottom={1.5}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '90%',
                        height: 'auto',
                    }}
                >
                    <TextStyled
                        fontFamily='SFPro-Bold'
                        textAlign='center'
                        fontSize={12}
                        color={theme_colors.white}
                        style={{
                            width: "100%",
                        }}
                    >
                        {'Orden Completada'}
                    </TextStyled>
                </ViewStyled>

                <ViewStyled
                    backgroundColor={theme_colors.transparent}
                    marginBottom={2}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 'auto',
                        height: 'auto',
                    }}
                >
                    <Octicons
                        name="check-circle-fill"
                        size={adjustFontSize(80)}
                        color={theme_colors.white}
                    />
                </ViewStyled>

                <ViewStyled
                    backgroundColor={theme_colors.transparent}
                    marginBottom={4}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '90%',
                        height: 'auto',
                    }}
                >
                    <TextStyled
                        fontFamily='SFPro-Bold'
                        textAlign='center'
                        fontSize={10}
                        color={theme_colors.white}
                        style={{
                            marginBottom: 10,
                        }}
                    >
                        {'Cashback ganado'}
                    </TextStyled>
                    <TextStyled
                        fontFamily='SFPro-Bold'
                        textAlign='center'
                        fontSize={30}
                        color={theme_colors.white}
                    >
                        {`Bs. ${cashbackAmount}`}
                    </TextStyled>
                </ViewStyled>

                <ButtonWithIcon
                    withIcon={false}
                    onPress={goToOrderScreen}
                    borderWidth={0}
                    backgroundColor={theme_colors.white}
                    colorText={theme_colors.primary}
                    borderRadius={1.5}
                    fontSize={8}
                    fontFamily={'SFPro-Bold'}
                    textButton={'Ver mi pedido'}
                    height={6}
                    style={{
                        width: '80%',
                    }}
                />
            </ViewStyled>
        </ViewStyled>
    )
} 