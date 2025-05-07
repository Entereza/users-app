import { StyleSheet } from "react-native";
import { theme_colors } from "../../../utils/theme/theme_colors";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import useTabBarStore from "../../../utils/tools/interface/tabBarStore";
import { useCallback, useRef } from "react";
import SafeAreaStyled from "../../../components/SafeAreaComponents/SafeAreaStyled";
import HeaderCashbackInfoScreen from "../../../components/CashbackInfoComponents/HeaderCashbackInfoScreen";
import ContentCashbackInfoScreen from "../../../components/CashbackInfoComponents/ContentCashbackInfoScreen";

export default function CashbackInfoScreen() {
    const navigation = useNavigation();
    
    const goBack = () => {
        navigation.goBack();
        changeColorStatusBar(theme_colors.white)
        toggleTabBar(true);
    };

    const { toggleTabBar, changeColorStatusBar } = useTabBarStore()

    const isGoingBack = useRef(false);

    useFocusEffect(
        useCallback(() => {
            const onBackPress = (e) => {
                if (!isGoingBack.current) {
                    isGoingBack.current = true;
                    e.preventDefault();
                    goBack();
                }
            };

            navigation.addListener('beforeRemove', onBackPress);

            return () => {
                navigation.removeListener('beforeRemove', onBackPress);
            };
        }, [navigation])
    );

    return (
        <SafeAreaStyled
            backgroundColor={theme_colors.black}
            styleArea={styles.safeArea}
            styleView={styles.startView}
        >
            <HeaderCashbackInfoScreen goBack={goBack} />

            <ContentCashbackInfoScreen onPress={goBack} />
        </SafeAreaStyled>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: theme_colors.transparent,
        flex: 1,
    },
    startView: {
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
});