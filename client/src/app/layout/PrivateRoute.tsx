import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../stores/configureStore';

export const PrivateRoute = () => {
    const { account } = useAppSelector((state) => state.account);
    // หน้าปัจจุบันอยู่ที่ไหน
    let location = useLocation(); //บันทึกพาทปัจจุบัน

    if (!account) return <Navigate to="/" state={{ from: location }} replace />;

    return <Outlet />;
}


// ถ้าเราเข้าสู่ระบบแล้วจะไม่สามารถเข้าไปยังหน้า login ได้
export const PrivateLogin = ({ children }: { children: JSX.Element }) => {
    const { account } = useAppSelector((state) => state.account);
    let location = useLocation();
    let path = localStorage.getItem("savepath");
    
    if (path == null) path = "/feed";
    
    if (account) return  <Navigate to={`${path}`} state={{ from: location }} replace />
    
    return children;
};