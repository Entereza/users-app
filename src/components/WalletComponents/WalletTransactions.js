import React, { useState } from 'react'
import HeaderTransactions from './TransactionComponents/HeaderTransactions'
import TransactionsList from './TransactionComponents/ListTransactions/TransactionsList'

export default function WalletTransactions() {
    const pedidos = [
        {
            id: 1,
            restaurant: "Tropical Chicken",
            date: "12/04/24",
            price: "490",
            cashback: "49",
            image: "https://enterezabol.com/enterezaimages/30a9306c-f10e-4aea-bb3d-e25ce0e90465.jpg"
        },
        {
            id: 2,
            restaurant: "The Remix",
            date: "12/04/24",
            price: "34",
            cashback: "3.4",
            image: "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/cbec722efc336d93a41c8c19fa300fca~c5_100x100.jpeg?lk3s=a5d48078&nonce=13528&refresh_token=d5e4221f1efbce2447452705966be554&x-expires=1721689200&x-signature=NueVR5vGqyWtM%2FPTDL4g3F0cQIg%3D&shp=a5d48078&shcp=81f88b70"
        },
        { id: 3, restaurant: "Fair Play", date: "12/04/24", price: "490", cashback: "49", image: "" },
        { id: 4, restaurant: "Wistupiku", date: "12/04/24", price: "34", cashback: "3.4", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVHnrsiSpecoxFIXUsgHSImmyrBe0C7j3BhA&s" },
        { id: 5, restaurant: "Wistupiku", date: "12/04/24", price: "40", cashback: "4.5", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVHnrsiSpecoxFIXUsgHSImmyrBe0C7j3BhA&s" }
    ]

    const enLocal = [
        { id: 6, restaurant: "Wistupiku", date: "12/04/24", price: "34", cashback: "3.4", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVHnrsiSpecoxFIXUsgHSImmyrBe0C7j3BhA&s" },
        {
            id: 7, restaurant: "Tropical Chicken", date: "12/04/24", price: "490", cashback: "49", image: "https://enterezabol.com/enterezaimages/30a9306c-f10e-4aea-bb3d-e25ce0e90465.jpg"
        },
        { id: 8, restaurant: "Fair Play", date: "12/04/24", price: "490", cashback: "49", image: "" },
        {
            id: 9, restaurant: "The Remix", date: "12/04/24", price: "34", cashback: "3.4",
            image: "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/cbec722efc336d93a41c8c19fa300fca~c5_100x100.jpeg?lk3s=a5d48078&nonce=13528&refresh_token=d5e4221f1efbce2447452705966be554&x-expires=1721689200&x-signature=NueVR5vGqyWtM%2FPTDL4g3F0cQIg%3D&shp=a5d48078&shcp=81f88b70"
        }
    ]

    const [showOrdersRestaurant, setShowOrdersRestaurant] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)

    return (
        <>
            <HeaderTransactions
                showOrdersRestaurant={showOrdersRestaurant}
                setShowOrdersRestaurant={setShowOrdersRestaurant}
                allOrders={[...pedidos, ...enLocal]}
            />

            <TransactionsList
                showOrdersRestaurant={showOrdersRestaurant}

                setIsRefreshing={setIsRefreshing}
                isRefreshing={isRefreshing}

                orders={pedidos}
                ordersRestaurant={enLocal}
            />
        </>
    )
}