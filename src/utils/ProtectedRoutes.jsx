import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

export default function ProtectedRoutes(){
    return Cookies.get("auth") || Cookies.get("refresh") ? <Outlet/> : <Navigate to={"/login"}/>
}