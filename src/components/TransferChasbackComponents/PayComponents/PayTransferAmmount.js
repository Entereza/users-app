import React, { useEffect, useState } from 'react'
import { theme_colors } from '../../../utils/theme/theme_colors'
import ViewStyled from '../../../utils/ui/ViewStyled'
import TextStyled from '../../../utils/ui/TextStyled'
import ModalCalculator from '../../Modals/ModalCalculator'
import ButtonWithIcon from '../../Buttons/ButtonWithIcon'
import { TouchableOpacity } from 'react-native'
import useTransferAmountStore from '../../../utils/tools/interface/transferAmountStore'
import { theme_textStyles } from '../../../utils/theme/theme_textStyles'

export default function PayTransferAmmount() {
    const { toggleTabSlider } = useTransferAmountStore()
    const [showCalculator, setShowCalculator] = useState(false)
    const [ammountSelected, setAmmountSelected] = useState("")

    const openCalculator = () => {
        setShowCalculator(true)
    }

    const closeCalculator = () => {
        setShowCalculator(false)
    }

    useEffect(() => {
        if (ammountSelected) {
            toggleTabSlider(true)
        } else {
            toggleTabSlider(false)
        }
    }, [ammountSelected])

    return (
        <>
            <ViewStyled
                width={95}
                paddingVertical={2}
                paddingHorizontal={4}
                borderRadius={2}
                backgroundColor={theme_colors.white}
                style={{
                    height: 'auto',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    shadowColor: theme_colors.black,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                    elevation: 3,
                }}
            >
                <ViewStyled
                    backgroundColor={theme_colors.transparent}
                    marginBottom={2}
                    paddingBottom={1}
                    style={{
                        width: '100%',
                        height: 'auto',
                        borderBottomWidth: 1,
                        borderBottomColor: theme_colors.greyLine,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <TextStyled
                        fontFamily='SFPro-Bold'
                        textAlign='left'
                        fontSize={theme_textStyles.medium}
                        color={theme_colors.black}
                        style={{
                            width: "100%",
                        }}
                    >
                        {`Monto`}
                    </TextStyled>
                </ViewStyled>

                <ViewStyled
                    backgroundColor={theme_colors.transparent}
                    style={{
                        width: '100%',
                        height: 'auto',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <TextStyled
                        fontFamily='SFPro-Bold'
                        textAlign='left'
                        fontSize={theme_textStyles.medium}
                        color={theme_colors.primary}
                        style={{
                            width: "auto",
                        }}
                    >
                        {`Monto a transferir`}
                    </TextStyled>

                    {
                        ammountSelected
                            ? <TouchableOpacity
                                onPress={openCalculator}
                                style={{
                                    width: 'auto',
                                    height: 'auto'
                                }}
                            >
                                <TextStyled
                                    fontFamily='SFPro-Medium'
                                    textAlign='left'
                                    fontSize={theme_textStyles.medium}
                                    color={theme_colors.primary}
                                    style={{
                                        width: "auto",
                                        textDecorationLine: 'underline',
                                    }}
                                >
                                    {`Bs. ${ammountSelected}`}
                                </TextStyled>
                            </TouchableOpacity>
                            : <ButtonWithIcon
                                withIcon={false}

                                onPress={openCalculator}
                                borderWidth={2}
                                borderColor={theme_colors.greyLine}
                                backgroundColor={theme_colors.transparent}
                                colorText={theme_colors.primary}
                                borderRadius={1}
                                fontSize={theme_textStyles.smaller + .5}
                                height={3}
                                fontFamily={'SFPro-SemiBold'}
                                textButton={'Agregar'}
                                style={{
                                    width: '26%',
                                }}
                            />
                    }
                </ViewStyled>
            </ViewStyled>

            <ModalCalculator
                cashbackUser={10}
                open={showCalculator}
                handleClose={closeCalculator}
                ammountSelected={ammountSelected}
                setAmmountSelected={setAmmountSelected}
            />
        </>
    )
}