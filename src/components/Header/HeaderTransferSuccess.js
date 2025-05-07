import React from "react";
import { SafeAreaView } from "react-native-safe-area-context"
import ViewStyled from "../../utils/ui/ViewStyled"
import { theme_colors } from "../../utils/theme/theme_colors"
import TextStyled from "../../utils/ui/TextStyled"
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import adjustFontSize from "../../utils/ui/adjustText";
import { theme_textStyles } from "../../utils/theme/theme_textStyles";
import useTabBarStore from "../../utils/tools/interface/tabBarStore";

export default function HeaderTransferSuccess({ title, onSavePress, onGoBack }) {
    const navigation = useNavigation();
    const { toggleTabBar } = useTabBarStore();

    const goBack = () => {
        toggleTabBar(true)
        navigation.goBack();
    };

    return (
        <SafeAreaView edges={["top"]} style={{ backgroundColor: theme_colors.transparent }}>
            <ViewStyled
                backgroundColor={theme_colors.transparent}
                width={100}
                height={8}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                }}
            >
                <Pressable
                    onPress={onGoBack ? onGoBack : goBack}
                    style={{
                        left: 10,
                        position: 'absolute',
                        zIndex: 2
                    }}
                >
                    <ViewStyled
                        width={11}
                        height={5.5}
                        borderRadius={50}
                        backgroundColor={theme_colors.transparent}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <MaterialCommunityIcons
                            name="close"
                            size={adjustFontSize(theme_textStyles.xlarge)}
                            color={theme_colors.grey}
                        />
                    </ViewStyled>
                </Pressable>

                <Pressable
                    onPress={onSavePress}
                    style={{
                        right: 10,
                        position: 'absolute',
                        zIndex: 2
                    }}
                >
                    <ViewStyled
                        width={11}
                        height={5.5}
                        borderRadius={50}
                        backgroundColor={theme_colors.transparent}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <MaterialIcons
                            name="save-alt"
                            size={adjustFontSize(theme_textStyles.xlarge)}
                            color={theme_colors.dark}
                        />
                    </ViewStyled>
                </Pressable>
            </ViewStyled>
        </SafeAreaView>
    )
}; 