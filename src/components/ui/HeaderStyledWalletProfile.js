import React from 'react'

import { Ionicons } from '@expo/vector-icons';

import TextStyled from './TextStyled'
import ViewStyled from './ViewStyled'
import adjustFontSize from '../../utils/adjustText';
import { theme } from '../../utils/theme';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HeaderStyledWalletProfile({
    title,
    back = true,
}) {
    const navigation = useNavigation()

    return (
        <>
            <SafeAreaView style={{ backgroundColor: theme.background }} >
                <ViewStyled
                    backgroundColor={theme.primary}
                    paddingHorizontal={4}
                    height={7}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                    }}
                >
                    {
                        back
                            ? <Ionicons
                                name="arrow-back-outline"
                                size={adjustFontSize(28)}
                                color={theme.quaternary}
                                style={{
                                    marginRight: 'auto',
                                }}
                                onPress={() => navigation.goBack()}
                            />
                            : <></>
                    }

                    <TextStyled
                        textAlign={back ? 'left' : 'center'}
                        fontSize={18}
                        style={{
                            marginRight:
                                back
                                    ? 'auto'
                                    : -16,
                            marginLeft: back ? -20 : 0,
                        }}
                        fontWeight='500'
                        color={theme.quaternary}
                    >
                        {
                            title
                        }
                    </TextStyled>
                </ViewStyled>
                <ViewStyled
                    height={0.5}
                    style={{
                        borderBottomColor: theme.tertiaryGradient,
                        borderBottomWidth: 1,
                    }}
                />
            </SafeAreaView>
        </>

    )
}