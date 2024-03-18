import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const Otp = () => {
    const [keyvalue, setKeyvalue] = useState('')
    const params = new URLSearchParams(window.location.search);
    const key = params.get('key');
    const token = params.get('token');
    console.log('key', typeof (key));
    console.log('token', token);

    const confirm = async (e) => {
        e.preventDefault()
        if (keyvalue === key) {
            // await axios.post(`http://localhost:5000/send-sms`, { phoneNumber: "01010055884" })
            await axios.get(`${process.env.BASE_API_URL_HOST}/auth/verify/${token}`)
                .then(res => console.log(res.data))
                .catch(err => console.log(err))
        }
        else {
            toast.error('error key')
        }
    }
    return (
        <div className="form-box otp">
            <h2>OTP Verification</h2>
            <div id="otp">
                <p id="otpmessage">We've sent vertification code to your email : </p>
            </div>
            <br /><br />
            <form>
                <div className="inputbox">
                    <label>Enter verification code</label>
                    <br />
                    <input type="text" name="key" value={keyvalue} onChange={(e) => setKeyvalue(e.target.value)} required />
                </div>
                <button className="btn" onClick={confirm}>Submit</button>
            </form>
        </div>)
}

export default Otp