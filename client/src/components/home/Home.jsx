import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import styles from './Slider.module.css'
import Car_Hero from '../../assets/Car-Hero.png'
import About from './homeitems/about/About'
import OurServices from './homeitems/our-services/OurServices'
import Pricing from './homeitems/pricing/Pricing'
import ChooseUs from './homeitems/chooseus/ChooseUs'
import Testimonials from './homeitems/testimonials/Testimonials'
import Hotdeal from './homeitems/Hotdeal/Hotdeal'
import Fashiondigital from './homeitems/Fashiondigital/Fashiondigital'
import Number from './homeitems/numbers/Number'
import Work from './homeitems/work/Work'
import Cta from './homeitems/cta/Cta'
import Application from './homeitems/application/Application'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import Portfolio from './homeitems/portfolio/Portfolio'
import Blog from './homeitems/blog/Blog'
const Home = () => {

    // const aboutref = useRef()
    // const [activeabout, setActiveabout] = useState(false)

    // const ourservicesref = useRef()
    // const [activeouerservices, setActiveouerservices] = useState(false)

    // const pricingref = useRef()
    // const [activepricing, setActivepricing] = useState(false)

    // window.onscroll = () => {
    //     let aboutcontaintop = aboutref.current.offsetTop;
    //     let aboutheight = aboutref.current.offsetHeight;
    //     let screenheight = window.innerHeight;
    //     let scrollaction = window.pageYOffset;
    //     if (scrollaction > (aboutcontaintop + (0.5 * aboutheight) - screenheight)) {
    //         setActiveabout(true)
    //     } else {
    //         setActiveabout(false)
    //     }
    //     ///////////////////////////////////////////
    //     let ourservicescontaintop = ourservicesref.current.offsetTop;
    //     let ourservicesheight = ourservicesref.current.offsetHeight;
    //     if (scrollaction > (ourservicescontaintop + (0.5 * ourservicesheight) - screenheight)) {
    //         setActiveouerservices(true)
    //     } else {
    //         setActiveouerservices(false)
    //     }
    //     ///////////////////////////////////////////
    //     let pricingcontaintop = pricingref.current.offsetTop;
    //     let pricingheight = pricingref.current.offsetHeight;
    //     if (scrollaction > (pricingcontaintop + (0.5 * pricingheight) - screenheight)) {
    //         setActivepricing(true)
    //     } else {
    //         setActivepricing(false)
    //     }
    // }  
    return (
        <>

            <div id="carouselExampleCap" data-bs-ride="carousel" className="carousel slide">
                <div className="img-cards carousel-inner home">
                    <div className="carousel-item ng-star-inserted home-content active one">
                        <div className='containe'>
                            <h6 class="title"> Keep Your Car Clean</h6>
                            <h3 class="hero-title">
                                We Provide Car <span>Washing</span> Services
                            </h3>
                            <p class="home-desc">There are many variations of passages orem psum available but the majority have
                                suffered alteration in some form by injected humour or randomised words which
                                don't look even making it look like readable slightly believable.
                            </p>
                            <button id="start" class="btn btn-start">about Me !</button>
                            <button id="learn" class="btn btn-learn"> Learn More</button>
                        </div>
                    </div>
                    <div className="carousel-item ng-star-inserted home-content two">
                        <div className='containe'>
                            < h6 class="title"> Keep Your Car Clean</h6>
                            <h3 class="hero-title">
                                We Provide Car <span>Washing</span> Services
                            </h3>
                            <p class="home-desc">There are many variations of passages orem psum available but the majority have
                                suffered alteration in some form by injected humour or randomised words which
                                don't look even making it look like readable slightly believable.
                            </p>
                            <button id="start" class="btn btn-start">about Me !</button>
                            <button id="learn" class="btn btn-learn"> Learn More</button>
                        </div>
                    </div>
                    <div className="carousel-item ng-star-inserted home-content three">
                        <div className='containe'>
                            < h6 class="title"> Keep Your Car Clean</h6>
                            <h3 class="hero-title">
                                We Provide Car <span>Washing</span> Services
                            </h3>
                            <p class="home-desc">There are many variations of passages orem psum available but the majority have
                                suffered alteration in some form by injected humour or randomised words which
                                don't look even making it look like readable slightly believable.
                            </p>
                            <button id="start" class="btn btn-start">about Me !</button>
                            <button id="learn" class="btn btn-learn"> Learn More</button>

                        </div>

                    </div>
                </div>
                <button type="button" data-bs-target="#carouselExampleCap" data-bs-slide="prev"
                    className="carousel-control-prev">
                    <IoIosArrowBack size={35} aria-hidden="true" className="carousel-control-prev-icon bg-[#343434] rounded-full text-[#fff] w-12 h-12" />
                    <span className="hidden">Previous</span>
                </button>
                <button type="button" data-bs-target="#carouselExampleCap" data-bs-slide="next"
                    className="carousel-control-next">
                    <IoIosArrowForward size={35} aria-hidden="true" className="carousel-control-next-icon bg-[#343434] rounded-full text-[#fff] w-12 h-12" />
                    <span className="hidden">Next</span>
                </button>
            </div>
            <About />
            <OurServices />
            <Number />
            <Portfolio />
            <Work />
            {/* <Cta /> */}
            {/* <Hotdeal /> */}
            {/* <Fashiondigital /> */}
            {/* <Pricing /> */}
            {/* <About aboutref={aboutref} activeabout={activeabout} />
            <OurServices ourservicesref={ourservicesref} activeouerservices={activeouerservices} />
        <Pricing pricingref={pricingref} activepricing={activepricing} /> */}
            <ChooseUs />
            <Application />
            <Testimonials />
            <Blog />

        </>
    )
}

export default Home