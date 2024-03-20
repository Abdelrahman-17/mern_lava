import React from 'react'
import Heroabout from './heroabout/Heroabout'
import Ourtrust from './ourtrust/Ourtrust'
import Latestupdate from './latestupdate/Latestupdate'
import About from '../home/homeitems/about/About'
import HeroCard from '../slider/HeroCard'
const Aboutt = () => {
    return (
        <>
            <HeroCard page={'About'} />
            {/* <Heroabout /> */}
            <About />
            {/* <Ourtrust /> */}
            {/* <Latestupdate /> */}
        </>
    )
}

export default Aboutt