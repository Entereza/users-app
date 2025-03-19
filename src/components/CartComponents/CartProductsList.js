import React from 'react';
import PromotionsItem from '../BusinessComponents/CategoriesComponents/DetailsComponents/PromotionsItem';
import ViewStyled from '../../utils/ui/ViewStyled';
import { FlatList, TouchableOpacity } from 'react-native';
import { theme_colors } from '../../utils/theme/theme_colors';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import { FontAwesome6 } from '@expo/vector-icons';
import useCartStore from '../../utils/tools/interface/cartStore';
import { widthPercentageToDP } from 'react-native-responsive-screen';

export default function CartProductsList({ products = [] }) {
    const { cart, deleteFromCart } = useCartStore()

    const removeFormCart = (productId) => {
        const cartItem = cart.find(cartItem => cartItem.id === productId)
        deleteFromCart(cartItem?.uniqueId || productId)
    }

    const renderRightActions = (productId) => {
        return (
            <TouchableOpacity
                onPress={() => removeFormCart(productId)}
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
                    <FontAwesome6
                        name="trash"
                        color={theme_colors.white}
                        size={20}
                    />
                </ViewStyled>
            </TouchableOpacity>
        );
    };

    const renderItem = ({ item }) => (
        <Swipeable
            renderRightActions={() => renderRightActions(item.id)}
            overshootRight={false}
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
            <PromotionsItem item={item} shadow={false} />
        </Swipeable>
    );

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
                    keyExtractor={(item) => item.id.toString()}
                    horizontal={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                />
            </ViewStyled>
        </GestureHandlerRootView>
    );
}
