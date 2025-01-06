import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { theme_colors } from '../../utils/theme/theme_colors';

export default function PromoCard ({ image, onPress }){

    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                width: '92%',
                alignItems: 'center',
                borderRadius: 15,
                backgroundColor: theme_colors.transparent,
                elevation: 50,
                marginRight: '5%',
                shadowColor: theme_colors.black,
                shadowOffset: {
                    width: 2,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
            }}
        >
            <Image
                source={image}
            />
        </TouchableOpacity>
    );
};
