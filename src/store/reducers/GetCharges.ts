import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export interface getChargesState {
    results: any;
    isLoad: boolean;
    msg: string;
}


const initialState: getChargesState = {
    results: '',
    isLoad: false,
    msg: ''
}

export const GetCharges = createSlice({
    name: 'getCharges',
    initialState,
    reducers: {
        getChargesExt(state) {
            state.isLoad = true;
        },
        getChargesExtSuccess(state, action: PayloadAction<any>) {
            state.isLoad= false;
            state.results = action.payload;
            action.payload.success === false && localStorage.removeItem('userToken');
        },
        getChargesExtError(state, action: PayloadAction<string>) {
            state.isLoad = false;
            localStorage.removeItem('userToken');
        },

    }
})

export default GetCharges.reducer