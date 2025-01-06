import * as Yup from 'yup';

export const schemaEditProfile = Yup.object().shape({
    names: Yup.string().required('Tu/s nombre/s son requeridos.'),
    lastNames: Yup.string().required('Tu/s apellido/s son requeridos'),
    phoneNumber: Yup.string()
        .required('El número de telefono es requerido')
        .matches(/^[0-9]+$/, "El número de telefono solo debe contener números.")
        .min(8, 'El número de telefono debe contener al menos 8 caracteres'),
    email: Yup.string().email('Email inválido').required('El email es requerido'),
});