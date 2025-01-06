import React from 'react';
import { Pressable, TouchableOpacity } from 'react-native';
import { theme_colors } from '../../utils/theme/theme_colors';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ViewStyled from '../../utils/ui/ViewStyled';
import adjustFontSize from '../../utils/ui/adjustText';

export default function BackButton() {
    const navigation = useNavigation();

    const goBack = () => {
        navigation.goBack();
    };

    return (
        <Pressable
            onPress={goBack}
        >
            <ViewStyled
                width={12}
                height={6}
                borderRadius={1}
                backgroundColor={theme_colors.transparent}
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',

                    borderWidth: 1,
                    borderColor: theme_colors.primary
                }}
            >
                <MaterialCommunityIcons
                    name="arrow-left"
                    size={adjustFontSize(25)}
                    color={theme_colors.primary}
                />
            </ViewStyled>
        </Pressable>
    );
};