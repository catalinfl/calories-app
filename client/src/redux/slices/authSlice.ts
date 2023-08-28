import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type AuthType = {
    username: string,
    calories: number,
    loggedIn: boolean
    exp: number
}

const initialState: AuthType = {
    username: "",
    calories: 0,
    loggedIn: false,
    exp: 0
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state: AuthType, action: PayloadAction<AuthType>) => {
            state.username = action.payload.username
            state.calories = action.payload.calories
            state.exp = action.payload.exp
            state.loggedIn = true
        },
        logoff: (state: AuthType) => {
            state.username = ""
            state.calories = 0
            state.loggedIn = false
            state.exp = 0
        },
        changeCalories: (state: AuthType, action: PayloadAction<AuthType>) => {
            state.calories = action.payload.calories
        }
    }
})

export const { login, logoff } = authSlice.actions

export default authSlice.reducer