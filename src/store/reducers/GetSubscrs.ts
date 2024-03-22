import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface getSubscrs {
    userInfo: any;
    isLoading: boolean;
    msg: string;
}


const initialState: getSubscrs = {
    userInfo: '',
    isLoading: false,
    msg: ''
}

export const GetSubscrs = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        getSubscrsExt(state) {
            state.isLoading = true;
        },
        getSubscrsExtSuccess(state, action: PayloadAction<any>) {
            state.isLoading = false;
            state.msg = '';
            state.userInfo = action.payload;
            action.payload.success === false && localStorage.removeItem('userToken');
        },
        getSubscrsExtError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.msg = action.payload
            localStorage.removeItem('userToken');
        },

    }
})

export default GetSubscrs.reducer