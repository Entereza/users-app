import * as React from 'react';
import { theme } from '../../utils/theme';
import ImageStyled from '../ui/ImageStyled';
import ViewStyled from '../ui/ViewStyled';
import { Linking, Pressable } from 'react-native';

export default function BusinessPromotionsItem({ item }) {

    const RedirectWhatsapp = () => {
        Linking.openURL(item.url)
    }

    const [disabled, setDisabled] = React.useState(true)

    const SeeLinkWp = () => {
        if(item.url){
            setDisabled(false)
        }
    }

    React.useEffect(() => {
        SeeLinkWp()
    }, [])

    return (
        <>
            <Pressable onPress={RedirectWhatsapp} disabled={disabled}>
                <ViewStyled
                    backgroundColor={theme.transparent}
                    width={60}
                    height={13}
                    marginRight={3}
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 10,
                    }}
                >
                    <ImageStyled
                        source={{ uri: item.img }}
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 10,
                            resizeMode: 'contain',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    />
                </ViewStyled>
            </Pressable>
        </>
    )
}