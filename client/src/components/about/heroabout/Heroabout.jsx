import React from 'react'
import './Heroabout.css'
import { Link } from 'react-router-dom'
const Heroabout = () => {
    return (
        <section className="home-about">
            <div className="overlay">
                <div className="home-content">
                    <h2>About // <Link to={"/"}>Home</Link></h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                </div>
            </div>
        </section>
    )
}

export default Heroabout