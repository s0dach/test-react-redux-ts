import React from 'react';
import {useAppDispatch} from "./hooks/redux";
import {LoginForm} from "./components/LoginForm";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import UserInfoForm from "./components/UserInfoForm";

function App() {
    const dispatch = useAppDispatch()


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<UserInfoForm />} />
                <Route path="/*" element={<UserInfoForm />} />
                <Route path="/login" element={<LoginForm />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
