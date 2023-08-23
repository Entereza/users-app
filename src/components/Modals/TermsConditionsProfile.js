import React from 'react'
import { Modal, StyleSheet, ScrollView } from 'react-native'
import ViewStyled from '../ui/ViewStyled'
import TextStyled from '../ui/TextStyled'
import { Ionicons } from '@expo/vector-icons'
import { theme } from '../../utils/theme'
import adjustFontSize from '../../utils/adjustText'
//import PDFReader from 'rn-pdf-reader-js'
import { Button, Center, NativeBaseProvider } from "native-base";
import ProfileOptions from '../profile/ProfileOptions'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import Pdf from 'react-native-pdf'

export default function ProfileTermsConditions() {
    const [modal, setModal] = React.useState(false);
    const handleOnModal = () => setModal(prev => !prev);

    const [modal2, setModal2] = React.useState(false);
    const handleOnModal2 = () => setModal2(prev => !prev);

    const CloseModals = () => {
        setModal(false)
        setModal2(false)
    }

    const ButtonClose = () => {
        return (
            <NativeBaseProvider>
                <Center w="100%" backgroundColor={theme.transparent} h="10" flexDirection={'row'}>
                    <Button size="sm" marginRight={3} rounded={'lg'} variant="outline" borderColor={theme.danger} onPress={CloseModals}>
                        <TextStyled
                            color={theme.danger}
                            fontSize={14}
                        >
                            Cerrar
                        </TextStyled>
                    </Button>
                    <Button size="sm" rounded={'lg'} variant="outline" borderColor={theme.secondary} onPress={modal ? handleOnModal2 : handleOnModal}>
                        <TextStyled
                            color={theme.secondary}
                            fontSize={14}
                        >
                            {
                                modal2 ? `Anterior` : `Siguiente`
                            }
                        </TextStyled>
                    </Button>
                </Center>
            </NativeBaseProvider>
        )
    }

    const source = 'https://enterezabol.com/static/media/terminosUso.532c859ba94ec49e0d54.pdf';
    const source2 = 'https://enterezabol.com/static/media/politicasPrivacidad.3066984fbc642e0b1991.pdf';

    return (
        <>
            <ProfileOptions
                title={'Términos y Condiciones'}
                onPress={handleOnModal}
            >
                <Ionicons
                    name="ios-newspaper-outline"
                    size={adjustFontSize(26)}
                    color={"#AF8165"}
                    style={{
                        ...styles.optionIcon,
                        backgroundColor: '#AF816520'
                    }}
                />
            </ProfileOptions>

            <Modal
                visible={modal2}
                animationType="fade"
                transparent={true}
            >
                <ViewStyled
                    height={100}
                    width={100}
                    backgroundColor={theme.primary}
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                >
                    <ViewStyled
                        width={100}
                        height={90}
                        backgroundColor={theme.transparent}
                        style={{ justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Pdf
                            trustAllCerts={false}
                            source={{ uri: source2, cache: true }}
                            onLoadComplete={(numberOfPages, filePath) => {
                                console.log(`Number of pages: ${numberOfPages}`);
                            }}
                            onPageChanged={(page, numberOfPages) => {
                                console.log(`Current page: ${page}`);
                            }}
                            onError={(error) => {
                                console.log(error);
                            }}
                            onPressLink={(uri) => {
                                console.log(`Link pressed: ${uri}`);
                            }}
                            style={styles.pdf}

                        />
                    </ViewStyled>
                    <ButtonClose />
                </ViewStyled>
            </Modal>

            <Modal
                visible={modal}
                animationType="fade"
                transparent={true}
            >
                <ViewStyled
                    height={100}
                    width={100}
                    backgroundColor={theme.primary}
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                >
                    <ViewStyled
                        width={100}
                        height={90}
                        backgroundColor={theme.transparent}
                        style={{ justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Pdf
                            trustAllCerts={false}
                            source={{ uri: source, cache: true }}
                            onLoadComplete={(numberOfPages, filePath) => {
                                console.log(`Number of pages: ${numberOfPages}`);
                            }}
                            onPageChanged={(page, numberOfPages) => {
                                console.log(`Current page: ${page}`);
                            }}
                            onError={(error) => {
                                console.log(error);
                            }}
                            onPressLink={(uri) => {
                                console.log(`Link pressed: ${uri}`);
                            }}
                            style={styles.pdf}

                        />
                    </ViewStyled>
                    <ButtonClose />
                </ViewStyled>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    optionIcon: {
        padding: '2%',
        marginRight: '3%',
        borderRadius: 10,
    },
    pdf: {
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(85),
        justifyContent: 'center',
        alignItems: 'center',
    }
})