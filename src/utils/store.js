import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/userAuth'

const token = localStorage.getItem("token")

const store = configureStore({
    reducer: {
        user: userReducer
    },
    preloadedState: {
        user: {
            token: token || null,
            data: null,
            error: null
        }
    }
})

export default store