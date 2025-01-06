import React, { useState } from 'react';
import { Card, TouchableOpacity, View } from 'react-native';
import { theme_colors } from '../../utils/theme/theme_colors';
import ViewStyled from '../../utils/ui/ViewStyled';
import TextStyled from '../../utils/ui/TextStyled';
import { MaterialIcons } from '@expo/vector-icons';

export default function DescriptionCard({ description }) {
    const [expanded, setExpanded] = useState(false);

    const expandCard = () => {
      setExpanded(!expanded);
    };
  
    return (
        <ViewStyled>
            <TouchableOpacity onPress={expandCard}>
                <TextStyled> Descripción </TextStyled>
                <MaterialIcons 
                    name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                    size={15}
                    color={theme_colors.white}
                    style={{ position: 'absolute', right: 0, top: 0 }}
                />
            </TouchableOpacity>
            {expanded && 
            <TouchableOpacity onPress={expandCard}>
                <TextStyled> Descripción </TextStyled>
                <TextStyled> {description} </TextStyled>
            </TouchableOpacity>
            }
        </ViewStyled>
    );
};