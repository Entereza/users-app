import React from 'react'
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import TextStyled from '../../utils/ui/TextStyled';
import ViewStyled from '../../utils/ui/ViewStyled';
// import adjustFontSize from '../../utils/adjustText';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { theme_colors } from '../../utils/theme/theme_colors';
import BackButton from '../Buttons/BackButton';
import { TouchableOpacity } from 'react-native';

export default function HeaderStyledCode({
    title,
    back = true,
}) {
    const navigation = useNavigation();

    const handleBackPress = () => {
        navigation.goBack();
    };

    return (
        <>
            <SafeAreaView style={{ backgroundColor: theme_colors.transparent }} >
                <ViewStyled
                    backgroundColor={theme_colors.white}
                    paddingHorizontal={4}
                    height={7}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                        borderWidth: 1,
                        borderColor: theme_colors.requiredGrey
                    }}
                >
                    {
                        back && (
                            <TouchableOpacity
                                onPress={handleBackPress}
                                style={{
                                    width: 30,
                                    height: 30,
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    backgroundColor: theme_colors.white,
                                    borderColor: theme_colors.primary,
                                    padding: 5,
                                }}
                            >
                                <FontAwesome5
                                    name="arrow-left" 
                                    size={15} 
                                    color={theme_colors.primary} 
                                    style={{
                                        alignSelf: 'center',
                                    }}
                                />
                            </TouchableOpacity>
                        )
                    }

                    <TextStyled
                        textAlign={back ? 'left' : 'center'}
                        fontSize={9}
                        style={{
                            marginRight: back ? 'auto' : -16,
                            marginLeft: back ? 65 : 0,
                        }}
                        fontWeight='500'
                        color={theme_colors.black}
                    >
                        {
                            title
                        }
                    </TextStyled>
                </ViewStyled>

                <ViewStyled
                    height={0.1}
                    style={{
                        backgroundColor: theme_colors.requiredGrey
                    }}
                />
            </SafeAreaView>
        </>
    );
};