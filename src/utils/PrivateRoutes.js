import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { selectToken } from "./selectors";

const PrivateRoutes = () => {
    const token = useSelector(selectToken)
    return (
        token ? <Outlet /> : <Navigate to='/login' />
    )
}

export default PrivateRoutes
