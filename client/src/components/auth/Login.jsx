import React, { useEffect, useState } from 'react'
import './Account.css'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaFacebook, FaGithub } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import Logo from "../../assets/img/logo/03.png"
import Loader from '../loader/Loader';
import axios from 'axios';

import Cookies from "universal-cookie";
const Login = () => {
    const cookies = new Cookies();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    // axios.defaults.withCredentials=true;
    const Handlelogin = async (e) => {
        e.preventDefault();
        setLoading(true)
        if (!email || !password) {
            toast.success("Please fill out all the fields!");
            setLoading(false)
            return;
        }
        else {
            // await axios.post('https://mern-lava-server.onrender.com/api/auth/login', { email, password })
            // await axios.post('https://mern-lava-server.vercel.app/api/auth/login', { email, password })
            await axios.post(`${process.env.BASE_API_URL_HOST}/auth/login`, { email, password })
                .then(res => {
                    console.log(res.data, "userRegister");
                    if (res.data.status == "ok") {
                        toast.success("Signin successfully");
                        cookies.set("TOKEN", res.data.data, {
                            path: "/",
                        });
                        // window.localStorage.setItem("token", res.data.data);
                        // window.localStorage.setItem("loggedIn", true);
                        window.location.href = "/";
                        // navigate('/')
                        setLoading(false)
                    }
                    else {
                        toast.error("error")
                        setLoading(false)
                        setEmail('')
                        setPassword('')
                    }
                })
                .catch((err) => {
                    console.log(err)
                    setLoading(false)
                    setEmail('')
                    setPassword('')

                })

        }
    }

    const [token, setToken] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        setToken(token);
    }, []);

    useEffect(() => {
        if (token) {
            // Save the token to local storage or state for future use
            // You can also redirect the user to the home page or perform other actions
            toast.success("Signin successfully");
            cookies.set("TOKEN", token, {
                path: "/",
            });
            // window.localStorage.setItem("token", res.data.data);
            // window.localStorage.setItem("loggedIn", true);
            window.location.href = "/";

        }
    }, [token])

    return (
        <>
            {/* <ToastContainer /> */}
            {loading ? <Loader />
                : <div className='body'>
                    <div className="wrapper">
                        <div className="form-box login">
                            <img className='w-[200px] mx-auto my-4' src={Logo} alt="" />
                            <h2 className='mb-6 text-center'>Login with your carwash account</h2>
                            <form className='form' >
                                <div className="input-box">
                                    <span className="icon">
                                        <ion-icon name="mail"></ion-icon>
                                    </span>
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    <label>Email</label>
                                </div>
                                <div className="input-box">
                                    <span className="icon">
                                        <ion-icon name="lock-closed"></ion-icon>
                                    </span>
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                    <label>Password</label>
                                </div>
                                <button onClick={Handlelogin} type="submit" className="btn" id="login_btn">
                                    Login
                                    {/* {`${loading ? `Login ....` : `Login`}`} */}
                                </button>
                                <button className="btn" id="forget_btn">
                                    <Link to='/forgetpassword' >Forget Password</Link>
                                </button>
                                <div className="login-register">
                                    <p>Don't have an acoount ?
                                        <Link to="/Signup" className="register-link"> Register</Link>
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 my-5">
                                    <hr className="w-full border-slate-800" />
                                    <p className='text-black'>OR</p>
                                    <hr className="w-full border-slate-800" />
                                </div>
                                <div className="flex text-black w-2/3 mx-auto justify-evenly py-2 px-4 rounded shadow font-semibold">
                                    <a className='' href={`${process.env.BASE_API_URL_HOST}/passport/google`}>
                                        <FcGoogle size={33} />

                                    </a>

                                    <a className='text-[#477cff]' href={`${process.env.BASE_API_URL_HOST}/passport/facebook`}>
                                        <FaFacebook size={30} />
                                    </a>
                                    <a className='' href={`${process.env.BASE_API_URL_HOST}/passport/github`}>
                                        <FaGithub size={30} />

                                    </a>
                                </div>
                            </form>

                        </div>

                    </div>
                </div>
            }
        </>
    )
}

export default Login