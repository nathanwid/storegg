import { RootState } from ".";
import { createSlice } from "@reduxjs/toolkit";
import { add, remove } from "./cartSlice";

type BalanceState = {
    balance: number
}

const initialState: BalanceState = {
    balance: 500
}

export const balanceSlice = createSlice({
    name: "balance",
    initialState,
    reducers: {
        add: (state, action) => {
            state.balance += action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(add, (state, action) => {
                state.balance -= action.payload.price;
            })
            .addCase(remove, (state, action) => {
                state.balance += action.payload.price;
            })
    }
  });
  
  export const selectBalance = (state: RootState) => state.balance.balance