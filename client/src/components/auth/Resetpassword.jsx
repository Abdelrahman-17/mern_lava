import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loader from '../loader/Loader'
const Resetpassword = () => {

    const { id, token } = useParams()
    const { currentUser } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState('mohamedwael')
    const [data, setData] = useState('')
    const navigate = useNavigate()
    const Resetpassword = async (e) => {
        e.preventDefault()
        setLoading(true)
        await axios.post(`${process.env.BASE_API_URL_HOST}/auth/reset-password/${id}/${token}`, { password: "mohamedwael" })
            .then((res) => {
                toast.success(res.data.status)
                // console.log(res.data)
                // setData(res.data)
                setLoading(false)
                navigate('/')
                // navigate(`/Resetpassword/${id}/${token}`)
            })
            .catch((error) => {
                console.log(error);
                // toast.error(error.message)
                setLoading(false)
            })
    }
    return (
        <>
            {loading ? <Loader />
                : <div>
                    <p>Resetpassword</p>
                    <p>email :: {currentUser?.email}</p>
                    <p>id :: {id}</p>
                    <p>token ::{token}</p>
                    {/* {data &&
                    <div dangerouslySetInnerHTML={{ __html: data }} />
                } */}
                    <input type="text" placeholder='enter new password' value={password} />
                    <button onClick={Resetpassword}>confirm</button>
                </div>
            }
        </>
    )
}

export default Resetpassword