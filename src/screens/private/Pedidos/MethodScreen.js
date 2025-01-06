import React, { useState } from 'react';
import { theme_colors } from '../../../utils/theme/theme_colors';
import ViewStyled from '../../../utils/ui/ViewStyled';
import TextStyled from '../../../utils/ui/TextStyled';
import SelectionCard from '../../../components/Cards/SelectionCard';
import { useNavigation, useRoute } from '@react-navigation/native';
import { private_name_routes } from '../../../utils/route/private_name_routes';
import BigBottomButton from '../../../components/Buttons/BigBottomButton';
import CreditCard from '../../../components/Buttons/CreditCard';
import NewCardAndAddress from '../../../components/Buttons/NewCardAndAddress';
import { KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView, ScrollView, TextInput } from 'react-native-gesture-handler';

export default function MethodScreen() {

    const route = useRoute();
    const { options } = route.params;

    const [selectedOption, setSelectedOption] = useState(null);

    const handleSelectOption = (option) => {
        setSelectedOption(option);
    };

    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate(private_name_routes.empresas.confirmOrder, {
            selection: selectedOption
        });
    }

    const [createNewPressed, setCreateNewPressed] = useState(false);

    const handleCreatePress = () => {
        setCreateNewPressed(!createNewPressed);
    }

    const [isSearchActive, setSearchActive] = useState(false);
    const [newCard, setNewCard] = useState('');
    const [newTitular, setNewTitular] = useState('');
    const [newDate, setNewDate] = useState('');
    const [newCvv, setNewCvv] = useState('');

    const handleSearchButtonPress = () => {
        setSearchActive(true);
    };

    const handleSearch = () => {
        setSearchActive(false);
    };

    return (
        <ViewStyled
            backgroundColor={theme_colors.white}
            style={{
                alignItems: 'center'
            }}
        >
            <ViewStyled
                width={'100%'}
                height={'77%'}
                backgroundColor={theme_colors.transparent}
                style={{
                    alignItems: 'center',
                }}
            >
                <TextStyled
                    fontSize={10}
                    color={theme_colors.primary}
                    style={{
                        alignSelf: 'flex-start',
                        margin: 10,
                        marginLeft: 20,
                        fontFamily: 'SFPro-Bold',
                    }}
                >
                    Selecciona
                </TextStyled>

                <ViewStyled
                    width={'90%'}
                    height={'0.2%'}
                    backgroundColor={theme_colors.greyLine}
                    style={{
                        alignSelf: 'center',
                        marginBottom: 10,
                        marginTop: 5
                    }}
                />

                {options.map((option) => (
                    <React.Fragment key={option.id}>
                        <SelectionCard
                            id={option.id}
                            name={option.name}
                            icon={option.icon}
                            onPress={() => handleSelectOption(option.id)}
                            selection={selectedOption}
                        />
                         
                         {/* QR */}
                        {option.id === 2 && selectedOption === 2 && (
                            <ViewStyled
                                width={'90%'}
                                backgroundColor={theme_colors.transparent}
                                style={{
                                    marginBottom: 10
                                }}
                            >
                                <TextStyled 
                                    fontSize={4.5} 
                                    fontFamily='SFPro-SemiBold'
                                    color={theme_colors.grey}
                                > 
                                    Se indicará a la moto que pagarás con QR y lo tendrá listo al momento de entregarte el pedido.
                                </TextStyled>
                            </ViewStyled>
                        )}

                        {/* SELECCION DE TARJETA */}
                        {option.id === 3 && selectedOption === 3 && (
                            !createNewPressed ? (
                                <ViewStyled
                                    width={'90%'}
                                    backgroundColor={theme_colors.transparent}
                                    style={{
                                        alignContent: 'center',
                                        justiFyContent: 'center'
                                    }}
                                >
                                    <ViewStyled
                                        width={'88%'}
                                        backgroundColor={theme_colors.transparent}
                                        style={{
                                            alignItems: 'flex-end',
                                            marginBottom: 10
                                        }}
                                    >
                                        <NewCardAndAddress title={"Tarjeta"} onPress={handleCreatePress}/>
                                    </ViewStyled>

                                    <CreditCard bank={"Banco Unión"} number={"**** 4321"} name={"Anelisse Rocabado"} expiry={"12/24"} />
                                </ViewStyled>
                            ) : (
                                <GestureHandlerRootView>
                                    <KeyboardAvoidingView
                                        behavior="position"
                                        style={{ flex: 1 }}
                                    >
                                        <ScrollView
                                            height={'45%'}
                                            contentContainerStyle={{
                                                flexGrow: 1,
                                                backgroundColor: theme_colors.transparent,
                                                justifyContent: 'flex-start',
                                                alignItems: 'center',
                                            }}
                                            showsVerticalScrollIndicator={false}
                                            scrollToOverflowEnabled={false}
                                        >
                                            <ViewStyled
                                                backgroundColor={theme_colors.transparent}
                                                style={{
                                                    alignItems: 'flex-end',
                                                    marginBottom: 10
                                                }}
                                            >
                                                <NewCardAndAddress title={"Tarjeta"} onPress={handleCreatePress}/>

                                                {/* PASAR DATOS DE LA TARJETA */}
                                                <ViewStyled
                                                    width={'88%'}
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
                                                            marginTop: 10,
                                                            marginLeft: 2
                                                        }}
                                                    >
                                                        Número de tarjeta
                                                    </TextStyled>

                                                    <TouchableOpacity
                                                        onPress={handleSearchButtonPress}
                                                        style={{
                                                            width: '99%',
                                                            height: 40,
                                                            alignSelf: 'center',
                                                            justifyContent: 'center',
                                                            borderRadius: 10,
                                                            borderWidth: 1,
                                                            backgroundColor: theme_colors.white,
                                                            borderColor: theme_colors.white,
                                                            padding: 8,
                                                            marginBottom: 10,
                                                            marginTop: 10,
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
                                                            value={newCard}
                                                            onChangeText={setNewCard}
                                                            placeholder={"Ej. 4757 1236 2546 1258"}
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
                                                            marginTop: 10,
                                                            marginLeft: 2
                                                        }}
                                                    >
                                                        Nombre del Titular
                                                    </TextStyled>

                                                    <TouchableOpacity
                                                        onPress={handleSearchButtonPress}
                                                        style={{
                                                            width: '99%',
                                                            height: 40,
                                                            alignSelf: 'center',
                                                            justifyContent: 'center',
                                                            borderRadius: 10,
                                                            borderWidth: 1,
                                                            backgroundColor: theme_colors.white,
                                                            borderColor: theme_colors.white,
                                                            padding: 8,
                                                            marginBottom: 10,
                                                            marginTop: 10,
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
                                                            value={newTitular}
                                                            onChangeText={setNewTitular}
                                                            placeholder={"Ej. Luis Frías"}
                                                            placeholderTextColor={theme_colors.grey}
                                                            onSubmitEditing={handleSearch}
                                                        />
                                                    </TouchableOpacity>

                                                    <ViewStyled
                                                        backgroundColor={theme_colors.transparent}
                                                        style={{
                                                            flexDirection: 'row',
                                                            justifyContent: 'space-between'
                                                        }}
                                                    >
                                                        <ViewStyled
                                                            backgroundColor={theme_colors.transparent}
                                                            style={{
                                                                width: '48%',
                                                                alignItems: 'flex-start'
                                                            }}
                                                        >   
                                                            <TextStyled
                                                                fontSize={7}
                                                                color={theme_colors.black}
                                                                style={{
                                                                    alignSelf: 'flex-start',
                                                                    fontFamily: 'SFPro-Bold',
                                                                    marginTop: 10,
                                                                    marginLeft: 2
                                                                }}
                                                            >
                                                                Valida hasta
                                                            </TextStyled>

                                                            <TouchableOpacity
                                                                onPress={handleSearchButtonPress}
                                                                style={{
                                                                    width: '99%',
                                                                    height: 40,
                                                                    alignSelf: 'flex-start',
                                                                    justifyContent: 'center',
                                                                    borderRadius: 10,
                                                                    borderWidth: 1,
                                                                    backgroundColor: theme_colors.white,
                                                                    borderColor: theme_colors.white,
                                                                    padding: 8,
                                                                    marginBottom: 10,
                                                                    marginTop: 10,
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
                                                                    value={newTitular}
                                                                    onChangeText={setNewTitular}
                                                                    placeholder={"dd/mm/aa"}
                                                                    placeholderTextColor={theme_colors.grey}
                                                                    onSubmitEditing={handleSearch}
                                                                />
                                                            </TouchableOpacity>
                                                        </ViewStyled>

                                                        <ViewStyled
                                                            backgroundColor={theme_colors.transparent}
                                                            style={{
                                                                width: '48%',
                                                                alignContent: 'flex-start'
                                                            }}
                                                        >  
                                                            <TextStyled
                                                                fontSize={7}
                                                                color={theme_colors.black}
                                                                style={{
                                                                    alignSelf: 'flex-start',
                                                                    fontFamily: 'SFPro-Bold',
                                                                    marginTop: 10,
                                                                    marginLeft: 2
                                                                }}
                                                            >
                                                                CVC
                                                            </TextStyled>

                                                            <TouchableOpacity
                                                                onPress={handleSearchButtonPress}
                                                                style={{
                                                                    width: '99%',
                                                                    height: 40,
                                                                    alignSelf: 'flex-start',
                                                                    justifyContent: 'center',
                                                                    borderRadius: 10,
                                                                    borderWidth: 1,
                                                                    backgroundColor: theme_colors.white,
                                                                    borderColor: theme_colors.white,
                                                                    padding: 8,
                                                                    marginBottom: 10,
                                                                    marginTop: 10,
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
                                                                    value={newTitular}
                                                                    onChangeText={setNewTitular}
                                                                    placeholder={"***"}
                                                                    placeholderTextColor={theme_colors.grey}
                                                                    onSubmitEditing={handleSearch}
                                                                />
                                                            </TouchableOpacity>
                                                        </ViewStyled>
                                                    </ViewStyled>
                                                </ViewStyled>
                                            </ViewStyled>
                                        </ScrollView>
                                    </KeyboardAvoidingView>
                                </GestureHandlerRootView>
                            )
                        )}
                    </React.Fragment>
                ))}
            </ViewStyled>

            <ViewStyled
                width={'100%'}
                height={'20%'}
                backgroundColor={theme_colors.transparent}
                style={{
                    alignItems: 'center',
                }}
            >
                <BigBottomButton text={"Elegir método de pago"} color={theme_colors.primary} textColor= {theme_colors.white} width={'90%'} marginTop={15} onPress={handlePress}/>
            </ViewStyled>
        </ViewStyled>
    );
};