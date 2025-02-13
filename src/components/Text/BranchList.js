import React, { useState } from 'react';
import { FlatList, TouchableOpacity, Text } from 'react-native';
import { theme_colors } from '../../utils/theme/theme_colors';
import adjustFontSize from '../../utils/ui/adjustText';
import { theme_textStyles } from '../../utils/theme/theme_textStyles';

export default function BranchList ({ data }) {
    const [selectedItem, setSelectedItem] = useState(null);

    const renderItem = ({ item }) => (
        <TouchableOpacity 
            style={{
                backgroundColor: selectedItem === item ? theme_colors.primary : theme_colors.requiredGrey,
                borderRadius: 5,
                padding: 10,
                marginVertical: 5,
                marginHorizontal: 5,
            }}
            onPress={() => setSelectedItem(item)}
        >
            <Text 
                style={{ 
                    fontFamily: 'SFPro-Medium', 
                    fontSize: adjustFontSize(theme_textStyles.small), 
                    color: selectedItem === item ? theme_colors.white : theme_colors.black 
                }}
            >
                {item}
            </Text>
        </TouchableOpacity>
    );

    const keyExtractor = (item, index) => index.toString();

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            numColumns={3}
            contentContainerStyle={{
                alignItems: 'center',
                marginTop: 10,
            }}
        />
    );
};
