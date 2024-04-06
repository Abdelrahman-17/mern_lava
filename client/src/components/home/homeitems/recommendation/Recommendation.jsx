import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ordershistory } from '../../../../redux/slice/orderslice';
import axios from 'axios';

const Recommendation = () => {
    // const [products, setProducts] = useState([]);
    // useEffect(() => {
    //     // Fetch product data initially
    //     fetchProducts();

    //     // Fetch product data every day at a specific time (e.g., 12:00 PM)
    //     const now = new Date();
    //     const timeOfDayToFetch = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0);
    //     const timeUntilFetch = timeOfDayToFetch.getTime() - now.getTime();
    //     const millisecondsInADay = 24 * 60 * 60 * 1000;

    //     const interval = setInterval(fetchProducts, millisecondsInADay);

    //     // Clean up the interval on component unmount
    //     return () => {
    //         clearInterval(interval);
    //     };
    // }, []);

    // const fetchProducts = () => {
    //     // Make an API call to fetch the product data
    //     // Replace this with your actual API endpoint or data-fetching logic
    //     axios.get(`${process.env.BASE_API_URL_HOST}/products/carsData`)
    //         .then(res => setProducts(res.data))
    //         .catch(error => console.error('Error fetching products:', error));
    // };

    ///////////////////////////////////////////////
    ///////////////////////////////////////////////

    const array = [1, 2, 3, 2, 4, 4, 4, 5, 5, 5, 5];
    // const array = useSelector(ordershistory)
    const countDuplicates = (arr) => {
        const frequencyMap = {};

        // Count the frequency of each element
        arr.forEach((item) => {
            frequencyMap[item] = (frequencyMap[item] || 0) + 1;
        });

        // Find the maximum frequency
        const maxFrequency = Math.max(...Object.values(frequencyMap));

        // Find the data with maximum frequency
        const duplicates = Object.keys(frequencyMap).filter((key) => frequencyMap[key] === maxFrequency);

        return { maxFrequency, duplicates };
    };

    const { maxFrequency, duplicates } = countDuplicates(array);

    return (
        <>
            {/* <div>
                <h1>Product List</h1>
                <ul>
                    {products.map(product => (
                        <li key={product.id}>
                            <img src={product.ImageUrl} alt="img" />
                        </li>
                    ))}
                </ul>
            </div> */}
            <div>
                <h1>Max Number of Duplicates: {maxFrequency}</h1>
                <h2>Duplicated Data:</h2>
                <ul>
                    {duplicates.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default Recommendation