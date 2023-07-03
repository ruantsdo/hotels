//React
import React from "react";


import { Routes, Route } from "react-router-dom"

import SignIn from '../pages/SignIn'
import Register from '../pages/Register'
import Home from '../pages/Home'
import TargetRegister from '../pages/TargetRegister'
import UserUpdate from '../pages/UserUpdate'
import TargetUpdate from '../pages/UpdateTarget'

const response = localStorage.getItem('@APPAuth:token')
const token = JSON.parse(response)

const AppRoutes = () => {
    return(
        <Routes>
            <Route path="/" index element={<SignIn />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    )    
}

const AuthRoutes = () => {
    return(
        <Routes>
            <Route path="/home" index element={<Home />} />
            <Route path="/targetRegister" element={<TargetRegister />} />
            <Route path="/userUpdate" element={<UserUpdate />} />
            <Route path="/targetUpdate" element={<TargetUpdate />} />
            <Route path="/targetRegister" element={<TargetRegister />} />
        </Routes>
    )
}

export const Router = () => {
    return(
       token ? <AuthRoutes /> : <AppRoutes />
    )
}