import React, { useState } from 'react';
import { theme_colors } from '../../utils/theme/theme_colors';
import ViewStyled from '../../utils/ui/ViewStyled';
import TextStyled from '../../utils/ui/TextStyled';
import { theme_textStyles } from '../../utils/theme/theme_textStyles';
import { TouchableOpacity, TextInput, Modal } from 'react-native';
import { MaterialCommunityIcons, FontAwesome6 } from '@expo/vector-icons';
import adjustFontSize from '../../utils/ui/adjustText';
import useCartStore from '../../utils/tools/interface/cartStore';

export default function TipSelectionCard() {
    const { deliveryTip, setDeliveryTip } = useCartStore();
    const [showModal, setShowModal] = useState(false);
    const [customTip, setCustomTip] = useState('');
    const [isCustomMode, setIsCustomMode] = useState(false);

    const tipOptions = [
        { value: 0, label: 'Sin propina' },
        { value: 3, label: 'Bs. 3' },
        { value: 5, label: 'Bs. 5' },
        { value: 10, label: 'Bs. 10' },
        { value: 15, label: 'Bs. 15' },
        { value: 'custom', label: 'Personalizado' }
    ];

    const handleTipSelect = (tipValue) => {
        if (tipValue === 'custom') {
            setIsCustomMode(true);
            setCustomTip(deliveryTip > 0 ? deliveryTip.toString() : '');
        } else {
            setIsCustomMode(false);
            setDeliveryTip(tipValue);
            setCustomTip('');
            setShowModal(false);
        }
    };

    const handleCustomTipChange = (value) => {
        setCustomTip(value);
        const numericValue = parseFloat(value) || 0;
        setDeliveryTip(numericValue);
    };

    const handleSaveCustomTip = () => {
        setIsCustomMode(false);
        setShowModal(false);
    };

    const getTipDisplayText = () => {
        if (deliveryTip === 0) {
            return "Agregar propina";
        }
        return `Bs. ${deliveryTip}`;
    };

    const TipOption = ({ option, isSelected, onPress }) => (
        <TouchableOpacity onPress={onPress}>
            <ViewStyled
                backgroundColor={isSelected ? theme_colors.primary : theme_colors.white}
                paddingVertical={1}
                paddingHorizontal={2}
                marginHorizontal={0.5}
                marginVertical={0.5}
                style={{
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: isSelected ? theme_colors.primary : theme_colors.lightGrey,
                    minWidth: 70,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <TextStyled
                    fontFamily='SFPro-Medium'
                    fontSize={theme_textStyles.small}
                    color={isSelected ? theme_colors.white : theme_colors.black}
                    textAlign='center'
                >
                    {option.label}
                </TextStyled>
            </ViewStyled>
        </TouchableOpacity>
    );

    return (
        <>
            <TouchableOpacity onPress={() => setShowModal(true)} activeOpacity={0.9}>
                <ViewStyled
                    backgroundColor={theme_colors.white}
                    width={95}
                    marginBottom={2}
                    paddingVertical={1}
                    style={{
                        height: 'auto',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 15,

                        shadowColor: theme_colors.black,
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 2,
                        elevation: 3,
                    }}
                >
                    <ViewStyled
                        paddingVertical={1.5}
                        marginBottom={1}
                        backgroundColor={theme_colors.transparent}
                        style={{
                            width: '90%',
                            height: 'auto',
                            borderBottomWidth: 0.5,
                            borderColor: theme_colors.greyLine,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <TextStyled
                            fontFamily='SFPro-Bold'
                            textAlign='left'
                            fontSize={theme_textStyles.medium}
                            color={theme_colors.dark}
                            numberOfLines={1}
                            ellipsizeMode='tail'
                            style={{
                                width: '100%'
                            }}
                        >
                            Propina (Opcional)
                        </TextStyled>
                    </ViewStyled>

                    <ViewStyled
                        paddingVertical={1}
                        backgroundColor={theme_colors.transparent}
                        style={{
                            width: '90%',
                            height: 'auto',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <MaterialCommunityIcons
                            name="hand-coin"
                            color={theme_colors.dark}
                            size={adjustFontSize(theme_textStyles.medium)}
                        />

                        <ViewStyled
                            backgroundColor={theme_colors.transparent}
                            style={{
                                width: '80%',
                                height: 'auto',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <TextStyled
                                fontFamily='SFPro-SemiBold'
                                textAlign='left'
                                fontSize={deliveryTip > 0 ? theme_textStyles.smedium : theme_textStyles.small + .5}
                                color={deliveryTip > 0 ? theme_colors.black : "#5D5D5D"}
                                numberOfLines={1}
                                ellipsizeMode='tail'
                                style={{
                                    width: '100%',
                                    marginBottom: 2
                                }}
                            >
                                {getTipDisplayText()}
                            </TextStyled>
                        </ViewStyled>

                        <FontAwesome6
                            name={deliveryTip > 0 ? 'pencil' : 'plus'}
                            color={theme_colors.lightGrey2}
                            size={adjustFontSize(theme_textStyles.smedium)}
                        />
                    </ViewStyled>
                </ViewStyled>
            </TouchableOpacity>

            <Modal
                visible={showModal}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowModal(false)}
            >
                <ViewStyled
                    backgroundColor="rgba(0, 0, 0, 0.5)"
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <ViewStyled
                        backgroundColor={theme_colors.white}
                        width={90}
                        paddingVertical={2}
                        style={{
                            borderRadius: 15,
                            shadowColor: theme_colors.black,
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.5,
                            shadowRadius: 2,
                            elevation: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <ViewStyled
                            paddingVertical={1}
                            marginBottom={1}
                            backgroundColor={theme_colors.transparent}
                            style={{
                                width: '90%',
                                borderBottomWidth: 0.5,
                                borderColor: theme_colors.greyLine,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <TextStyled
                                fontFamily='SFPro-Bold'
                                fontSize={theme_textStyles.medium}
                                color={theme_colors.dark}
                                textAlign='center'
                            >
                                Seleccionar Propina
                            </TextStyled>
                        </ViewStyled>

                        <ViewStyled
                            backgroundColor={theme_colors.transparent}
                            style={{
                                width: '90%',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 1,
                            }}
                        >
                            {tipOptions.map((option, index) => (
                                <TipOption
                                    key={index}
                                    option={option}
                                    isSelected={
                                        option.value === 'custom' 
                                            ? isCustomMode 
                                            : option.value === deliveryTip
                                    }
                                    onPress={() => handleTipSelect(option.value)}
                                />
                            ))}
                        </ViewStyled>

                        {isCustomMode && (
                            <ViewStyled
                                backgroundColor={theme_colors.transparent}
                                paddingVertical={1}
                                style={{
                                    width: '90%',
                                    alignItems: 'center',
                                    marginBottom: 1,
                                }}
                            >
                                <TextInput
                                    value={customTip}
                                    onChangeText={handleCustomTipChange}
                                    placeholder="Ingresa el monto"
                                    keyboardType="numeric"
                                    style={{
                                        borderWidth: 1,
                                        borderColor: theme_colors.lightGrey,
                                        borderRadius: 8,
                                        paddingHorizontal: 10,
                                        paddingVertical: 8,
                                        width: '60%',
                                        textAlign: 'center',
                                        fontFamily: 'SFPro-Medium',
                                        fontSize: adjustFontSize(theme_textStyles.small),
                                        color: theme_colors.black,
                                    }}
                                />
                                <TouchableOpacity onPress={handleSaveCustomTip}>
                                    <ViewStyled
                                        backgroundColor={theme_colors.primary}
                                        paddingVertical={0.5}
                                        paddingHorizontal={2}
                                        marginTop={1}
                                        style={{
                                            borderRadius: 8,
                                        }}
                                    >
                                        <TextStyled
                                            fontFamily='SFPro-Medium'
                                            fontSize={theme_textStyles.small}
                                            color={theme_colors.white}
                                        >
                                            Guardar
                                        </TextStyled>
                                    </ViewStyled>
                                </TouchableOpacity>
                            </ViewStyled>
                        )}

                        <ViewStyled
                            paddingVertical={1}
                            backgroundColor={theme_colors.transparent}
                            style={{
                                width: '90%',
                                borderTopWidth: 0.5,
                                borderColor: theme_colors.greyLine,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <TextStyled
                                fontFamily='SFPro-SemiBold'
                                fontSize={theme_textStyles.small}
                                color={theme_colors.grey}
                            >
                                Propina seleccionada:
                            </TextStyled>
                            <TextStyled
                                fontFamily='SFPro-Bold'
                                fontSize={theme_textStyles.small}
                                color={theme_colors.primary}
                            >
                                Bs. {deliveryTip}
                            </TextStyled>
                        </ViewStyled>

                        <TouchableOpacity onPress={() => setShowModal(false)}>
                            <ViewStyled
                                backgroundColor={theme_colors.lightGrey}
                                paddingVertical={0.5}
                                paddingHorizontal={2}
                                marginTop={1}
                                style={{
                                    borderRadius: 8,
                                    alignSelf: 'center',
                                }}
                            >
                                <TextStyled
                                    fontFamily='SFPro-Medium'
                                    fontSize={theme_textStyles.small}
                                    color={theme_colors.black}
                                >
                                    Cerrar
                                </TextStyled>
                            </ViewStyled>
                        </TouchableOpacity>
                    </ViewStyled>
                </ViewStyled>
            </Modal>
        </>
    );
} 