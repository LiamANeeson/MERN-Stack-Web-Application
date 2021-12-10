import React from "react"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'


const App = () => {
    return(
    <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/login"  element={<Login />} />
                    <Route path="/register"  element={<Register />} />
                    <Route path="/dashboard"  element={<Dashboard />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </BrowserRouter>
    </div>
    )
}

export default App