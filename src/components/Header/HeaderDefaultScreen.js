import React from "react";
import { SafeAreaView } from "react-native-safe-area-context"
import ViewStyled from "../../utils/ui/ViewStyled"
import { theme_colors } from "../../utils/theme/theme_colors"
import TextStyled from "../../utils/ui/TextStyled"
import { Pressable, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import adjustFontSize from "../../utils/ui/adjustText";
import { theme_textStyles } from "../../utils/theme/theme_textStyles";

export default function HeaderDefaultScreen({ title, onPress, withBorder = true }) {
    const navigation = useNavigation();

    const goBack = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView edges={["top"]} style={{ backgroundColor: theme_colors.white }}>
            <ViewStyled
                backgroundColor={theme_colors.transparent}
                width={100}
                height={8}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottomWidth: withBorder ? 0.5 : 0,
                    borderColor: theme_colors.lightGrey,
                    position: 'relative'
                }}
            >
                <TouchableOpacity
                    disabled={false}
                    onPress={onPress ? onPress : goBack}
                    style={{
                        left: 10,
                        position: 'absolute',
                        zIndex: 100,
                    }}
                >
                    <ViewStyled
                        width={11}
                        height={5.5}
                        borderRadius={1.5}
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
                            size={adjustFontSize(theme_textStyles.xlarge)}
                            color={theme_colors.primary}
                        />
                    </ViewStyled>
                </TouchableOpacity>

                <ViewStyled
                    backgroundColor={theme_colors.transparent}
                    style={{
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <TextStyled
                        fontFamily='SFPro-Bold'
                        textAlign={'center'}
                        fontSize={theme_textStyles.medium}
                        color={theme_colors.black}
                        style={{
                            width: '100%'
                        }}
                    >
                        {title}
                    </TextStyled>
                </ViewStyled>
            </ViewStyled>
        </SafeAreaView>
    )
};