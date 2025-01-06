import { View, Text, TouchableOpacity } from "react-native";
import { theme_colors } from "../../utils/theme/theme_colors";
import BigBottomButton from "../Buttons/BigBottomButton";
import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { private_name_routes } from "../../utils/route/private_name_routes";

export default function KeyboardModal () {

    const route = useRoute();
    const { ruta } = route.params;

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

    const goToNextScreen = () => {
        if (ruta === "transferir") {
            navigation.navigate(private_name_routes.billetera.transferScreen, {
                cashback: displayValue
            });
        } else if (ruta === "recargar") {
            navigation.navigate(private_name_routes.billetera.recargarScreen, {
                recarga: displayValue
            });
        } else {

        };
    };

    return (
        <View
            style={{
                width: '100%',
                height: '70%',
                bottom: 0,
                padding: 20,
                position: 'absolute',
                alignItems: 'center',
                backgroundColor: theme_colors.white,
                elevation: 50,
                shadowColor: theme_colors.black,
                shadowOffset: {
                    width: 1,
                    height: 1,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                borderTopLeftRadius: 30, 
                borderTopRightRadius: 30
            }}
        >
            <View 
                backgroundColor={theme_colors.transparent}
                style={{
                    flexDirection: 'row', 
                    justifyContent: 'space-between',
                    marginTop: '8%'
                }}
            >
                <Text style={{fontSize: 20, marginRight: 10, fontFamily: 'SFPro-SemiBold', color: theme_colors.primary }}>Bs.</Text>
                <Text style={{fontSize: 90, color: theme_colors.primary}}>{displayValue === '' ? "0" : displayValue }</Text>
            </View>

            <View 
                width={'70%'}
                backgroundColor={theme_colors.transparent}
                style={{
                    flexDirection: 'row', 
                    justifyContent: 'space-between',
                    marginTop: '2%'
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
                        <Text color={theme_colors.grey} style={{ fontSize: 20, fontFamily: 'SFPro-SemiBold' }}>{number}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            
            <View 
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
                        <Text color={theme_colors.grey} style={{ fontSize: 20, fontFamily: 'SFPro-SemiBold' }}>{number}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View 
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
                        <Text color={theme_colors.grey} style={{ fontSize: 20, fontFamily: 'SFPro-SemiBold' }}>{number}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View 
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
                        <Text color={theme_colors.grey} style={{ fontSize: 20, fontFamily: 'SFPro-SemiBold' }}>{number}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <BigBottomButton text={"Agregar Monto"} color={theme_colors.primary} textColor={theme_colors.white} width={'90%'} marginTop={15} onPress={goToNextScreen}/>
        </View>
    );
};