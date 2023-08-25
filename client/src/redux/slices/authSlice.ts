import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type AuthType = {
    username: string,
    calories: number,
    loggedIn: boolean
}



const initialState: AuthType = {
    username: "",
    calories: 0,
    loggedIn: false
}


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state: AuthType, action: PayloadAction<AuthType>) => {
            state.username = action.payload.username
            state.calories = action.payload.calories
            state.loggedIn = true
        },
        logoff: (state: AuthType) => {
            state.username = ""
            state.calories = 0
            state.loggedIn = false
        },
        changeCalories: (state: AuthType, action: PayloadAction<AuthType>) => {
            state.calories = action.payload.calories
        }
    }
})

export const { login, logoff } = authSlice.actions

export default authSlice.reducer