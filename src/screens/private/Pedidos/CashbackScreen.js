import React, { useEffect, useState } from "react";
import { theme_colors } from "../../../utils/theme/theme_colors";
import ViewStyled from "../../../utils/ui/ViewStyled";
import useCartStore from "../../../utils/tools/interface/cartStore";
import useAuthStore from "../../../utils/tools/interface/authStore";
import AlertStyled from "../../../utils/ui/AlertStyled";
import SelectAmmountTransfer from "../../../components/CalculatorComponents/SelectAmmountTransfer";
import NumbersCalculator from "../../../components/CalculatorComponents/NumbersCalculator";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { theme_textStyles } from "../../../utils/theme/theme_textStyles";
import TextStyled from "../../../utils/ui/TextStyled";
import ButtonWithIcon from "../../../components/Buttons/ButtonWithIcon";
import { useNavigation } from "@react-navigation/native";

export default function CashbackScreen() {
    const navigation = useNavigation()

    const { user } = useAuthStore()
    const cashback = user?.cashback || 0

    const { myCashback, setMyCashback } = useCartStore();
    const [displayValue, setDisplayValue] = useState('');

    useEffect(() => {
        if (myCashback > 0) {
            setDisplayValue(myCashback)
        }
    }, [myCashback])

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
        setMyCashback(displayValue)
        navigation.goBack()
    }

    const handlePress = (value) => {
        if (value === '<') {
            setDisplayValue(displayValue.slice(0, -1));
        } else if (value === '.') {
            if (!displayValue.includes('.')) {
                if (displayValue > 0) {
                    setDisplayValue(displayValue + value);
                } else {
                    setDisplayValue(0 + value);
                }
            }
        } else {
            let newAmmount = displayValue + value;

            // Validate if the new amount is greater than the user's cashback
            if (parseFloat(newAmmount) > cashback) {
                setShowAlert(true);
                setAlertText({
                    title: 'Monto inválido',
                    message: `El monto no puede ser mayor que tu cashback disponible: ${(parseFloat(cashback) - parseFloat(displayValue ? displayValue : 0)).toFixed(2)}.`,
                    type: 'info',
                    textConfirmButton: 'Entendido',
                    showCancelButton: false
                });
                return;
            }

            // Validate if the new amount is greater than 9999
            if (parseFloat(newAmmount) > 9999) {
                setShowAlert(true);
                setAlertText({
                    title: 'Monto inválido',
                    message: 'Por seguridad, no se permite usar ese tipo de monto.',
                    type: 'info',
                    textConfirmButton: 'Entendido',
                    showCancelButton: false
                });
                return;
            }

            // Validate if the new amount has more than 2 decimal places
            let decimalIndex = newAmmount.indexOf('.');
            if (decimalIndex !== -1 && newAmmount.length - decimalIndex - 1 > 2) {
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

            setDisplayValue(newAmmount);
        }
    };

    const isDisabled = displayValue <= 0

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
                    onCancelPressed={handleCloseAlert}
                    textConfirmButton={alertText.textConfirmButton}
                    textCancelButton={'No, gracias'}
                    showCloseButton={false}
                    showCancelButton={alertText.showCancelButton}
                    widthConfirm={alertText.showCancelButton ? '55%' : '95%'}
                    widthCancel={'40%'}
                />
            }

            <ViewStyled
                backgroundColor={theme_colors.white}
                style={{
                    height: '100%',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}
            >
                <ViewStyled
                    width={85}
                    marginTop={10}
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
                        {displayValue ? displayValue : 0}
                    </TextStyled>
                </ViewStyled>

                <ViewStyled
                    paddingVertical={1.5}
                    marginTop={1}
                    backgroundColor={theme_colors.transparent}
                    style={{
                        width: '90%',
                        height: 'auto',
                        borderTopWidth: 0.5,
                        borderColor: theme_colors.greyLine,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <TextStyled
                        fontFamily='SFPro-SemiBold'
                        textAlign='center'
                        fontSize={theme_textStyles.small}
                        color={'#AAAAAA'}
                        numberOfLines={1}
                        ellipsizeMode='tail'
                        style={{
                            width: '100%'
                        }}
                    >
                        Tienes disponible Bs. {(parseFloat(cashback) - parseFloat(displayValue ? displayValue : 0)).toFixed(2)}
                    </TextStyled>
                </ViewStyled>

                <SelectAmmountTransfer
                    cashbackUser={cashback ? cashback : 0}
                    ammountTransfer={0}
                    onPress={handlePress}
                />

                <NumbersCalculator
                    onPress={handlePress}
                />

                <ButtonWithIcon
                    withIcon={false}

                    onPress={addAmmount}
                    borderWidth={1}
                    borderColor={isDisabled ? theme_colors.lightGrey : theme_colors.primary}
                    backgroundColor={isDisabled ? theme_colors.lightGrey : theme_colors.primary}
                    colorText={theme_colors.white}
                    borderRadius={1.5}
                    fontSize={theme_textStyles.medium}
                    height={6}
                    fontFamily={'SFPro-Bold'}
                    textButton={'Agregar Cashback'}
                    style={{
                        width: '95%',
                        marginTop: 'auto',
                        marginBottom: 20
                    }}
                />
            </ViewStyled>
        </>
    );
};