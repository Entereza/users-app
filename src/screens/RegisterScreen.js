import React, { useState } from "react";
import { ScrollView, TextInput } from "react-native";

import { Formik } from "formik";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import TextInputStyled from "../components/ui/TextInputStyled";
import TextStyled from "../components/ui/TextStyled";
import ViewStyled from "../components/ui/ViewStyled";
import { theme } from "../utils/theme";
// import EnterezaButton from "../components/Btn/ButtonEntereza";
import ImageStyled from "../components/ui/ImageStyled";
import { fetchWithoutToken } from "../utils/fetchWithoutToken";
import AlertStyled from "../components/ui/AlertStyled";
import { Modal, ActivityIndicator } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { codeErrors } from "../utils/codeErrors";

import { _authLogin } from '../redux/actions/authActions'
import { useDispatch } from 'react-redux'
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterEnterezaScreen({ navigation }) {
  const dispatch = useDispatch()

  const [text, setText] = useState('')
  const [Loading, setLoading] = useState(false)

  const [dia, setDia] = useState('')
  const [mes, setMes] = useState('')
  const [año, setAño] = useState('')

  const [showAlert, setShowAlert] = useState(false)
  const [alertText, setAlertText] = useState({
    title: '',
    message: '',
    type: 'success',
    back: false
  })

  const handleCloseAlert = () => setShowAlert(false)
  const handleOnCloseAlertAndGoBack = () => {
    setShowAlert(false)
    navigation.goBack()
  }

  const handleLogin = () => {
    navigation.navigate("AuthScreenLogIn");

  };


  const handleOnSubmit = async (values, { setSubmitting, resetForm }) => {
    if (values.user_password.length >= 6 || values.password_confirm.length >= 6) {
      if (values.user_password === values.password_confirm) {
        if (values.apellidos === "" || values.correo === "" || values.password_confirm === "" || values.user_password === "") {
          setShowAlert(true)
          setAlertText({
            title: 'Faltan campos por rellenar',
            message: "Porfavor verifica que hayas llenado todos los campos del formulario.",
            type: 'error',
            back: false,
          })
        } else {
          try {
            setSubmitting(true);
            setText('Registrando con Entereza...')
            setLoading(true)

            values = {
              ...values,
              nombres: values.nombres,
              contacto: values.contacto,
              mail: values.correo,
              userAuth: {
                user_password: values.user_password,
                user_code: "",
              },
              fecha_nacimiento: dia + '/' + mes + '/' + año,
              codeUser: "",
            };

            console.log("valueFecha: ", values.fecha_nacimiento)

            const res = await fetchWithoutToken(
              "entereza/usuarios_op",
              "POST",
              values
            );
            const response = await res.json();

            console.log("Back: ", response)

            if (response.codeError === "COD215") {
              let dataLogin = {
                mail: values.correo,
                password: values.user_password,
                code: "USER",
                vrf: ""
              }

              const res = await fetchWithoutToken('entereza/login_user', "POST", dataLogin)
              const {
                entereza,
                codigoEntidad,
                jwt,
                rol,
                mail,
                ...rest
              } = await res.json()

              setLoading(false)
              if (entereza.codeError === codeErrors.cod105 || entereza.codeError === codeErrors.cod95) {
                await Promise.all([
                  AsyncStorage.setItem('ENT-EMAIL', mail),
                  AsyncStorage.setItem('ENT-CODUSR', codigoEntidad),
                  AsyncStorage.setItem('ENT-TKN', jwt),
                ])

                dispatch(_authLogin(dataLogin))
              } else {
                console.log("Respuesta ", res)
                setShowAlert(true)
                setAlertText({
                  title: 'Error al Iniciar Sesión con Entereza',
                  message: 'Porfavor revise sus datos intente nuevamente.',
                  type: 'error',
                })
              }
              // navigation.navigate("LoginScreen");
            } else if (response.codeError === "COD056") {
              setShowAlert(true)
              setAlertText({
                title: 'Este correo ya esta en uso',
                message: "Porfavor elige otro correo disponible",
                type: 'error',
                back: false
              })
            } else {
              setShowAlert(true)
              setAlertText({
                title: 'Ha ocurrido un error',
                message: "Revisa tus datos e intenta nuevamente",
                type: 'error',
                back: false
              })
            }
            setLoading(false)
          } catch (err) {
            setLoading(false)
            console.log(err);
            setShowAlert(true)
            setAlertText({
              title: 'Error al registrar con Entereza',
              message: "Porfavor intente nuevamente en unos minutos",
              type: 'error',
              back: false,
            })
          }
        }
      } else {
        setShowAlert(true)
        setAlertText({
          title: 'Contraseñas Distintas',
          message: "Las contraseñas no son iguales, porfavor revisa con cuidado.",
          type: 'error',
          back: false,
        })
      }
    } else {
      setShowAlert(true)
      setAlertText({
        title: 'Contraseña muy corta',
        message: "Contraseña muy corta, debe contener al menos 6 caracteres",
        type: 'error',
        back: false,
      })
    }
    setSubmitting(false);
  };

  return (
    <>
      <SafeAreaView style={{ backgroundColor: theme.primary }}>
        <ViewStyled
          backgroundColor={theme.transparent}
          width={100}
          height={100}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              backgroundColor: theme.transparent,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            showsVerticalScrollIndicator={false}
            scrollToOverflowEnabled={false}
          >
            <ViewStyled
              height={17}
              width={90}
              style={{
                alignItems: "center",
              }}
            >
              {
                showAlert
                && (
                  <AlertStyled
                    title={alertText.title}
                    message={alertText.message}
                    type={alertText.type}
                    showCancelButton={false}
                    showCloseButton={false}
                    onConfirmPressed={alertText.back ? handleOnCloseAlertAndGoBack : handleCloseAlert}
                    onClose={handleCloseAlert}
                  />
                )
              }
              <ViewStyled
                marginLeftAuto
                marginRightAuto
                height={10}
                width={90}
                style={{
                  borderRadius: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <ImageStyled
                  source={require("../../assets/img/EnterezaLogoColors.png")}
                  height={6}
                  width={12}
                  style={{
                    resizeMode: "contain",
                  }}
                />
                <TextStyled
                  fontSize={20}
                  color={theme.quaternary}
                  fontWeight={'bold'}
                  style={{
                    marginLeft: '3%',
                  }}
                >
                  ENTEREZA
                </TextStyled>
              </ViewStyled>

              <TextStyled
                fontSize={12}
                color={theme.tertiary}
                style={{
                  width: '100%',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
                textAlign="center"
              >
                {
                  `Hola, Bienvenido a un nuevo mundo.\nRecuerda que no es más rico quien menos gasta, sino quien más gana.`
                }
              </TextStyled>
            </ViewStyled>

            <Formik
              initialValues={{
                nombres: "",
                apellidos: "",
                correo: "",
                user_password: "",
                password_confirm: "",
              }}

              onSubmit={handleOnSubmit}
            >
              {({ handleSubmit, isSubmitting }) => (
                <ViewStyled
                  style={{
                    alignItems: "center",
                    marginTop: 15,
                  }}
                >
                  <TextInputStyled
                    label="Nombres"
                    name={"nombres"}
                    placeholder="Inti"
                    labelFontSize={14}
                    maxLength={20}
                    width={90}
                    type={"default"}
                    disabled={isSubmitting}
                  />
                  <TextInputStyled
                    maxLength={20}
                    label="Apellidos"
                    placeholder={"Rojas"}
                    name={"apellidos"}
                    labelFontSize={14}
                    width={90}
                    type={"default"}
                    disabled={isSubmitting}
                  />

                  <TextStyled
                    fontSize={15}
                    fontFamily='BRFirmaBold'
                    fontWeight='bold'
                    color='black'
                    style={{
                      width: '90%'
                    }}
                  >
                    Fecha de Nacimiento
                  </TextStyled>

                  <ViewStyled width={100} height={8} justifyContent="center" alignItems="center">
                    <ViewStyled width={90} borderRadius={1} height={5} style={{ flexDirection: 'row', justifyContent: "center" }}>
                      <TextInput
                        value={dia}
                        placeholder="DD"
                        onChangeText={setDia}
                        keyboardType={'phone-pad'}
                        maxLength={2}
                        style={{
                          backgroundColor: '#f3f5f7cc',
                          height: hp(6),
                          width: wp(20),
                          textAlign: 'center'
                        }}
                      />
                      <TextInput
                        disabled
                        placeholder="/"
                        editable={false}
                        style={{
                          backgroundColor: '#f3f5f7cc',
                          height: hp(6),
                        }}
                      />
                      <TextInput
                        maxLength={2}
                        placeholder="MM"
                        value={mes}
                        keyboardType={'phone-pad'}
                        onChangeText={setMes}
                        style={{
                          backgroundColor: '#f3f5f7cc',
                          height: hp(6),
                          width: wp(25),
                          textAlign: 'center',
                          fontSize: 12
                        }}
                      />
                      <TextInput
                        style={{
                          backgroundColor: '#f3f5f7cc',
                          height: hp(6),
                        }}
                        editable={false}
                        placeholder="/"
                      />
                      <TextInput
                        value={año}
                        onChangeText={setAño}
                        keyboardType={'phone-pad'}
                        maxLength={4}
                        style={{
                          backgroundColor: '#f3f5f7cc',
                          height: hp(6),
                          width: wp(25),
                          textAlign: 'center',
                          fontSize: 12
                        }}
                        placeholder="YYYY"
                      />
                    </ViewStyled>
                  </ViewStyled>

                  <TextInputStyled
                    label='Correo Electrónico'
                    placeholder={"tucorreo@gmail.com"}
                    name={"correo"}
                    labelFontSize={14}
                    maxLength={50}
                    width={90}
                    type={"email-address"}
                    disabled={isSubmitting}
                  />
                  <TextInputStyled
                    label="Contraseña"
                    placeholder={"********"}
                    name={"password_confirm"}
                    labelFontSize={14}
                    maxLength={20}
                    width={90}
                    type={"default"}
                    disabled={isSubmitting}
                    isSecure={true}
                  />
                  <TextInputStyled
                    label="Confirmar Contraseña"
                    placeholder={"********"}
                    name={"user_password"}
                    labelFontSize={14}
                    width={90}
                    maxLength={20}
                    type={"visible-password"}
                    disabled={isSubmitting}
                    isSecure={true}
                  />

                  <EnterezaButton
                    style={{
                      width: "90%",
                    }}
                    disabled={isSubmitting}
                    text="Crear cuenta"
                    onPress={handleSubmit}
                  />
                  <ViewStyled
                    height={10}
                    width={90}
                    style={{
                      alignItems: "center",
                    }}
                  >
                    <TextStyled
                      color='gray'
                      fontSize={16}
                      margin-bottom={13}
                      fontWeight="600"
                      style={{
                        marginBottom: 10,
                        marginTop: 10,
                        textDecorationLine: "underline",
                        // fontFamily: "Raleway",
                      }}
                      onPress={handleLogin}
                    >
                      Ya tengo una cuenta
                    </TextStyled>
                  </ViewStyled>
                </ViewStyled>
              )}
            </Formik>
            <ViewStyled height={28}>

            </ViewStyled>
          </ScrollView>
        </ViewStyled>
      </SafeAreaView>

      <Modal
        visible={Loading}
        animationType="fade"
        transparent={true}
      >
        <ViewStyled
          backgroundColor='#000000AA'
          style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <ViewStyled
            width={70}
            height={18}
            backgroundColor='#ffffff'
            borderRadius={2}

            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TextStyled
              fontSize={15}
              textAlign='center'
              color='#888cf3'
              style={{
                marginBottom: 20,
                width: '90%'
              }}
            >
              {text}
            </TextStyled>
            <ActivityIndicator size="large" color={theme.secondary} />
          </ViewStyled>
        </ViewStyled>
      </Modal>
    </>

  );
}
