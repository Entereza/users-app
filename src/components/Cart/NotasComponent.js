import React, { useState } from 'react';
import { TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import ViewStyled from '../../utils/ui/ViewStyled';
import TextStyled from '../../utils/ui/TextStyled';
import { theme_colors } from '../../utils/theme/theme_colors';
import { theme_textStyles } from '../../utils/theme/theme_textStyles';

export default function NotasComponent({ isSelected }) {
    const [nota, setNota] = useState('');

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            style={{ 
                backgroundColor: theme_colors.white, 
                marginTop: 'auto',
                width: '100%'
            }}
        >
            <ViewStyled
                width={'100%'}
                backgroundColor={theme_colors.white}
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingBottom: 10
                }}
            >
                <TextStyled
                    width={'88%'}
                    fontSize={theme_textStyles.medium}
                    fontFamily='SFPro-SemiBold'
                    color={theme_colors.grey}
                    style={{
                        justifyContent: 'flex-start',
                        marginBottom: 5
                    }}
                >
                    Notas para el local
                </TextStyled>

                <TextInput
                    value={nota}
                    onChangeText={setNota}
                    placeholder="Ej: Sin llajua y sin cubiertos por favor"
                    placeholderTextColor={theme_colors.grey}
                    multiline={true}
                    textAlignVertical="top"
                    style={{
                        width: '90%',
                        height: 90,
                        backgroundColor: theme_colors.white,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: theme_colors.grey,
                        paddingHorizontal: 10,
                        paddingTop: 10,
                        paddingBottom: 10,
                        textAlign: 'left',
                        fontSize: 16
                    }}
                />
            </ViewStyled>
        </KeyboardAvoidingView>
    );
};