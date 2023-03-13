import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null },
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken } = action.payload
            state.token = accessToken
        },
        signOut: (state, action) => {
            state.token = null
            toast.success('You have been signed out.', {
                position: "bottom-right",
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        },
    }
})

export const { setCredentials, signOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.token