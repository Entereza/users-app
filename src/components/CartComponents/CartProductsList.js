import React, { useEffect, useRef, useState } from 'react';
import ViewStyled from '../../utils/ui/ViewStyled';
import { FlatList, TouchableOpacity, Animated } from 'react-native';
import { theme_colors } from '../../utils/theme/theme_colors';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import { FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import useCartStore from '../../utils/tools/interface/cartStore';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import ResumeCartItem from '../BusinessComponents/ResumeCartItem';
import { useNavigation } from '@react-navigation/native';
import { private_name_routes } from '../../utils/route/private_name_routes';
import AlertStyled from '../../utils/ui/AlertStyled';

export default function CartProductsList({ products = [] }) {
    const { cart, deleteFromCart } = useCartStore();
    const navigation = useNavigation();
    const firstItemRef = useRef(null);
    const animationRef = useRef(null);
    const [showAlert, setShowAlert] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [alertText, setAlertText] = useState({
        title: '¿Eliminar producto?',
        message: `¿Estás seguro de eliminar el producto del carrito?`,
        type: 'dark',
        textConfirmButton: 'Cancelar',
        showCancelButton: true,
        textCancelButton: 'Eliminar'
    });

    useEffect(() => {
        if (products.length > 0) {
            // Esperar un momento antes de iniciar la animación
            const timer = setTimeout(() => {
                startDemonstrationAnimation();
            }, 800);

            return () => {
                clearTimeout(timer);
                if (firstItemRef.current) {
                    firstItemRef.current.close();
                }
            };
        }
    }, [products]);

    const startDemonstrationAnimation = () => {
        if (!firstItemRef.current) return;

        const swipeable = firstItemRef.current;
        if (swipeable) {
            // Abrir derecha (editar)
            setTimeout(() => swipeable.openRight(), 0);
            // Cerrar
            setTimeout(() => swipeable.close(), 1000);
            // Pausa
            setTimeout(() => swipeable.openLeft(), 2000);
            // Cerrar final
            setTimeout(() => swipeable.close(), 3000);
        }
    };

    const removeFromCart = (productId) => {
        const item = cart.find(cartItem => cartItem.id === productId);
        setItemToDelete(productId);
        setShowAlert(true);
        setAlertText({
            title: '¿Eliminar producto?',
            message: `¿Estás seguro de eliminar "${item.nameProduct}" del carrito?`,
            type: 'dark',
            textConfirmButton: 'Cancelar',
            showCancelButton: true,
            textCancelButton: 'Eliminar'
        });
    };

    const handleEdit = (item) => {
        navigation.navigate(private_name_routes.empresas.empresaProducto, {
            product: item,
            isEditing: true
        });
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
        setItemToDelete(null);
    };

    const confirmDelete = () => {
        if (itemToDelete) {
            const cartItem = cart.find(cartItem => cartItem.id === itemToDelete);
            deleteFromCart(cartItem?.uniqueId || itemToDelete);
        }
        handleCloseAlert();
    };

    const renderActions = (item, direction) => {
        if (direction === 'left') {
            return (
                <TouchableOpacity
                    onPress={() => removeFromCart(item.id)}
                    activeOpacity={0.9}
                >
                    <ViewStyled
                        width={18}
                        marginRight={-4}
                        paddingLeft={5}
                        style={{
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            backgroundColor: theme_colors.error,
                            borderTopLeftRadius: 15,
                            borderBottomLeftRadius: 15,
                        }}
                    >
                        <FontAwesome6
                            name="trash"
                            color={theme_colors.white}
                            size={20}
                        />
                    </ViewStyled>
                </TouchableOpacity>
            );
        }

        if (direction === 'right') {
            return (
                <TouchableOpacity
                    onPress={() => handleEdit(item)}
                    activeOpacity={0.9}
                >
                    <ViewStyled
                        width={18}
                        marginLeft={-4}
                        paddingRight={5}
                        style={{
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                            backgroundColor: theme_colors.primary,
                            borderTopRightRadius: 15,
                            borderBottomRightRadius: 15,
                        }}
                    >
                        <MaterialCommunityIcons
                            name="pencil"
                            color={theme_colors.white}
                            size={20}
                        />
                    </ViewStyled>
                </TouchableOpacity>
            );
        }

        return null;
    };

    const renderItem = ({ item, index }) => {
        // Solo animar el primer producto
        const shouldAnimate = index === 0;

        return (
            <Swipeable
                ref={shouldAnimate ? firstItemRef : null}
                renderRightActions={() => renderActions(item, 'right')}
                renderLeftActions={() => renderActions(item, 'left')}
                overshootRight={false}
                overshootLeft={false}
                containerStyle={{
                    borderRadius: 15,
                    overflow: 'visible',
                    shadowColor: theme_colors.black,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                    elevation: 3,
                    marginBottom: 15,
                }}
            >
                <ResumeCartItem item={item} />
            </Swipeable>
        );
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ViewStyled
                width={100}
                backgroundColor={theme_colors.transparent}
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <FlatList
                    contentContainerStyle={{
                        width: widthPercentageToDP(100),
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 5,
                        paddingVertical: 5,
                    }}
                    data={products}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.uniqueId || item.id.toString()}
                    horizontal={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                />
                {showAlert && (
                    <AlertStyled
                        widthModal={90}
                        heightModal={30}
                        heightText={19}
                        title={alertText.title}
                        message={alertText.message}
                        type={alertText.type}
                        onConfirmPressed={handleCloseAlert}
                        onCancelPressed={confirmDelete}
                        textConfirmButton={alertText.textConfirmButton}
                        textCancelButton={alertText.textCancelButton}
                        showCloseButton={false}
                        showCancelButton={alertText.showCancelButton}
                        widthConfirm={alertText.showCancelButton ? '55%' : '95%'}
                        widthCancel={'40%'}
                        showAlert={showAlert}
                    />
                )}
            </ViewStyled>
        </GestureHandlerRootView>
    );
}
