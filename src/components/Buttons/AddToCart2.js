import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { theme_colors } from '../../utils/theme/theme_colors';

export default function AddToCart2 ({ quantity, incrementQuantity, decrementQuantity }) {

    return (
        <View 
            style={{
                flexDirection: 'row',
                alignItems: 'center',
            }}
        >
            <TouchableOpacity 
                onPress={decrementQuantity}
                style={{
                    width: 30,
                    height: 30,
                    backgroundColor: theme_colors.white,
                    borderColor: theme_colors.greyLine,
                    borderRadius: 5,
                    borderWidth: 1,
                    alignContent: 'center',
                    justifyContent: 'center'
                }}
            >
                <Text style={{ fontSize: 18, alignSelf: 'center', color: theme_colors.grey }}>
                    -    
                </Text>
            </TouchableOpacity>

            <Text style={{ fontSize: 18, margin: 20}}>{quantity}</Text>

            <TouchableOpacity 
                onPress={incrementQuantity}
                style={{
                    width: 30,
                    height: 30,
                    backgroundColor: theme_colors.primary,
                    borderColor: theme_colors.primary,
                    borderRadius: 5,
                    borderWidth: 1,
                    alignContent: 'center',
                    justifyContent: 'center'
                }}
            >
                <Text style={{ fontSize: 18, alignSelf: 'center', color: theme_colors.white }}>
                    +  
                </Text>
            </TouchableOpacity>
        </View>
    );
};