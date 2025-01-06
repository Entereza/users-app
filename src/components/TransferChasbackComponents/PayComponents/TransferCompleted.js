import React from 'react'
import ViewStyled from '../../../utils/ui/ViewStyled'
import { theme_colors } from '../../../utils/theme/theme_colors'
import TextStyled from '../../../utils/ui/TextStyled'
import { Octicons } from '@expo/vector-icons'
import adjustFontSize from '../../../utils/ui/adjustText'
import ButtonWithIcon from '../../Buttons/ButtonWithIcon'
import { theme_textStyles } from '../../../utils/theme/theme_textStyles'

export default function TransferCompleted({ goToHomeScreen }) {

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
                        fontSize={theme_textStyles.xlarge}
                        color={theme_colors.white}
                        style={{
                            width: "100%",
                        }}
                    >
                        {'Transferencia Completada'}
                    </TextStyled>
                </ViewStyled>

                <ViewStyled
                    backgroundColor={theme_colors.transparent}
                    marginBottom={4}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 'auto',
                        height: 'auto',
                    }}
                >
                    <Octicons
                        name="check-circle-fill"
                        size={adjustFontSize(40)}
                        color={theme_colors.white}
                    />
                </ViewStyled>

                <ButtonWithIcon
                    withIcon={false}
                    onPress={goToHomeScreen}
                    borderWidth={0}
                    backgroundColor={theme_colors.white}
                    colorText={theme_colors.primary}
                    borderRadius={1.5}
                    fontSize={theme_textStyles.medium}
                    fontFamily={'SFPro-Bold'}
                    textButton={'Ir al menú'}
                    height={6}
                    style={{
                        width: '80%',
                        marginBottom: 15,
                    }}
                />

                <ButtonWithIcon
                    withIcon={false}
                    onPress={null}
                    borderWidth={1}
                    borderColor={theme_colors.white}
                    backgroundColor={theme_colors.transparent}
                    colorText={theme_colors.white}
                    borderRadius={1.5}
                    fontSize={theme_textStyles.smedium}
                    fontFamily={'SFPro-SemiBold'}
                    textButton={'Compartir comprobante'}
                    height={6}
                    style={{
                        width: '80%',
                    }}
                />
            </ViewStyled>
        </ViewStyled>
    )
}