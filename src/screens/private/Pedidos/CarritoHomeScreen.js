import React, { useState } from 'react';
import { theme_colors } from '../../../utils/theme/theme_colors';
import ViewStyled from '../../../utils/ui/ViewStyled';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView, TouchableOpacity, KeyboardAvoidingView, View  } from 'react-native';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import ProductoHorizontal from '../../../components/Cards/ProductoHorizontal';
import { AntDesign } from '@expo/vector-icons';
import NotasComponent from '../../../components/Cart/NotasComponent';
import { private_name_routes } from '../../../utils/route/private_name_routes';
import TotalBarAlternative from '../../../components/Cart/TotalBarAlternative';
import DeliverySelection from '../../../components/Cart/DeliverySelection';
import BranchSelection from '../../../components/Cart/BranchSelection';
import TimeSelection from '../../../components/Cart/TimeSelection';
import SelectionOption from '../../../components/TransferChasbackComponents/SelectionOption';

export default function CarritoHomeScreen() {

    // PASAR PRODUCTOS DEL CARRITO
    const route = useRoute();
    const { producto } = route.params;
    // console.log(producto);

    const productos = [
        {id: 1, producto: "Hamburguesa con queso", descripcion: "Hamburguesa con queso, papas, doble carne más una soda de 3 litros. El mejor combo que podrías pedir!", precio: "35", reseñas: "4.9", kcal: "250", tiempo:"20", categoria: "Hamburguesas"},
        {id: 2, producto: "Hamburguesa con tocino",  descripcion: "Hamburguesa con tocino, papas, doble carne más una soda de 3 litros. El mejor combo que podrías pedir!", precio: "30", reseñas: "4.9", kcal: "250", tiempo:"20", categoria: "Hamburguesas"},
    ];
    
    const [isSelected, setIsSelected] = useState(true);

    const handlePress = () => {
        setIsSelected(!isSelected);
    }

    const onDelete = () => {
        console.log("Eliminar")
    };

    const renderRightActions = (onPressDelete) => {
        return (
            <TouchableOpacity
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                onPress={onPressDelete}
            >
                <ViewStyled
                    width={'15%'}
                    height={'15%'}
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 15,
                        borderWidth: 1,
                        backgroundColor: theme_colors.primary,
                        borderColor: theme_colors.primary,
                    }}
                >
                    <AntDesign
                        name="delete"
                        color={theme_colors.white}
                        size={20}
                        alignSelf='center'
                    /> 
                </ViewStyled>
            </TouchableOpacity>
        );
    };

    return (
        <GestureHandlerRootView>
            <KeyboardAvoidingView
                behavior="position"
                style={{ flex: 1 }}
            >
                <ViewStyled
                    height={'96%'}
                    backgroundColor={theme_colors.white}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <SelectionOption nameOption1={"Delivery"} nameOption2={"Recoger"} optionSelected={isSelected} onPress={handlePress}/>

                    <ScrollView
                        width={'100%'}
                        backgroundColor={theme_colors.transparent}
                        contentContainerStyle={{
                            alignItems: 'center',
                            flex: 1,
                        }}
                        showsVerticalScrollIndicator={false}
                    > 
                        {isSelected ? (
                            <DeliverySelection cost={"6"} time={"30 - 40"}/>
                        ) : (
                            <View
                                style={{
                                    width: '100%',
                                    alignItems: 'center',
                                    marginBottom: 10,
                                    marginTop: 5
                                }}
                            >
                                <TimeSelection />
                                
                                <BranchSelection />
                            </View>
                        )}
                    
                        <ViewStyled
                            width={'100%'}
                            height={0.2}
                            backgroundColor={theme_colors.requiredGrey}
                            style={{
                                marginBottom: 10
                            }}
                        />

                        { productos.map((producto) => (
                            <React.Fragment key={producto.id}>
                                <View
                                    backgroundColor={theme_colors.transparent}
                                    style={{ 
                                        alignItems: 'center'
                                    }}
                                >
                                    <Swipeable  
                                        renderRightActions={() => renderRightActions(onDelete)}
                                        style={{
                                            alignItems: 'center'
                                        }}
                                    >
                                        <ProductoHorizontal producto={producto} pressable={false}/>
                                    </Swipeable>
                                </View>
                            </React.Fragment>
                        ))}
                    </ScrollView>

                    <NotasComponent isSelected={isSelected}/>
                    
                    <TotalBarAlternative quantity={"2"} total={"35"} title={"Ir a pagar"} isSelected={isSelected}/>
                </ViewStyled>
            </KeyboardAvoidingView>
        </GestureHandlerRootView>
    );
};