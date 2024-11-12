import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

export default function PublicRoutes(){
    return Cookies.get("auth") || Cookies.get("refresh") ? <Navigate to={"/"}/> : <Outlet/>
}