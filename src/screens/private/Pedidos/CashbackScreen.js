import { TouchableOpacity } from "react-native";
import { theme_colors } from "../../../utils/theme/theme_colors";
import TextStyled from "../../../utils/ui/TextStyled";
import ViewStyled from "../../../utils/ui/ViewStyled";
import { useState } from "react";
import BigBottomButton from "../../../components/Buttons/BigBottomButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import { private_name_routes } from "../../../utils/route/private_name_routes";

export default function CashbackScreen(){

    const route = useRoute();
    const { cashback } = route.params;

    const [displayValue, setDisplayValue] = useState('');

    const handlePress = (value) => {
        if (value === '<') {
            setDisplayValue(displayValue.slice(0, -1));
        } else if (value === '.'){
            setDisplayValue(displayValue + ".");
        } else if (value === 'Bs. 5'){
            setDisplayValue("5");
        } else if (value === 'Bs. 10'){
            setDisplayValue("10");
        } else if (value === 'All in'){
            setDisplayValue(cashback);
        } else {
            setDisplayValue(displayValue + value);
        }
    };

    const navigation = useNavigation();

    const goToConfirmationScreen = () => {
        navigation.navigate(private_name_routes.empresas.confirmOrder, {
            selection: displayValue
        });
    }

    return (
        <ViewStyled
            width={'100%'}
            height={'92%'}
            backgroundColor={theme_colors.white}
            style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <ViewStyled 
                backgroundColor={theme_colors.transparent}
                style={{
                    flexDirection: 'row', 
                    justifyContent: 'space-between',
                }}
            >
                <TextStyled color={theme_colors.primary} style={{fontSize: 20, marginRight: 10, fontFamily: 'SFPro-SemiBold' }}>Bs.</TextStyled>
                <TextStyled color={theme_colors.primary} style={{fontSize: 90}}>{displayValue === '' ? "0" : displayValue }</TextStyled>
            </ViewStyled>

            <TextStyled color={theme_colors.grey} style={{fontSize: 12, marginTop: 60}}>Tienes disponible Bs. {cashback} </TextStyled>
            
            <ViewStyled 
                width={'70%'}
                backgroundColor={theme_colors.transparent}
                style={{
                    flexDirection: 'row', 
                    justifyContent: 'space-between',
                    marginTop: 20
                }}
            >
                {["Bs. 5", "Bs. 10", "All in"].map((number) => (
                    <TouchableOpacity
                        key={number}
                        style={{
                            backgroundColor: theme_colors.requiredGrey,
                            padding: 12,
                            margin: 5,
                            borderRadius: 10,
                        }}
                        onPress={() => handlePress(number)}
                    >
                        <TextStyled color={theme_colors.black} style={{ fontSize: 14, fontFamily: 'SFPro-Medium' }}>{number}</TextStyled>
                    </TouchableOpacity>
                ))}
            </ViewStyled>

            <ViewStyled 
                width={'70%'}
                backgroundColor={theme_colors.transparent}
                style={{
                    flexDirection: 'row', 
                    justifyContent: 'space-between',
                }}
            >
                {[1, 2, 3].map((number) => (
                    <TouchableOpacity
                        key={number}
                        style={{
                            padding: 12,
                            margin: 5,
                            borderRadius: 10,
                        }}
                        onPress={() => handlePress(number)}
                    >
                        <TextStyled color={theme_colors.grey} style={{ fontSize: 20, fontFamily: 'SFPro-SemiBold' }}>{number}</TextStyled>
                    </TouchableOpacity>
                ))}
            </ViewStyled>
            
            <ViewStyled 
                width={'70%'}
                backgroundColor={theme_colors.transparent}
                style={{
                    flexDirection: 'row', 
                    justifyContent: 'space-between'
                }}
            >
                {[4, 5, 6].map((number) => (
                    <TouchableOpacity
                        key={number}
                        style={{
                            padding: 12,
                            margin: 5,
                            borderRadius: 10,
                        }}
                        onPress={() => handlePress(number)}
                    >
                        <TextStyled color={theme_colors.grey} style={{ fontSize: 20, fontFamily: 'SFPro-SemiBold' }}>{number}</TextStyled>
                    </TouchableOpacity>
                ))}
            </ViewStyled>

            <ViewStyled 
                width={'70%'}
                backgroundColor={theme_colors.transparent}
                style={{
                    flexDirection: 'row', 
                    justifyContent: 'space-between'
                }}
            >
                {[7, 8, 9].map((number) => (
                    <TouchableOpacity
                        key={number}
                        style={{
                            padding: 12,
                            margin: 5,
                            borderRadius: 10,
                        }}
                        onPress={() => handlePress(number)}
                    >
                        <TextStyled color={theme_colors.grey} style={{ fontSize: 20, fontFamily: 'SFPro-SemiBold' }}>{number}</TextStyled>
                    </TouchableOpacity>
                ))}
            </ViewStyled>

            <ViewStyled 
                width={'70%'}
                backgroundColor={theme_colors.transparent}
                style={{
                    flexDirection: 'row', 
                    justifyContent: 'space-between'
                }}
            >
                {[".", 0, "<"].map((number) => (
                    <TouchableOpacity
                        key={number}
                        style={{
                            padding: 12,
                            margin: 5,
                            borderRadius: 10,
                        }}
                        onPress={() => handlePress(number)}
                    >
                        <TextStyled color={theme_colors.grey} style={{ fontSize: 20, fontFamily: 'SFPro-SemiBold' }}>{number}</TextStyled>
                    </TouchableOpacity>
                ))}
            </ViewStyled>

            <BigBottomButton text={"Agregar Cashback"} color={theme_colors.primary} textColor={theme_colors.white} width={'90%'} onPress={goToConfirmationScreen}  marginTop={15}/>
            
        </ViewStyled>
    );
};