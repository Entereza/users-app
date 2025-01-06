import { FontAwesome5 } from "@expo/vector-icons";
import ViewStyled from "../../utils/ui/ViewStyled";
import { theme_colors } from "../../utils/theme/theme_colors";
import TextStyled from "../../utils/ui/TextStyled";

export default function OrderStatus({ icon, title, subtitle }){

    return (
        <ViewStyled
            width={'60%'}
            backgroundColor={theme_colors.transparent}
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 5,
                marginBottom: 5
            }}
        >
            <FontAwesome5 name={icon} size={20} color={theme_colors.primary} />

            <ViewStyled
                width={'50%'}
                backgroundColor={theme_colors.transparent}
                style={{
                    alignItems: 'flex-start',
                    marginTop: 5,
                    marginBottom: 5
                }}
            >
                <TextStyled
                    fontFamily="SFPro-Regular"
                    fontSize={7}
                    color={theme_colors.grey}
                >
                    {title}
                </TextStyled>

                <TextStyled
                    fontFamily="SFPro-Medium"
                    fontSize={7.5}
                    color={theme_colors.black}
                    style={{
                        marginTop: 5
                    }}
                >
                    {subtitle}
                </TextStyled>
            </ViewStyled>
        </ViewStyled>
    );
};