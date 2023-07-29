// REACT 
import React from 'react'

// CUSTOM 
import ViewStyled from '../components/ui/ViewStyled'
import WalletSales from '../components/wallet/WalletSales';
import { theme } from '../utils/theme'
import WalletSavingButton from '../components/wallet/WalletSavingButton';
import WalletHowSale from '../components/wallet/WalletHowSale';
import WalletCard from '../components/wallet/WalletCard';

import { useDispatch, useSelector } from 'react-redux';
import { __authGetInfo } from '../redux/actions/authActions';
import { RefreshControl, Animated, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TextStyled from '../components/ui/TextStyled';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import adjustFontSize from '../utils/adjustText';
import FloatingButton from '../components/Btn/FloatingButton';

export default function WalletScreen({ route }) {
  // Verificar si es la primera vez
  const [firstTimeUser, setFirstTimeUser] = React.useState(null)

  // Variables para mostrar u ocultar
  const [animatedComponentsDisplay, setAnimatedComponentsDisplay] = React.useState('none')
  const [walletComponentsDisplay, setWalletComponentsDisplay] = React.useState('none')

  // Validacion para mostrar animaciones
  React.useEffect(() => {
    if (firstTimeUser !== null) {
      if (firstTimeUser) {
        setAnimatedComponentsDisplay('flex');
        setTimeout(() => {
          StartsAnimatedComponentsAnimations()
        }, 500)
      }
    }
  }, [firstTimeUser])

  const ShowComponentsWallet = async () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(WalletCardOpacity, {
          toValue: 1,
          duration: 0,
          useNativeDriver: false,
        }),
        Animated.timing(ScrollViewBackground, {
          toValue: 1,
          duration: 0,
          useNativeDriver: false,
        }),
        Animated.timing(ScrollViewPadding, {
          toValue: 1,
          duration: 0,
          useNativeDriver: false,
        }),
        Animated.timing(AnimatedWalletTransactions, {
          toValue: 1,
          duration: 0,
          useNativeDriver: false,
        }), Animated.timing(AnimatedWalletButtonTwo, {
          toValue: 1,
          duration: 0,
          useNativeDriver: false,
        }), Animated.timing(AnimatedWalletButtonOne, {
          toValue: 1,
          duration: 0,
          useNativeDriver: false,
        }),
      ])
    ]).start(() => {
      setWalletComponentsDisplay('flex')
      console.log('Now Show WalletComponents')
    });
  }

  const VerifyFirstTime = async () => {
    const firstTime = await route.params.firstTime;

    console.log('FirstTime for Setting: ', firstTime)
    setFirstTimeUser(firstTime)
  }

  React.useEffect(() => {
    if (route) {
      if (route.params) {
        if (route.params.firstTime) {
          VerifyFirstTime()
        } else {
          console.log('Nothing more on Route.Params.firstTime')
        }
      } else {
        ShowComponentsWallet()
        console.log('Nothing more on Route.Params')
      }
    } else {
      console.log('Nothing more on Route.')
    }
  }, [route])

  // Const for use of react functions
  const navigation = useNavigation()

  const dispatch = useDispatch()

  // Variables para la aparición de la barra de navegacion
  const [showTabBar, setShowTabBar] = React.useState(false)

  // Variables para la Animacion de los componentes
  const FirstTextOpacity = React.useRef(new Animated.Value(0)).current;
  const WalletCardOpacity = React.useRef(new Animated.Value(0)).current;
  const SecondTextOpacity = React.useRef(new Animated.Value(0)).current;
  const buttonOpacity = React.useRef(new Animated.Value(0)).current;

  const ScrollViewPadding = React.useRef(new Animated.Value(0)).current;
  const WalletCardAnimation = React.useRef(new Animated.Value(0)).current;
  const AnimatedTittle = React.useRef(new Animated.Value(0)).current;
  const AnimatedTextButton = React.useRef(new Animated.Value(0)).current;

  const ScrollViewBackground = React.useRef(new Animated.Value(0)).current;

  const AnimatedWalletButtonOne = React.useRef(new Animated.Value(0)).current;
  const AnimatedWalletButtonTwo = React.useRef(new Animated.Value(0)).current;
  const AnimatedWalletTransactions = React.useRef(new Animated.Value(0)).current;

  const marginTopValue = ScrollViewPadding.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [heightPercentageToDP(9), heightPercentageToDP(21), heightPercentageToDP(1)],
  });

  const backgroundScrollView = ScrollViewBackground.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.dark, theme.background]
  });

  // Funciones para la animacion de los componentes
  const StartsAnimatedComponentsAnimations = () => {
    Animated.sequence([
      Animated.timing(FirstTextOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }),
      Animated.timing(WalletCardOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }),
      Animated.timing(SecondTextOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false
      }),
    ]).start(() => {
      setStartText(true)
    });
  }

  const AnimationOpacityButton = () => {
    Animated.sequence([
      Animated.timing(buttonOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false
      })
    ]).start(() => {
      console.log('End Show Components (StartsAnimatedComponentsAnimations)')
    })
  }

  const StartTextAnimations = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(AnimatedTittle, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(AnimatedTextButton, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]),
    ]).start(() => {
      setAnimatedComponentsDisplay('none')
      Animated.timing(ScrollViewPadding, {
        toValue: 0.5,
        duration: 0,
        useNativeDriver: false,
      }).start(() => {
        console.log('First Part Animations Complete')
        // return;
        StartCardBackgroundAnimations()
      })
    })
  }

  const StartCardBackgroundAnimations = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(ScrollViewPadding, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(ScrollViewBackground, {
          toValue: 1,
          duration: 2500,
          useNativeDriver: false,
        }),
      ])
    ]).start(() => {
      console.log('Second Part Animations Complete (ScrollBackgroundAnimation)')
      setShowTabBar(true)
    });

    setTimeout(() => {
      setWalletComponentsDisplay('flex')
      StartsWalletComponentsAnimations()
    }, 1500);
  }

  const StartsWalletComponentsAnimations = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(AnimatedWalletButtonOne, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(AnimatedWalletButtonTwo, {
          toValue: 1,
          duration: 1000,
          delay: 500,
          useNativeDriver: false,
        }),
        Animated.timing(AnimatedWalletTransactions, {
          toValue: 1,
          duration: 1750,
          delay: 700,
          useNativeDriver: false
        })
      ])
    ]).start(async () => {
      console.log('Final Part of Animations Complete (ShowComponentsWallet&Transactions)')
      await Promise.all([
        console.log('Starts __authGetInfo from StartsWalletComponentsAnimations'),
        dispatch(__authGetInfo()),
      ]).then(() => {
        console.log('Final All Animations & Searchs')
      })
    });
  }

  // Animacion de la tarjeta (Background)
  const AnimationBackgroundWallet = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(WalletCardAnimation, {
          toValue: 0.5,
          duration: 15000,
          useNativeDriver: false,
        }),
        Animated.timing(WalletCardAnimation, {
          toValue: 1,
          duration: 15000,
          useNativeDriver: false,
        }),
        Animated.timing(WalletCardAnimation, {
          toValue: 0.5,
          duration: 15000,
          useNativeDriver: false,
        }),
        Animated.timing(WalletCardAnimation, {
          toValue: 0,
          duration: 15000,
          useNativeDriver: false,
        }),
      ]),
      { iterations: -1 }
    ).start();
  }

  React.useEffect(() => {
    AnimationBackgroundWallet()
  }, [])

  // Mostrar barra de navegación
  React.useEffect(() => {
    if (showTabBar) {
      navigation.navigate('WalletStack', {
        screen: 'WalletScreen',
        initial: false,
        params: { firstTime: false },
      });
    }
  }, [showTabBar]);

  // Refresh Control Functions
  const [refreshing, setRefreshing] = React.useState(false);

  const handleOnRefresh = () => {
    setTimeout(() => { setRefreshing(false) }, 500)
  }

  const onRefresh = () => {
    setRefreshing(true)
    console.log('Reloading Page Wallet Screen.js')
    dispatch(__authGetInfo())
    setTimeout(() => { setRefreshing(false) }, 500);
  }


  // Animaciones para el texto
  const [startText, setStartText] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const [animatingText, setAnimatingText] = React.useState('');

  const textToAnimate = '¡Bienvenido/a a Entereza!\n\nNo olvides que estamos aquí para ofrecerte una experiencia inolvidable y ayudarte a ahorrar de manera inteligente.';
  const textAnimation = React.useRef(new Animated.Value(0)).current;

  const animateText = () => {
    if (index < textToAnimate.length) {
      setAnimatingText(animatingText + textToAnimate[index]);
      setIndex(index + 1);
    } else {
      AnimationOpacityButton()
    }
  };

  React.useEffect(() => {
    if (startText === true) {
      Animated.timing(textAnimation, {
        toValue: 1,
        duration: 5,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          animateText();
        }
      });
    }
  }, [index, startText]);

  return (
    <>
      <FloatingButton bottom={10} />

      <Animated.ScrollView
        scrollEnabled={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        style={{
          backgroundColor: backgroundScrollView,
        }}
        showsVerticalScrollIndicator={false}
        scrollToOverflowEnabled={false}
      >
        <Animated.ScrollView
          scrollEnabled={true}
          contentContainerStyle={{
            width: '100%',
            height: '100%',
            backgroundColor: theme.transparent,
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
          style={{
            paddingTop: marginTopValue
          }}
          showsVerticalScrollIndicator={false}
          scrollToOverflowEnabled={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={walletComponentsDisplay === 'flex' ? onRefresh : null} />
          }
        >
          <Animated.View
            style={{
              transform: [
                {
                  translateX: AnimatedTittle.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -450],
                  }),
                },
              ],
              opacity: FirstTextOpacity,
              width: widthPercentageToDP(95),
              height: heightPercentageToDP(10),
              marginBottom: heightPercentageToDP(2),
              justifyContent: 'center',
              alignItems: 'center',
              display: animatedComponentsDisplay,
              backgroundColor: theme.transparent,
              // borderColor: theme.secondary,
              // borderWidth: 1,
            }}
          >
            <ViewStyled
              backgroundColor={theme.transparent}
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TextStyled
                textAlign='center'
                fontFamily='ArtegraBold'
                fontSize={adjustFontSize(22)}
                color={theme.primary}
              >
                {`¡Tu tarjeta está lista!`}
              </TextStyled>
            </ViewStyled>
          </Animated.View>

          <SafeAreaView edges={['top']} style={{ backgroundColor: theme.transparent }}>
            <WalletCard
              reload={refreshing}
              WalletCardOpacity={WalletCardAnimation}
              CardOpacity={WalletCardOpacity}
            />
          </SafeAreaView>

          <Animated.View
            style={{
              transform: [
                {
                  translateX: AnimatedTextButton.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 450],
                  }),
                },
              ],
              opacity: SecondTextOpacity,
              width: widthPercentageToDP(95),
              height: heightPercentageToDP(24),
              marginTop: heightPercentageToDP(4),
              marginBottom: heightPercentageToDP(2),
              justifyContent: 'center',
              alignItems: 'center',
              display: animatedComponentsDisplay,
              backgroundColor: theme.transparent,
              // borderColor: theme.secondary,
              // borderWidth: 1,
            }}
          >
            <ViewStyled
              backgroundColor={theme.transparent}
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <Animated.Text
                style={{ fontSize: adjustFontSize(16), color: theme.primary, fontFamily: 'BRFirma', textAlign: 'center', lineHeight: 25 }}
              >
                {animatingText}
              </Animated.Text>
            </ViewStyled>
          </Animated.View>

          <Animated.View
            style={{
              transform: [
                {
                  translateX: AnimatedTextButton.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 450],
                  }),
                },
              ],
              opacity: buttonOpacity,
              width: widthPercentageToDP(100),
              height: heightPercentageToDP(8),
              justifyContent: 'center',
              alignItems: 'center',
              display: animatedComponentsDisplay,
              backgroundColor: theme.transparent,
              // borderColor: theme.secondary,
              // borderWidth: 1,
            }}
          >
            <ViewStyled
              backgroundColor={theme.transparent}
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity onPress={() => StartTextAnimations()} disabled={false}>
                <ViewStyled
                  width={90}
                  height={7}
                  backgroundColor={
                    refreshing
                      ? theme.tertiaryGradient
                      : theme.dark
                  }
                  borderRadius={2}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: refreshing ? theme.tertiary : theme.primary,
                    borderWidth: 1,
                  }}
                >
                  <TextStyled
                    fontSize={20}
                    color={
                      refreshing
                        ? theme.tertiary
                        : theme.primary
                    }
                    fontFamily='ArtegraBold'
                  >
                    Empezar
                  </TextStyled>
                </ViewStyled>
              </TouchableOpacity>
            </ViewStyled>
          </Animated.View>

          <ViewStyled
            width={92}
            height={13}
            marginVertical={1.5}
            marginLeftAuto
            marginRightAuto
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              display: walletComponentsDisplay,
              // borderColor: theme.info,
              // borderWidth: 1,
            }}
            backgroundColor={theme.transparent}
          >
            <Animated.View
              style={{
                transform: [
                  {
                    translateX: AnimatedWalletButtonOne.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-450, 0],
                    }),
                  },
                ],
                // borderColor: theme.facebook,
                // borderWidth: 1,
                backgroundColor: theme.transparent,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <WalletHowSale />
            </Animated.View>

            <Animated.View
              style={{
                transform: [
                  {
                    translateX: AnimatedWalletButtonTwo.interpolate({
                      inputRange: [0, 1],
                      outputRange: [450, 0],
                    }),
                  },
                ],
                // borderColor: theme.danger,
                // borderWidth: 1,
                backgroundColor: theme.transparent,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <WalletSavingButton />
            </Animated.View>
          </ViewStyled>
        </Animated.ScrollView>
        <Animated.View
          style={{
            transform: [
              {
                translateY: AnimatedWalletTransactions.interpolate({
                  inputRange: [0, 1],
                  outputRange: [600, 0],
                }),
              },
            ],
            backgroundColor: theme.transparent,
            display: walletComponentsDisplay,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 5
            // borderColor: theme.danger,
            // borderWidth: 1,
          }}
        >
          <WalletSales reload={refreshing} handleRefresh={handleOnRefresh} />
        </Animated.View>
      </Animated.ScrollView>
    </>
  )
}
