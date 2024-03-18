import React, { Fragment, useContext, useEffect, useState } from 'react'
import './Checkout.css'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { authuser } from '../../redux/slice/authslice';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext'
import { cartitem, clearcart, totalprice } from '../../redux/slice/cartslice'
import { getorders } from '../../redux/slice/orderslice';
import axios from 'axios';
import { getNotification } from '../../redux/slice/notificationslice';
// import { getNotification } from '../../redux/slice/notificationslice';
const Checkout = () => {
    const cart = useSelector(cartitem);
    const totprice = useSelector(totalprice);
    const dispatch = useDispatch()
    const { currentUser } = useContext(AuthContext)
    const navigate = useNavigate()
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    const [cardholder, setCardholder] = useState('')
    const [cardnumber, setCardnumber] = useState('')
    const [cardcode, setCardcode] = useState('')
    const [cardmonthexpr, setCardmonthexpr] = useState('')
    const [cardyearexpr, setCardyearexpr] = useState('')
    const [cardinner, setCardinner] = useState(false)

    const payment = async (e) => {
        e.preventDefault();
        await axios.post(`${process.env.BASE_API_URL_HOST}/store/checkout`,
            { orderdate: dateTime, orderamount: totprice, uid: currentUser?._id, orderitem: cart })
            .then(res => console.log(res))
            .catch(err => console.log(err))
        dispatch(getorders());
        dispatch(clearcart());
        toast.success("Payment successful", {
            position: "top-right",
        });
        const time = Date.now()
        await axios.post(`${process.env.BASE_API_URL_HOST}/notification/add-notification`,
            { uid: currentUser?._id, date: time, price: totprice, title: 'cart', description: 'cart' })
            .then(res => console.log(res))
            .catch(err => console.log(err))
        dispatch(getNotification());
        toast.info("Check Your Notification", {
            position: "bottom-right",
        });
        navigate("/")
        // navigate("/profile/notification")
        // navigate('/orders')

    }
    useEffect(() => {
        if (cart.length === 0) {
            navigate('/')
        }
    }, [cart.length])
    return (
        <>
            {/* <ToastContainer /> */}
            {/* <section className="checkout">
                <div className="payment">
                    <div className="visa">
                        <div className="visa-card">
                            <div className={`${cardinner ? 'card-inner active' : 'card-inner'}`}>
                                <div className="front">
                                    <img src="https://i.ibb.co/PYss3yv/map.png" className="map-img" />
                                    <div className="row">
                                        <img src="https://i.ibb.co/G9pDnYJ/chip.png" width="60px" />
                                        <img src="https://i.ibb.co/WHZ3nRJ/visa.png" width="60px" />
                                    </div>
                                    <div className="row card-no">
                                        <p className="num ">
                                            {cardnumber ? `${cardnumber}` : `#### #### #### ####`}
                                        </p>
                                    </div>
                                    <div className="row card-holder">
                                        <p>CARD HPLDER</p>
                                        <p>VALID TILL</p>
                                    </div>
                                    <div className="row name">
                                        <p className="name-card">
                                            {cardholder ? `${cardholder}` : `FULL NAME`}
                                        </p>
                                        <p>
                                            <span className="expires-card-month">MM</span>
                                            <span> /</span>
                                            <span className="expires-card-year">YY</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="back">
                                    <img src="https://i.ibb.co/PYss3yv/map.png" className="map-img" />
                                    <div className="bar"></div>
                                    <div className="row card-cvv">
                                        <div>
                                            <img src="https://i.ibb.co/S6JG8px/pattern.png" />
                                        </div>
                                        <p className="code-card">{cardcode}</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <form action='/Orders' onSubmit={payment} className="wrapper" >
                        <div className="input-box">
                            <label htmlFor="card-holder">Card Holder</label><br />
                            <input type="text" name="card-holder" id="card-holder" value={cardholder} placeholder="Mohamed Wael" onChange={(e) => setCardholder(e.target.value)} />
                        </div>
                        <div className="input-box ">
                            <label htmlFor="card-no">Card Number</label><br />
                            <input type="text" name="card-no" id="card-no" maxLength={16} value={cardnumber} placeholder="3051 2251 4842 7982" onChange={(e) => setCardnumber(e.target.value)} />
                        </div>
                        <div className="d-flex">
                            <div className="input-box me-4">
                                <label>Expires Date</label><br />
                                <select name="Month" id="Month" >
                                    <option selected>Month</option>
                                    <option>01</option>
                                    <option>02</option>
                                    <option>03</option>
                                    <option>04</option>
                                    <option>05</option>
                                    <option>06</option>
                                    <option>07</option>
                                    <option>08</option>
                                    <option>09</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                    <option>13</option>
                                    <option>14</option>
                                    <option>15</option>
                                    <option>16</option>
                                    <option>17</option>
                                    <option>18</option>
                                    <option>19</option>
                                    <option>20</option>
                                    <option>21</option>
                                    <option>22</option>
                                    <option>23</option>
                                    <option>24</option>
                                    <option>25</option>
                                    <option>26</option>
                                    <option>27</option>
                                    <option>28</option>
                                    <option>29</option>
                                    <option>30</option>
                                </select>
                                <select name="year" id="year" >
                                    <option selected>Year</option>
                                    <option value="25">25</option>
                                    <option value="26">26</option>
                                    <option value="27">27</option>
                                    <option value="28">28</option>
                                    <option value="29">29</option>
                                    <option value="30">30</option>
                                    <option value="31">31</option>
                                    <option value="32">32</option>
                                    <option value="33">33</option>
                                    <option value="34">34</option>
                                    <option value="35">35</option>
                                    <option value="36">36</option>
                                    <option value="37">37</option>
                                    <option value="38">38</option>
                                    <option value="39">39</option>
                                    <option value="40">40</option>


                                </select>
                            </div>
                            <div className="input-box">
                                <label>CVV</label> <br />
                                <input type="text" name="card-code" id="card-code" maxLength={3} onMouseEnter={() => setCardinner(true)} onMouseLeave={() => setCardinner(false)} value={cardcode} placeholder="030" onChange={(e) => setCardcode(e.target.value)} />
                            </div>
                        </div>
                        <button className='payment' type='submit'>payment</button>
                    </form>
                </div>
                <div className="priceofpayment">
                    <table>
                        <thead>
                            <tr>
                                <th>Product </th>
                                <th>Quantity </th>
                                <th>Unit Price</th>
                                <th>Set Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart && cart.length &&
                                <>
                                    {cart.map((ele, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{ele.title}</td>
                                                <td>{ele.itemquantity}</td>
                                                <td>{ele.price} EGB</td>
                                                <td>{ele.itemquantity * ele.price} EGB </td>

                                            </tr>
                                        )
                                    })}
                                </>
                            }
                        </tbody>
                    </table>
                </div>
            </section> */}
            <section className='checkout'>
                <div className="payment">
                    <div className="payment-widget">
                        <h3 className='payment-widget-title'>Billing Address</h3>
                        <div className="payment-form">
                            <div class="form-group">
                                <label>First Name</label>
                                <input type="text" class="form-control" placeholder="Your First Name" />
                            </div>
                            <div class="form-group">
                                <label>Last Name</label>
                                <input type="text" class="form-control" placeholder="Your Last Name" />
                            </div>
                            <div class="form-group">
                                <label>Email</label>
                                <input type="email" class="form-control" placeholder="Your Email" />
                            </div>
                            <div class="form-group">
                                <label>Phone</label>
                                <input type="text" class="form-control" placeholder="Your Phone" />
                            </div>
                            <div class="form-group">
                                <label>Address</label>
                                <input type="text" class="form-control" placeholder="Your Address" />
                            </div>
                        </div>
                    </div>
                    <div className="payment-widget">
                        <h3 className='payment-widget-title'>Payment Info</h3>
                        <div className="payment-form">
                            <div class="form-group">
                                <label>Card Holder Name</label>
                                <input type="text" class="form-control" placeholder="Name On Card" />
                            </div>
                            <div class="form-group">
                                <label>Card Number</label>
                                <input type="text" class="form-control" placeholder="Your Card Number" />
                            </div>
                            <div class="form-group">
                                <label>Expire Date</label>
                                <input type="text" class="form-control" placeholder="Expire" />
                            </div>
                            <div class="form-group">
                                <label>CCV</label>
                                <input type="text" class="form-control" placeholder="CVV" />
                            </div>
                        </div>
                    </div>
                    <div className="payment-widget">
                        <h3 className='payment-widget-title'>Shipping Address</h3>
                        <div className="payment-form">
                            <div class="form-group">
                                <label>First Name</label>
                                <input type="text" class="form-control" placeholder="Your First Name" />
                            </div>
                            <div class="form-group">
                                <label>Last Name</label>
                                <input type="text" class="form-control" placeholder="Your Last Name" />
                            </div>
                            <div class="form-group">
                                <label>Email</label>
                                <input type="email" class="form-control" placeholder="Your Email" />
                            </div>
                            <div class="form-group">
                                <label>Phone</label>
                                <input type="text" class="form-control" placeholder="Your Phone" />
                            </div>
                            <div class="form-group">
                                <label>Address 1</label>
                                <input type="text" class="form-control" placeholder="Your Address" />
                            </div>
                            <div class="form-group">
                                <label>Address 2</label>
                                <input type="text" class="form-control" placeholder="Your Address" />
                            </div>
                            <div class="col-lg-12">
                                <div class="form-group">
                                    <label>Additional Info</label>
                                    <textarea class="form-control" cols="30" rows="5" placeholder="Additional Info"></textarea>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
                <div className="confirm cart-summary">
                    <h4 class="mb-30">Cart Summary</h4>
                    <ul>
                        <li><strong>Product Qty:</strong> <span className='text-neutral-500'>5</span></li>
                        <li><strong>Shipping Cost:</strong> <span className='text-neutral-500'>$25.00</span></li>
                        <li><strong>Discount:</strong> <span className='text-neutral-500'>$5.00</span></li>
                        <li><strong>Vat:</strong> <span className='text-neutral-500'>$20.00</span></li>
                        <li><strong>Sub Total:</strong> <span className='text-neutral-500'>$4,540.00</span></li>
                        <li class="cart-total"><strong>Total Pay:</strong> <span className='text-[#2db7ff]'>$4,540.00</span></li>
                    </ul>
                    <div class="text-end mt-6">
                        <button class="theme-btn" onClick={payment}>Confirm Payment <i class="far fa-arrow-right"></i></button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Checkout