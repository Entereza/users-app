import React, { useState } from 'react';
import ViewStyled from '../../utils/ui/ViewStyled';
import TextStyled from '../../utils/ui/TextStyled';
import { theme_colors } from '../../utils/theme/theme_colors';
import { AntDesign } from '@expo/vector-icons';
import ProductOptions from '../Cards/ProductOptions';
import { SectionList, TouchableOpacity, View } from 'react-native';
import BranchList from '../Text/BranchList';

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
            }}
        >
            <ViewStyled
                width={'83%'}
                backgroundColor={theme_colors.transparent}
                style={{ 
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <ViewStyled
                    width={'35%'}
                    backgroundColor={theme_colors.transparent}
                    style={{ 
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <TextStyled
                        fontSize={4.5}
                        color={theme_colors.grey}
                        style={{
                            fontFamily: 'SFPro-Medium',
                        }}
                    >
                        Selecciona la sucursal
                    </TextStyled>
                </ViewStyled>

                <TouchableOpacity
                    onPress={toggleExpand}
                    backgroundColor={theme_colors.white}
                >
                    <AntDesign 
                        name={expanded ? 'up' : 'down'} 
                        size={15} 
                        color={theme_colors.grey} 
                        style={{
                            marginLeft: 10
                        }}
                    />
                </TouchableOpacity>
            </ViewStyled>

            {expanded && (
                <BranchList data={sucursales} />
            )}
        </ViewStyled>
    );
};