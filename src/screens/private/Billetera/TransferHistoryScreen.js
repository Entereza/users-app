import React, { useEffect, useState } from 'react'
import ViewStyled from '../../../utils/ui/ViewStyled'
import { theme_colors } from '../../../utils/theme/theme_colors'
import HeaderDefaultScreen from '../../../components/Header/HeaderDefaultScreen'
import TransferList from '../../../components/TransferComponents/TransferList'
import { qrService } from '../../../services/api/transfers/qrService'
import useAuthStore from '../../../utils/tools/interface/authStore'
import { ActivityIndicator } from 'react-native'
import ImageStyled from '../../../utils/ui/ImageStyled'
import TextStyled from '../../../utils/ui/TextStyled'
import { theme_textStyles } from '../../../utils/theme/theme_textStyles'

export default function TransferHistoryScreen() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = useAuthStore(state => state.user);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await qrService.getUserTransactions(user.id);
                if (response.content) {
                    setTransactions(response.content || []);
                }
            } catch (error) {
                console.error('Error fetching transactions:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user?.id) {
            fetchTransactions();
        }
    }, [user]);

    return (
        <ViewStyled
            backgroundColor={theme_colors.white}
            width={100}
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}
        >
            <HeaderDefaultScreen title={"Transferencias"} />

            {loading ? (
                <ViewStyled
                    backgroundColor={theme_colors.white}
                    width={100}
                    style={{
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <ActivityIndicator size="large" color={theme_colors.primary} />
                </ViewStyled>
            ) : transactions.length > 0 ?
                (
                    <TransferList transactions={transactions} />
                )
                : (
                    <ViewStyled
                        width={90}
                        backgroundColor={theme_colors.transparent}
                        marginTop={-8}
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <ImageStyled
                            style={{
                                width: 100,
                                height: 100,
                                resizeMode: 'contain',
                            }}
                            source={require('../../../../assets/gifs/pago.gif')}
                        />

                        <TextStyled
                            fontFamily='SFPro-Italic'
                            textAlign='center'
                            fontSize={theme_textStyles.smedium}
                            color={theme_colors.grey}
                        >
                            No hay transferencias en tu historial.
                        </TextStyled>
                    </ViewStyled>
                )
            }
        </ViewStyled>
    )
}