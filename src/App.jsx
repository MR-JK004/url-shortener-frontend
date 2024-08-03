import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import ActivationPage from './components/ActivationPage'
import ProtectedRoute from './utils/ProtectedRoute'
import UrlShortner from './components/UrlShortner'
import UrlCountDisplay from './components/urlCountDisplay'
import UrlListDisplay from './components/UrlListDisplay'
import ForgetPasswordPage from './components/ForgetPasswordPage'
import ResetPasswordPage from './components/ResetPasswordPage'

function App() {
  return <>
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/forget-password' element={<ForgetPasswordPage/>}/>
            <Route path="/reset-password/:token" element={<ResetPasswordPage/>} />
            <Route path="/user/activation-link/:token" element={<ActivationPage/>} />
            <Route path='/url-shortner' element={<ProtectedRoute><UrlShortner/></ProtectedRoute>}/>
            <Route path='/url-shortner/dashboard' element={<ProtectedRoute><UrlCountDisplay/></ProtectedRoute>}/>
            <Route path='/url-shortner/url-list' element={<ProtectedRoute><UrlListDisplay/></ProtectedRoute>}/>
        </Routes>
    </BrowserRouter>
  </>
}

export default App


