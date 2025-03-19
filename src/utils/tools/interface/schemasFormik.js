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

export const schemaChangePassword = Yup.object().shape({
    password: Yup.string()
        .required('La contraseña actual es requerida'),
    newPassword: Yup.string()
        .required('La nueva contraseña es requerida')
        .notOneOf([Yup.ref('password')], 'La nueva contraseña debe ser diferente a la actual')
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
            'La contraseña debe tener al menos 6 caracteres, una letra, un número y un símbolo'
        ),
    confirmNewPassword: Yup.string()
        .required('La confirmación de contraseña es requerida')
        .oneOf([Yup.ref('newPassword')], 'Las contraseñas no coinciden')
});

export const schemaFacturacion = Yup.object().shape({
    name: Yup.string()
        .required('El nombre es requerido')
        .min(3, 'El nombre debe tener al menos 3 caracteres'),
    nit: Yup.string()
        .required('El NIT es requerido')
        .matches(/^[0-9]+$/, "El NIT solo debe contener números.")
});

export const schemaAddInfoAddress = Yup.object().shape({
    nameAddress: Yup.string()
        .required('El nombre de la ubicación es requerido')
        .min(3, 'El nombre de la ubicación debe tener al menos 3 caracteres'),
    referencesAddress: Yup.string()
        .required('El alias de la ubicación es requerido')
        .min(3, 'El alias de la ubicación debe tener al menos 3 caracteres'),
});

export const schemaLogin = Yup.object().shape({
    email: Yup.string()
        .email('Email inválido')
        .required('El email es requerido'),
    password: Yup.string()
        .required('La contraseña es requerida')
        .min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export const schemaRecoverPassword = Yup.object().shape({
    email: Yup.string()
        .email('Correo electrónico inválido')
        .required('El correo electrónico es requerido'),
});

export const schemaRegister = Yup.object().shape({
    names: Yup.string()
        .required('El nombre es requerido')
        .min(3, 'El nombre debe tener al menos 3 caracteres'),
    lastNames: Yup.string()
        .required('Los apellidos son requeridos')
        .min(3, 'Los apellidos deben tener al menos 3 caracteres'),
    email: Yup.string()
        .email('Email inválido')
        .required('El email es requerido'),
    password: Yup.string()
        .required('La contraseña es requerida')
        .min(6, 'La contraseña debe tener al menos 6 caracteres'),
    confirmPassword: Yup.string()
        .required('La confirmación de contraseña es requerida')
        .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden'),
    phoneNumber: Yup.string()
        .required('El número de teléfono es requerido')
        .matches(/^[0-9]+$/, "El número de teléfono solo debe contener números")
        .min(8, 'El número de teléfono debe tener al menos 8 caracteres')
        .max(8, 'El número de teléfono no debe tener más de 8 caracteres'),
});