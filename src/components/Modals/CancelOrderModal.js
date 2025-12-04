import React, { useState } from 'react'
import { Modal, Pressable, StyleSheet, Alert } from 'react-native'
import TextStyled from '../../utils/ui/TextStyled';
import { theme_colors } from '../../utils/theme/theme_colors';
import ViewStyled from '../../utils/ui/ViewStyled';
import { theme_textStyles } from '../../utils/theme/theme_textStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import adjustFontSize from '../../utils/ui/adjustText';
import { ordersService } from '../../services/api/orders/ordersService';

const CANCEL_REASONS = [
    "Cambié de opinión",
    "Pedí por error",
    "Quiero modificar mi pedido",
    "El tiempo de espera es muy largo",
    "Otro motivo"
];

export default function CancelOrderModal({ visible, onClose, orderId }) {
    const [selectedReason, setSelectedReason] = useState(null);

    const handleCancel = async () => {
        if (selectedReason !== null) {
            console.log("Pedido cancelado por:", CANCEL_REASONS[selectedReason]);
            try {
                const response = await ordersService.cancelOrder(orderId);
                if (response.code === "COD200") {
                    Alert.alert("Éxito", "Pedido cancelado correctamente.");
                    onClose();
                } else {
                    Alert.alert("Error", response.msg || "No se pudo cancelar el pedido.");
                }
            } catch (error) {
                console.error("Error al cancelar el pedido:", error);
                Alert.alert("Error", "Ocurrió un error al intentar cancelar el pedido.");
            }
        }
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <Pressable
                style={styles.endView}
                onPress={onClose}
            >
                <Pressable
                    style={styles.modalView}
                    onPress={(e) => e.stopPropagation()}
                >
                    <ViewStyled
                        width={95}
                        backgroundColor={theme_colors.transparent}
                        style={styles.headerContainer}
                    >
                        <TextStyled
                            fontSize={theme_textStyles.smedium}
                            color={theme_colors.black}
                            fontFamily='SFPro-Bold'
                            style={styles.title}
                        >
                            Cancelar Pedido
                        </TextStyled>

                        <Pressable
                            onPress={onClose}
                            style={{
                                top: -3,
                                right: 10,
                                position: 'absolute',
                            }}
                        >
                            <ViewStyled
                                width={7}
                                height={3.5}
                                borderRadius={1.5}
                                backgroundColor={theme_colors.white}
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderWidth: 1,
                                    borderColor: theme_colors.primary
                                }}
                            >
                                <MaterialCommunityIcons
                                    name="close"
                                    size={adjustFontSize(theme_textStyles.smedium)}
                                    color={theme_colors.primary}
                                />
                            </ViewStyled>
                        </Pressable>
                    </ViewStyled>

                    <ViewStyled
                        backgroundColor={theme_colors.transparent}
                        width={90}
                        style={{
                            marginVertical: 20,
                        }}
                    >
                        <TextStyled
                            fontSize={theme_textStyles.small}
                            color={theme_colors.grey}
                            style={{ marginBottom: 15 }}
                        >
                            Por favor, selecciona el motivo de la cancelación:
                        </TextStyled>

                        {CANCEL_REASONS.map((reason, index) => (
                            <Pressable
                                key={index}
                                onPress={() => setSelectedReason(index)}
                                style={[
                                    styles.reasonPill,
                                    selectedReason === index && styles.selectedPill
                                ]}
                            >
                                <TextStyled
                                    fontSize={theme_textStyles.small}
                                    color={selectedReason === index ? theme_colors.white : theme_colors.black}
                                >
                                    {reason}
                                </TextStyled>
                            </Pressable>
                        ))}
                    </ViewStyled>

                    <ViewStyled
                        backgroundColor={theme_colors.transparent}
                        width={90}
                        style={styles.buttonContainer}
                    >
                        <Pressable
                            style={[
                                styles.button,
                                { width: '38%', backgroundColor: theme_colors.white, borderWidth: 1, borderColor: theme_colors.primary }
                            ]}
                            onPress={onClose}
                        >
                            <TextStyled
                                fontFamily='SFPro-Medium'
                                color={theme_colors.primary}
                                fontSize={theme_textStyles.small}
                            >
                                Volver
                            </TextStyled>
                        </Pressable>

                        <Pressable
                            style={[
                                styles.button,
                                {
                                    backgroundColor: selectedReason !== null ? theme_colors.error : theme_colors.grey,
                                    opacity: selectedReason !== null ? 1 : 0.5
                                }
                            ]}
                            onPress={handleCancel}
                            disabled={selectedReason === null}
                        >
                            <TextStyled
                                fontFamily='SFPro-Medium'
                                color={theme_colors.white}
                                fontSize={theme_textStyles.small + .5}
                            >
                                Cancelar Pedido
                            </TextStyled>
                        </Pressable>
                    </ViewStyled>
                </Pressable>
            </Pressable>
        </Modal>
    )
}

const styles = StyleSheet.create({
    endView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalView: {
        width: '100%',
        backgroundColor: theme_colors.white,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingVertical: 25,
        paddingHorizontal: 20,
        alignItems: 'center',
        shadowColor: theme_colors.white,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    title: {
        textAlign: 'center',
    },
    reasonPill: {
        backgroundColor: theme_colors.lightGrey,
        padding: 12,
        borderRadius: 25,
        marginVertical: 5,
        width: '100%',
        alignItems: 'center',
    },
    selectedPill: {
        backgroundColor: theme_colors.primary,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        width: '58%',
    },
});