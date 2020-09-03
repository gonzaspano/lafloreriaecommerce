import React, { useContext, useState } from 'react'

export const CartContext = React.createContext()

export const useCartContext = () => useContext(CartContext)

export function CartContexProvider( { children } ) {

    const [list, setList] = useState ([])
    const [totalQuantityCart, setTotalQuantityCart] = useState(0)

    function addProd(newProd, quantity) {
        const compareIds = (prod) => prod.id == newProd.id;
        const prodIndex = list.findIndex(compareIds)
        if (prodIndex == -1 ) {
            const prodAdded = [...list, newProd]
            setList(prodAdded)
            addProdQuantity(newProd, quantity)
            addTotalQuantity(quantity)
        } else {
            list[prodIndex].quantity += quantity
            addTotalQuantity(quantity)
        }
    }

    function addProdQuantity(newProd, quantity) {
        newProd.quantity = quantity
    }

    function cleanList(){
        setList([])
        setTotalQuantityCart(0)
    }

    function addTotalQuantity(quantity) {
        const number = totalQuantityCart + quantity
        setTotalQuantityCart(number)
    }

    function removeTotalQuantity(){
        const number = totalQuantityCart - 1
        setTotalQuantityCart(number)
    }

    function deleteProd(deletedProd) {
        const compareIds = (prod) => prod.id == deletedProd.id;
        const prodIndex = list.findIndex(compareIds)
        if (prodIndex !== -1 && list[prodIndex].quantity >= 2) {
            list[prodIndex].quantity = list[prodIndex].quantity - 1
            removeTotalQuantity()
        } else {
            list.splice( prodIndex , 1)
            removeTotalQuantity()
        }
    }

    return <>
        <CartContext.Provider value= {{ list, addProd, cleanList, totalQuantityCart, setTotalQuantityCart, deleteProd }} >
            {children}
        </CartContext.Provider>
    </>
}