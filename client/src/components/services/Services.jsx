import React, { memo } from 'react'
import HeroCard from '../slider/HeroCard'
import OurServices from '../home/homeitems/our-services/OurServices'
const Services = memo(() => {
    return (
        <>
            <HeroCard page={"Services"} />
            <OurServices />
        </>
    )
})

export default Services