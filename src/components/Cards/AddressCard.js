import React from 'react';
import { theme_colors } from '../../utils/theme/theme_colors';
import TextStyled from '../../utils/ui/TextStyled';
import ViewStyled from '../../utils/ui/ViewStyled';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { private_name_routes } from '../../utils/route/private_name_routes';

export default function AddressCard ({ address, client, icon, onPress }) {
    
    return (
            <View
                backgroundColor={theme_colors.transparent}
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 15,
                    marginTop: 15
                }}
            >
                <FontAwesome6 name={icon} size={30} color={theme_colors.primary} />
                
                <ViewStyled
                    width={'70%'}
                    backgroundColor={theme_colors.transparent}
                    style={{
                        marginLeft: 15,
                    }}
                >
                    <TextStyled
                        fontSize={7.5}
                        color={theme_colors.black}
                        style={{
                            fontFamily: 'SFPro-Regular',
                        }}
                    >
                        {address}
                    </TextStyled>

                    <TextStyled
                        fontSize={5}
                        color={theme_colors.grey}
                        style={{
                            marginTop: 5,
                            fontFamily: 'SFPro-Regular',
                        }}
                    >
                        {client}
                    </TextStyled>
                </ViewStyled>

                <TouchableOpacity
                    onPress={onPress}
                    style={{
                        justifyContent: 'flex-end'
                    }}
                >
                    <MaterialIcons name="keyboard-arrow-right" size={30} color={theme_colors.primary} />
                </TouchableOpacity>
            </View>
    );
};