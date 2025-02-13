import React from 'react';
import { theme_colors } from '../../utils/theme/theme_colors';
import TextStyled from '../../utils/ui/TextStyled';
import ViewStyled from '../../utils/ui/ViewStyled';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { private_name_routes } from '../../utils/route/private_name_routes';
import { theme_textStyles } from '../../utils/theme/theme_textStyles';

export default function AddressCard({ address, client, icon, onPress }) {

    return (
        <TouchableOpacity
            onPress={onPress}
        >
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
                        fontSize={theme_textStyles.smedium}
                        color={theme_colors.black}
                        numberOfLines={client !== "" ? 1 : 2}
                        ellipsizeMode='tail'
                        style={{
                            fontFamily: 'SFPro-Regular',
                        }}
                    >
                        {address}
                    </TextStyled>

                    {
                        client !== "" &&
                        <TextStyled
                            fontSize={theme_textStyles.small + .5}
                            color={theme_colors.grey}
                            numberOfLines={1}
                            ellipsizeMode='tail'
                            style={{
                                marginTop: 5,
                                fontFamily: 'SFPro-Regular',
                            }}
                        >
                            {client}
                        </TextStyled>
                    }
                </ViewStyled>


                <MaterialIcons name="keyboard-arrow-right" size={30} color={theme_colors.primary} />
            </View>
        </TouchableOpacity >
    );
};