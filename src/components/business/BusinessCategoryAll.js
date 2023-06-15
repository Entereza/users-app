import React, { useState } from 'react'
import { Pressable, Modal, FlatList } from 'react-native'
import { theme } from '../../utils/theme'
import ImageStyled from '../ui/ImageStyled'
import ViewStyled from '../ui/ViewStyled'
import TextStyled from '../ui/TextStyled'
import BusinessCategoryItemAll from './BusinessCategoryItemAll'
import { customStyles } from '../../utils/customStyles'

export default function BusinessCategoryAll({ dataCategory, coords }) {
    const [modal, setModal] = useState(false);

    const CloseModals = () => {
        console.log('Close')
        setModal(false)
    }

    const handleOnModal = () => {
        setModal(true)
    }

    return (
        <>
            <ViewStyled
                backgroundColor={theme.transparent}
                width={21.5}
                height={11}
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Pressable
                    onPress={handleOnModal}
                >
                    <ViewStyled
                        width={18}
                        height={7.8}
                        backgroundColor={theme.primary}
                        borderRadius={2}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 5
                        }}
                    >
                        <ImageStyled
                            source={require('../../assets/business/points.png')}

                            style={{
                                width: '100%',
                                height: '100%',
                                resizeMode: 'cover',
                            }}
                        />
                    </ViewStyled>
                </Pressable>

                <ViewStyled
                    width={31}
                    height={3}
                    backgroundColor={theme.transparent}
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <TextStyled
                        fontWeight='400'
                        textAlign='center'
                        fontSize={11}
                        color={theme.quaternary}
                        numberOfLines={1}
                        ellipsizeMode='tail'
                        style={{
                            width: '100%',
                        }}
                    >
                        Ver Todo
                    </TextStyled>
                </ViewStyled>
            </ViewStyled>

            <Modal
                visible={modal}
                animationType='fade'
                transparent={true}
            >
                <Pressable onPress={CloseModals}>
                    <ViewStyled
                        backgroundColor='#000000AA'
                        style={{
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <Pressable onPress={(event) => event.stopPropagation()}>
                            <ViewStyled
                                width={100}
                                height={42}
                                backgroundColor={theme.background}
                                style={{
                                    alignItems: "center",
                                    justifyContent: "flex-end",
                                    borderTopRightRadius: 45,
                                    borderTopLeftRadius: 45,
                                }}
                            >
                                <ViewStyled
                                    width={100}
                                    height={38}
                                    backgroundColor={theme.transparent}
                                    style={{
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <FlatList
                                        contentContainerStyle={{
                                            paddingBottom: 40
                                        }}
                                        data={dataCategory}
                                        horizontal={false}
                                        numColumns={3}
                                        renderItem={({ item }) =>
                                            <BusinessCategoryItemAll key={item.codigoRubro} item={item} onCloseModals={CloseModals} />
                                        }
                                        onEndReachedThreshold={0.7}
                                        showsVerticalScrollIndicator={false}
                                    />
                                </ViewStyled>
                            </ViewStyled>
                        </Pressable>
                    </ViewStyled>
                </Pressable>
            </Modal>
        </>
    )
}