import React from 'react';
import { StyleSheet } from 'react-native';
import ViewStyled from '../../utils/ui/ViewStyled';
import TextStyled from '../../utils/ui/TextStyled';
import ImageStyled from '../../utils/ui/ImageStyled';
import { theme_colors } from '../../utils/theme/theme_colors';
import { theme_textStyles } from '../../utils/theme/theme_textStyles';
import SafeAreaStyled from '../SafeAreaComponents/SafeAreaStyled';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import useLocationStore from '../../utils/tools/interface/locationStore';

export default function DepartmentNotActive() {
  const { department } = useLocationStore();

  return (
    <SafeAreaStyled
      backgroundColor={theme_colors.white}
      styleArea={styles.safeArea}
      styleView={styles.container}
    >
      <ViewStyled
        width={90}
        height={60}
        backgroundColor={theme_colors.transparent}
        style={styles.contentContainer}
      >
        <ViewStyled
          backgroundColor={theme_colors.transparent}
          style={styles.imageContainer}
        >
          <ImageStyled
            source={require('../../../assets/gifs/department.gif')}
            style={styles.image}
            borderRadius={1.5}
          />
        </ViewStyled>

        <TextStyled
          fontFamily='SFPro-Bold'
          fontSize={theme_textStyles.large}
          color={theme_colors.primary}
          marginTop={3}
        >
          ¡Pronto estaremos contigo!
        </TextStyled>

        <TextStyled
          fontFamily='SFPro-Regular'
          fontSize={theme_textStyles.small}
          color={theme_colors.grey}
          textAlign="center"
          marginTop={1}
          marginHorizontal={5}
        >
          {`Estamos trabajando para llevar nuestros servicios a ${department}.\n\n¡Gracias por tu paciencia!`}
        </TextStyled>
      </ViewStyled>
    </SafeAreaStyled>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: theme_colors.white,
    flex: 1,
  },
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: heightPercentageToDP(6.5)
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '50%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  }
});