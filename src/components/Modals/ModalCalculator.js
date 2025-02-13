import React, { useEffect, useState } from 'react'
import ViewStyled from '../../utils/ui/ViewStyled'
import { theme_colors } from '../../utils/theme/theme_colors'
import { Modal } from 'react-native'
import { heightPercentageToDP } from 'react-native-responsive-screen'
import TextStyled from '../../utils/ui/TextStyled'
import NumbersCalculator from '../CalculatorComponents/NumbersCalculator'
import SelectAmmountTransfer from '../CalculatorComponents/SelectAmmountTransfer'
import AlertStyled from '../../utils/ui/AlertStyled'
import { theme_textStyles } from '../../utils/theme/theme_textStyles'

export default function ModalCalculator({
    open,
    handleClose,
    ammountSelected = "",
    setAmmountSelected,
    cashbackUser
}) {
    const [ammountTransfer, setAmmountTransfer] = useState("")

    useEffect(() => {
        if (open) {
            setAmmountTransfer(ammountSelected)
        }
    }, [open])

    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState({
        title: '',
        message: '',
        type: 'success',
        textConfirmButton: '',
        showCancelButton: true
    });

    const handleCloseAlert = () => {
        setShowAlert(false)
    }

    const addAmmount = () => {
        if (!cashbackUser) {
            setAmmountSelected(ammountTransfer)
            handleCloseAlert()
            handleClose()
            return;
        }

        if (ammountTransfer <= cashbackUser) {
            setAmmountSelected(ammountTransfer)
            handleCloseAlert()
            handleClose()
            return
        }

        setShowAlert(true)
        setAlertText({
            title: 'No se pudo agregar monto',
            message: `No puedes agregar un monto mayor a tu saldo. Tu saldo actual es Bs. ${cashbackUser}`,
            type: 'info',
            textConfirmButton: 'Cambiar monto',
            showCancelButton: false
        });
    }

    const closeModalCalculator = () => {
        if (ammountSelected === ammountTransfer) {
            handleClose()
            return
        } else if (ammountTransfer <= cashbackUser) {
            addAmmount()
            return
        } else {
            setShowAlert(true)
            setAlertText({
                title: '¿Quieres guardar el monto que seleccionaste?',
                message: 'Se perderá tu selección al volver atrás.',
                type: 'warning',
                textConfirmButton: 'Guardar',
                showCancelButton: true
            });
        }
    }


    const handlePress = (value) => {
        if (value === '<') {
            setAmmountTransfer(ammountTransfer.slice(0, -1));
        } else if (value === '.') {
            if (!ammountTransfer.includes('.')) {
                if (ammountTransfer > 0) {
                    setAmmountTransfer(ammountTransfer + value);
                } else {
                    setAmmountTransfer(0 + value);
                }
            }
        } else {
            let newAmmount = parseFloat(ammountTransfer) + parseFloat(value);

            // Convert newAmmount to a string for indexOf
            let newAmmountStr = newAmmount.toString();

            // Validate if the new amount is greater than 9999
            if (parseFloat(newAmmount) > 9999) {
                setShowAlert(true);
                setAlertText({
                    title: 'Monto inválido',
                    message: 'Por seguridad, no se permite recargar ese tipo de monto.',
                    type: 'info',
                    textConfirmButton: 'Entendido',
                    showCancelButton: false
                });
                return;
            }

            // Validate if the new amount has more than 2 decimal places
            let decimalIndex = newAmmountStr.indexOf('.');
            if (decimalIndex !== -1 && newAmmountStr.length - decimalIndex - 1 > 2) {
                setShowAlert(true);
                setAlertText({
                    title: 'Monto inválido',
                    message: 'El monto no puede tener más de 2 decimales.',
                    type: 'info',
                    textConfirmButton: 'Entendido',
                    showCancelButton: false
                });
                return;
            }

            setAmmountTransfer(newAmmountStr);
        }
    };


    const closeCalculatorAlert = () => {
        handleCloseAlert()
        handleClose()
    }

    return (
        <>
            {
                showAlert &&
                <AlertStyled
                    widthModal={90}
                    heightModal={30}
                    heightText={19}
                    title={alertText.title}
                    message={alertText.message}
                    type={alertText.type}
                    onConfirmPressed={alertText.showCancelButton ? addAmmount : handleCloseAlert}
                    onCancelPressed={closeCalculatorAlert}
                    textConfirmButton={alertText.textConfirmButton}
                    textCancelButton={'No, gracias'}
                    showCloseButton={false}
                    showCancelButton={alertText.showCancelButton}
                    widthConfirm={alertText.showCancelButton ? '55%' : '95%'}
                    widthCancel={'40%'}
                />
            }

            <Modal
                visible={open}
                onRequestClose={closeModalCalculator}
                animationType="slide"
                transparent={true}
            >
                <ViewStyled
                    height={100}
                    backgroundColor={theme_colors.backgroundModal}
                    style={{
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}
                >
                    <ViewStyled
                        width={100}
                        height={60}
                        paddingTop={1}
                        backgroundColor={theme_colors.white}
                        style={{
                            borderTopLeftRadius: heightPercentageToDP(5),
                            borderTopRightRadius: heightPercentageToDP(5),
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            shadowColor: theme_colors.black,
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.5,
                            shadowRadius: 2,
                            elevation: 11,
                        }}
                    >
                        <ViewStyled
                            width={85}
                            backgroundColor={theme_colors.transparent}
                            style={{
                                height: 'auto',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'flex-start',
                            }}
                        >
                            <TextStyled
                                fontFamily='SFPro-Bold'
                                textAlign='left'
                                fontSize={theme_textStyles.medium}
                                color={theme_colors.primary}
                                numberOfLines={1}
                                style={{
                                    marginTop: 15
                                }}
                            >
                                {'Bs. '}
                            </TextStyled>
                            <TextStyled
                                fontFamily='SFPro-Bold'
                                textAlign='left'
                                fontSize={20}
                                color={theme_colors.primary}
                                numberOfLines={1}
                            >
                                {ammountTransfer ? ammountTransfer : 0}
                            </TextStyled>
                        </ViewStyled>

                        <SelectAmmountTransfer
                            cashbackUser={cashbackUser ? cashbackUser : 100}
                            ammountTransfer={ammountTransfer}
                            onPress={handlePress}
                            handleClose={addAmmount}
                        />

                        <NumbersCalculator
                            onPress={handlePress}
                        />
                    </ViewStyled>
                </ViewStyled>
            </Modal>
        </>
    )
}