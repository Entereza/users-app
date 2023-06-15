import * as Yup from 'yup';

export const schemaProfile = Yup.object().shape({
    telephone: Yup.number().required('El nro. de teléfono es requerido').min(0, 'El nro. de teléfono debe ser mayor a 0'),
    name: Yup.string().required('El nombre es requerido'),
})

export const schemaRegister = Yup.object().shape({
    nombres: Yup.string()
        .required('El Nombre es requerido.')
        .min(3, 'El Nombre debe contener al menos 3 caracteres.'),
    apellidos: Yup.string()
        .required('El Apellido es requerido.')
        .min(5, 'El Apellido debe contener al menos 5 caracteres.'),
    email: Yup.string().email('Formato de Email inválido.').required('El Correo es requerido.'),
    password: Yup.string()
        .required('Ingresa una contraseña')
        .min(8, 'Contraseña muy corta, debe contener al menos 8 caracteres'),
    passwordConfirm: Yup.string()
        .required('Confirma tu contraseña')
        .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden'),
});

export const schemaLogin = Yup.object().shape({

    email: Yup.string().email('Email Inválido').required('El correo es requerido'),
    password: Yup.string()
        .required('La contraseña es requerida')
        .min(6, 'Contraseña muy corta, debe contener al menos 6 caracteres')
})

export const schemaRecoverPassword = Yup.object().shape({
    email: Yup.string().email('Email Inválido').required('El correo es requerido'),
    carnet_identidad: Yup.string()
        .required('El carnet es requerido')
})

export const schemaChangePassword = Yup.object().shape({
    currentPassword: Yup.string("La contraseña actual es requerida").required("La contraseña actual es requerida").min(6, 'Este campo debe tener al menos 6 caracteres').max(50, 'Este campo debe tener menos de 50 caracteres'),
    newPassword: Yup.string("La contraseña nueva es requerida").required("La contraseña nueva es requerida").min(6, 'Este campo debe tener al menos 6 caracteres').max(50, 'Este campo debe tener menos de 50 caracteres'),
    confirmPassword: Yup.string().required("El campo de confirmación de contraseña es requerido").oneOf([Yup.ref('newPassword'), null], 'Las contraseñas no coinciden')
})

export const schemaSuggestions = Yup.object().shape({
    message: Yup.string().required('El mensaje es requerido').min(10, 'El mensaje debe tener al menos 10 caracteres'),
})

export const schemaDeleteAccount = Yup.object().shape({
    carnet_identidad:
        Yup.number()
            .typeError('El carnet ingresado no es válido.').min(5, 'Este campo debe tener al menos 5 dígitos')
})

export const schemaApple = Yup.object().shape({
    nombres: Yup.string().required('El Nombre es requerido'),
    apellidos: Yup.string().required('El Apellido es requerido'),
    email: Yup.string().email('Email Inválido').required('El correo es requerido'),
})

export const schemaProfileComplete = Yup.object().shape({
    telefono: Yup.number().required('El Nro. de teléfono es requerido').min(0, 'El nro. de teléfono debe ser mayor a 0'),
})