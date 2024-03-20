import React from 'react'
import './HeroCard.css'
import { Link } from 'react-router-dom'
const HeroCard = ({ page }) => {
    console.log(page);
    return (
        <section className="home-about">
            <div className="overlay">
                <div className="home-content">
                    <p>{page}</p>
                    <h2><Link to={"/"}>Home</Link> // {page}</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                </div>
            </div>
        </section>
    )
}

export default HeroCard
