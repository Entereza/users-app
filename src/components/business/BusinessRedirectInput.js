import React from 'react'
import ViewStyled from '../ui/ViewStyled'
import { Pressable, TextInput } from 'react-native'
import { theme } from '../../utils/theme'
import { customStyles } from '../../utils/customStyles'
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native'
import adjustFontSize from '../../utils/adjustText'
import { useSelector } from 'react-redux'
import TextStyled from '../ui/TextStyled'

export default function BusinessInputRedirect({ city, loadingSkeleton }) {
    const navigation = useNavigation()
    const { info } = useSelector(state => state.auth);

    const [value, setValue] = React.useState('')
    const [location, setLocation] = React.useState('CB')

    const RedirectSearchScreen = () => {
        navigation.navigate('SearchScreen', { nameUser: value, city: location })
    }

    const setNameUser = async () => {
        if (city === "La Paz") {
            setLocation('LP')

        }
        if (city === "Cochabamba") {
            setLocation('CB')
        }
        if (city === "Santa Cruz") {
            setLocation('SC')
        }
        if (city === "Oruro") {
            setLocation('OR')
            
        } if (city === "Tarija") {
            setLocation('TJ')
        }

        const nameUser = await info.usuarioBean?.nombres

        setValue(nameUser)
    }

    React.useEffect(() => {
        if (info !== null) {
            setNameUser()
        }
    }, [info])


    return (
        <>
            <ViewStyled
                backgroundColor={theme.transparent}
                width={100}
                height={7}
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Pressable
                    onPress={RedirectSearchScreen}
                    disabled={loadingSkeleton}
                >
                    <ViewStyled
                        width={95}
                        height={6}
                        backgroundColor={theme.primary}
                        borderRadius={2}
                        paddingHorizontal={3}
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: theme.tertiaryGradient,
                            ...customStyles.shadowStyle
                        }}
                    >
                        <TextStyled
                            textAlign='center'
                            fontSize={14}
                            color={theme.tertiary}
                            numberOfLines={2}
                            ellipsizeMode='tail'
                        >
                            {
                                loadingSkeleton
                                    ? `Buscando Empresas...`
                                    : `¿Qué estás buscando ${value}?`
                            }
                        </TextStyled>
                        <Ionicons
                            name="search"
                            color={theme.tertiary}
                            size={adjustFontSize(20)}
                        />
                    </ViewStyled>
                </Pressable>
            </ViewStyled>
        </>
    )
}