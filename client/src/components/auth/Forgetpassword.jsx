import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Forgetpassword = () => {
    // const { id, token } = useParams()
    // const { currentUser } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('mohamedwael4553@gmail.com')
    const Forgetpassword = async () => {
        await axios.post(`${process.env.BASE_API_URL_HOST}/auth/forgot-password`, { email })
            .then((res) => {
                toast.success("Check your Email message")
                console.log(res.data)
                setLoading(false)
                // navigate(`/Forgetpassword/${id}/${token}`)
            })
            .catch((error) => {
                toast.error(error.message)
                setLoading(false)
            })
    }
    return (
        <>
            <div>
                <p>Forgetpassword</p>
                {/* <p>email :: {currentUser?.email}</p> */}
                {/* <p>id :: {id}</p> */}
                {/* <p>token ::{token}</p> */}
                {/* <input type="text" placeholder='enter new password' value={password} /> */}
                <input type="text" className='p-2 border-[3px] border-black rounded-2xl w-96' placeholder='Enter Your Email' onChange={(e) => setEmail(e.target.value)} value={email} />
                <br />
                <br />
                <button onClick={Forgetpassword}>Send</button>
            </div>
        </>
    )
}

export default Forgetpassword