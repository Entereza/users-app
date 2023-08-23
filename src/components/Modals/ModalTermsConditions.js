import React from 'react'
import { Modal, Pressable, ScrollView } from 'react-native'
import ViewStyled from '../ui/ViewStyled'
import TextStyled from '../ui/TextStyled'
import { theme } from '../../utils/theme'
//import PDFReader from 'rn-pdf-reader-js'
import { Button, Center, NativeBaseProvider } from "native-base";
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import Pdf from 'react-native-pdf'

export default function TermsConditions({ color }) {
    const [modal, setModal] = React.useState(false);
    const handleOnModal = () => setModal(prev => !prev);

    const [modal2, setModal2] = React.useState(false);
    const handleOnModal2 = () => setModal2(prev => !prev);

    const CloseModals = () => {
        setModal(false)
        setModal2(false)
    }

    const source = 'https://enterezabol.com/static/media/terminosUso.532c859ba94ec49e0d54.pdf';
    const source2 = 'https://enterezabol.com/static/media/politicasPrivacidad.3066984fbc642e0b1991.pdf';

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

    return (
        <>
            <ViewStyled
                backgroundColor={theme.transparent}
                width={100}
                paddingHorizontal={10}
                height={3}
                style={{
                    justifyContent: 'center',
                    flexDirection: 'row'
                }}
            >
                <Pressable onPress={handleOnModal}>
                    <TextStyled
                        color={theme.secondary}
                        fontSize={14}
                        textAlign='center'
                        style={{
                            textDecorationLine: 'underline',
                        }}
                    >
                        {`Términos y Condiciones de Entereza`}
                    </TextStyled>
                </Pressable>
            </ViewStyled>

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

const styles = {
    pdf: {
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(85),
        justifyContent: 'center',
        alignItems: 'center',
    }
}
