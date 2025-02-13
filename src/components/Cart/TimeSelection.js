import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Pressable } from 'react-native';
import TextStyled from '../../utils/ui/TextStyled';
import { theme_colors } from '../../utils/theme/theme_colors';
import { AntDesign } from '@expo/vector-icons';
import ScrollView from '../Text/ScrollPicker';
import { theme_textStyles } from '../../utils/theme/theme_textStyles';

export default function TimeSelection() {
    const [expanded, setExpanded] = useState(false);
    const [selectedHour, setSelectedHour] = useState("00");
    const [selectedMinute, setSelectedMinute] = useState("00");

    const hours = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
    const minutes = Array.from({ length: 60 }, (_, index) => index.toString().padStart(2, '0'));

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    const chosenHour = (index) => {
        setSelectedHour(index);
        console.log("Hora: " + selectedHour);
    };

    const chosenMinute = (index) => {
        setSelectedMinute(index);
        console.log("Minutos: " + selectedMinute);
    };

    return (
        <View
            width={'90%'}
            backgroundColor={theme_colors.white}
            style={{
                marginTop: 10,
                padding: 10,
                marginBottom: 10,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
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
                            Selecciona la hora
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

            {expanded && (
                <View
                    width={'50%'}
                    style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}
                >
                    <ScrollView data={hours} />

                    <ScrollView data={minutes} />
                </View>
            )}
        </View>
    );
};
