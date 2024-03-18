import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
const Resetpassword = () => {

    const { id, token } = useParams()
    const [password, setPassword] = useState('')
    const [confpassword, setConfpassword] = useState('')
    const [data, setData] = useState('')
    const navigate = useNavigate()
    const Resetpassword = async (e) => {
        e.preventDefault()
        if (password === confpassword) {

            await axios.post(`${process.env.BASE_API_URL_HOST}/auth/reset-password/${id}/${token}`, { password })
                .then((res) => {
                    toast.success(res.data.status)
                    // console.log(res.data)
                    // setData(res.data)
                    navigate('/')
                    // navigate(`/Resetpassword/${id}/${token}`)
                })
                .catch((error) => {
                    console.log(error);
                    // toast.error(error.message)
                })
        }
        else {
            toast.error('password not matched')
        }
    }
    return (
        <>
            <div>

                <input type="text" placeholder='Enter New Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="text" placeholder='Confirm New Password' value={confpassword} onChange={(e) => setConfpassword(e.target.value)} />
                <button onClick={Resetpassword}>confirm</button>
            </div>

        </>
    )
}

export default Resetpassword