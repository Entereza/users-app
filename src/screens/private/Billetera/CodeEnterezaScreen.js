import { View, Text, StyleSheet } from 'react-native'
import React, { useCallback, useRef } from 'react'
import { theme_colors } from '../../../utils/theme/theme_colors';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import useTabBarStore from '../../../utils/tools/interface/tabBarStore';
import SafeAreaStyled from '../../../components/SafeAreaComponents/SafeAreaStyled';
import HeaderCodeEnterezaScreen from '../../../components/CodeEnterezaComponents/HeaderCodeEnterezaScreen';
import ContentCodeEnterezaScreen from '../../../components/CodeEnterezaComponents/ContentCodeEnterezaScreen';

export default function CodeEnterezaScreen() {
    const navigation = useNavigation();
    const { toggleTabBar, changeColorStatusBar } = useTabBarStore()

    const goBack = () => {
        navigation.goBack();
        changeColorStatusBar(theme_colors.white)
        toggleTabBar(true);
    };

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
            backgroundColor={theme_colors.dark}
            styleArea={styles.safeArea}
            styleView={styles.startView}
        >
            <HeaderCodeEnterezaScreen goBack={goBack} />

            <ContentCodeEnterezaScreen onPress={goBack} />
        </SafeAreaStyled>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: theme_colors.transparent,
    },
    startView: {
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
});