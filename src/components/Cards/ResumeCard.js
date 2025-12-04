import React from 'react'
import ViewStyled from '../../utils/ui/ViewStyled'
import { theme_colors } from '../../utils/theme/theme_colors'
import TextStyled from '../../utils/ui/TextStyled'
import { theme_textStyles } from '../../utils/theme/theme_textStyles'
import useCartStore from '../../utils/tools/interface/cartStore'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { private_name_routes } from '../../utils/route/private_name_routes'

export default function ResumeCard({ tripPrice }) {
    const { cart, myCashback, serviceFee, deliveryTip } = useCartStore();
    const navigation = useNavigation()

    const totalPrice = cart.reduce((sum, item) => sum + (item.totalPrice * item.quantity), 0);
    const serviceFeePrice = totalPrice < 100 ? 1 : 2;

    const resumeList = [
        {
            "text": "Productos",
            "price": totalPrice,
        },
        {
            "text": "Envío",
            "price": tripPrice,
            "freeShipping": tripPrice <= 0,
        },
        // Solo mostrar propina si es mayor a 0
        ...(deliveryTip > 0 ? [{
            "text": "Propina",
            "price": deliveryTip,
            "colorText": theme_colors.primary,
        }] : []),
        // {
        //     "text": "Cupón",
        //     "price": 0,
        // },
        {
            "text": "Servicio",
            "price": serviceFeePrice,
        },
        {
            "text": "Mi Cashback",
            "price": myCashback,
            "selectCashback": true,
            "colorText": theme_colors.primary
        },
    ]

    const goToCashbackScreen = () => {
        navigation.navigate(private_name_routes.empresas.cashbackScreen);
    }

    const ResumeItem = ({ text = "text", colorText = theme_colors.black, price = 0, freeShipping = false, selectCashback = false }) => {
        const cashbackPrice = selectCashback && price

        return (
            <ViewStyled
                width={85}
                paddingVertical={.5}
                backgroundColor={theme_colors.transparent}
                style={{
                    height: 'auto',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <ViewStyled
                    backgroundColor={theme_colors.transparent}
                    style={{
                        width: '50%',
                        height: 'auto',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}
                >
                    <TextStyled
                        fontFamily='SFPro-SemiBold'
                        textAlign='left'
                        fontSize={theme_textStyles.smedium}
                        color={colorText}
                        numberOfLines={1}
                        ellipsizeMode='tail'
                        style={{
                            width: 'auto'
                        }}
                    >
                        {text}
                    </TextStyled>

                    {freeShipping &&
                        <ViewStyled
                            marginLeft={3}
                            paddingVertical={.2}
                            paddingHorizontal={3}
                            backgroundColor={theme_colors.green}
                            style={{
                                width: 'auto',
                                height: 'auto',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 5
                            }}
                        >
                            <TextStyled
                                fontFamily='SFPro-Regular'
                                textAlign='center'
                                fontSize={theme_textStyles.smaller + .5}
                                color={theme_colors.white}
                                numberOfLines={1}
                                ellipsizeMode='tail'
                            >
                                Gratis
                            </TextStyled>
                        </ViewStyled>
                    }
                </ViewStyled>

                <TouchableOpacity onPress={selectCashback ? goToCashbackScreen : null}
                    style={{
                        width: '50%', height: 'auto',
                        justifyContent: 'center', alignItems: 'flex-end'
                    }}
                >
                    <ViewStyled
                        backgroundColor={theme_colors.transparent}
                        paddingHorizontal={selectCashback && !price ? 3 : 0}
                        style={{
                            width: selectCashback && !price ? 'auto' : '100%',
                            height: 'auto',
                            borderWidth: selectCashback && !price ? 3 : 0,
                            borderColor: theme_colors.lightGrey,
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <TextStyled
                            fontFamily='SFPro-SemiBold'
                            textAlign={selectCashback && !price ? 'center' : 'right'}
                            fontSize={selectCashback && !price ? theme_textStyles.small + .5 : theme_textStyles.smedium}
                            color={colorText}
                            numberOfLines={1}
                            ellipsizeMode='tail'
                            style={{
                                width: '100%',
                                textDecorationLine: cashbackPrice ? 'underline' : 'none',
                            }}
                        >
                            {selectCashback && !price ? `Seleccionar` : `Bs. ${price}`}
                        </TextStyled>
                    </ViewStyled>
                </TouchableOpacity>
            </ViewStyled>
        );
    };

    return (
        <ViewStyled
            backgroundColor={theme_colors.white}
            width={95}
            marginVertical={1}
            paddingVertical={1}
            style={{
                height: 'auto',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,

                shadowColor: theme_colors.black,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
                elevation: 3,
            }}
        >
            <ViewStyled
                paddingVertical={1.5}
                marginBottom={1}
                backgroundColor={theme_colors.transparent}
                style={{
                    width: '90%',
                    height: 'auto',
                    borderBottomWidth: 0.5,
                    borderColor: theme_colors.greyLine,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <TextStyled
                    fontFamily='SFPro-Bold'
                    textAlign='left'
                    fontSize={theme_textStyles.medium}
                    color={theme_colors.dark}
                    numberOfLines={1}
                    ellipsizeMode='tail'
                    style={{
                        width: '100%'
                    }}
                >
                    Resumen
                </TextStyled>
            </ViewStyled>

            {resumeList.map((item, index) => (
                <ResumeItem key={index} text={item.text} price={item.price} colorText={item.colorText} freeShipping={item.freeShipping} selectCashback={item.selectCashback} />
            ))}

            <ViewStyled
                paddingVertical={1.5}
                marginTop={1}
                backgroundColor={theme_colors.transparent}
                style={{
                    width: '90%',
                    height: 'auto',
                    borderTopWidth: 0.5,
                    borderColor: theme_colors.greyLine,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <TextStyled
                    fontFamily='SFPro-Bold'
                    textAlign='left'
                    fontSize={theme_textStyles.medium}
                    color={theme_colors.dark}
                    numberOfLines={1}
                    ellipsizeMode='tail'
                    style={{
                        width: '50%'
                    }}
                >
                    Total
                </TextStyled>

                <TextStyled
                    fontFamily='SFPro-Bold'
                    textAlign='right'
                    fontSize={theme_textStyles.medium}
                    color={theme_colors.dark}
                    numberOfLines={1}
                    ellipsizeMode='tail'
                    style={{
                        width: '50%'
                    }}
                >
                    BOB. {totalPrice - myCashback + serviceFeePrice + tripPrice + deliveryTip}
                </TextStyled>
            </ViewStyled>
        </ViewStyled>
    )
}