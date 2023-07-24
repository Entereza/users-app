import * as React from 'react';
import { theme } from '../../utils/theme';
import ImageStyled from '../ui/ImageStyled';
import ViewStyled from '../ui/ViewStyled';

export default function BusinessPromotionsItem({ item, city }) {
    const [location, setLocation] = React.useState('')

    const getInfo5 = async () => {
        try {
            let ciudad;
            if (city === "La Paz") {
                ciudad = 'LP'
            }
            if (city === "Cochabamba") {
                ciudad = 'CB'
            }
            if (city === "Santa Cruz") {
                ciudad = 'SC'
            }
            if (city === "Oruro") {
                ciudad = 'OR'
            }

            setLocation(ciudad)
        } catch (err) {
            console.log("Error entereza BusinessCategoryItem: ", err)
        }
    }
    React.useEffect(() => {
        if (location !== null) {
            getInfo5()
        }
    }, [location])

    return (
        <>
            <ViewStyled
                backgroundColor={theme.transparent}
                width={60}
                height={14}
                marginRight={3}
                style={{
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    borderWidth: 1,
                    borderColor: theme.tertiaryGradient,
                    borderRadius: 10,
                }}
            >
                <ImageStyled
                    source={require('../../assets/business/Tropical.jpg')}
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 10,
                        overflow: 'hidden',
                        position: 'relative',
                        resizeMode: 'cover',
                        justifyContent: 'center',
                    }}
                />
            </ViewStyled>
        </>
    )
}