import React from 'react'
import Productsfilter from './productsfilter/Productsfilter'

import HeroCard from '../slider/HeroCard'
const Store = () => {
    return (
        // <div>Store</div>
        <>
            <HeroCard page={'Store'} />
            <Productsfilter />
        </>

    )
}

export default Store