import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { removeActiveUserHandler, setActiveUserHandler } from "../redux/slice/authslice";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const cookies = new Cookies();
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [admin, setAdmin] = useState(false);
    // const [token, setToken] = useState(localStorage.token)
    const token = cookies.get("TOKEN");
    const dispatch = useDispatch()
    // axios.defaults.withCredentials = true
    useEffect(() => {
        if (token) {
            // setLoading(true)
            axios.post(`${process.env.BASE_API_URL_HOST}/auth/userData`, { token })
                .then((res) => {
                    // console.log("userData", res);
                    // if (res.data.userType == "Admin") {
                    //     setAdmin(true);
                    // }
                    //    if(res.data.data == "token expired" || res.data.data == "token expired")
                    if (res.data.data == "token expired") {
                        // toast.info("Token expired login again");
                        // window.localStorage.clear();
                        // window.location.href = "./sign-in";
                        setCurrentUser(null)
                        dispatch(removeActiveUserHandler())
                        setLoading(false)
                    }
                    else {
                        setCurrentUser(res.data.data);
                        dispatch(setActiveUserHandler(res.data.data))
                        setLoading(false)
                    }
                });
        }
        else {
            dispatch(removeActiveUserHandler())
            setCurrentUser(null)
            setLoading(false)
        }
    }, [token]);
    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};