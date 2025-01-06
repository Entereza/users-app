import React, { useRef } from 'react'
import { theme_colors } from '../../utils/theme/theme_colors'
import CircularProgress from 'react-native-circular-progress-indicator'
import TextStyled from '../../utils/ui/TextStyled'
import ViewStyled from '../../utils/ui/ViewStyled'

export default function CircularCodeComponent({
    duration = 120,
    inactiveColor = theme_colors.greyLine,
    activeColor = theme_colors.green,
    activeSecondaryColor = theme_colors.primary,
    titleColor = theme_colors.white,
    titleFontSize = 40,
    textColor = theme_colors.white
}) {
    const progressRef = useRef(null);

    return (
        <ViewStyled
            width={90}
            height={35}
            backgroundColor={theme_colors.transparent}
            style={{
                alignItems: 'center',
                justificante: 'center',
            }}
        >
            <CircularProgress
                ref={progressRef}
                startInPausedState={false}
                initialValue={120}
                value={0}
                maxValue={120}
                radius={100}
                inActiveStrokeOpacity={0.1}
                activeStrokeWidth={20}
                inActiveStrokeWidth={20}
                progressValueStyle={{ display: 'none' }}
                inActiveStrokeColor={inactiveColor}
                activeStrokeColor={activeColor}
                activeStrokeSecondaryColor={activeSecondaryColor}
                duration={(duration * 1000)}
                title={'8189'}
                titleColor={titleColor}
                titleFontSize={titleFontSize}
                titleStyle={{
                    fontFamily: 'SFPro-SemiBold',
                    marginTop: 0
                }}
            />

            <TextStyled
                textAlign='center'
                fontSize={8.5}
                fontWeight='700'
                numberOfLines={1}
                color={theme_colors.grey}
                style={{
                    width: "90%",
                    marginTop: 20,
                }}
            >
                {
                    'Duración del código: '
                }
                <TextStyled
                    textAlign='center'
                    fontSize={9}
                    numberOfLines={1}
                    fontFamily='SFPro-Bold'
                    color={textColor}
                    style={{
                        width: "90%",
                    }}
                >
                    {
                        `${duration / 60} min`
                    }
                </TextStyled>
            </TextStyled>
        </ViewStyled>
    )
}