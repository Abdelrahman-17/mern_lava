import React, { useContext } from 'react'
import Signup from '../../components/auth/Signup'
import { AuthContext } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

const SignupPage = () => {
    const { currentUser, loading } = useContext(AuthContext);
    // const ProtectedRoute = ({ children }) => {
    //     if (!currentUser) {
    //         return children;
    //     }
    //     else if (currentUser?.email) {
    //         return < Navigate to='/' />
    //     }
    // };
    return (
        // <ProtectedRoute>
        <Signup />
        // </ProtectedRoute>

    )
}

export default SignupPage