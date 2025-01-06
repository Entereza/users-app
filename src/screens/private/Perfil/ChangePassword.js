import { useNavigation, useRoute } from "@react-navigation/native";
import ViewStyled from "../../../utils/ui/ViewStyled";
import { Image, TextInput, TouchableOpacity } from "react-native";
import TextStyled from "../../../utils/ui/TextStyled";
import { theme_colors } from "../../../utils/theme/theme_colors";
import { useState } from "react";
import BigBottomButton from "../../../components/Buttons/BigBottomButton";
import { private_name_routes } from "../../../utils/route/private_name_routes";
import { FontAwesome5 } from "@expo/vector-icons";

export default function ChangePassword (){
    const route = useRoute();
    const { password } = route.params;
    
    const [isSearchActive, setSearchActive] = useState(false);
    const [searchPassword, setSearchPassword] = useState(password);

    const handleSearchButtonPress = () => {
        setSearchActive(true);
    };

    const handleSearch = () => {
        setSearchActive(false);
    };

    const navigation = useNavigation();

    const goToProfileScreen = () => {
        navigation.navigate(private_name_routes.empresas.profileScreen, {
            user: "Anelisse Rocabado",
            ci: "12345678"
        });
    }

    return (
        <ViewStyled
            width={'100%'}
            height={'100%'}
            backgroundColor={theme_colors.white}
            style={{
                alignItems: 'center'
            }}
        >
            <ViewStyled
                width={'30%'}
                height={'17%'}
                backgroundColor={theme_colors.requiredGrey}
                style={{
                    marginTop: 20,
                    marginBottom: 30,
                    padding: 5,
                    borderRadius: 15,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <FontAwesome5 name={"lock"} size={60} color={theme_colors.secondary} />
            </ViewStyled>

            <ViewStyled
                width={'85%'}
                height={'53%'}
                backgroundColor={theme_colors.white}
                style={{
                    alignContent: 'center',
                }}
            >
                <TextStyled
                    fontSize={7}
                    color={theme_colors.black}
                    style={{
                        alignSelf: 'flex-start',
                        fontFamily: 'SFPro-Bold',
                        marginTop: 10
                    }}
                >
                    Contraseña actual
                </TextStyled>

                <TouchableOpacity
                    onPress={handleSearchButtonPress}
                    style={{
                        width: '100%',
                        height: 40,
                        alignSelf: 'center',
                        justifyContent: 'center',
                        borderRadius: 10,
                        borderWidth: 1,
                        backgroundColor: theme_colors.white,
                        borderColor: theme_colors.white,
                        padding: 8,
                        marginBottom: 10,
                        marginTop: 5,
                        elevation: 50,
                        shadowColor: theme_colors.black,
                        shadowOffset: {
                            width: 2,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                    }}
                >
                    <TextInput
                        value={searchPassword}
                        onChangeText={setSearchPassword}
                        placeholder={password}
                        placeholderTextColor={theme_colors.grey}
                        onSubmitEditing={handleSearch}
                    />
                </TouchableOpacity>

                <TextStyled
                    fontSize={7}
                    color={theme_colors.black}
                    style={{
                        alignSelf: 'flex-start',
                        fontFamily: 'SFPro-Bold',
                        marginTop: 10
                    }}
                >
                    Nueva contraseña
                </TextStyled>

                <TouchableOpacity
                    onPress={handleSearchButtonPress}
                    style={{
                        width: '100%',
                        height: 40,
                        alignSelf: 'center',
                        justifyContent: 'center',
                        borderRadius: 10,
                        borderWidth: 1,
                        backgroundColor: theme_colors.white,
                        borderColor: theme_colors.white,
                        padding: 8,
                        marginBottom: 10,
                        marginTop: 5,
                        elevation: 50,
                        shadowColor: theme_colors.black,
                        shadowOffset: {
                            width: 2,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                    }}
                >
                    <TextInput
                        value={searchPassword}
                        onChangeText={setSearchPassword}
                        placeholder={password}
                        placeholderTextColor={theme_colors.grey}
                        onSubmitEditing={handleSearch}
                    />
                </TouchableOpacity>

                <TextStyled
                    fontSize={7}
                    color={theme_colors.black}
                    style={{
                        alignSelf: 'flex-start',
                        fontFamily: 'SFPro-Bold',
                        marginTop: 10
                    }}
                >
                    Repite la nueva contraseña
                </TextStyled>

                <TouchableOpacity
                    onPress={handleSearchButtonPress}
                    style={{
                        width: '100%',
                        height: 40,
                        alignSelf: 'center',
                        justifyContent: 'center',
                        borderRadius: 10,
                        borderWidth: 1,
                        backgroundColor: theme_colors.white,
                        borderColor: theme_colors.white,
                        padding: 8,
                        marginBottom: 10,
                        marginTop: 5,
                        elevation: 50,
                        shadowColor: theme_colors.black,
                        shadowOffset: {
                            width: 2,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                    }}
                >
                    <TextInput
                        value={searchPassword}
                        onChangeText={searchPassword}
                        placeholder={password}
                        placeholderTextColor={theme_colors.grey}
                        onSubmitEditing={handleSearch}
                    />
                </TouchableOpacity>
            </ViewStyled>

            <BigBottomButton text={"Cambiar contraseña"} color={theme_colors.primary} textColor={theme_colors.white} onPress={goToProfileScreen} width={'85%'} />
        </ViewStyled>
    );
};