import { createSlice } from "@reduxjs/toolkit";
import axios from "../api/axios";

export function handleSubmit(email, password) {
    return async (dispatch) => {
        try {
            const response = await axios.post('/user/login',
                JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            const token = response.data.body.token
            localStorage.setItem("token", token)
            dispatch(login(token))
        } catch (error) {
            console.log(error)
            dispatch(setError(error.message))
        }
    }
}

export function getProfile(token) {
    return async (dispatch) => {
        try {
            const response = await axios.post('/user/profile', null,
                {
                    headers: {
                        'authorization': `Bearer ${token}`
                    }
                })
            dispatch(profile(response.data.body))
        } catch (error) {
            console.error(error);
        }
    }
}

export function updateProfile(firstName, lastName, token) {
    return async (dispatch) => {
        try {
            const response = await axios({
                method: 'put',
                url: '/user/profile',
                headers: {
                    'authorization': `Bearer ${token}`,
                },
                data: {
                    firstName: firstName,
                    lastName: lastName
                }
            });
            dispatch(updateName(response.data.body))
        } catch (error) {
            console.error(error);
        }
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: null,
        data: null,
        error: null
    },
    reducers: {
        login: {
            prepare: (token) => ({
                payload: { token }
            }),
            reducer: (draft, action) => {
                draft.token = action.payload.token;
            }
        },
        profile: {
            prepare: (data) => ({
                payload: { data }
            }),
            reducer: (draft, action) => {
                draft.data = action.payload.data;
            }
        },
        updateName: {
            prepare: (data) => ({
                payload: { data }
            }),
            reducer: (draft, action) => {
                draft.data = action.payload.data;
            }
        },
        logOut(draft) {
            draft.token = null
            draft.data = null
            draft.error = null
        },
        setError: {
            prepare: (error) => ({
                payload: { error }
            }),
            reducer: (draft, action) => {
                draft.error = action.payload.error;
            }
        }
    }
})

export const { login, profile, updateName, logOut, setError } = userSlice.actions
export default userSlice.reducer

