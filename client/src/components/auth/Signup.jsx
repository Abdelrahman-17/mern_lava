import React, { useEffect, useState } from 'react'
import './Account.css'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsGoogle } from 'react-icons/bs'
import Loader from '../loader/Loader';
import axios from 'axios';
import { v4 as uuid } from "uuid"
import Cookies from 'universal-cookie';
import Logo from "../../assets/img/logo/03.png"

const Signup = () => {
    const cookies = new Cookies();
    // const [firstname, setFirstname] = useState("");
    // const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    // const [cPassword, setcPassword] = useState("");
    // const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [photoimage, setPhotoimage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // setImage(file);
            const reader = new FileReader();
            reader.onloadend = async () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
        else {
            // setImage(null);
            setImagePreview(null);
        }
    }
    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true)
        const uid = uuid()
        const base64Data = imagePreview;
        await axios.post(`${process.env.BASE_API_URL_HOST}/auth/upload-image`, { image: base64Data, uid: uid })
            .then((res) => {
                // console.log(res);
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
        await axios.post(`${process.env.BASE_API_URL_HOST}/auth/get-image`, { uid: uid })
            .then((res) => {
                // console.log(res)
                setPhotoimage(res.data.data.image)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })

        if (!username || !email || !phone || !password) {
            setLoading(false)
            toast.error("Please fill the form")
        }
        else {
            // await axios.post('http://localhost:5000/${process.env.BASE_API_URL_HOST}/auth/register', { username, email, phone, password })
            await axios.post(`${process.env.BASE_API_URL_HOST}/auth/register`, { username, email, phone, password, photoimage })
                // .then(res => console.log(res.data))
                .then((res) => {
                    console.log(res.data);
                    if (res.data.status == "ok") {
                        toast.success("Registration Successful");
                        setLoading(false)
                        // cookies.set("TOKEN", res.data.data, {
                        //     path: "/",
                        // });
                        // window.localStorage.setItem("token", res.data.data);
                        // window.localStorage.setItem("loggedIn", true);
                        // window.location.href = "/";
                        // navigate('/login')
                        window.location.href = "./login";
                    }
                    else {
                        toast.error(res.data.status);
                        setLoading(false)
                        // window.location.href = "./login";
                    }
                })
                .catch((err) => {
                    toast.error(err.message);
                    setLoading(false)
                })
        }

    }

    // const handleGoogleSignup = async () => {
    //     try {
    //         const provider = new GoogleAuthProvider();
    //         const userCredential = await signInWithPopup(auth, provider);
    //         const user = userCredential.user;
    //         await updateProfile(user, {
    //             displayName: user.displayName,
    //             photoURL: user.photoURL,
    //             phoneNumber: ''
    //         });
    //         await setDoc(doc(db, "users", user.uid), {
    //             uid: user.uid,
    //             fullName: '',
    //             displayName: user.displayName,
    //             email: user.email,
    //             address: '',
    //             photoURL: user.photoURL,
    //             phoneNumber: ''
    //             // password: user.reloadUserInfo.passwordHash,
    //         });
    //         // navigate("/");
    //         toast.success("Signin successfully");

    //     } catch (error) {
    //         toast.error(error);
    //     }
    // };
    return (
        <>
            {/* <ToastContainer /> */}
            {loading ? <Loader />
                : <div className='body'>
                    {/* <div className="mb-8 -translate-y-5">
                    <div className="flex gap-4 items-center">
                        <img src={Logo} className="w-20" />
                        <h1 className="font-black text-slate-700  dark:text-white text-4xl">LavaApp</h1>
                    </div>
                </div> */}
                    <div className="wrapper">

                        <div className="form-box register">
                            <img className='w-[200px] mx-auto my-4' src={Logo} alt="" />
                            <h2 className='mb-6 text-center'>Create your carwash account</h2>
                            <form onSubmit={handleRegister}>
                                {/* <div className="input-box">
                                    <span className="icon">
                                        <ion-icon name="person"></ion-icon>
                                    </span>
                                    <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                                    <label>First Name</label>
                                </div>
                                <div className="input-box">
                                    <span className="icon">
                                        <ion-icon name="person"></ion-icon>
                                    </span>
                                    <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                                    <label>Last Name</label>
                                </div> */}
                                <div className="input-box">
                                    <span className="erroruser error text-danger"></span>
                                    <span className="icon">
                                        <ion-icon name="person"></ion-icon>
                                    </span>
                                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                                    <label>Username</label>
                                </div>
                                <div className="input-box">
                                    <span className="erroremail error text-danger"></span>
                                    <span className="icon">
                                        <ion-icon name="mail"></ion-icon>
                                    </span>
                                    <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    <label>Email</label>
                                </div>
                                <div className="input-box">
                                    <span className="errorphone error text-danger"></span>
                                    <span className="icon">
                                        <ion-icon name="call"></ion-icon> </span>
                                    <input type="tel" name="Phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                                    <label>Phone</label>
                                </div>
                                <div className="input-box">
                                    <span className="errorpassword error text-danger"></span>
                                    <span className="icon">
                                        <ion-icon name="lock-closed"></ion-icon>
                                    </span>
                                    <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                    <label>Password</label>
                                    <div className="strength"></div>
                                </div>
                                {/* <div className="input-box">
                                <span className="errorconfpassword error text-danger"></span>
                                <span className="icon">
                                    <ion-icon name="lock-closed"></ion-icon>
                                </span>
                                <input type="password" name="" id="confpassword" value={cPassword} onChange={(e) => setcPassword(e.target.value)}  />
                                <label>Confirm Password</label>
                            </div> */}
                                <label
                                    htmlFor="profile"
                                    className="cursor-pointer flex items-center gap-3 justify-center my-2"
                                >
                                    <p className='text-black'>Profile Image</p>
                                    {imagePreview && (
                                        <img style={{ border: "3px solid white" }}
                                            className="w-14 h-14 rounded-full"
                                            // src={URL.createObjectURL(image)}
                                            src={imagePreview}
                                        />
                                    )}
                                </label>
                                <input
                                    type="file"
                                    id="profile"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    onChange={handleImageChange}
                                // onChange={(e) => setImage(e.target.files[0])}
                                />
                                <button type="submit" id="register_btn" className="btn">
                                    Register
                                    {/* {loading?'Register....':'Register'} */}
                                </button>
                                <div className="login-register">
                                    <p>Already have an acoount ?
                                        <Link to="/Login" className="login-link"> Login</Link>
                                    </p>
                                </div>
                            </form>
                            <div className="flex items-center gap-3 my-2">
                                <hr className="w-full border-slate-300" />
                                <p className='text-black'>OR</p>
                                <hr className="w-full border-slate-300" />
                            </div>
                            <button
                                className="flex  bg-[#477cff] text-white w-full justify-between py-2 px-4 rounded shadow font-semibold"

                            >
                                {/* <GoogleIcon /> */}
                                <BsGoogle size={20} />
                                <span>Continue with Google</span>
                                <span></span>
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Signup