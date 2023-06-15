import React, { useState } from 'react'
import { KeyboardAvoidingView, Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { SimpleLineIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';

import ViewStyled from '../ui/ViewStyled';
import ProfileOptions from './ProfileOptions';
import adjustFontSize from '../../utils/adjustText';
import TextInputStyled from '../ui/TextInputStyled';
import { theme } from '../../utils/theme';
import { fetchWithToken } from '../../utils/fetchWithToken';
import { codeErrors } from '../../utils/codeErrors';
import { schemaSuggestions } from '../../utils/schemas';
import AlertStyled from '../ui/AlertStyled';
import TextStyled from '../ui/TextStyled';

export default function ProfileOptionSuggestions() {

  const [showAlert, setShowAlert] = useState(false);

  const handleOnCloseAlert = () => setShowAlert(false);

  const [alertText, setAlertText] = useState({
    title: '',
    message: '',
    type: 'success',
    textConfirmButton: ''
  })

  const { info } = useSelector(state => state.auth);

  const [collapse, setCollapse] = useState(false)

  const handleOnSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true)
    try {

      let data = {
        texto: values.message,
        email: info?.usuarioBean?.mail || ''
      }

      const res = await fetchWithToken('entereza/sugerencias', "POST", data)
      const {
        codeError,
        msgError
      } = await res.json()

      if (codeError === codeErrors.cod200) {
        setShowAlert(true)
        setAlertText({
          title: '¡Gracias!',
          message: 'Su sugerencia ha sido enviada con éxito',
          type: 'success',
          textConfirmButton: 'Continuar'
        })
        resetForm()
        setCollapse(false)
      } else {
        setShowAlert(true)
        setAlertText({
          title: 'Ocurrió un error',
          message: 'Por favor intente de nuevo en unos minutos.',
          type: 'error'
        })
      }

    } catch (err) {
      console.log(err)
      setShowAlert(true)
      setAlertText({
        title: 'Ocurrió un error',
        message: 'Algo salió mal, por favor intente más tarde.',
        type: 'error'
      })
    }
    setSubmitting(false)
  }

  return (
    <>
      {
        showAlert
        && (
          <AlertStyled
            widthModal={75}
            heightModal={26}
            widthText={65}
            heightText={17}
            show={showAlert}
            type={alertText.type}
            onClose={handleOnCloseAlert}
            onConfirmPressed={handleOnCloseAlert}
            title={alertText.title}
            message={alertText.message}
            textConfirmButton={alertText.textConfirmButton}
            showCancelButton={false}
            showCloseButton={false}
          />
        )
      }
      <ProfileOptions
        title={'Sugerencias'}
        onPress={() => {
          setCollapse(!collapse)
        }}
      >
        <SimpleLineIcons
          name="bubbles"
          size={adjustFontSize(26)}
          color={"#8BADF2"}
          style={{
            ...styles.optionIcon,
            backgroundColor: '#8BADF220',
          }}
        />
      </ProfileOptions>

      <Modal
        visible={collapse}
        transparent={true}
        animationType={'fade'}
      >
        <ViewStyled
          backgroundColor='#000000AA'
          style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <KeyboardAvoidingView
            behavior="position"
          >
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
            >
              <ViewStyled
                width={90}
                height={43}
                backgroundColor={theme.primary}
                borderRadius={2}

                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <ViewStyled
                  width={88}
                  height={11}
                  marginTop={2}
                  marginBottom={0.5}
                  backgroundColor={theme.transparent}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <MaterialIcons
                    name="comment"
                    size={adjustFontSize(30)}
                    color={theme.secondary}
                  />
                  <TextStyled
                    fontSize={18}
                    textAlign='center'
                    color={theme.quaternary}
                    style={{
                      marginTop: 5
                    }}
                  >
                    ¡Déjanos tu comentario para poder mejorar!
                  </TextStyled>
                </ViewStyled>
                <Formik
                  initialValues={{
                    message: ''
                  }}
                  onSubmit={handleOnSubmit}
                  validationSchema={schemaSuggestions}
                >
                  {
                    ({
                      handleSubmit,
                      isSubmitting
                    }) => (
                      <ViewStyled
                        backgroundColor={theme.transparent}
                        marginLeftAuto
                        marginRightAuto
                        paddingVertical={1}
                        paddingHorizontal={2}
                        height={27}
                        width={80}
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        borderRadius={2}
                        marginBottom={2}
                      >
                        <TextInputStyled
                          width={78}
                          heightInput={10}
                          name={"message"}
                          label={"Sugerencia"}
                          placeholder={"Escribe tu sugerencia"}
                          multiline={true}
                          disabled={isSubmitting}
                        />
                        <ViewStyled
                          width={90}
                          height={6}
                          marginTop={2}
                          backgroundColor={theme.transparent}
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                        >
                          <TouchableOpacity onPress={() => { setCollapse(!collapse) }} style={{ marginRight: 10 }}>
                            <ViewStyled
                              width={35}
                              height={5}
                              backgroundColor={theme.danger}
                              borderRadius={2}
                              style={{
                                justifyContent: 'center',
                                alignItems: 'center'
                              }}
                            >
                              <TextStyled
                                fontSize={15}
                                color={theme.primary}
                                style={{
                                  marginBottom: 4,
                                  // fontFamily: 'Raleway',
                                }}>
                                Cancelar
                              </TextStyled>
                            </ViewStyled>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={handleSubmit}>
                            <ViewStyled
                              width={38}
                              height={5}
                              backgroundColor='#888cf3'
                              borderRadius={2}
                              style={{
                                justifyContent: 'center',
                                alignItems: 'center'
                              }}
                            >
                              <TextStyled
                                fontSize={15}
                                color={theme.primary}
                                textAlign={'center'}
                                style={{
                                  marginBottom: 4,
                                  width: '90%',
                                  // fontFamily: 'Raleway',
                                }}>
                                Enviar
                              </TextStyled>
                            </ViewStyled>
                          </TouchableOpacity>
                        </ViewStyled>
                      </ViewStyled>
                    )
                  }
                </Formik>
              </ViewStyled>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
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
  }
})
