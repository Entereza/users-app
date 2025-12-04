import React from 'react'
import { Modal, Pressable, StyleSheet } from 'react-native'
import TextStyled from '../../utils/ui/TextStyled';
import { theme_colors } from '../../utils/theme/theme_colors';
import ViewStyled from '../../utils/ui/ViewStyled';
import { theme_textStyles } from '../../utils/theme/theme_textStyles';
import OrderProductsList from '../OrderComponents/OrderProductsList';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import adjustFontSize from '../../utils/ui/adjustText';

export default function DetailsOrderModal({ order, visible, onClose }) {
    console.log(order.order.products);

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
                            Detalles del pedido
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
                            height: 'auto',
                            marginBottom: 20,
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                        }}
                    >
                        <ViewStyled
                            backgroundColor={theme_colors.transparent}
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: '100%',
                            }}
                        >
                            <TextStyled
                                fontFamily='SFPro-Medium'
                                fontSize={theme_textStyles.small}
                                color={theme_colors.grey}
                            >
                                Total:
                            </TextStyled>
                            <TextStyled
                                fontFamily='SFPro-Medium'
                                fontSize={theme_textStyles.small}
                                color={theme_colors.black}
                            >
                                Bs. {order.order.totalFinal}
                            </TextStyled>
                        </ViewStyled>

                        <ViewStyled
                            backgroundColor={theme_colors.transparent}
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: '100%',
                            }}
                        >
                            <TextStyled
                                fontFamily='SFPro-Medium'
                                fontSize={theme_textStyles.small}
                                color={theme_colors.grey}
                            >
                                Tarifa de Envío:
                            </TextStyled>
                            <TextStyled
                                fontFamily='SFPro-Medium'
                                fontSize={theme_textStyles.small}
                                color={theme_colors.black}
                            >
                                Bs. {order.order.deliveryFee}
                            </TextStyled>
                        </ViewStyled>

                        <ViewStyled
                            backgroundColor={theme_colors.transparent}
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: '100%',
                            }}
                        >
                            <TextStyled
                                fontFamily='SFPro-Medium'
                                fontSize={theme_textStyles.small}
                                color={theme_colors.grey}
                            >
                                Tarifa de Servicio:
                            </TextStyled>
                            <TextStyled
                                fontFamily='SFPro-Medium'
                                fontSize={theme_textStyles.small}
                                color={theme_colors.black}
                            >
                                Bs. {order.order.serviceFee}
                            </TextStyled>
                        </ViewStyled>

                        {order.order.userCashback > 0 && (
                            <ViewStyled
                                backgroundColor={theme_colors.transparent}
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    width: '100%',
                                    marginBottom: 10,
                                }}
                            >
                                <TextStyled
                                    fontFamily='SFPro-Medium'
                                    fontSize={theme_textStyles.small}
                                    color={theme_colors.grey}
                                >
                                    Cashback:
                                </TextStyled>
                                <TextStyled
                                    fontFamily='SFPro-Medium'
                                    fontSize={theme_textStyles.small}
                                    color={theme_colors.success}
                                >
                                    - Bs. {order.order.userCashback}
                                </TextStyled>
                            </ViewStyled>
                        )}

                        <ViewStyled
                            backgroundColor={theme_colors.transparent}
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: '100%',
                            }}
                        >
                            <TextStyled
                                fontFamily='SFPro-Bold'
                                fontSize={theme_textStyles.smedium}
                                color={theme_colors.grey}
                            >
                                Total Final:
                            </TextStyled>
                            <TextStyled
                                fontFamily='SFPro-Bold'
                                fontSize={theme_textStyles.smedium}
                                color={theme_colors.primary}
                            >
                                Bs. {order.order.totalFinal + order.order.deliveryFee + order.order.serviceFee - (order.order.userCashback || 0)}
                            </TextStyled>
                        </ViewStyled>
                    </ViewStyled>

                    <OrderProductsList products={order.order.products} />
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
        marginBottom: 20,
        position: 'relative',
    },
    title: {
        textAlign: 'center',
    },
    closeButton: {
        position: 'absolute',
        right: 0,
        padding: 5,
    },
    contentContainer: {
        alignItems: 'center',
        width: '100%',
    },
    icon: {
        marginBottom: 20,
    },
    message: {
        textAlign: 'center',
        marginBottom: 25,
        paddingHorizontal: 10,
        lineHeight: 20,
    },
    button: {
        width: '100%',
        marginTop: 5,
    },
}); 