import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from 'react-router-dom';
const ProtectedRoute = (props) => {
    const { currentUser } = useContext(AuthContext);
    if (currentUser?.email) {
        return (
            props.children
        )
    }
    else if (!currentUser) {
        return <Navigate to='/Login' />
    }
};
export default ProtectedRoute

// const PrivateRoute = ({ children, ...rest }) => {
//     let auth = { 'token': false }
//     return (
//         <Route {...rest}>
//             {!auth.token
//                 ?
//                 <Redirect to="/login" />
//                 :
//                 children}
//         </Route>
//     )
// }
// const PrivateRoutes = () => {
//     let auth = { 'token': true }
//     return (
//         auth.token ? <Outlet /> : <Navigate to='/login' />
//     )
// }