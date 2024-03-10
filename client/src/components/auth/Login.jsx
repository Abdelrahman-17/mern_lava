import React, { useContext, useEffect, useState } from 'react'
import './Account.css'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../context/AuthContext';
import { FaFacebook, FaGithub } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import Logo from "../../assets/img/logo/03.png"
import Loader from '../loader/Loader';
import axios from 'axios';

import Cookies from "universal-cookie";
const Login = () => {
    const cookies = new Cookies();
    const { currentUser } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
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

    // const handleGoogleSignup = async () => {
    //     try {
    //         const provider = new GoogleAuthProvider();
    //         const { user } = await signInWithPopup(auth, provider);
    //         const userDocRef = doc(db, "users", user.uid);
    //         const userDocSnap = await getDoc(userDocRef);
    //         if (!userDocSnap.exists()) {
    //             await setDoc(doc(db, "users", user.uid), {
    //                 uid: user.uid,
    //                 fullName: '',
    //                 displayName: user.displayName,
    //                 email: user.email,
    //                 address: '',
    //                 photoURL: user.photoURL,
    //                 phoneNumber: ''
    //                 // phoneNumber: user.phoneNumber
    //                 // password: user.reloadUserInfo.passwordHash,
    //             });
    //         }
    //         toast.success("Signin successfully");
    //         // navigate("/");
    //     } catch (error) {
    //         toast.error(error);
    //     }
    // };

    // useEffect(async () => {

    //     // e.preventDefault();
    //     setLoading(true)
    //     await axios.get(`${process.env.BASE_API_URL_HOST}/auth/token`,)
    //         .then(res => {
    //             console.log(res);
    //             // console.log(res.data, "userRegister");
    //             // if (res.data.status == "ok") {
    //             //     toast.success("Signin successfully");
    //             //     cookies.set("TOKEN", res.data.data, {
    //             //         path: "/",
    //             //     });
    //             //     // window.localStorage.setItem("token", res.data.data);
    //             //     // window.localStorage.setItem("loggedIn", true);
    //             //     window.location.href = "/";
    //             //     // navigate('/')
    //             setLoading(false)
    //             // }
    //             // else {
    //             //     toast.error("error")
    //             //     setLoading(false)
    //             //     setEmail('')
    //             //     setPassword('')
    //             // }
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //             setLoading(false)
    //             // setEmail('')
    //             // setPassword('')
    //         })
    // }, [])
    const Handleforget = async (e) => {
        e.preventDefault();
        const email = 'mohamedwael4553@gmail.com'
        await axios.post(`${process.env.BASE_API_URL_HOST}/auth/forgot-password`, { email })
            .then(res => { console.log(res) })
            .catch(err => console.log(err))
    }

    const [token, setToken] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        setToken(token);
    }, []);

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
    return (
        <>
            {/* <ToastContainer /> */}
            {loading ? <Loader />
                : <div className='body'>
                    {/* <div className="-translate-y-10 mb-8">
                    <div className="flex gap-4 items-center">
                        <img src={Logo} className="w-20" />
                        <h1 className="font-black text-slate-700  dark:text-white text-4xl">LavaApp</h1>
                    </div>
                </div> */}
                    <div className="wrapper">
                        <div className="form-box login">
                            <img className='w-[200px] mx-auto my-4' src={Logo} alt="" />
                            <h2 className='mb-6 text-center'>Login with your carwash account</h2>                            <form className='form' >
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
                            </form>
                            {/* <button onClick={Handleforget} className="btn" id="forget_btn">
                                Forget password
                            </button> */}
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
                            {/* <button
                                className="flex bg-[#477cff] text-white w-full justify-between py-2 px-4 rounded shadow font-semibold"
                            >
                                <BsGoogle size={20} />
                                <span>Continue with Google</span>
                                <span></span>
                            </button> */}
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
                        </div>

                    </div>
                </div>
            }
        </>
    )
}

export default Login