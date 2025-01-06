import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { theme_colors } from "../../utils/theme/theme_colors";
import ViewStyled from "../../utils/ui/ViewStyled";
import TextStyled from "../../utils/ui/TextStyled";
import { TouchableOpacity } from "react-native";

export default function ProfileOptions ({ title, icon, onPress}) {

    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                width: '100%',
                backgroundColor: theme_colors.transparent,
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}
        >
            <ViewStyled
                width={'11%'}
                height={'6%'}
                backgroundColor={theme_colors.requiredGrey}
                style={{
                    margin: 5,
                    padding: 5,
                    borderRadius: 5,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <FontAwesome5 name={icon} size={20} color={theme_colors.secondary} />
            </ViewStyled>
            
            <ViewStyled
                width={'60%'}
                backgroundColor={theme_colors.transparent}
                style={{
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <TextStyled
                    fontSize={7}
                    fontFamily="SFPro-Medium"
                    color={theme_colors.black}
                    style={{
                        alignSelf: 'flex-start'
                    }}
                >
                    {title}
                </TextStyled>
            </ViewStyled>

            <MaterialIcons name="arrow-forward-ios" size={20} color={theme_colors.grey} style={{ alignSelf: 'center' }} />

        </TouchableOpacity>
    );
};