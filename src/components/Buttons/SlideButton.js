import React, { useRef } from 'react';
import { PanResponder, Animated, ImageBackground } from 'react-native';
import ViewStyled from '../../utils/ui/ViewStyled';
import { theme_colors } from '../../utils/theme/theme_colors';
import TextStyled from '../../utils/ui/TextStyled';
import { SimpleLineIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function SlideButton ({ onPress }) {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dy: pan.y }], {useNativeDriver: false}),
    onPanResponderRelease: (e, gesture) => {
      if (gesture.dy < -50) {
        onPress();
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      } else {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      }
    },
  });

  return (
    <ViewStyled
        backgroundColor={theme_colors.transparent}
        style={{
            alignItems: 'center'
        }}
    >
        <Animated.View
            style={{
                transform: [{ translateY: pan.y }],
            }}
            {...panResponder.panHandlers}
        >
            <LinearGradient
              colors={[theme_colors.white, theme_colors.green]}
            >
                <ViewStyled 
                    width={'100%'}
                    backgroundColor={theme_colors.transparent}
                    style={{
                        padding: 10,
                        alignItems: 'center'
                    }}
                >
                    <SimpleLineIcons name="arrow-up" size={24} color={theme_colors.primary}/>

                    <TextStyled 
                        fontSize={8}
                        fontFamily='SFPro-Bold'
                        style={{
                            color: theme_colors.primary,
                            marginTop: 5
                        }}
                    >
                        Deslice arriba para finalizar el pedido
                    </TextStyled>
                </ViewStyled>
            </LinearGradient>
        </Animated.View>
    </ViewStyled>
  );
};