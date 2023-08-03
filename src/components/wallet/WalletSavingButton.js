// REACT  
import React, { useState, useRef } from 'react'
import { Pressable, Animated } from 'react-native';

// LIBRARIES 

// CUSTOM 
import ViewStyled from '../ui/ViewStyled'
import TextStyled from '../ui/TextStyled';
import { theme } from '../../utils/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

export default function WalletSavingButton() {
    const navigation = useNavigation()

    const [buttonOpen, setButtonOpen] = React.useState('flex')

    async function RedirectCode() {
        const Win = await AsyncStorage.getItem('ButtonSaldo')
        console.log('Abierto2?: ', Win)
        if (Win === null) {
            console.log('Primera vez abierto MOdal2: ', Win)
            setButtonOpen('none')
            await AsyncStorage.setItem('ButtonSaldo', 'none')
        }

        navigation.navigate("CodeEntereza")
    };

    const [animation] = useState(new Animated.Value(0));
    const animationRef = useRef(animation);

    const startAnimation = () => {
        animationRef.current.setValue(0);
        Animated.timing(animationRef.current, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: false,
        }).start(() => startAnimation());
    };

    const heightInterpolation = animation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, -2, 0],
    });

    const widthInterpolation = animation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [14, 20, 14],
    });

    const heightInterpolation2 = animation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [14, 20, 14],
    });

    const translateXInterpolation = animation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 6, -0],
    });

    const Verify = async () => {
        const Win = await AsyncStorage.getItem('ButtonSaldo')
        if (Win === 'none') {
            console.log('ButtonSaldo: ', Win)
            setButtonOpen('none')
        }
    }

    React.useEffect(() => {
        startAnimation()
        Verify()
    }, [])



    return (
        <>
            <Pressable
                onPress={RedirectCode}
            >
                <ViewStyled
                    width={44}
                    height={13}
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        shadowColor: theme.secondary,
                        shadowOffset: {
                            width: 3,
                            height: 5,
                        },
                        shadowOpacity: 1,
                        shadowRadius: 3.5,
                        elevation: 15,
                    }}
                    borderRadius={2}
                    paddingHorizontal={2}
                >
                    <TextStyled
                        textAlign='center'
                        fontSize={18}
                        color={theme.quaternary}
                    >
                        {
                            '¿Cómo '
                        }
                        <TextStyled
                            fontWeight='bold'
                            textAlign='center'
                            fontSize={18}
                            color={theme.secondary}
                        >
                            {'PAGAR'}
                        </TextStyled>
                        {'?'}
                    </TextStyled>
                </ViewStyled>
            </Pressable>
        </>
    )
}