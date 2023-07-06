//React
import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom"

import SignIn from '../pages/SignIn'
import Register from '../pages/Register'
import Home from '../pages/Home'
import TargetRegister from '../pages/TargetRegister'
import UserUpdate from '../pages/UserUpdate'
import TargetUpdate from '../pages/UpdateTarget'

export const AppRoutes = () => {

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" index element={<Home />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/register" element={<Register />} />
                <Route path="/targetRegister" element={<TargetRegister />} />
                <Route path="/userUpdate" element={<UserUpdate />} />
                <Route path="/targetUpdate" element={<TargetUpdate />} />
                <Route path="/targetRegister" element={<TargetRegister />} />

                <Route path="*" element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}