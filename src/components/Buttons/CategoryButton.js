import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { theme_colors } from '../../utils/theme/theme_colors';
import TextStyled from '../../utils/ui/TextStyled';
import { FontAwesome6 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import ViewStyled from '../../utils/ui/ViewStyled';

export default function CategoryButton ({ category, icon, onPress }) {
    
    return (
        <ViewStyled
            style={{
                backgroundColor: theme_colors.transparent,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <TouchableOpacity
                onPress={onPress}
                style={{
                    width: 70,
                    height: 70,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    borderRadius: 15,
                    borderWidth: 1,
                    backgroundColor: theme_colors.categoryGrey,
                    borderColor: theme_colors.categoryGrey,
                    padding: 5,
                    marginBottom: 10,
                    marginTop: 10,
                    marginLeft: 5,
                    marginRight: 5,
                    elevation: 50,
                    shadowColor: theme_colors.black,
                    shadowOffset: {
                        width: 2,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                }}
            >
                <Ionicons
                    name={icon}
                    color={theme_colors.black}
                    size={35}
                    alignSelf='center'
                /> 
            </TouchableOpacity>
            <TextStyled
                textAlign='center'
                fontSize={7.5}
                color={theme_colors.black}
                style={{
                    width: "100%",
                    fontFamily: 'SFPro-Medium',
                    marginBottom: 10
                }}
            >
                {category}
            </TextStyled>
        </ViewStyled>
    );
};