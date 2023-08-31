import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { List } from "../../components/ListsComponents/ListsComponents";

const initialState: List = {
    listName: "",
    products: [],
    finalCalories: 0,
}

export const listSlice = createSlice({
    name: "list",
    initialState,
    reducers: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        addProduct: (state: any, action: PayloadAction<List>) => {
            return {
                ...state,
                ...action.payload
            }
        },
        changeNickname: (state: List, action: PayloadAction<List>) => {
            state.listName = action.payload.listName
        },
    }
})

export const { addProduct, changeNickname } = listSlice.actions

export default listSlice.reducer
