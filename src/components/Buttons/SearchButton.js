import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { theme_colors } from '../../utils/theme/theme_colors';
import TextStyled from '../../utils/ui/TextStyled';
import ViewStyled from '../../utils/ui/ViewStyled';
import { FontAwesome } from '@expo/vector-icons';

export default function SearchButton({ nameUser, width, onPress }) {
    const [isSearchActive, setSearchActive] = useState(false);
    const [searchText, setSearchText] = useState('');

    const handleSearchButtonPress = () => {
        setSearchActive(true);
    };

    const handleSearch = () => {
        console.log('Searching for:', searchText);
        setSearchActive(false);
    };

    return (
        <TouchableOpacity
            onPress={handleSearchButtonPress}
            style={{
                width: width,
                height: 40,
                alignSelf: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                borderWidth: 1,
                backgroundColor: theme_colors.white,
                borderColor: theme_colors.white,
                padding: 8,
                marginBottom: 10,
                marginTop: 10,
                
                shadowColor: theme_colors.black,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
                elevation: 3,
            }}
        >
            <ViewStyled
                backgroundColor={theme_colors.transparent}
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <TextInput
                    width={'95%'}
                    value={searchText}
                    onChangeText={setSearchText}
                    placeholder={`¿Qué estas buscando ${nameUser}?`}
                    onSubmitEditing={handleSearch}
                />

                <FontAwesome
                    name={'search'}
                    color={theme_colors.grey}
                    size={18}
                />
            </ViewStyled>
        </TouchableOpacity>
    );
}