import React, { useCallback, useRef, useState } from 'react'
import { theme_colors } from '../../../utils/theme/theme_colors'
import HeaderDefaultScreen from '../../../components/Header/HeaderDefaultScreen'
import ViewStyled from '../../../utils/ui/ViewStyled'
import SelectAmountRecharge from '../../../components/RechargeMoneyComponents/SelectAmountRecharge'
import RechargeGenerateQr from '../../../components/RechargeMoneyComponents/RechargeGenerateQr'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import useTabBarStore from '../../../utils/tools/interface/tabBarStore'

export default function RechargeMoneyScreen() {
  const navigation = useNavigation();

  const [ammountSelected, setAmmountSelected] = useState("")
  const [showGeneratedQr, setShowGeneratedQr] = useState(false)

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

  const goToGenerateQr = () => {
    setShowGeneratedQr(true)
  }

  return (
    <ViewStyled
      backgroundColor={theme_colors.white}
      width={100}
      style={{
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <HeaderDefaultScreen title={"Recargar dinero"} />

      {
        !showGeneratedQr
          ? <SelectAmountRecharge
            onPress={goToGenerateQr}
            ammountSelected={ammountSelected}
            setAmmountSelected={setAmmountSelected}
          />
          : <RechargeGenerateQr
            ammountSelected={ammountSelected}
          />
      }
    </ViewStyled>
  )
}