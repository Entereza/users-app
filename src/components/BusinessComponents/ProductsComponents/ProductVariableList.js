import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme_colors } from '../../../utils/theme/theme_colors';

const ProductVariableList = ({ namePv = "", variables = [], isRequired = false, maxSelect = 2 }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [selectedItems, setSelectedItems] = useState([]);

    const toggleItem = (index) => {
        setSelectedItems(prev => {
            if (prev.includes(index)) {
                return prev.filter(item => item !== index);
            } else {
                if (prev.length >= maxSelect) {
                    return prev;
                }
                return [...prev, index];
            }
        });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.header}
                onPress={() => setIsExpanded(!isExpanded)}
            >
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{namePv}</Text>
                    <Text style={styles.maxSelect}>{` (max. ${maxSelect})`}</Text>
                    {isRequired && (
                        <View style={styles.requiredBadge}>
                            <Text style={styles.requiredText}>Requerido</Text>
                        </View>
                    )}
                </View>
                <Ionicons
                    name={isExpanded ? "chevron-up" : "chevron-down"}
                    size={24}
                    color="#666"
                />
            </TouchableOpacity>

            {isExpanded && (
                <ScrollView style={styles.itemsContainer}>
                    {variables.map((variable, index) => {
                        console.log('Variable:', variable);
                        return (
                            <TouchableOpacity
                                key={index}
                                style={styles.item}
                                onPress={() => toggleItem(index)}
                            >
                                <View style={styles.itemContent}>
                                    <Text style={styles.itemText}>{variable.name}</Text>
                                    {variable.price > 0 && (
                                        <Text style={styles.priceText}>+Bs. {variable.price}</Text>
                                    )}
                                </View>
                                <View style={[
                                    styles.checkbox,
                                    selectedItems.includes(index) && styles.checkboxSelected
                                ]}>
                                    {selectedItems.includes(index) && (
                                        <Ionicons name="checkmark" size={16} color="white" />
                                    )}
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme_colors.white,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        margin: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    maxSelect: {
        fontSize: 18,
        color: '#666',
    },
    requiredBadge: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginLeft: 8,
    },
    requiredText: {
        fontSize: 12,
        color: '#666',
    },
    itemsContainer: {
        maxHeight: 300,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    itemContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginRight: 12,
    },
    itemText: {
        fontSize: 16,
        color: '#333',
        fontFamily: 'SFPro-SemiBold',
    },
    priceText: {
        fontSize: 14,
        color: theme_colors.primary,
        fontFamily: 'SFPro-Regular',
        marginLeft: 5,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxSelected: {
        backgroundColor: theme_colors.primary,
        borderColor: theme_colors.primary,
    },

});

export default ProductVariableList;