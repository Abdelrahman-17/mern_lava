import React, { Fragment, useContext, useEffect, useState } from 'react'
import './Security.css'
import { Link, json } from 'react-router-dom'
import { useSelector } from 'react-redux'
// import { authuser } from '../../redux/slice/authslice'
// import { auth, db, storage } from '../../firebase/config'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoPencil } from "react-icons/go";
import { AuthContext } from '../../context/AuthContext'
// import { sendPasswordResetEmail, updateProfile } from 'firebase/auth'
// import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore'
// import { getDownloadURL, getStorage, ref, uploadBytesResumable, uploadString } from 'firebase/storage'
import Loader from '../loader/Loader'
import axios from 'axios';
import Cookies from 'universal-cookie';
import { v4 as uuid } from "uuid"

const Security = () => {
    const cookies = new Cookies();
    const [fullname, setFullname] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [gender, setGender] = useState("")
    const [photoimage, setPhotoimage] = useState("")
    const [activeedit, setActiveedit] = useState(false)
    const { currentUser } = useContext(AuthContext)
    const [users, setUsers] = useState([])
    const [currentuser, setCurrentuser] = useState([])
    const [loading, setLoading] = useState(false)
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        setFullname(currentUser?.fullname)
        setUsername(currentUser?.username)
        setEmail(currentUser?.email)
        setAddress(currentUser?.address)
        setPhoneNumber(currentUser?.phoneNumber)
        setImagePreview(currentUser?.photoimage)
        setGender(currentUser?.gender)
    }, [currentUser])
    const onresethandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        // update_user_data
        const email = currentUser?.email;
        const id = currentUser?._id;
        // 65dcfa5efc8963c8e7121108 
        const token = cookies.get('TOKEN')
        // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcxMDc4MzA2MywiZXhwIjoxNzEyMDc5MDYzfQ.9uMu2XLnC1dgoQXGy-a4YDmIuDllZPMzxfCCS0yp-U8        // await axios.post(`${process.env.BASE_API_URL_HOST}/auth/forgot-password`, { email })
        // await axios.post(`${process.env.BASE_API_URL_HOST}/auth/verify/${token}`)
        await axios.get(`${process.env.BASE_API_URL_HOST}/auth/reset-password/${id}/${token}`)
            .then((res) => {
                // toast.success("check your Email inbox")
                toast.success(res.data.status)
                setLoading(false)
            })
            .catch((error) => {
                toast.error(error.message)
                setLoading(false)
            })


    }
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };
    const save = async (e) => {
        e.preventDefault();
        // const uid = uuid()
        const uid = currentUser?._id
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
        if (photoimage) {
            await axios.post(`${process.env.BASE_API_URL_HOST}/auth/update-user-data`, { uid, email, username, phoneNumber, address, fullname, gender, photoimage })
                .then((res) => {
                    // toast.success("check your Email inbox")
                    toast.success(res.data.status)
                    setLoading(false)
                    setActiveedit(false)
                })
                .catch((error) => {
                    toast.error(error.message)
                    setLoading(false)
                    setActiveedit(false)
                })
        }

    }
    return (
        <>
            {loading ? <Loader />
                : <div className='security'>
                    <div className='data-profile' key={currentuser?.id}>
                        <GoPencil className='icon' size={30} onClick={() => setActiveedit(!activeedit)} color='#1f93ff' />
                        <div className={`${activeedit ? 'active input-box' : 'input-box'}`}>
                            <label htmlFor='fullname'>Full Name </label>
                            <p> : </p>
                            <input type="text" id='fullname' placeholder={`${activeedit ? 'Enter your Full Name' : ''}`} disabled={activeedit ? false : true} value={fullname} onChange={(e) => setFullname(e.target.value)} />
                        </div>
                        <div className={`${activeedit ? 'active input-box' : 'input-box'}`}>
                            <label htmlFor='username'>Username </label>
                            <p> : </p>
                            <input type="text" id='username' placeholder={`${activeedit ? 'Enter your Username' : ''}`} disabled={activeedit ? false : true} value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className={`${activeedit ? 'active input-box' : 'input-box'}`}>
                            <label htmlFor='email'>Email </label>
                            <p> : </p>
                            <input type="email" id='email' placeholder={`${activeedit ? 'Enter your Email' : ''}`} disabled={activeedit ? false : true} value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className={`${activeedit ? 'active input-box' : 'input-box'}`}>
                            <label htmlFor='address'>Address </label>
                            <p> : </p>
                            <input type="text" id='address' placeholder={`${activeedit ? 'Enter your Address' : ''}`} disabled={activeedit ? false : true} value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>
                        <div className={`${activeedit ? 'active input-box' : 'input-box'}`}>
                            <label htmlFor='phoneNumber'>Phone Number </label>
                            <p> : </p>
                            <input type="tel" id='phoneNumber' placeholder={`${activeedit ? 'Enter your Phone Number' : ''}`} disabled={activeedit ? false : true} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        </div>
                        <div className={`${activeedit ? 'active input-box' : 'input-box'}`}>
                            <label htmlFor='gender'>Gender </label>
                            <p> : </p>
                            <input type="text" id='gender' placeholder={`${activeedit ? 'Enter your Gender' : ''}`} disabled={activeedit ? false : true} value={gender} onChange={(e) => setGender(e.target.value)} />
                        </div>
                        <div className={`${activeedit ? 'active input-box' : 'input-box'}`}>
                            <label htmlFor='photoimage'>photoimage </label>
                            <p> : </p>
                            {/* <label htmlFor='photoimage'>Select Your Profile Image </label> */}
                            {imagePreview &&
                                <img style={{ border: "3px solid black" }}
                                    className="w-16 h-16 rounded-full"
                                    src={imagePreview}
                                />
                            }
                            <input
                                type="file"
                                id="photoimage"
                                // disabled={activeedit ? false : true}
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={handleImageChange}
                            />

                            {
                                loading && <p>loading</p>
                            }
                        </div>
                        {
                            activeedit &&
                            <div className='edit'>
                                <button className='save' onClick={save}>save</button>
                                <button className='reset-pass' onClick={onresethandler}>reset pass</button>
                            </div>
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default Security