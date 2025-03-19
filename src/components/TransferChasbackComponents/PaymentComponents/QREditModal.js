import React, { useState } from 'react';
import { Modal, StyleSheet, TextInput, FlatList, Pressable } from 'react-native';
import ViewStyled from '../../../utils/ui/ViewStyled';
import TextStyled from '../../../utils/ui/TextStyled';
import { theme_colors } from '../../../utils/theme/theme_colors';
import { theme_textStyles } from '../../../utils/theme/theme_textStyles';
import ButtonWithIcon from '../../Buttons/ButtonWithIcon';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { qrService } from '../../../services/api/transfers/qrService';
import { toastService } from '../../../utils/tools/interface/toastService';
import useAuthStore from '../../../utils/tools/interface/authStore';

const dateRanges = [
    { id: 1, text: '1 Semana', days: 7 },
    { id: 2, text: '1 Mes', days: 30 },
    { id: 3, text: '3 Meses', days: 90 },
    { id: 4, text: '6 Meses', days: 180 },
    { id: 5, text: '1 Año', days: 365 }
];

export default function QREditModal({ visible, onClose, onSave, currentQRData }) {
    const { user } = useAuthStore();
    const [amount, setAmount] = useState('0');
    const [reference, setReference] = useState('');
    const [isUnique, setIsUnique] = useState(false);
    const [selectedRange, setSelectedRange] = useState(null);

    const isDisabled = amount.startsWith('-') || !amount || amount.trim() === '' || isNaN(amount) || parseFloat(amount) < 0 || selectedRange === null;

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleSave = () => {
        try {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + (selectedRange ? selectedRange.days : 1));

            const params = {
                number: 0,
                unique: isUnique,
                total: amount ? parseFloat(amount) : 0,
                idClient: user.id,
                expirationDate: formatDate(tomorrow)
            };

            onSave(params);
            onClose();
            toastService.showSuccessToast("QR actualizado exitosamente");
        } catch (error) {
            console.error('Error updating QR:', error);
            toastService.showErrorToast("Error al actualizar el QR");
        }
    };

    const renderDateRangeItem = ({ item }) => (
        <Pressable
            onPress={() => setSelectedRange(item)}
            style={styles.dateRangeItemPressable}
        >
            <ViewStyled
                height={6}
                marginHorizontal={1}
                paddingHorizontal={2}
                borderRadius={2}
                backgroundColor={selectedRange?.id === item.id ? theme_colors.primary : theme_colors.transparent}
                style={{
                    borderWidth: 1,
                    borderColor: theme_colors.lightGrey,
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <TextStyled
                    textAlign='center'
                    fontSize={theme_textStyles.small}
                    color={selectedRange?.id === item.id ? theme_colors.white : theme_colors.black}
                >
                    {item.text}
                </TextStyled>
            </ViewStyled>
        </Pressable>
    );

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <ViewStyled
                backgroundColor={theme_colors.backgroundModal}
                style={styles.modalContainer}
            >
                <ViewStyled
                    backgroundColor={theme_colors.white}
                    style={styles.modalContent}
                    borderRadius={4}
                >
                    <ViewStyled
                        backgroundColor={theme_colors.transparent}
                        style={styles.header}
                    >
                        <TextStyled
                            fontSize={theme_textStyles.large}
                            color={theme_colors.dark}
                            fontFamily="SFPro-Bold"
                        >
                            Editar QR
                        </TextStyled>
                        <MaterialCommunityIcons
                            name="close"
                            size={24}
                            color={theme_colors.dark}
                            onPress={onClose}
                        />
                    </ViewStyled>

                    <ViewStyled
                        backgroundColor={theme_colors.transparent}
                        style={styles.inputContainer}
                    >
                        <TextStyled
                            fontSize={theme_textStyles.small}
                            color={theme_colors.grey}
                            marginBottom={1}
                        >
                            Monto *
                        </TextStyled>
                        <TextInput
                            style={styles.input}
                            value={amount}
                            onChangeText={text => {
                                if (/^\d*$/.test(text)) {
                                    setAmount(text);
                                }
                            }}
                            keyboardType="decimal-pad"
                            placeholder="Ingrese monto"
                        />
                    </ViewStyled>

                    <ViewStyled
                        backgroundColor={theme_colors.transparent}
                        style={styles.inputContainer}
                    >
                        <TextStyled
                            fontSize={theme_textStyles.small}
                            color={theme_colors.grey}
                            marginBottom={1}
                        >
                            Referencia (opcional)
                        </TextStyled>
                        <TextInput
                            style={styles.input}
                            value={reference}
                            onChangeText={setReference}
                            placeholder="Ingrese referencia"
                        />
                    </ViewStyled>

                    <ViewStyled
                        backgroundColor={theme_colors.transparent}
                        style={styles.dateRangeContainer}
                    >
                        <TextStyled
                            fontSize={theme_textStyles.small}
                            color={theme_colors.grey}
                            marginBottom={1}
                        >
                            Duración del QR
                        </TextStyled>
                        <FlatList
                            contentContainerStyle={styles.dateRangeList}
                            numColumns={3}
                            horizontal={false}
                            scrollEnabled={false}
                            data={dateRanges}
                            renderItem={renderDateRangeItem}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                        />
                    </ViewStyled>

                    <ViewStyled
                        backgroundColor={theme_colors.transparent}
                        style={styles.toggleContainer}
                    >
                        <TextStyled
                            fontSize={theme_textStyles.small}
                            color={theme_colors.grey}
                        >
                            ¿El QR tendrá un único uso?
                        </TextStyled>
                        <MaterialCommunityIcons
                            name={isUnique ? "toggle-switch" : "toggle-switch-off"}
                            size={40}
                            color={isUnique ? theme_colors.primary : theme_colors.grey}
                            onPress={() => setIsUnique(!isUnique)}
                        />
                    </ViewStyled>

                    <ButtonWithIcon
                        withIcon={false}
                        disabled={isDisabled}
                        onPress={handleSave}
                        backgroundColor={isDisabled ? theme_colors.grey : theme_colors.primary}
                        colorText={theme_colors.white}
                        borderRadius={1.5}
                        fontSize={theme_textStyles.medium}
                        height={6}
                        fontFamily={'SFPro-Bold'}
                        textButton={'Guardar cambios'}
                        style={styles.saveButton}
                    />
                </ViewStyled>
            </ViewStyled>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalContent: {
        padding: 20,
        width: '100%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: theme_colors.lightGrey,
        borderRadius: 8,
        padding: 10,
        fontFamily: 'SFPro-Regular',
        fontSize: 16,
    },
    dateRangeContainer: {
        marginBottom: 20,
    },
    dateRangeList: {
        width: '100%',
        gap: 10,
    },
    dateRangeItemPressable: {
        flex: 1,
        width: '48%',
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    saveButton: {
        width: '100%',
        marginTop: 10,
    }
}); 