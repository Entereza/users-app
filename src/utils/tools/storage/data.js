export const directions = [
    {
        id: 1,
        nameAddress: 'Casa',
        referencesAddress: 'Av. Tadeo Haenke esq. Melchor',
        latitude: -17.382080161163803,
        longitude: -66.16561889648438
    },
    {
        id: 2,
        nameAddress: 'Oficina',
        referencesAddress: 'Av. Santa Cruz, Edificio Villa Provenza, Piso 7',
        latitude: -17.37581206578783,
        longitude: -66.15560893310334
    },
]

export const categories = [
    {
        id: 1,
        name: 'Pizza',
        icon: 'pizza'
    },
    {
        id: 2,
        name: 'Bowls',
        icon: 'bowl'
    },
    {
        id: 3,
        name: 'Pollos',
        icon: 'food-drumstick'
    },
    {
        id: 4,
        name: 'Helados',
        icon: 'ice-cream'
    },
    {
        id: 5,
        name: 'Bebidas',
        icon: 'cup'
    }
]

export const businesses = [
    // Pizza category
    {
        id: 1,
        name: 'Pizza Hut',
        category: 'Pizza',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGhX5NXhGvexzPjivau_65a_BrBPXpN_1AIA&s',
        distance: 2000,
        estimatedPreparationTime: '30 - 45',
        cashback: 15,
        favorite: false,
        status: 'open',
    },
    {
        id: 2,
        name: 'Domino\'s Pizza',
        category: 'Pizza',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZyI7L5mE1FSQ_mRT07nNTeSIijQLMAjgGpPijoJPgPo6P24TFLceLIZypSicZgSOD7Y8&usqp=CAU',
        distance: 1500,
        estimatedPreparationTime: '25 - 40',
        cashback: 10,
        favorite: true,
        status: 'open',
    },
    {
        id: 3,
        name: 'Papa John\'s',
        category: 'Pizza',
        image: 'https://blob.luznoticias.mx/images/2023/12/15/papa-johns-culiacan.jpg',
        distance: 3000,
        estimatedPreparationTime: '35 - 50',
        cashback: 20,
        favorite: false,
        status: 'closed',
    },
    // Bowls category
    {
        id: 4,
        name: 'Green Bowl',
        category: 'Bowls',
        image: 'https://scontent.fcbb1-1.fna.fbcdn.net/v/t39.30808-6/301722102_466979935440503_8380295090103906297_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=LKhok3YMK6cQ7kNvgHDu3OT&_nc_zt=23&_nc_ht=scontent.fcbb1-1.fna&_nc_gid=AAmzin38fHwGkfWqHPNTjZs&oh=00_AYDkF7eP_TybSRx4PvmDwfXKu68NjuoOOVYjVWDbHOQupQ&oe=67A81E69',
        distance: 800,
        estimatedPreparationTime: '15 - 25',
        cashback: 25,
        favorite: true,
        status: 'open',
    },
    {
        id: 5,
        name: 'Healthy Bowls',
        category: 'Bowls',
        image: 'https://en.naturpoke.com/public/img/paginas/comidas/bowls_portada_2.jpg',
        distance: 1200,
        estimatedPreparationTime: '20 - 30',
        cashback: 15,
        favorite: false,
        status: 'open',
    },
    {
        id: 6,
        name: 'Fresh & Fit',
        category: 'Bowls',
        image: 'https://as01.epimg.net/deporteyvida/imagenes/2019/02/19/portada/1550557567_998527_1550557640_noticia_normal_recorte1.jpg',
        distance: 2500,
        estimatedPreparationTime: '25 - 35',
        cashback: 8,
        favorite: true,
        status: 'closed',
    },
    // Pollos category
    {
        id: 7,
        name: 'KFC',
        category: 'Pollos',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxK0-TUxNvrsq6R3LSyoPBCOzM1VFjWLGNcw&s',
        distance: 1000,
        estimatedPreparationTime: '20 - 35',
        cashback: 12,
        favorite: true,
        status: 'open',
    },
    {
        id: 8,
        name: 'Pollo Campero',
        category: 'Pollos',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrfVGbl7T0B3CY6YtlFLkUmv4qxz7WKxvya96SLCeq93ZGL4qgayu8A53esU3o5TBW8cs&usqp=CAU',
        distance: 1800,
        estimatedPreparationTime: '25 - 40',
        cashback: 18,
        favorite: false,
        status: 'open',
    },
    {
        id: 9,
        name: 'El Pollo Loco',
        category: 'Pollos',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPH-Im2ICYZDh_WHaxS6SwyscTOdDB-By0NQ&s',
        distance: 2200,
        estimatedPreparationTime: '30 - 45',
        cashback: 15,
        favorite: false,
        status: 'closed',
    },
    // Bebidas category
    {
        id: 10,
        name: 'Starbucks',
        category: 'Bebidas',
        image: 'https://okdiario.com/img/2021/11/01/por-que-el-logo-de-starbucks-es-una-sirena-conoce-su-sorprendente-historia.jpg',
        distance: 500,
        estimatedPreparationTime: '10 - 20',
        cashback: 5,
        favorite: true,
        status: 'open',
    },
    {
        id: 11,
        name: 'Juan Valdez',
        category: 'Bebidas',
        image: 'https://files.merca20.com/uploads/2018/03/Juan.jpg',
        distance: 1500,
        estimatedPreparationTime: '15 - 25',
        cashback: 12,
        favorite: false,
        status: 'open',
    },
    {
        id: 12,
        name: 'Bubble Tea House',
        category: 'Bebidas',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGMDReMT7BCuB9kRsRBiiSOt1rYwkpRT1DdQ&s',
        distance: 2000,
        estimatedPreparationTime: '15 - 30',
        cashback: 20,
        favorite: true,
        status: 'closed',
    }
]

export const productVariables = [
    {
        id: 1,
        namePv: 'Salsas',
        required: true,
        maxSelect: 2,
        variables: [
            {
                id: 1,
                name: 'Miel Mostaza',
                price: 2
            },
            {
                id: 2,
                name: 'Ranch',
                price: 3
            },
            {
                id: 3,
                name: 'BBQ',
                price: 4
            },
            {
                id: 4,
                name: 'Mayonesa',
                price: 5
            },
            {
                id: 5,
                name: 'Guacamole',
                price: 1
            }
        ]
    },
    {
        id: 2,
        namePv: 'Guarniciones',
        required: false,
        maxSelect: 1,
        variables: [
            {
                id: 1,
                name: 'Arroz',
                price: 0
            },
            {
                id: 2,
                name: 'Papa',
                price: 0
            },
            {
                id: 3,
                name: 'Fideo',
                price: 0
            },
            {
                id: 4,
                name: 'Ensalada',
                price: 0
            }
        ]
    }
]

export const products = [
    // Pizza category
    {
        id: 1,
        nameProduct: 'Pizza de la casa',
        price: 65,
        image: 'https://comedera.com/wp-content/uploads/sites/9/2014/04/como-hacer-pizza-facil-en-casa.jpg?w=1200',
        category: 'Pizza',
        type: 'Especialidad',
        description: 'Pizza de pepperoni con queso mozzarella, salsa de tomate y oregano.',
        preparationTime: '20 - 30',
        hasVariables: true
    },
    {
        id: 2,
        nameProduct: 'Pizza Hawaiana',
        price: 60,
        image: 'https://assets.unileversolutions.com/recipes-v2/244028.jpg',
        category: 'Pizza',
        type: 'Clásica',
        description: 'Pizza con jamón, piña, queso mozzarella y salsa de tomate.',
        preparationTime: '20 - 30',
    },
    {
        id: 3,
        nameProduct: 'Pizza Vegetariana',
        price: 70,
        image: 'https://images.mrcook.app/recipe-image/0192bb03-1618-7b62-9f92-2d2abdac67ea',
        category: 'Pizza',
        type: 'Saludable',
        description: 'Pizza con champiñones, pimientos, cebolla, aceitunas y queso mozzarella.',
        preparationTime: '25 - 35',
    },
    // Pollos category
    {
        id: 4,
        nameProduct: 'Pollo a la Brasa',
        price: 85,
        image: 'https://www.eatperu.com/wp-content/uploads/2019/10/pollo-a-la-brasa-with-salad-and-dipping-sauces.jpg',
        category: 'Pollos',
        type: 'Plato Principal',
        description: 'Pollo marinado y asado a las brasas, acompañado de papas fritas y ensalada.',
        preparationTime: '30 - 40',
        hasVariables: true
    },
    {
        id: 5,
        nameProduct: 'Alitas BBQ',
        price: 55,
        image: 'https://assets.unileversolutions.com/recipes-v2/231986.jpg',
        category: 'Pollos',
        type: 'Aperitivo',
        description: 'Alitas de pollo bañadas en salsa BBQ, acompañadas de papas fritas.',
        preparationTime: '25 - 35',
    },
    {
        id: 6,
        nameProduct: 'Pollo Frito',
        price: 75,
        image: 'https://comedera.com/wp-content/uploads/sites/9/2018/08/pollo-frito.jpg?w=500&h=375&crop=1',
        category: 'Pollos',
        type: 'Plato Principal',
        description: 'Piezas de pollo empanizado y frito, acompañado de puré de papas y ensalada.',
        preparationTime: '20 - 30',
    },
    // Bebidas category
    {
        id: 7,
        nameProduct: 'Café Americano',
        price: 25,
        image: 'https://i.blogs.es/139e0f/cafe-americano2/840_560.jpeg',
        category: 'Bebidas',
        type: 'Café Caliente',
        description: 'Café negro recién preparado, puede ser caliente o frío.',
        preparationTime: '5 - 10',
        hasVariables: true
    },
    {
        id: 8,
        nameProduct: 'Frappuccino',
        price: 35,
        image: 'https://parade.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MjA5NjYwMzk1MTQzNTcwODc0/copycat-frappuccino-recipe.jpg',
        category: 'Bebidas',
        type: 'Café Frío',
        description: 'Bebida helada de café con crema batida y jarabe de chocolate.',
        preparationTime: '10 - 15',
    },
    {
        id: 9,
        nameProduct: 'Bubble Tea',
        price: 30,
        image: 'https://thriftyjinxy.com/wp-content/uploads/2016/04/honey-bubble-tea.jpg',
        category: 'Bebidas',
        type: 'Té Especial',
        description: 'Té con leche y perlas de tapioca, disponible en varios sabores.',
        preparationTime: '8 - 12',
    },
    // Promotions category
    {
        id: 10,
        nameProduct: 'Combo Familiar',
        price: 90,
        image: 'https://grupochios.com/wp-content/uploads/2022/02/familiar.jpg',
        category: 'Promociones',
        type: 'Combo Grupal',
        description: 'Pollo a la brasa entero + papas familiares + 2 bebidas grandes.',
        preparationTime: '35 - 45',
        hasVariables: true
    },
    {
        id: 11,
        nameProduct: 'Combo Alitas',
        price: 85,
        image: 'https://carbonylena.net/wp-content/uploads/2021/01/Combo-12-Alitas-Papas-Gaseosa.jpeg',
        category: 'Promociones',
        type: 'Combo Grupal',
        description: '24 alitas BBQ + papas medianas + 2 bebidas medianas.',
        preparationTime: '30 - 40',
    },
    {
        id: 12,
        nameProduct: 'Combo Individual',
        price: 65,
        image: 'https://pub-app-s3-prexpe.s3.sa-east-1.amazonaws.com/landings/images/kfc1/kfc1_mobile.jpg',
        category: 'Promociones',
        type: 'Combo Personal',
        description: '1/4 Pollo + papas personales + bebida personal.',
        preparationTime: '20 - 30',
    },
]
