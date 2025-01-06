import React from 'react';
import { Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { colors_confeti, theme_colors } from '../../utils/theme/theme_colors';

// Constantes
const OBJECT_DIMENSIONS = { width: 5, height: 5 }; // Tamaño mínimo de las figuras
const MAX_OBJECT_DIMENSIONS = 20; // Tamaño máximo de las figuras
const SCREEN_DIMENSIONS = Dimensions.get('window');
const WIGGLE_ROOM = MAX_OBJECT_DIMENSIONS * 3;
const COLORS = colors_confeti; // Colores para las figuras
const COUNT_FIGURE = 120; // Número para la generación de figuras
const DURATION_FALLING = 2000; // Duración de la caída de las figuras

// Función para generar formas geométricas aleatorias
const getRandomShape = () => {
    const shapes = ['square', 'circle', 'diamond', 'triangle', 'pentagon'];
    const randomIndex = Math.floor(Math.random() * shapes.length);
    return shapes[randomIndex];
};

// Función para generar dimensiones aleatorias
const getRandomDimensions = () => {
    const size = Math.floor(Math.random() * (MAX_OBJECT_DIMENSIONS - OBJECT_DIMENSIONS.width + 1)) + OBJECT_DIMENSIONS.width;
    return { width: size, height: size };
};

// Función para generar un color aleatorio
const getRandomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

const SpinningShape = ({ shape, color, style }) => {
    let shapeStyle = {};

    switch (shape) {
        case 'circle':
            shapeStyle = { borderRadius: style.width / 2 };
            break;
        case 'diamond':
            shapeStyle = { transform: [{ rotate: '45deg' }] };
            break;
        case 'triangle':
            shapeStyle = {
                width: 0,
                height: 0,
                backgroundColor: 'transparent',
                borderStyle: 'solid',
                borderLeftWidth: style.width / 2,
                borderRightWidth: style.width / 2,
                borderBottomWidth: style.height,
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: color,
            };
            break;
        case 'pentagon':
            const pentagonHeight = style.height * (Math.sqrt(3) / 2);
            shapeStyle = {
                width: 0,
                height: 0,
                backgroundColor: 'transparent',
                borderStyle: 'solid',
                borderLeftWidth: style.width / 2,
                borderRightWidth: style.width / 2,
                borderBottomWidth: pentagonHeight,
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: color,
                transform: [{ rotate: '54deg' }],
            };
            break;
        default:
            break;
    }

    return (
        <Animatable.View
            animation={{
                from: { rotate: '0deg' },
                to: { rotate: `${Math.random() <= 0.5 ? '360deg' : '-360deg'}` },
            }}
            duration={Math.random() * 1000 + 600}
            easing="linear"
            iterationCount="infinite"
            useNativeDriver
            style={[
                {
                    backgroundColor: shape === 'triangle' || shape === 'pentagon' ? 'transparent' : color,
                    width: shape === 'triangle' || shape === 'pentagon' ? 0 : style.width,
                    height: shape === 'triangle' || shape === 'pentagon' ? 0 : style.height,
                    elevation: 11,
                    shadowColor: theme_colors.dark,
                    shadowOffset: { width: 5, height: 5 },
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                },
                shapeStyle,
                style,
            ]}
        />
    );
};

const Swinging = ({
    amplitude,
    rotation = 7,
    delay,
    duration = 700,
    children,
}) => (
    <Animatable.View
        animation={{
            0: {
                translateX: -amplitude,
                translateY: -amplitude * 0.8,
                rotate: `${rotation}deg`,
            },
            0.5: {
                translateX: 0,
                translateY: 0,
                rotate: '0deg',
            },
            1: {
                translateX: amplitude,
                translateY: -amplitude * 0.8,
                rotate: `${-rotation}deg`,
            },
        }}
        delay={delay}
        duration={duration}
        direction="alternate"
        easing="ease-in-out"
        iterationCount="infinite"
        useNativeDriver>
        {children}
    </Animatable.View>
);

const Falling = ({ animationsRef, duration, delay, style, children, setStartStopAnimation }) => {
    // Probabilidad de dirección
    const directionProbability = Math.random();
    let translateX;

    if (directionProbability < 0.4) {
        translateX = -WIGGLE_ROOM; // 40% a la izquierda
    } else if (directionProbability < 0.8) {
        translateX = WIGGLE_ROOM; // 40% a la derecha
    } else {
        translateX = 0; // 20% normal
    }

    return (
        <Animatable.View
            ref={animationsRef}
            animation={{
                from: { translateY: -OBJECT_DIMENSIONS.height - WIGGLE_ROOM, translateX },
                to: { translateY: SCREEN_DIMENSIONS.height + WIGGLE_ROOM, translateX },
            }}
            duration={duration}
            delay={delay}
            easing={t => Math.pow(t, 1.7)}
            iterationCount={1}
            onAnimationEnd={() => setStartStopAnimation(false)}
            useNativeDriver
            style={style}
        >
            {children}
        </Animatable.View>
    );
};

const randomize = max => Math.random() * max;

const range = count => {
    const array = [];
    for (let i = 0; i < count; i++) {
        array.push(i);
    }
    return array;
};

const ConfetiRain = ({ count = COUNT_FIGURE, duration = DURATION_FALLING, startStopAnimation, setStartStopAnimation }) => {
    const [animationStarted, setAnimationStarted] = React.useState(false);
    const animationsRef = React.useRef([]);

    React.useEffect(() => {
        if (startStopAnimation && !animationStarted) {
            setAnimationStarted(true);
        } else if (!startStopAnimation && animationStarted) {
            animationsRef.current.forEach(animation => animation.stopAnimation());
            animationsRef.current = [];
            setAnimationStarted(false);
        }

        return () => {
            animationsRef.current.forEach(animation => animation.stopAnimation());
            animationsRef.current = [];
        };
    }, [startStopAnimation, animationStarted]);

    return animationStarted ? (
        range(count).map(i => (
            <Falling
                key={i}
                setStartStopAnimation={setStartStopAnimation}
                duration={duration}
                delay={Math.random() * duration / 1.2}
                style={{
                    position: 'absolute',
                    paddingHorizontal: WIGGLE_ROOM,
                    left: randomize(SCREEN_DIMENSIONS.width - OBJECT_DIMENSIONS.width) - WIGGLE_ROOM,
                    zIndex: 5,
                }}
            >
                <Swinging
                    amplitude={OBJECT_DIMENSIONS.width / 2}
                    rotation={7}
                    delay={Math.random() * duration}
                >
                    <SpinningShape
                        shape={getRandomShape()}
                        color={getRandomColor()}
                        style={getRandomDimensions()}
                    />
                </Swinging>
            </Falling>
        ))
    ) : null;
};

export default ConfetiRain;
