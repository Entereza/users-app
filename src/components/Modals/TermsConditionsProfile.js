import React from 'react'
import { Modal, StyleSheet, ScrollView } from 'react-native'
import ViewStyled from '../ui/ViewStyled'
import TextStyled from '../ui/TextStyled'
import { Ionicons } from '@expo/vector-icons'
import { theme } from '../../utils/theme'
import adjustFontSize from '../../utils/adjustText'
//import PDFReader from 'rn-pdf-reader-js'
import { Button, Center, NativeBaseProvider } from "native-base";
import ProfileOptions from '../profile/ProfileOptions'
import { heightPercentageToDP } from 'react-native-responsive-screen'

export default function ProfileTermsConditions() {
    const [modal, setModal] = React.useState(false);
    const handleOnModal = () => setModal(prev => !prev);

    const [modal2, setModal2] = React.useState(false);
    const handleOnModal2 = () => setModal2(prev => !prev);

    const CloseModals = () => {
        setModal(false)
        setModal2(false)
    }


    const source = { uri: 'https://enterezabol.com/static/media/terminosUso.532c859ba94ec49e0d54.pdf', cache: true };
    const source2 = { uri: 'https://enterezabol.com/static/media/politicasPrivacidad.3066984fbc642e0b1991.pdf', cache: true };

    const ButtonClose = () => {
        return (
            <NativeBaseProvider>
                <Center w="100%" backgroundColor={theme.transparent} h="10" flexDirection={'row'}>
                    <Button size="sm" marginRight={3} rounded={'lg'} variant="outline" borderColor={theme.danger} onPress={CloseModals}>
                        <TextStyled
                            color={theme.danger}
                            fontSize={14}
                        >
                            Cerrar
                        </TextStyled>
                    </Button>
                    <Button size="sm" rounded={'lg'} variant="outline" borderColor={theme.secondary} onPress={modal ? handleOnModal2 : handleOnModal}>
                        <TextStyled
                            color={theme.secondary}
                            fontSize={14}
                        >
                            {
                                modal2 ? `Anterior` : `Siguiente`
                            }
                        </TextStyled>
                    </Button>
                </Center>
            </NativeBaseProvider>
        )
    }

    return (
        <>
            <ProfileOptions
                title={'Términos y Condiciones'}
                onPress={handleOnModal}
            >
                <Ionicons
                    name="ios-newspaper-outline"
                    size={adjustFontSize(26)}
                    color={"#AF8165"}
                    style={{
                        ...styles.optionIcon,
                        backgroundColor: '#AF816520'
                    }}
                />
            </ProfileOptions>

            <Modal
                visible={modal}
                animationType="fade"
                transparent={true}
            >
                <ViewStyled
                    height={100}
                    width={100}
                    backgroundColor={theme.primary}
                >
                    <ViewStyled
                        marginLeftAuto
                        marginRightAuto
                        width={98}
                        height={80}
                        marginTop={3}
                        marginBottom={3}
                        padding={2}
                    >

                        <ScrollView
                            contentContainerStyle={{
                                flexGrow: 1,
                                backgroundColor: theme.transparent,
                                height: heightPercentageToDP(860)
                            }}
                            showsVerticalScrollIndicator={false}
                            scrollToOverflowEnabled={false}
                        >
                            <TextStyled
                                fontSize={15}
                                color={theme.tertiary}
                                ellipsizeMode='tail'
                                style={{
                                    width: '100%'
                                }}
                            >
                                Términos y condiciones de uso de la aplicación web Entereza
                                Los presentes términos y condiciones (en adelante, el “Acuerdo” o “Términos y
                                Condiciones” constituyen un contrato entre usted (en adelante el “Usuario”) y
                                Entereza, respecto del uso del servicio de la aplicación web. Los términos y
                                condiciones regirán los derechos y obligaciones de las partes respecto a cualquier
                                producto y/o servicio ofrecido a través de la App (en adelante los “Servicios”. El
                                usuario se compromete a leer, comprender y aceptar todas las condiciones
                                establecidas en este Acuerdo, al momento de solicitud de registro como Usuario
                                de la App. En caso de no encontrarse de acuerdo con los términos y condiciones,
                                por favor, absténgase de utilizar los Servicios. Los presentes Términos y
                                Condiciones se considerarán aceptados desde el momento en el que el registro
                                sea aprobado por Entereza, de acuerdo a las Políticas de Alta del Usuario.
                                1.- OBJETO
                                La Aplicación web permite al Usuario administrar y monitorear los Servicios de
                                Entereza, entre los cuales se encuentran, a título enunciativo:
                                • Monitorear los gastos realizados a través de Entereza.
                                • Solicitar y obtener préstamos personales y realizar el repago de los mismos.
                                • Mantener conversaciones a través de mensajería instantánea con el
                                servicio de atención a usuarios y con otros usuarios.
                                • Realizar inversiones en Fondos comunes de Inversión.
                                • Y todos los demás servicios que oportunamente ofrezca Entereza a través
                                de la Aplicación Web.
                                2.- COMUNICACIÓN
                                Todas las comunicaciones que se cursen al Usuario, incluyendo sin limitación, las
                                que dispongan cambios en las condiciones establecidas en los presentes y toda
                                otra condición aplicable sobre los Servicios, serán cursadas únicamente a través
                                de la App y/o correo electrónico indicado por el Usuario al momento de
                                registrarse
                                .
                                3.- MEDIOS DE UTILIZACION
                                Los servicios son prestados a través de internet por medio de la App, mediante el
                                uso de los dispositivos móviles de titularidad del Usuario, y con la participación de
                                terceros prestadores de servicios complementarios.
                                4.- REQUISITOS PARA LA UTILIZACION DE LA APP WEB.
                                El Usuario deberá contar con un dispositivo móvil con acceso a internet, haber
                                completado el registro satisfactoriamente y ser aprobado por Entereza de
                                acuerdo a las políticas de alta de clientes.
                                El usuario podrá operar desde cualquier dispositivo móvil o pc.
                                El usuario deberá generar un perfil con una contraseña para acceder a la App (en
                                adelante la “Cuenta de Usuario”)
                                5.- VALIDEZ.
                                Las transacciones ordenadas por el Usuario únicamente tendrán validez en
                                aquelloss casos en los que el Usuario utilice los medios específicamente
                                determinados por Entereza, al efecto. No tendrán validez alguna, las instrucciones
                                formuladas a través de cualquier otro medio distinto de los que Entereza
                                determine específicamente a través de la App web.
                                Entereza podrá utilizar sistemas aptos para acreditar la pertenencia de las
                                transacciones cursadas, y asimismo declara que aplicará sus mejores esfuerzos y
                                las mejores prácticas exigidas por la industria a fin de garantizar la seguridad
                                informática de los sistemas y registros empleados.
                                6.- FECHA DE LAS OPERACIONES
                                Todas las operaciones efectuadas por el Usuario serán registradas en la fecha y
                                horario en que efectivamente se cursen. En ciertos casos, la fecha u horario de
                                registro de la operación podrá ser posterior al momento en que se haya solicitado
                                su ejecución, dependiendo del tipo de operación.
                                7.- RESPONSABILIDAD DE LOS FONDOS
                                Entereza mantendrá los fondos de las cuentas de los Usuarios disponibles en
                                cuentas bancarias a la vista a su nombre en entidades financieras del Estado
                                Plurinacional de Bolivia. Entereza no será responsable en ningún caso por hechos
                                que afecten la disponibilidad de los fondos y/o por la insolvencia de dichas
                                entidades.
                                Como consecuencia, Entereza no será responsable por hechos o acontecimientos
                                que restrinjan o imposibiliten la libre disponibilidad de los fondos del Usuario.
                                Tampoco Entereza responderá por caso fortuito o por cualquier otra causa de
                                imposibilidad de cumplimiento de los Términos y Condiciones, que no fueran
                                atribuibles a su parte.
                                8.- IRREVOCABILIDAD
                                Una vez efectuadas, las operaciones llevadas a cabo por el Usuario no podrán
                                revocarse. La confirmación por parte de Entereza se realizará a través de un
                                mensaje de confirmación para cada operación en particular, el cual se visualizará
                                en la App Web al concluir cada transacción.
                                El Usuario libera a Entereza de toda responsabilidad por las operaciones llevadas
                                a cabo a través de su Cuenta de Usuario, y garantiza mantener indemne a
                                Entereza por cualquier reclamo, daño y/o perjuicio derivado directa o
                                indirectamente de la utilización de su Cuenta de Usuario.
                                9.- PRUEBA DE LAS OPERACIONES
                                El Usuario acepta que las órdenes impartidas por este a través de los medios
                                especialmente habilitados al efecto para los Servicios, serán teñidas como prueba
                                de su voluntad de haber realizado las operaciones personalmente.
                                El Usuario acepta expresamente la información sobre su utilización de los
                                Servicios que surja de los soportes provistos por Entereza a través de la App Web
                                y/o de los medios especiales que Entereza disponga a tal efecto.
                                10.- INCUMPLIMIENTOS DEL USUARIO
                                La App web, los Servicios y los Contenidos solo podrán ser utilizados con fines
                                lícitos. Entereza prohíbe específicamente cualquier utilización de la App, los
                                servicios o los contenidos para:
                                • Suministrar información fraudulenta, datos biográficos incompletos, falsos
                                o inexactos ya sea durante el proceso de registro del Usuario o en cualquier
                                momento durante la vigencia de la relacion contractual con Entereza.
                                • Negarse a proporcionar cualquier información, documentación o
                                justificación de cualquier acción, requerida por Entereza.
                                • Usar cualquier mecanismo para impedir o intentar impedir el adecuado
                                funcionamiento de la App web, los servicios o contenidos.
                                • Revelar o compartir las claves con terceras personas, o usar las claves para
                                propósitos no autorizados.
                                • El uso o intento de uso de cualquier máquina, software, herramienta,
                                agente u otro mecanismo para navegar o buscar en la App web, los
                                Servicios o los Contenidos que sean distintos a las herramientas de
                                búsqueda provistos por Entereza en la App web.
                                • Intentar descifrar, descompilar u obtener el código fuente de cualquier
                                programa de software de la App.
                                • Realizar acciones que contravengan las regulaciones y disposiciones
                                emitidas por el Banco Central del Estado Plurinacional de Bolivia o la
                                Unidad de la Información Financiera y/o cualquier otro organismo público
                                que corresponda.
                                • Cometer delitos, infracciones, contravenciones y/o daños de cualquier tipo,
                                incluyendo discriminación y/o acoso, a cualquier persona.
                                El usuario sólo podrá utilizar su Cuenta de Usuario y las Claves para sí y no podrá
                                emplearla para que terceros efectúen transacciones y/o reciban información, ni
                                tampoco para realizar transacciones por cuenta y orden de terceros. Entereza se
                                reserva el derecho de suspender o dar de baja a cualquier Cuenta de Usuario que,
                                a exclusivo criterio de Entereza, no cumpla con los estándares definidos en este
                                Acuerdo, sin que ello genere derecho a resarcimiento alguno.
                                11.- MEDIDAS EN CASO DE INCUMPLIMIENTO.
                                Entereza podrá realizar una serie de medidas ("las Medidas") con el fin de
                                proteger a Entereza, los empleados y Usuarios, debido a cualquier acción que
                                realice el Usuario según el punto 10, o a criterio exclusivo de Entereza. Las
                                Medidas pueden ser, sin que sea entendida como una lista taxativa: (i) exigir que
                                el Usuario justifique cualquier operación realizada que Entereza considere
                                inusual, sospechosa, fraudulenta, o de mala fe, independientemente de su
                                monto, a fin de proteger a Entereza y/o sus filiales y/o subsidiarias y/o
                                controlantes y/o controladas y/o vinculadas y/o socios y/o accionistas y/o
                                gerentes y/o administradores y/o directores y/o funcionarios y/o empleados y/o
                                dependientes y/o representantes y/o apoderados y/o apoderados legales y/o
                                asesores y/o cualquier otra persona humana o jurídica que pudiera estar
                                relacionada con ella, (ii) proceder a inhabilitar, congelar, cerrar la/s cuenta/s y/o
                                la baja de Servicio/s de cualquier Usuario por el tiempo que Entereza considere
                                necesario para analizar y resolver la situación y sin que ello le genere a Entereza
                                responsabilidad alguna. A su vez Entereza se reserva la facultad de iniciar las
                                denuncias y acciones judiciales que correspondan contra el Usuario; (iii) proceder
                                a retener por tiempo indeterminado los Fondos que se encuentren acreditados
                                y/o que se acrediten en el futuro en la Cuenta del Usuario cuando existan
                                sospechas de ilegalidades, fraude y/ o cualquier otro acto contrario a estos
                                Términos y Condiciones y/o sospechas de violación de preceptos legales por los
                                cuales Entereza deba responder; (iv) resolver, en caso de incumplimiento del
                                Usuario, el presente Contrato y consecuentemente dar de baja la cuenta del
                                Usuario que incumpla estos Términos y Condiciones y/o se tenga sospechas de
                                violación de preceptos legales por los cuales Entereza deba responder.
                                12.- CONFIDENCIALIDAD.
                                La Cuenta de Usuario y las Claves serán personales, secretos, confidenciales e
                                intransferibles, quedando terminantemente prohibida su divulgación a terceros
                                por parte del Usuario.
                                En caso de que el Usuario llegase a saber y/o sospechar sobre una vulneración de
                                la confidencialidad de sus Claves, deberá modificarla de inmediato.
                                El Usuario será el único y exclusivo responsable de la confidencialidad de sus
                                Claves, así como también de todas las operaciones y/o actividades llevadas a cabo
                                con las Claves y la Cuenta de Usuario.
                                13.- PROPIEDAD INTELECTUAL E INDUSTRIAL.
                                Los contenidos de la App web, tales como texto, información, gráficos, imágenes,
                                logos, marcas, programas de computación, bases de datos, diseños, APIs,
                                arquitectura funcional y cualquier otro material (en adelante, "el Contenido"),
                                están protegidos por las leyes vigentes en Bolivia, incluyendo, pero sin limitación,
                                las leyes sobre derechos de autor, patentes, marcas, modelos de utilidad, diseños
                                industriales y nombres de dominio, se encuentren o no registrados, en el país o
                                en el exterior.
                                Todo el Contenido es propiedad de Entereza y/o de cualquier otra sociedad filial,
                                subsidiaria, sucursal, agencia, representaciones, controlantes, controladas,
                                vinculadas y cualquier persona humana o jurídica que pudiera estar relacionada
                                con Entereza y su contenido. La compilación, interconexión, operatividad y
                                disposición de los contenidos de la App es de propiedad exclusiva de Entereza y/o
                                de sus empresas vinculadas. El Usuario se encuentra autorizado a utilizar,
                                visualizar e imprimir los elementos de la App para su uso personal y no lucrativo,
                                absteniéndose de realizar sobre los mismos cualquier acto de descompilación,
                                ingeniería inversa, modificación, divulgación o suministro. El uso, adaptación,
                                reproducción y/o comercialización no autorizada del Contenido puede
                                encontrarse penado por la legislación vigente del Estado Plurinacional de Bolivia.
                                El Usuario no copiará ni adaptará el código de programación desarrollado por, o
                                por cuenta de, Entereza para generar y operar la App o los Servicios, el cual se
                                encuentra protegido por la legislación aplicable y vigente en el Estado
                                Plurinacional de Bolivia.
                                14.- RESPONSABILIDADES.
                                El Usuario declara y acepta que el uso de la App, de los Servicios y de los
                                Contenidos se efectúa bajo su única y exclusiva responsabilidad.
                                Entereza se reserva el derecho de suspender y/o interrumpir el servicio a su
                                exclusivo criterio.
                                ENTEREZA NO ASUME NINGUNA RESPONSABILIDAD POR EL FUNCIONAMIENTO
                                DEL DISPOSITIVO Y/O EL SOFTWARE UTILIZADOS POR EL USUARIO PARA ACCEDER
                                A LA APP, LOS CONTENIDOS Y/O LOS SERVICIOS, COMO ASÍ TAMPOCO RESPECTO
                                DE AQUELLOS RELACIONADOS Y/U OCASIONADOS POR TERCEROS PRESTADORES
                                DE SERVICIOS DE ACCESO A INTERNET, TELEFONÍA CELULAR Y/U CUALQUIER
                                OTRO SERVICIO OTORGADO POR PERSONAS DISTINTAS A ENTEREZA.
                                EN NINGÚN CASO ENTEREZA SERÁ RESPONSABLE DE CUALQUIER DAÑO
                                INCLUYENDO, PERO SIN LIMITACIÓN, DAÑOS DIRECTOS Y/O INDIRECTOS, LUCRO
                                CESANTE Y/O PÉRDIDA DE CHANCE QUE RESULTEN DEL USO Y/O DE LA
                                IMPOSIBILIDAD DE USO DE LA APP, DE LOS SERVICIOS O DE LOS
                                CONTENIDOS, SIN PERJUICIO DE QUE ENTEREZA HAYA SIDO ADVERTIDO SOBRE LA
                                POSIBILIDAD DE TALES DAÑOS.
                                ENTEREZA EXCLUYE TODA RESPONSABILIDAD POR LOS DAÑOS Y PERJUICIOS DE
                                TODA NATURALEZA QUE PUDIERAN DEBERSE AL ACCIONAR DE TERCEROS NO
                                AUTORIZADOS RESPECTO DE LOS DATOS PERSONALES DE LOS USUARIOS, ASÍ
                                COMO DE LOS CONTENIDOS Y SERVICIOS OFRECIDOS A TRAVÉS DE LA APP.
                                15.- PRIVACIDAD Y PROTECCIÓN DE LOS DATOS PERSONALES.
                                Cuando se registre en la App, se le pedirá al Usuario que aporte a Entereza cierta
                                información que incluirá, a fines identificatorios y de conocimiento del cliente,
                                entre otras, nombre y apellido, DNI, fecha de nacimiento, nacionalidad, sexo
                                domicilio real y de entrega de la tarjeta, número de teléfono celular, una
                                dirección válida de correo electrónico, entre otros datos personales, además de
                                declaraciones juradas de persona políticamente expuesta y licitud de fondos.
                                Usted reconoce y acepta que Entereza puede revelar a terceras partes, de forma
                                anónima, cierto conjunto de los datos suministrados por el Usuario para la
                                utilización de los Servicios.
                                Entereza no revelará a terceras partes sus datos personales sin su consentimiento
                                previo, excepto en la medida en que sea necesario para el cumplimiento de las
                                leyes y/o procedimientos legales vigentes, donde tal información sea relevante.
                                Entereza se reserva el derecho de ofrecerle servicios y productos de terceros
                                basados en las preferencias que el Usuario haya indicado al momento de
                                registrarse y/o en cualquier momento posterior; tales ofertas pueden efectuarse
                                por Entereza o por terceros.
                                Por favor consulte la Política de Privacidad de la App web para conocer los
                                detalles respecto del tratamiento de sus datos personales.
                                El Usuario será responsable de todos los usos de su cuenta, tanto si están
                                autorizados o no por el Usuario. El Usuario deberá notificar inmediatamente a
                                Entereza sobre cualquier uso sin autorización de su Cuenta de Usuario y/o las
                                Claves.
                                Los Usuarios que utilicen los Servicios de Entereza garantizan la veracidad,
                                exactitud, vigencia y autenticidad de la información facilitada, y se comprometen
                                a mantenerlos debidamente actualizados, informando a Entereza sobre cualquier
                                modificación a través de la actualización de la información correspondiente en su
                                Cuenta de Usuario, o poniéndose en contacto a enterezabol@gmail.com
                                16.- VÍNCULOS A SITIOS DE TERCEROS.
                                La App puede contener vínculos a sitios web y/o aplicaciones de terceros (en
                                adelante, los “Sitios de Terceros”). Entereza no respalda ni garantiza los
                                contenidos de estos Sitios de Terceros. Entereza no es responsable del contenido
                                de los Sitios Terceros y no hace ninguna afirmación relativa al contenido y/o
                                exactitud en estos Sitios de Terceros. Si Usted decide acceder a Sitios de Terceros,
                                lo hace a su propio riesgo.
                                17.- COSTO DE LOS SERVICIOS.
                                Entereza podrá cobrar comisiones por el mantenimiento y/o uso de los Servicios,
                                previa notificación al Usuario dentro del plazo legal correspondiente,
                                entendiéndose expresamente facultado para efectuar los correspondientes
                                débitos en las cuentas asociadas del Usuario. Las comisiones mencionadas
                                precedentemente no incluyen los costos que aplican las empresas de telefonía
                                celular por los servicios de transmisión de datos.
                                18.- MODIFICACIÓN DE LOS SERVICIOS.
                                Entereza se reserva el derecho a modificar, restringir y/o suprimir todos o
                                cualquiera de los Servicios brindados a través de la App, en forma temporal o
                                definitiva, sin que estas medidas puedan ser objeto de requerimiento alguno, ni
                                de derecho a reclamar daños o perjuicios por parte del Usuario.
                                19.- MODIFICACIÓN DE LOS TÉRMINOS Y CONDICIONES
                                Entereza podrá modificar en cualquier momento los Términos y Condiciones
                                notificando previamente los cambios al Usuario vía mail y/o notificación push en
                                la App y publicando una versión actualizada de dichos Términos y Condiciones en
                                el sitio web www.entereza.bo.com con expresión de la fecha de la última
                                modificación. Todos los términos modificados entrarán en vigor en la fecha
                                indicada en la notificación. Dentro de los 10 (diez) días corridos siguientes a la
                                notificación de las modificaciones introducidas, el Usuario podrá comunicar por email si no acepta las mismas; en ese caso quedará disuelto el vínculo contractual.
                                Vencido dicho plazo, se considerará que el Usuario acepta los nuevos Términos y
                                Condiciones y el contrato continuará vinculando a ambas partes.
                                20.- RESCISIÓN DEL SERVICIO.
                                La prestación de los Servicios tiene una duración indeterminada. Sin perjuicio de
                                lo anterior, Entereza está autorizada para terminar o suspender la prestación de
                                los Servicios y/o de cualquiera de los Contenidos en cualquier momento y sin
                                expresión de causa notificando previamente al Usuario.
                                El Usuario podrá solicitar el cierre de la Cuenta a través de los canales de
                                comunicación habilitados por Entereza.
                                Si existieran fondos remanentes, al cierre de la Cuenta, el Usuario deberá
                                transferirlos a la cuenta de su preferencia y/o extraerlos de la misma, dejando la
                                Cuenta Entereza con un saldo de Bs 0 (cero bolivianos). Luego de transcurridos 90
                                (noventa) días y si existiesen fondos remanentes, los mismos se categorizarán
                                como “Saldos Inmovilizados” y se procederá al cierre de la cuenta del Usuario.
                                21.- CESIÓN O USO COMERCIAL NO AUTORIZADO.
                                El Usuario acepta no ceder, bajo ningún título, sus derechos u obligaciones bajo el
                                presente Acuerdo. El Usuario también acepta que no realizará algún uso
                                comercial no autorizado de la App, de los Servicios o de los Contenidos.
                                Asimismo, el Usuario se compromete a utilizar la App, el Contenido y los Servicios
                                diligentemente y de conformidad con la ley aplicable y vigente del Estado
                                Plurinacional de Bolivia y con este Acuerdo.
                                Entereza se reserva el derecho, a su exclusivo criterio, de emplear todos los
                                medios legales a su alcance en caso de que el Usuario infrinja cualquiera de estos
                                Términos y Condiciones.
                                22.- TOTALIDAD DEL ACUERDO.
                                Los presentes Términos y Condiciones, junto con la Política de Privacidad, los
                                términos específicos correspondientes y aquellos que eventualmente se
                                especifiquen para cada Servicio constituyen la totalidad del acuerdo entre el
                                Usuario y Entereza.
                                23.- DOMICILIO. LEY APLICABLE. COMPETENCIA.
                                Estos Términos y Condiciones se rigen por las leyes del Estado Plurinacional de
                                Bolivia. Toda acción derivada de estos Términos y Condiciones o del uso de la App
                                deberá someterse exclusivamente a la jurisdicción de los tribunales competentes
                                del Estado Plurinacional de Bolivia.
                                En caso de declararse la nulidad de alguna de las cláusulas de este Acuerdo, tal
                                nulidad no afectará a la validez de las restantes, las cuales mantendrán su plena
                                vigencia y efecto. A todos los efectos emergentes de estos Términos, Entereza
                                constituye domicilio en el Estado Plurinacional de Bolivia, Ciudad Cochabamba
                            </TextStyled>
                        </ScrollView>
                    </ViewStyled>
                    <ButtonClose />
                </ViewStyled>
            </Modal>

            <Modal
                visible={modal2}
                animationType="fade"
                transparent={true}
            >
                <ViewStyled
                    height={100}
                    width={100}
                    backgroundColor={theme.primary}
                >
                    <ViewStyled
                        marginLeftAuto
                        marginRightAuto
                        width={98}
                        height={80}
                        marginTop={3}
                        marginBottom={3}
                        padding={2}
                    >

                        <ScrollView
                            contentContainerStyle={{
                                flexGrow: 1,
                                backgroundColor: theme.transparent,
                                height: heightPercentageToDP(480)
                            }}
                            showsVerticalScrollIndicator={false}
                            scrollToOverflowEnabled={false}
                        >
                            <TextStyled
                                fontSize={15}
                                color={theme.tertiary}
                                ellipsizeMode='tail'
                                style={{
                                    width: '100%'
                                }}
                            >
                                Políticas de privacidad y datos
                                personales
                                Para nosotros es sumamente importante proteger la privacidad de nuestros usuarios y/
                                o visitantes de la página (en adelante “los Usuarios”). Esta política de privacidad
                                proporciona información sobre la recolección y tratamiento de datos personales
                                recopilados sobre nuestros usuarios a través de nuestro sitio web, (“Sitio”) y/o las
                                Aplicaciones y/o aquellos datos personales que Entereza S.A con domicilio en Av.
                                Macedonio Urquidi Nº0127, Bolivia, ciudad Cochabamba, hubieran recolectado,
                                mediante la prestación de su servicio y/o mediante la utilización de los Sitios y/o la App
                                Web por parte de los usuarios. Toda la información y los datos personales de los
                                usuarios que las Empresas del Ecosistema Entereza poseen y a la cual acceden de
                                acuerdo a lo indicado previamente se procesará y mantendrá según esta política de
                                privacidad y confidencialidad (la “Política de Privacidad”).
                                Te contamos que a fin de facilitar la comunicación y dar respuestas más rápidas y
                                eficientes para la protección de los derechos de usuarios y consumidores, las
                                Empresas del Ecosistema Entereza han unificado canales de acceso y contacto con
                                sus clientes. En ese sentido se te informa (i) en la APP, (ii) en el Sitio web (iii) en
                                diferentes redes sociales y (iv) en los diferentes canales de atención, que a través de
                                un punto único de acceso podrás
                                solicitar información, realizar consultas, quejas y reclamos y ejercer todos tus derechos
                                en relación a los productos y servicios contratados con las diferentes Empresas del
                                Ecosistema Entereza.
                                Si vos no quieres que las Empresas del Ecosistema Entereza recolectan y obtengan la
                                información que te identifica personalmente, deberás abstenerte de suminístrala
                                ANTES DE NAVEGAR Y/O UTILIZAR Y/O REGISTRARTE Y/O BRINDAR TUS
                                DATOS PERSONALES EN EL SITIO O EN LA APP. POR FAVOR LEÉ
                                ATENTAMENTE LA POLÍTICA DE PRIVACIDAD.
                                1- ¿A qué datos personales e información accedemos?
                                Al utilizar, ingresar, visitar, brindar información y/o registrarse en el Sitio o en la App, las
                                Empresas del Ecosistema Entereza podrán acceder, recolectar o requerir a los
                                usuarios (los “Usuarios”) que proporcionen ciertos datos personales, tales como CI y
                                nombre Completo.
                                • Información acerca de sus visitas y uso del Sitio y la App, como por ejemplo
                                información acerca del dispositivo y el navegador que utiliza, dirección IP o nombres de
                                dominio de los ordenadores que se conectan al Sitio y a la App, datos de
                                geolocalización, datos que se recolectan a través del uso de cookies y otras
                                tecnologías similares y otros parámetros relativos al sistema operativo y al ambiente
                                informático utilizado, la fecha y hora de la visita y su duración, la fuente de referencia y
                                las rutas de navegación de la visita e interacciones con el Sitio y la App , incluso los
                                servicios y las ofertas que te interesan. Cabe destacar que podríamos asociar esta
                                información a tu cuenta.
                                • Información relativa a los Usuarios, como por ejemplo los datos identificatorios, nombre
                                y apellido, estado civil, sexo, documento de identidad, datos de contacto, correo
                                electrónico, teléfono, cantidad de personas a cargo, datos previsionales e impositivos,
                                datos laborales, datos familiares (que incluyen datos personales de terceros respecto
                                de los cuales declaras tener su consentimiento para poder brindarlos a las Empresas
                                del Ecosistema Entereza), condición de Persona Expuesta Políticamente y sujeto
                                obligado y cualquier otro dato que las Empresas del Ecosistema Entereza consideren
                                necesario para proveer los servicios.
                                • Aquellos datos personales que las Empresas del Ecosistema Entereza hubieran
                                recolectado en forma previa a la aceptación de la presente Política de Privacidad
                                mediante la utilización de los productos y/o servicios prestados por las Empresas del
                                Ecosistema Entereza y/o mediante la utilización de los Sitios y/o la App por parte de los
                                Usuarios.
                                • Información crediticia de carácter patrimonial relativa a la solvencia económica y al
                                crédito y datos personales relativos al cumplimiento o incumplimiento de obligaciones
                                de contenido patrimonial, datos de consumo, límites asignados a las cuentas de los
                                Usuarios, transacciones, movimientos de cuenta.
                                Los Usuarios son responsables de la información brindada, responsabilizándose de
                                cualquier error en la carga de la información. Deberás proporcionar datos exactos y
                                actualizados. Entiendes y aceptas que no estás obligado a proporcionar tus Datos
                                Personales a las Empresas del Ecosistema Entereza, aunque en caso de omitir
                                proporcionar sus Datos Personales o proporcionarlos en forma inexacta,
                                desactualizada o errónea podría obstaculizar o impedir que las Empresas del
                                Ecosistema Entereza puedan procesar los Datos Personales para el cumplimiento de
                                las finalidades descriptas en esta Política de Privacidad.
                                Una vez registrado en el Sitio y/o en la App dispondrás de un nombre de usuario y
                                contraseña que te permitirá el acceso personalizado, confidencial y seguro a tu cuenta.
                                El Usuario se obliga a mantener la confidencialidad de su clave de acceso, asumiendo
                                totalmente la responsabilidad por el mantenimiento de la confidencialidad de su clave
                                registrada en el Sitio o en la App. Dicha clave es de uso personal y su entrega a
                                terceros no involucra responsabilidad de las Empresas del Ecosistema Entereza en
                                caso de uso inapropiado. Te comprometes a notificar a las Empresas del Ecosistema
                                Entereza en forma inmediata y por medio idóneo y fehaciente, cualquier uso no
                                autorizado de tu cuenta en el Sitio y/o en la App, así como el ingreso por terceros no
                                autorizados a la misma.
                                2. ¿Para qué utilizamos los Datos Personales a los que
                                accedemos?
                                Tus Datos Personales serán utilizados para los siguientes propósitos:
                                • Para administrar el negocio de las Empresas del Ecosistema Entereza, prestarte
                                servicios y brindar asesoramiento sobre tus productos y servicios, habilitar tus
                                operaciones y transacciones, gestionar las cuentas y productos, controles de
                                seguridad, prevención de fraudes, controles de calidad, administración del Sitio y la
                                App Web, ya sea en forma directa o a través de terceros.
                                • Análisis de los Datos Personales con fines de evaluación y otorgamiento de productos
                                o servicios, evaluación y administración del riesgo crediticio.
                                • A fin de mejorar las funcionalidades del Sitio y la App, personalizar tu experiencia y
                                permitirle operar en el Sitio.
                                • Para contactarte en el futuro, enviarte comunicaciones de marketing e informarte sobre
                                los productos y servicios que las Empresas del Ecosistema Entereza crean que pueden
                                ser de su interés.
                                • Cumplir con obligaciones legales y contractuales, requerimientos de autoridades
                                competentes.
                                • Mejorar nuestros servicios, desarrollar nuevos y ofrecer una mejor experiencia con el
                                Ecosistema Entereza.
                                En cualquier caso, las Empresas del Ecosistema Entereza solo utilizarán tus Datos
                                Personales para el fin para el cual vos los proporcionaste y diste tu consentimiento.
                                3- ¿Con quién compartimos tus Datos Personales?
                                Al aceptar estas políticas, otorgas a las Empresas del Ecosistema Entereza tu
                                consentimiento previo, expreso e informado para que comparta, transfiera y/o ceda
                                tanto dentro del Estado Plurinacional de Bolivia como hacia el exterior (incluyendo, pero
                                sin limitarse a países con niveles de protección inferiores a los establecidos por el pais)
                                con los terceros que se detallan debajo:
                                a) Terceros que provean servicios de procesamiento de datos e información para las
                                Empresas del Ecosistema Entereza, podemos compartir tus Datos Personales con
                                nuestros proveedores de servicios, consultores, agentes y representantes con el fin de
                                realizar ciertas funciones en nuestro nombre o para alojar nuestras bases de datos.
                                b) Cuando lo exija la ley o para cumplir con las leyes o regulaciones aplicables o con
                                cualquier organismo estatal competente, agencia gubernamental o tribunal competente
                                en caso de recibir una orden para ello.
                                c) Para proteger y defender los derechos de las Empresas del Ecosistema Entereza.
                                d) Para proteger los intereses de los Usuarios o terceros.
                                e) Ante un proceso de reestructuración de las Empresas del Ecosistema Entereza, con
                                los potenciales nuevos socios.
                                f) Durante un proceso de auditoría, con los auditores y sus mandantes, siempre sujeto
                                a obligación de confidencialidad.
                                4 - Sus Derechos
                                Tienes el derecho a solicitar y obtener información sobre tus Datos Personales y
                                también tienes el derecho de solicitar la rectificación, actualización y supresión de tus
                                Datos Personales.
                                • Adicionalmente, se te informa que podrás ejercer tus derechos de acceso, rectificación,
                                actualización y supresión de sus Datos Personales mediante el envío de un correo
                                electrónico debiendo acreditar identidad adjuntando una copia del documento nacional
                                de identidad a enterezabol@gmail.com acerca de sus preferencias y personalizar
                                nuestro sitio web de conformidad con sus intereses individuales.
                                • Las cookies ayudan a las Empresas del Ecosistema Entereza a entender qué partes
                                del Sitio son las más populares, porque ayudan a evidenciar a qué páginas y
                                características obtienen acceso los visitantes y cuánto tiempo permanecen en las
                                páginas. Al estudiar esta clase de información, las Empresas del Ecosistema Entereza
                                pueden adaptar mejor el Sitio y proporcionar al usuario una mejor experiencia.
                                • Las cookies facilitan la navegación de los Usuarios, proporcionando una mejor
                                experiencia en el uso del sitio web, identificar problemas para mejorar el mismo, hacer
                                mediciones y estadísticas de uso y mostrarte publicidad relacionada con tus
                                preferencias mediante el análisis del uso del sitio y de otros sitios web.
                                Dichas cookies estarán disponibles y serán utilizadas por las Empresas del Ecosistema
                                Entereza.
                                Además, siempre que nos sea posible técnicamente, registramos la ubicación
                                (geolocalización) de donde se encuentra el Usuario a los efectos de poder ofrecerles la
                                mejor experiencia y disponibilidad de productos y servicios.
                                Cuando utilizas un explorador web para obtener acceso al Sitio, podrás configurar tu
                                explorador para que acepte todas las cookies, rechace todas las cookies o le notifique
                                cuando se envía una cookie. Cada explorador es diferente, de modo que debes revisar
                                el menú "Ayuda" de tu explorador para obtener información sobre cómo cambiar las
                                preferencias de las cookies. El sistema operativo de su dispositivo puede contener
                                controles adicionales para las cookies. Sin embargo, ten en cuenta que el Sitio puede
                                estar diseñado para funcionar mediante cookies y que la desactivación de las cookies
                                puede afectar su capacidad de utilizar el Sitio o algunas partes de este.
                            </TextStyled>
                        </ScrollView>
                    </ViewStyled>
                    <ButtonClose />
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