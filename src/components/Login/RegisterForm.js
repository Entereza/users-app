import React, { useState } from 'react'
import { View } from 'react-native'
import { Input, Icon, Button } from '@rneui/themed';
import { styles } from './RegisterForm.styles';
import { useFormik } from "formik";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Toast from "react-native-toast-message";
import { initialValues, validationSchema } from "./RegisterForm.data";

export function RegisterForm() {
    const [showPassword, SetShowPassword] = useState(false);
    const navigation = useNavigation();
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                const auth = getAuth();
                await createUserWithEmailAndPassword(auth, formValue.email, formValue.password);
                navigation.navigate(screen.account.account);
            } catch (error) {
                console.log(error);
                Toast.show({
                    type: "error",
                    position: "bottom",
                    text1: "Error al registrarse"
                });
            }
        }
    }
    );

    const showHiddenPassword = () => {
        SetShowPassword(prevState => !prevState);
    }

    return (
        <View style={styles.content}>
            <Input placeholder="Email" containerStyle={styles.input}
                rightIcon={<Icon type='material-comunity' name="account-circle" iconStyle={styles.icon} />}
                onChangeText={text => formik.setFieldValue("email", text)}
                errorMessage={formik.errors.email}
            />
            <Input placeholder="Password" containerStyle={styles.input} secureTextEntry={showPassword ? false : true}
                rightIcon={<Icon type='material-comunity' name={showPassword ? "home" : "lock"} iconStyle={styles.icon}
                    onPress={showHiddenPassword} />}
                onChangeText={text => formik.setFieldValue("password", text)}
                errorMessage={formik.errors.password}
            />
            <Input placeholder="Repeat Password" containerStyle={styles.input} secureTextEntry={showPassword ? false : true}
                rightIcon={<Icon type='material-comunity' name={showPassword ? "home" : "lock"} iconStyle={styles.icon}
                    onPress={showHiddenPassword} />}
                onChangeText={text => formik.setFieldValue("repeatPassword", text)}
                errorMessage={formik.errors.repeatPassword}
            />
            <Button
                title="Register"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                loading={formik.isSubmitting}
                onPress={formik.handleSubmit}
            />
        </View>
    )
}