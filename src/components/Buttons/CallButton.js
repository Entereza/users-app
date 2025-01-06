import { Pressable } from "react-native";
import { theme_colors } from "../../utils/theme/theme_colors";
import ViewStyled from "../../utils/ui/ViewStyled";
import { FontAwesome6 } from "@expo/vector-icons";

export default function CallButton(){

    return (
        <Pressable
            // onPress={call}
            width={50}
            height={50}
            backgroundColor={theme_colors.primary}
            style={{
                borderRadius: 80,
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <FontAwesome6 name="phone" size={20} color="white" />
        </Pressable>
    );
};