import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import HeroCard from '../ui/herocard/HeroCard'
const Forgetpassword = () => {
    // const { id, token } = useParams()
    // const { currentUser } = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const Forgetpassword = async () => {
        await axios.post(`${process.env.BASE_API_URL_HOST}/auth/forgot-password`, { email })
            .then((res) => {
                toast.success("Check your Email message")
                console.log(res.data)
                // navigate(`/Forgetpassword/${id}/${token}`)
            })
            .catch((error) => {
                toast.error(error.message)
            })
    }
    return (
        <>
            <HeroCard />
            <div>
                <p>Forgetpassword</p>
                <input type="text" className='p-2 border-[3px] border-black rounded-2xl w-96' placeholder='Enter Your Email' onChange={(e) => setEmail(e.target.value)} value={email} />
                <br />
                <br />
                <button onClick={Forgetpassword}>Send</button>
            </div>
        </>
    )
}

export default Forgetpassword