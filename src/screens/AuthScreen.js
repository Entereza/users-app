import React from 'react'

//Importar Buttons
// import SignUpGoogle from '../components/Google/SignUpGoogle'
// import SignUpFacebook from '../components/Facebook/SignUpFacebook';
// import EnterezaButton from '../components/Btn/ButtonEntereza';
// import SignUpApple from '../components/Apple/SignUpApple';

//Importar Responsive View
import ViewStyled from '../components/ui/ViewStyled';
import ImageStyled from '../components/ui/ImageStyled';
import TextStyled from '../components/ui/TextStyled';

//import styles
import { theme } from '../utils/theme'
import TermsConditions from '../components/Modals/ModalTermsConditions';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function AuthScreen({ navigation }) {
    //Importar Fonts
    // const [pdf, setPdf] = useState(false)

    // const downloadAssets = () => {
    //     setPdf(true)
    //     setTimeout(() => {
    //         setPdf(false)
    //     }, 1000);
    // };

    function EnterezaSubmit() {
        navigation.navigate("RegisterEnterezaScreen");
    }

    function AuthLogIn() {
        navigation.navigate("AuthScreenLogIn");
    }


    return (
        <></>
    );
}