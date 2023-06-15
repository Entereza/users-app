import React, { useState } from 'react'

//Importacion de Etiquetas de ReactNative
// import { useFonts } from 'expo-font'

//Importar Buttons
// import EnterezaButton from '../components/Btn/ButtonEntereza';

//Importar documentos


//Importar Responsive View
import ViewStyled from '../components/ui/ViewStyled';
import ImageStyled from '../components/ui/ImageStyled';
import TextStyled from '../components/ui/TextStyled';

//Import LogIn fb and Google
import SignInGoogle from '../components/Google/SignInGoogle';
import SignInFacebook from '../components/Facebook/SignInFacebook'

//import styles
import { theme } from '../utils/theme'
// import SignInApple from '../components/Apple/SignInApple';
import TermsConditions from '../components/Modals/ModalTermsConditions';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AuthScreen({ navigation }) {
    //Importar Fonts
    const [pdf, setPdf] = useState(false)

    const downloadAssets = () => {
        setPdf(true)
        console.log("Starts Downland Pdf")
        setTimeout(() => {
            setPdf(false)
        }, 1000);
    };

    function EnterezaSubmit() {
        navigation.navigate("AuthScreen");
    }

    function EnterezaLogIn() {
        navigation.navigate("LoginScreen");
    }


    return (
        <></>
    );
}