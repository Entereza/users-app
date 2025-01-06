import React from 'react';
import { ScrollView } from 'react-native';
import ProductoHorizontal from './ProductoHorizontal';
import { theme_colors } from '../../utils/theme/theme_colors';
import ViewStyled from '../../utils/ui/ViewStyled';
import TextStyled from '../../utils/ui/TextStyled';
import ProductoVertical from './ProductoVertical';

export default function VerticalSection({ section }) {

    const productos = [
        {id: 1, producto: "Hamburguesa con queso", descripcion: "Hamburguesa con queso, papas, doble carne más una soda de 3 litros. El mejor combo que podrías pedir!", precio: "35", reseñas: "4.9", kcal: "250", tiempo:"20", categoria: "Hamburguesas"},
        {id: 2, producto: "Hamburguesa con tocino",  descripcion: "Hamburguesa con tocino, papas, doble carne más una soda de 3 litros. El mejor combo que podrías pedir!", precio: "30", reseñas: "4.9", kcal: "250", tiempo:"20", categoria: "Hamburguesas"},
        {id: 3, producto: "Hamburguesa con huevo",  descripcion: "Hamburguesa con huevo, papas, doble carne más una soda de 3 litros. El mejor combo que podrías pedir!",precio: "32", reseñas: "4.9", kcal: "250", tiempo:"20", categoria: "Hamburguesas"}
    ];

    return (
        <ViewStyled
            width={'100%'}
            backgroundColor={theme_colors.white}
            style={{
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <TextStyled
                fontSize={10}
                color={theme_colors.black}
                style={{
                    alignSelf: 'flex-start',
                    fontFamily: 'SFPro-Bold',
                    marginLeft: 15,
                    marginTop: 5,
                    marginBottom: '2%'
                }}
            >
                {section}
            </TextStyled>

            <ScrollView
                contentContainerStyle={{
                    backgroundColor: theme_colors.transparent,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    paddingBottom: '5%',
                    paddingLeft: '4%',
                    paddingRight: '2%'
                }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                scrollToOverflowEnabled={false}
            >
                { productos.map((producto) => (
                    <React.Fragment key={producto.id}>
                        <ProductoVertical producto={producto}/>
                    </React.Fragment>
                ))}
            </ScrollView> 
        </ViewStyled>
    );
};