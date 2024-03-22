import { combineReducers, Reducer } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer, { UserState } from './reducers/LogOn';
import userInfoReducer, { getSubscrs } from './reducers/GetSubscrs';
import getChargesReducer, { getChargesState } from './reducers/GetCharges';

export interface RootState {
    user: UserState;
    userInfo: getSubscrs;
    getCharges: getChargesState;
}

const rootReducer: Reducer<RootState> = combineReducers({
    user: userReducer,
    userInfo: userInfoReducer,
    getCharges: getChargesReducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
};

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];