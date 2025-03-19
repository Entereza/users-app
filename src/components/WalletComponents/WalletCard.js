import { ImageBackground } from 'react-native'
import React from 'react'
import ViewStyled from '../../utils/ui/ViewStyled'
import TextStyled from '../../utils/ui/TextStyled'
import { theme_colors } from '../../utils/theme/theme_colors'
import HomeButton from '../Buttons/HomeButton'
import { useNavigation } from '@react-navigation/native'
import { private_name_routes } from '../../utils/route/private_name_routes'
import useTabBarStore from '../../utils/tools/interface/tabBarStore'
import { theme_textStyles } from '../../utils/theme/theme_textStyles'
import useAuthStore from '../../utils/tools/interface/authStore'

export default function WalletCard() {
    const navigation = useNavigation()
    const { toggleTabBar, changeColorStatusBar } = useTabBarStore()
    const { user } = useAuthStore()

    const goToCashbackInfoScreen = () => {
        toggleTabBar(false)
        changeColorStatusBar(theme_colors.black)
        navigation.navigate(private_name_routes.billetera.cashbackInfoScreen);
    }

    const goToTransferScreen = () => {
        toggleTabBar(false)
        navigation.navigate(private_name_routes.billetera.transferScreen, {
            cashback: ''
        });
    }

    const goToCodeScreen = () => {
        toggleTabBar(false)
        changeColorStatusBar(theme_colors.dark)
        navigation.navigate(private_name_routes.billetera.codeScreen);
    }

    return (
        <ViewStyled
            width={95}
            height={30}
            marginVertical={1}
            borderRadius={3}
            backgroundColor={theme_colors.black}
            style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <ImageBackground
                source={require('../../../assets/Lines/LinesBG.png')}
                style={{
                    width: '100%',
                    height: '100%',
                    alignItems: 'center'
                }}
            >
                <ViewStyled
                    backgroundColor={theme_colors.transparent}
                    style={{
                        width: 'auto',
                        height: '49%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 0,
                        borderColor: theme_colors.primary
                    }}
                >
                    <TextStyled
                        fontSize={theme_textStyles.smedium}
                        fontFamily='Artegra-Light'
                        color={theme_colors.white}
                        style={{ marginBottom: 5 }}
                    >
                        Balance
                    </TextStyled>
                    <TextStyled
                        fontSize={theme_textStyles.xlarge + 2}
                        fontFamily='Artegra-SemiBold'
                        color={theme_colors.white}
                    >
                        BOB. {user.cashback.toFixed(2)}
                    </TextStyled>
                </ViewStyled>

                <ViewStyled
                    paddingHorizontal={10}
                    paddingVertical={3}
                    backgroundColor={`${theme_colors.backgroundLightGrey}22`}
                    borderRadius={3}
                    style={{
                        width: '93%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignSelf: 'center',
                    }}
                >
                    <HomeButton
                        text={"Qué es Cashback"}
                        icon={"hand-holding-dollar"}
                        onPress={goToCashbackInfoScreen}
                    />
                    <HomeButton
                        text={"Transferir Cashback"}
                        icon={"money-bill-transfer"}
                        onPress={goToTransferScreen}
                    />
                </ViewStyled>
            </ImageBackground>
        </ViewStyled>
    )
}