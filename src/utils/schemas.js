import * as Yup from 'yup';

export const schemaProfile = Yup.object().shape({
    telephone: Yup.number().required('').min(0, 'El nro. de teléfono debe ser mayor a 0'),
    name: Yup.string().required('El nombre es requerido'),
})

export const schemaRegister = Yup.object().shape({
    nombres: Yup.string()
        .required('')
        .min(3, 'El Nombre debe contener al menos 3 caracteres.'),
    apellidos: Yup.string()
        .required('')
        .min(5, 'El Apellido debe contener al menos 5 caracteres.'),
    email: Yup.string().email('Formato de Email inválido.').required(''),
    password: Yup.string()
        .required('')
        .min(8, 'Contraseña muy corta, debe contener al menos 8 caracteres'),
    passwordConfirm: Yup.string()
        .required('')
        .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden'),
});

export const schemaLogin = Yup.object().shape({
    email: Yup.string().email('Email Inválido').required(''),
    password: Yup.string()
        .required('')
        .min(6, 'Contraseña muy corta, debe contener al menos 6 caracteres')
})

export const schemaRecoverPassword = Yup.object().shape({
    email: Yup.string().email('Email Inválido').required(''),
    carnet_identidad: Yup.string()
        .required('')
})

export const schemaChangePassword = Yup.object().shape({
    currentPassword: Yup.string().required("").min(6, 'Este campo debe tener al menos 6 caracteres').max(50, 'Este campo debe tener menos de 50 caracteres'),
    newPassword: Yup.string().required("La contraseña nueva es requerida").min(6, 'Este campo debe tener al menos 6 caracteres').max(50, 'Este campo debe tener menos de 50 caracteres'),
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

export const schemaCiUser = Yup.object().shape({
    ciUser:
        Yup.string()
            .required('')
            .matches(/^[0-9]+$/, "El Carnet solo debe contener números.")
            .min(6, '')
})

export const schemaNumberUser = Yup.object().shape({
    numberUser:
        Yup.string()
            .required('')
            .matches(/^[0-9]+$/, "El número de telefono solo debe contener números.")
            .min(8, '')
})

export const schemaDateUser = Yup.object().shape({
    day: Yup.number()
        .required('')
        .typeError('El día debe ser un número entero.')
        .min(1, 'El día debe estar entre 1 y 31')
        .max(31, 'El día debe estar entre 1 y 31'),
    month: Yup.number()
        .required('')
        .typeError('El mes debe ser un número entero.')
        .min(1, 'El mes debe estar entre 1 y 12')
        .max(12, 'El mes debe estar entre 1 y 12'),
    year: Yup.number()
        .required('')
        .typeError('El año debe ser un número entero.')
        .min(1900, 'Año inválido')
        .max(new Date().getFullYear(), 'ALERTA: Viajero del tiempo detectado.')
})
