import React from 'react';
import { Ionicons, AntDesign } from "@expo/vector-icons";
import ViewStyled from "../../utils/ui/ViewStyled";
import TextStyled from "../../utils/ui/TextStyled";
import { TouchableOpacity } from 'react-native';
import { theme_colors } from "../../utils/theme/theme_colors";

export default function SelectionCard({id, name, icon, selection, onPress}) {

    return (
        <TouchableOpacity
            onPress={onPress}
            backgroundColor={theme_colors.white}
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
                borderWidth: 1,
                backgroundColor: selection === id ? theme_colors.primary : theme_colors.white,
                borderColor: selection === id ? theme_colors.primary : theme_colors.white,
                padding: 18,
                width: '87%',
                marginBottom: 10,
                marginTop: 10,
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
            <ViewStyled
                width={'85%'}
                backgroundColor={theme_colors.transparent}
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <ViewStyled
                    backgroundColor={theme_colors.transparent}
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        marginLeft: 5
                    }}
                >
                    <Ionicons name={icon} size={20} color={selection === id ? theme_colors.white : theme_colors.primary} />

                    <TextStyled
                        fontSize={7}
                        color={selection === id ? theme_colors.white : theme_colors.black}
                        style={{
                            marginLeft: 15,
                            marginTop: 2,
                            fontFamily: 'SFPro-Bold',
                        }}
                    >
                        {name}
                    </TextStyled>
                </ViewStyled>

                <ViewStyled
                    backgroundColor={theme_colors.transparent}
                    style={{
                        justifyContent: 'flex-end',
                        marginRight: 5
                    }}
                >
                    { selection === id ? (
                        <AntDesign name="checkcircle" size={20} color={theme_colors.white} />
                    ) : ( 
                        <AntDesign name="checkcircleo" size={20} color={theme_colors.secondary} />
                    )}
                </ViewStyled>
            </ViewStyled>
        </TouchableOpacity>
    );
}