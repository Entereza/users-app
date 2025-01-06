import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function ScrollView({ data, onValueChange, initialIndex = 0 }) {
    const renderItem = ({ item, index }) => (
        <TouchableOpacity onPress={() => onValueChange(item, index)}>
            <View style={styles.itemContainer}>
                <Text style={styles.itemText}>{item}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            initialScrollIndex={initialIndex}
            getItemLayout={(data, index) => (
                { length: 35, offset: 35 * index, index }
            )}
            showsVerticalScrollIndicator={false}
            snapToInterval={35} // Make sure this matches item height
            decelerationRate="fast"
            style={styles.list}
        />
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemText: {
        fontFamily: 'SFPro-Regular',
    },
    list: {
        height: 100,
        backgroundColor: '#FFFFFF',
    },
});
