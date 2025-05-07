import React from 'react';
import ViewStyled from '../../utils/ui/ViewStyled';
import { FlatList } from 'react-native';
import { theme_colors } from '../../utils/theme/theme_colors';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import OrderProductItem from './OrderProductItem';

export default function OrderProductsList({ products = [] }) {
    console.log('products', products);
    const renderItem = ({ item }) => (
        <OrderProductItem item={item} />
    );

    return (
        <ViewStyled
            width={100}
            backgroundColor={theme_colors.transparent}
            style={{
                height: 'auto',
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
                keyExtractor={(item) => item.products.id.toString()}
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            />
        </ViewStyled>
    );
} 