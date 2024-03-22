import {AppDispatch} from "../index";
import {LogOn} from "./LogOn";
import {GetSubscrs} from "./GetSubscrs";
import {GetCharges} from "./GetCharges";
import axios from "axios";


export const LogOnExt = (data: any) => async (dispatch: AppDispatch) => {
    try {
        const url: string = process.env.REACT_APP_URL!;
        dispatch(LogOn.actions.logOnExt())
        const response = await axios.post(`http://${url}/proxy/Ext/LogOnExt`, data)
        dispatch(LogOn.actions.logOnExtSuccess(response.data))
    } catch (e) {
        dispatch(LogOn.actions.logOnExtError("Ошибка при авторизации"))
    }
}

export const GetSubscrsExt = (ExtToken: string) => async (dispatch: AppDispatch) => {
    try {
        const url: string = process.env.REACT_APP_URL!;
        dispatch(GetSubscrs.actions.getSubscrsExt())
        const response = await axios.post(`http://${url}/proxy/Ext/GetSubscrsExt`, {ExtToken});
        dispatch(GetSubscrs.actions.getSubscrsExtSuccess(response.data))
    } catch (e) {
        dispatch(GetSubscrs.actions.getSubscrsExtError("Ошибка при получении информации клиента"))
    }
}

export const GetChargesExt = (data: any) => async (dispatch: AppDispatch) => {
    try {
        const url: string = process.env.REACT_APP_URL!;
        dispatch(GetCharges.actions.getChargesExt())
        const response = await axios.post(`http://${url}/proxy/Ext/GetChargesExt`, {data});
        dispatch(GetCharges.actions.getChargesExtSuccess(response.data))
    } catch (e) {
        dispatch(GetCharges.actions.getChargesExtError("Ошибка при получении начислений"))
    }
}