import React from 'react'
import './Testimonials.css'
import Image1 from '../../../../assets/Testi-Profile-4.png'
import Image2 from '../../../../assets/Testi-Profile-3.png'
import Image3 from '../../../../assets/Testi-Profile-2.png'
import Image4 from '../../../../assets/Test-iProfile-1.png'
import { FaStar } from "react-icons/fa";
const Testimonials = () => {
    return (
        <section className="testimonials">
            {/* <div className="overlay"> */}
            <h3>testimonials</h3>
            <h2>What Client <span>Say's</span></h2>
            <div className="cards">
                <div className="card">
                    <div className="card-left">
                        <img className="card-img" src={Image1} alt="" />
                        <h3 className="card-name">mohamed</h3>
                        <p>customer</p>
                    </div>
                    <div className="card-right">
                        <p className="card-desc">
                            There are many variations of passages available but the majority have
                            suffered to the alteration in some injected.
                        </p>
                        <div className='stars'>
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-left">
                        <img className="card-img" src={Image1} alt="" />
                        <h3 className="card-name">mohamed</h3>
                        <p>customer</p>
                    </div>
                    <div className="card-right">
                        <p className="card-desc">
                            There are many variations of passages available but the majority have
                            suffered to the alteration in some injected.
                        </p>
                        <div className='stars'>
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-left">
                        <img className="card-img" src={Image1} alt="" />
                        <h3 className="card-name">mohamed</h3>
                        <p>customer</p>
                    </div>
                    <div className="card-right">
                        <p className="card-desc">
                            There are many variations of passages available but the majority have
                            suffered to the alteration in some injected.
                        </p>
                        <div className='stars'>
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-left">
                        <img className="card-img" src={Image1} alt="" />
                        <h3 className="card-name">mohamed</h3>
                        <p>customer</p>
                    </div>
                    <div className="card-right">
                        <p className="card-desc">
                            There are many variations of passages available but the majority have
                            suffered to the alteration in some injected.
                        </p>
                        <div className='stars'>
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                        </div>
                    </div>
                </div>
            </div>
            {/* </div> */}
        </section>
    )
}

export default Testimonials