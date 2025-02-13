import React, { useState } from 'react';
import ViewStyled from '../../utils/ui/ViewStyled';
import TextStyled from '../../utils/ui/TextStyled';
import { theme_colors } from '../../utils/theme/theme_colors';
import { AntDesign } from '@expo/vector-icons';
import ProductOptions from '../Cards/ProductOptions';
import { SectionList, TouchableOpacity, View } from 'react-native';
import BranchList from '../Text/BranchList';
import { theme_textStyles } from '../../utils/theme/theme_textStyles';

export default function BranchSelection() {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    const sucursales = ["HuperMall", "Cala Cala", "IC Norte", "Paseo Aranjuez", "Cancha", "America"];

    return (
        <ViewStyled
            width={'90%'}
            backgroundColor={theme_colors.white}
            style={{
                marginTop: 5,
                padding: 10,
                marginBottom: 10,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: theme_colors.black,
                shadowOffset: {
                    width: 1,
                    height: 1,
                },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                shadowColor: theme_colors.black,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
                elevation: 3,
            }}
        >
            <TouchableOpacity onPress={toggleExpand}>
                <View
                    width={'95%'}
                    backgroundColor={theme_colors.transparent}
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <View
                        backgroundColor={theme_colors.transparent}
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <TextStyled
                            fontSize={theme_textStyles.small + .5}
                            color={theme_colors.grey}
                            style={{
                                fontFamily: 'SFPro-Medium',
                            }}
                        >
                            Selecciona la sucursal
                        </TextStyled>
                    </View>

                    <AntDesign
                        name={expanded ? 'up' : 'down'}
                        size={15}
                        color={theme_colors.grey}
                        style={{
                            marginLeft: 10
                        }}
                    />
                </View>
            </TouchableOpacity>

            {
                expanded && (
                    <BranchList data={sucursales} />
                )
            }
        </ViewStyled >
    );
};