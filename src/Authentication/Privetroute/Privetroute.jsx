import { Navigate, useLocation } from 'react-router';
import useAuth from '../../Hook/UseAuth';
import Loader from '../../components/Loader';

const PrivetRoute = ({children}) => {
    const {user, loading} = useAuth();

    const location = useLocation();
    if(loading){
        return <Loader />
    }
    if(!user){
        return <Navigate to="/login" replace state={location?.pathname} />;
    }
    return children;
}

export default PrivetRoute