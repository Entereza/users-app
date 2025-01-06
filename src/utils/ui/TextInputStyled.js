import React from 'react'
import { Pressable, TextInput } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ViewStyled from './ViewStyled';
import TextStyled from './TextStyled';
import { theme_colors } from '../theme/theme_colors';
import adjustFontSize from './adjustText';

const TextInputStyled = React.forwardRef(({
    editable = true,
    value = '',
    label = 'Label',
    placeholder = 'Placeholder',
    icon = false,
    errorMessage,
    returnKeyType = 'default',
    onChange = null,
    onChangeText = null,
    onBlur = null,
    onFocus = null,
    handleVisible = null,
    placeholderTextColor = theme_colors.tertiary,
    labelStyle,
    containerStyle,
    inputStyle,
    colorIcon = theme_colors.tertiary,
    sizeIcon = 20,
    keyboardType = 'default',
    isVisible,
    isSecure = false,
    errorStyle,
    onSubmitEditing,
    ...rest
}, ref) => {

    return (
        <ViewStyled
            backgroundColor={theme_colors.transparent}
            style={[containerStyle && containerStyle]}
        >
            <TextStyled
                style={[labelStyle && labelStyle]}
            >
                {label}
            </TextStyled>

            <ViewStyled
                backgroundColor={theme_colors.transparent}
                marginTop={0.2}
                style={[
                    containerStyle &&
                    {
                        width: 'auto',
                        height: 'auto',
                    },
                    {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }
                ]}
            >
                <TextInput
                    ref={ref}
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor={placeholderTextColor}
                    onChange={onChange && onChange}
                    onChangeText={onChangeText && onChangeText}
                    keyboardType={keyboardType}
                    onBlur={onBlur && onBlur}
                    onFocus={onFocus && onFocus}
                    editable={editable}
                    secureTextEntry={isSecure}
                    returnKeyType={returnKeyType}
                    onSubmitEditing={onSubmitEditing}
                    style={[inputStyle && inputStyle]}
                    {...rest}
                />

                {icon && (
                    <Pressable
                        onPress={icon === 'eye' || icon === 'eye-off' ? handleVisible : null}
                    >
                        <ViewStyled
                            width={10}
                            backgroundColor={theme_colors.transparent}
                            style={{
                                height: 'auto',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <MaterialCommunityIcons
                                name={icon}
                                color={colorIcon}
                                size={adjustFontSize(sizeIcon)}
                            />
                        </ViewStyled>
                    </Pressable>
                )}
            </ViewStyled>
            {
                errorMessage && (
                    <ViewStyled
                        marginTop={1}
                        backgroundColor={theme_colors.transparent}
                        style={{
                            width: '100%',
                            height: 'auto',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <TextStyled
                            style={[
                                errorStyle
                            ]}
                        >
                            {errorMessage}
                        </TextStyled>
                    </ViewStyled>
                )
            }
        </ViewStyled >
    );
});

export default TextInputStyled;