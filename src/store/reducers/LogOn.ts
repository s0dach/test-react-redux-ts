import {UserToken} from "../../models/UserToken";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export interface UserState {
    user: any;
    isLoading: boolean;
    msg: string;
}


const initialState: UserState = {
    user: null,
    isLoading: false,
    msg: ''
}

export const LogOn = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logOnExt(state) {
            state.isLoading = true;
        },
        logOnExtSuccess(state, action: PayloadAction<UserToken[]>) {
            state.isLoading = false;
            state.msg = '';
            state.user = action.payload;
        },
        logOnExtError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.msg = action.payload
        },
    }
})

export default LogOn.reducer