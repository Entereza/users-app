import React from 'react'
import { Animated } from 'react-native';
import { Input } from '@rneui/themed';
import { useFormik } from "formik";
import { schemaNumberUser } from '../../utils/schemas';

//Importar Responsive View
import ViewStyled from '../ui/ViewStyled';
import TextStyled from '../ui/TextStyled';

//import styles
import { theme } from '../../utils/theme';
import adjustFontSize from '../../utils/adjustText';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { _authLogin } from '../../redux/actions/authActions';
import { useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import { Keyboard } from 'react-native';
import ImageStyled from '../ui/ImageStyled';
import { FontAwesome, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { ActivityIndicator } from 'react-native';

export default function GenderUser({ display = 'flex', GenderUserOpacity, outputRange, goNextScreen, outputRange2, setGenderUser, isSubmitting }) {
    const styles = {
        containerGender: {
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
            borderWidth: 1,
            borderColor: isSubmitting ? theme.tertiary : theme.primary,
        },
        colorText: {
            color: isSubmitting ? theme.tertiary : theme.primary,
        },
        colorIcon: {
            color: isSubmitting ? theme.tertiary : theme.primary,
            marginRight: widthPercentageToDP(11),
        },
        otherStyle: {
            color: isSubmitting ? theme.tertiary : theme.primary,
            marginRight: widthPercentageToDP(12.5),
        }
    }

    const SaveGenderUser = (sexo) => {
        try {
            console.log('Values sexoUser: ', sexo)
            setGenderUser(sexo);
            goNextScreen()
        } catch (error) {
            console.log('Error GenderUserComponent: ', error);
        }
    }

    return (
        <ViewStyled
            width={100}
            height={100}
            backgroundColor={theme.transparent}
            paddingTop={2}
            style={{
                justifyContent: 'flex-start',
                alignItems: 'center',
                display: display,
            }}
        >
            <Animated.View
                style={{
                    backgroundColor: theme.transparent,
                    transform: [
                        {
                            translateX: GenderUserOpacity.interpolate({
                                inputRange: [0, 1],
                                outputRange: [outputRange, outputRange2], // Cambia estos valores según tus necesidades
                            }),
                        },
                    ],
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}
            >
                <ViewStyled
                    width={100}
                    height={5}
                    marginBottom={1}
                    backgroundColor={theme.transparent}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        // borderWidth: 1,
                        // borderColor: theme.danger,
                    }}
                >
                    <TextStyled
                        fontFamily='BRFirmaBold'
                        textAlign='center'
                        fontSize={28}
                        color={theme.secondary}
                        style={{
                            width: "90%",
                        }}
                    >
                        {'Selecciona tu género'}
                    </TextStyled>
                </ViewStyled>

                <ViewStyled
                    width={95}
                    height={10}
                    backgroundColor={theme.transparent}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        // borderWidth: 1,
                        // borderColor: theme.danger,
                    }}
                >
                    <TextStyled
                        textAlign='center'
                        fontSize={20}
                        color={theme.primary}
                    >
                        {'Proporciona tu género para que podamos darte una experiencia más personalizada.'}
                    </TextStyled>
                </ViewStyled>

                <ViewStyled
                    marginTop={5}
                    width={100}
                    height={36}
                    backgroundColor={theme.transparent}
                    style={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        // borderColor: theme.danger,
                        // borderWidth: 1
                    }}
                >
                    <Pressable onPress={() => SaveGenderUser('M')} disabled={isSubmitting}>
                        <ViewStyled
                            width={90}
                            height={10}
                            borderRadius={2}
                            backgroundColor={theme.transparent}
                            paddingLeft={8}
                            style={styles.containerGender}
                        >
                            <MaterialCommunityIcons
                                name="human-male"
                                size={adjustFontSize(40)}
                                style={styles.colorIcon}
                            />

                            <TextStyled
                                fontSize={30}
                                textAlign={'center'}
                                style={styles.colorText}
                            >
                                Masculino
                            </TextStyled>
                        </ViewStyled>
                    </Pressable>

                    <Pressable onPress={() => SaveGenderUser('F')} disabled={isSubmitting}>
                        <ViewStyled
                            width={90}
                            height={10}
                            borderRadius={2}
                            backgroundColor={theme.transparent}
                            paddingLeft={8}
                            style={styles.containerGender}
                        >
                            <MaterialCommunityIcons
                                name="human-female"
                                size={adjustFontSize(40)}
                                style={styles.colorIcon}
                            />

                            <TextStyled
                                fontSize={30}
                                textAlign={'center'}
                                style={styles.colorText}
                            >
                                Femenino
                            </TextStyled>
                        </ViewStyled>
                    </Pressable>

                    <Pressable onPress={() => SaveGenderUser('N')} disabled={isSubmitting}>
                        <ViewStyled
                            width={90}
                            height={10}
                            borderRadius={2}
                            backgroundColor={theme.transparent}
                            paddingLeft={9}
                            style={styles.containerGender}
                        >
                            <MaterialCommunityIcons
                                name="head-heart-outline"
                                size={adjustFontSize(30)}
                                style={
                                    styles.otherStyle
                                }
                            />

                            <TextStyled
                                fontSize={30}
                                textAlign={'center'}
                                style={styles.colorText}
                            >
                                Otro...
                            </TextStyled>
                        </ViewStyled>
                    </Pressable>
                </ViewStyled>

                {isSubmitting &&
                    <ViewStyled
                        width={100}
                        height={20}
                        backgroundColor={theme.transparent}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            // borderColor: theme.danger,
                            // borderWidth: 1
                        }}
                    >
                        <ActivityIndicator size="large" color={theme.secondary} />
                    </ViewStyled>
                }
            </Animated.View >
        </ViewStyled >
    );
}