import React, { useState } from 'react';
import { TextInput, KeyboardAvoidingView } from 'react-native';
import ViewStyled from '../../utils/ui/ViewStyled';
import TextStyled from '../../utils/ui/TextStyled';
import { theme_colors } from '../../utils/theme/theme_colors';
import { theme_textStyles } from '../../utils/theme/theme_textStyles';

export default function NotasComponent({ isSelected }) {
    const [nota, setNota] = useState('');

    return (
        <KeyboardAvoidingView
            behavior='position'
            style={{ backgroundColor: theme_colors.transparent, marginTop: 'auto' }}
        >
            <ViewStyled
                width={'100%'}
                backgroundColor={theme_colors.transparent}
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    bottom: '0%'
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
                        textAlignVertical: 'top',
                        textAlign: 'left'
                    }}
                />
            </ViewStyled>
        </KeyboardAvoidingView>
    );
};