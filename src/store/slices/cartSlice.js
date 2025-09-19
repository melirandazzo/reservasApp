import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        user: "Demo",
        updatedAt: new Date().toLocaleString(),
        cartItems: [],
        total: 0
    },
    reducers: {
        addItemTocart: (state, action) => {
            const {product, quantity, selectedDate} = action.payload
            const productInCart = state.cartItems.find(item=>item.id===product.id)
            if(!productInCart){
                state.cartItems.push({...product,quantity, selectedDate: selectedDate || null})
            }else{
                productInCart.quantity+=1
                if(selectedDate) productInCart.selectedDate = selectedDate
            }
            state.updatedAt = new Date().toLocaleString();
            state.total = state.cartItems.reduce((acc,item)=> acc + item.price*item.quantity, 0)
        },
        updateItemDate: (state, action) => {
            const { id, selectedDate } = action.payload
            const productInCart = state.cartItems.find(item => item.id === id)
            if (productInCart) {
                productInCart.selectedDate = selectedDate
                state.updatedAt = new Date().toLocaleString();
            }
        },
        removeItemFromCart: (state, action) => {
            const id = action.payload
            state.cartItems = state.cartItems.filter(item => item.id !== id)
            state.updatedAt = new Date().toLocaleString();
            state.total = state.cartItems.reduce((acc,item)=> acc + item.price*item.quantity, 0)
        }
    }
})

export const { addItemTocart, updateItemDate, removeItemFromCart } = cartSlice.actions

export default cartSlice.reducer