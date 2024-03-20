import React, { useEffect, useRef, useState } from 'react'
import './Booking.css'
import Icon1 from '../../assets/Icon-3-Our-Service.png'
import Icon2 from '../../assets/Our-Service-Icon.png'
import Icon3 from '../../assets/Our-Service-Icon2.png'
import Icon4 from '../../assets/Our-Service-Icon4.png'
import { ToastContainer, toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import data from '../../../public/data.json'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { addtocart } from '../../redux/slice/cartslice'
import axios from 'axios'
import { servicesdata } from '../../redux/slice/serviceslice'
import HeroCard from '../slider/HeroCard'

const Booking = () => {
    const [location, setLocation] = useState(false)
    const [active, setActive] = useState(true)
    const ourservicesref = useRef()
    // const [services, setServices] = useState([])
    const services = useSelector(servicesdata)
    const navigate = useNavigate()
    // useEffect(() => {
    //     if (data) {
    //         setServices(data.booking_services)
    //     }
    // }, [data])

    const addservicebooking = (ele) => {
        // dispatch(addservicetobooking(ele))
        navigate(`/bookingdetails/${ele.id}`)
    }
    // const handleScroll = () => {
    //     let screenheight = window.innerHeight;
    //     let scrollaction = window.pageYOffset;
    //     let ourservicescontaintop = ourservicesref.current.offsetTop;
    //     let ourservicesheight = ourservicesref.current.offsetHeight;
    //     if (scrollaction > (ourservicescontaintop + (0.5 * ourservicesheight) - screenheight)) {
    //         setActive(true)
    //     } else {
    //         setActive(false)
    //     }
    // };

    // useEffect(() => {
    //     window.addEventListener("scroll", handleScroll);
    //     return () => window.removeEventListener("scroll", handleScroll);
    // }, []);

    return (
        <>
            {/* {location && */}
            <HeroCard page={'Online Booking'} />

            <section ref={ourservicesref} className="our-services-booking">
                <h3>our services</h3>
                <h2>our comprehensive services</h2>
                <div className="container-cards" >
                    {
                        services && services.map((ele, index) => {
                            return (
                                <div className={`${active ? "card active" : "card"}`} key={index}>
                                    <img className="card-icon" src={ele.ImageUrl} alt="img" />
                                    <h3 className="card-title">{ele.title}</h3>
                                    <p className="card-desc">{ele.description}</p>
                                    <button className="card-btn" onClick={() => addservicebooking(ele)}>Add booking</button>
                                </div>
                            )
                        })
                    }
                </div>
                {/* <div class="contact-map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54736.49981278061!2d31.200590211842293!3d30.96961042798616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f7bb4d2aa1877b%3A0x6b9caf7bbe867370!2z2KfZhNmF2K3ZhNipINin2YTZg9io2LHZidiMINin2YTZhdit2YTYqSDYp9mE2YPYqNix2YkgKNmC2LPZhSAyKdiMINmF2LHZg9iyINin2YTZhdit2YTZhyDYp9mE2YPYqNix2YnYjCDZhdit2KfZgdi42Kkg2KfZhNi62LHYqNmK2Kk!5e0!3m2!1sar!2seg!4v1709924993013!5m2!1sar!2seg"
                        style={{ border: "0", width: "100%", height: "350px" }} allowfullscreen="" loading="lazy">
                    </iframe>
                </div> */}
            </section>

            {/* } */}

        </>
    )
}

export default Booking