import { Product } from "@/hooks/productHooks";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

type addedState = {
    addedProducts: Product[];
}

const initialState: addedState = {
    addedProducts: [],
}


export const cartSlice = createSlice({
    name: 'addedProduct',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<Product>) => {
            state.addedProducts.push(action.payload);
        },
        remove: (state, action: PayloadAction<Product>) => {
            state.addedProducts = state.addedProducts.filter(f => f.id !== action.payload.id);
        },
    }
})

export const { add, remove } = cartSlice.actions;
export const selectAddedProducts = (state: RootState) => state.cart.addedProducts;