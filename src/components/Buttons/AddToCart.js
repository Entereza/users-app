import React, { useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { theme_colors } from '../../utils/theme/theme_colors';
import TextStyled from '../../utils/ui/TextStyled';

export default function AddToCart () {
    const [quantity, setQuantity] = useState(0);

    const decrementQuantity = () => {
        if (quantity > 0) {
        setQuantity(quantity - 1);
        }
    };

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };

    return (
        <View 
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: theme_colors.backgroundGrey,
                padding: 2,
                borderRadius: 5
            }}
        >
            <TouchableOpacity onPress={decrementQuantity}>
                <Text style={{ fontSize: 14, paddingHorizontal: 10, fontFamily: 'SFPro-SemiBold' }}>-</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 14, paddingHorizontal: 10, fontFamily: 'SFPro-SemiBold' }}>{quantity}</Text>
            <TouchableOpacity onPress={incrementQuantity}>
                <Text style={{ fontSize: 14, paddingHorizontal: 10, fontFamily: 'SFPro-SemiBold' }}>+</Text>
            </TouchableOpacity>
        </View>
    );
};