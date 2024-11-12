import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import MainPage from './pages/MainPage';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import RegisterConfirmation from './pages/RegisterConfirmationPage';
import 'react-toastify/dist/ReactToastify.css';
import PublicRoutes from './utils/PublicRoutes';
import ProtectedRoutes from './utils/ProtectedRoutes';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path='/' element={<MainPage />} />
            </Route> 
            <Route element={<PublicRoutes />}>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Route>
            <Route path='/regConfirm/:token' element={<RegisterConfirmation />} />
            <Route path='*' element={<Navigate to={"/"} />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
