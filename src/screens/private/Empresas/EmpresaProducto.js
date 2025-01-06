import React, { useState } from 'react';
import { theme_colors } from '../../../utils/theme/theme_colors';
import ViewStyled from '../../../utils/ui/ViewStyled';
import { ScrollView, ImageBackground, Image } from 'react-native';
import TextStyled from '../../../utils/ui/TextStyled';
import BackButton from '../../../components/Buttons/BackButton';
import AddToCart2 from '../../../components/Buttons/AddToCart2';
import ExpandableCard from '../../../components/Cards/ExpandableCard';
import TotalBar from '../../../components/Cart/TotalBar';
import MoreText from '../../../components/Text/MoreText';
import ReviewProduct from '../../../components/Cards/ReviewProduct';
import { useRoute } from '@react-navigation/native';

export default function EmpresaProducto() {

    const route = useRoute();
    const { producto } = route.params;

    let precio = parseInt(producto.precio);
    
    const [total, setTotal] = useState(0);
    const [quantity, setQuantity] = useState(0);

    const decrementQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
            setTotal(total - parseInt(producto.precio));
        }
    };

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
        setTotal(total + parseInt(producto.precio));
    };

    const variables = [
        {id: 1, variable: "Salsas", max: "max. 2", requerido: true},
        {id: 2, variable: "Bebida", max: "max. 1", requerido: false},
    ];

    return (
        <ViewStyled
            width={'100%'}
            height={'100%'}
            backgroundColor={theme_colors.transparent}
            style={{
                alignItems: 'center'
            }}
        >
            <ImageBackground
                    source={require('../../../../assets/empresaBack.png')}
                    style={{
                        width: '100%',
                        height: 150,
                        backgroundColor: theme_colors.transparent,
                        marginBottom: 10
                    }}
            >
                <ViewStyled
                    backgroundColor={theme_colors.transparent}
                    style={{
                        marginTop: 25,
                        marginLeft: -5,
                        flexDirection: 'row',
                        justifyContent: 'flex-start'
                    }}
                >
                    <BackButton />
                </ViewStyled>

                <ViewStyled
                    width={'100%'}
                    backgroundColor={theme_colors.white}
                    style={{
                        position: 'absolute',
                        bottom: -20,
                        borderRadius: 30,
                        alignItems: 'center',
                    }}
                >
                    <TextStyled
                        fontSize={10}
                        color={theme_colors.black}
                        style={{
                            fontFamily: 'SFPro-Bold',
                            padding: 10,
                            marginLeft: 5,
                            marginTop: 5
                        }}
                    >
                        {producto.producto}
                    </TextStyled>
                </ViewStyled>
            </ImageBackground>

            <ViewStyled
                width={'100%'}
                backgroundColor={theme_colors.white}
                style={{
                    alignItems: 'center'
                }}
            >
                <TextStyled
                    fontSize={9}
                    color={theme_colors.primary}
                    style={{
                        fontFamily: 'SFPro-Bold',
                        padding: 10,
                        marginLeft: 5
                    }}
                >
                    Bs. {precio}
                </TextStyled>

                {/* PASAR PRODUCTO AÑADIDO AL CARRITO */}
                <AddToCart2 quantity={quantity} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity}/>

                <ReviewProduct reseñas={producto.reseñas} kcal={producto.kcal} tiempo={producto.tiempo}/>
                
                <MoreText text={producto.descripcion} />

                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        backgroundColor: theme_colors.transparent,
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}
                    vertical={true}
                    showsVerticalScrollIndicator={false}
                    scrollToOverflowEnabled={false}
                >
                    {variables.map((variable) => (
                        <React.Fragment key={variable.id}>
                            <ExpandableCard title={variable.variable} max={variable.max} required={variable.requerido}/>
                        </React.Fragment>
                    ))}
                </ScrollView>

                { quantity > 0 && (
                    <TotalBar quantity={quantity} total={total} title={"Agregar"} producto={producto}/>
                )}
            </ViewStyled>
        </ViewStyled>
    );
};