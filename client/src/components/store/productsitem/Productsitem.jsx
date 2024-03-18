import React, { useEffect, useState } from 'react'
import "../Store.css"
import { useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiSearch } from "react-icons/fi"
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { addtocart } from '../../../redux/slice/cartslice';
import { addtofavourit, favourititem } from '../../../redux/slice/favouritslice';
function Productsitem({ product }) {
    // const [products, setProduct] = useState()
    // const [activebtn, setActivebtn] = useState(false)
    // const [pagination, setPagination] = useState(1)

    // const pagination = products.length / 20
    const dispatch = useDispatch();
    const navigate = useNavigate()
    // function shuffle(arr) {
    //     for (let i = arr.length - 1; i > 0; i--) {
    //         let j = Math.floor(Math.random() * (i + 1));
    //         [arr[i], arr[j]] = [arr[j], arr[i]]
    //     }
    //     return arr
    // }
    // product = product.slice(0, 20)
    // shuffle(product)
    // useEffect(() => {
    //     if (pagination >= 1) {
    //         const start = (20 * pagination) - 20
    //         const end = pagination * 20
    //         setProduct(product.slice(start, end))
    //         // products = products.slice(start, end);
    //     }
    // }, [pagination])
    return (
        <>
            <div className='products'>
                {
                    product.map((ele, index) => {
                        return (
                            <div className="product-card" key={index}>
                                <img src={ele.ImageUrl} className="card-img" alt="" />
                                <h2 className="card-title">{ele.title}</h2>
                                {/* <p className="card-desc">{ele.description}</p> */}
                                <p className="card-price">{+ele.price * ele.itemquantity} EGB</p>
                                <div className="add-to-cart">
                                    <i onClick={() => dispatch(addtocart(ele))}><FiShoppingCart /></i>
                                    <i onClick={() => dispatch(addtofavourit(ele))}><FiHeart /></i>
                                    <i onClick={() => navigate(`/productdetails/${ele.id}`)}><FiSearch /></i>

                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {/* {
                product.length >= 20 &&
                <div className="pagination">
                     <button onClick={() => setPagination(pagination = pagination - 1)}><FaArrowLeft /></button> 
                    <button onClick={() => setPagination(1)}>1</button>
                    <button onClick={() => setPagination(2)}>2</button>
                    <button onClick={() => setPagination(3)}>3</button>
                    <button onClick={() => setPagination(4)}>4</button>
                    <button onClick={() => setPagination(5)}>5</button>
                    <button onClick={() => setPagination(pagination = pagination + 1)}><FaArrowRight /></button>
                </div>
            } */}
        </>
    )
}

export default Productsitem