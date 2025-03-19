import React from 'react';
import { Modal, StyleSheet, Pressable } from 'react-native';
import { theme_colors } from '../../utils/theme/theme_colors';
import { theme_textStyles } from '../../utils/theme/theme_textStyles';
import TextStyled from '../../utils/ui/TextStyled';
import ViewStyled from '../../utils/ui/ViewStyled';
import ButtonWithIcon from '../Buttons/ButtonWithIcon';
import { Ionicons } from '@expo/vector-icons';

export default function MessageModal({ visible, onClose, title, message, type = 'success' }) {
    const isSuccess = type === 'success';
    const iconName = isSuccess ? 'checkmark-circle' : 'alert-circle';
    const iconColor = isSuccess ? theme_colors.success : theme_colors.error;
    const buttonColor = isSuccess ? theme_colors.primary : theme_colors.error;

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <Pressable
                style={styles.centeredView}
                onPress={onClose}
            >
                <Pressable
                    style={styles.modalView}
                    onPress={(e) => e.stopPropagation()}
                >
                    <ViewStyled
                        backgroundColor={theme_colors.transparent}
                        width={100}
                        style={styles.headerContainer}
                    >
                        <TextStyled
                            fontSize={theme_textStyles.medium + 1}
                            color={isSuccess ? theme_colors.primary : theme_colors.error}
                            fontFamily='SFPro-Bold'
                            style={styles.title}
                        >
                            {title}
                        </TextStyled>
                    </ViewStyled>

                    <ViewStyled
                        backgroundColor={theme_colors.transparent}
                        width={100}
                        style={styles.contentContainer}
                    >
                        <Ionicons
                            name={iconName}
                            size={70}
                            color={iconColor}
                            style={styles.icon}
                        />

                        <TextStyled
                            fontSize={theme_textStyles.small}
                            color={theme_colors.white}
                            fontFamily='SFPro-Regular'
                            style={styles.message}
                        >
                            {message}
                        </TextStyled>

                        <ButtonWithIcon
                            backgroundColor={buttonColor}
                            borderWidth={0}
                            colorText={theme_colors.white}
                            onPress={onClose}
                            borderRadius={1.5}
                            withIcon={false}
                            fontSize={theme_textStyles.medium}
                            fontFamily={'SFPro-Bold'}
                            textButton="Aceptar"
                            height={6}
                            style={styles.button}
                        />
                    </ViewStyled>
                </Pressable>
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalView: {
        width: '85%',
        backgroundColor: theme_colors.black,
        borderRadius: 15,
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