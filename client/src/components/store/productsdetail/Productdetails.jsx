import React, { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom";
import './Productdetails.css';
import { useSelector, useDispatch } from 'react-redux';
import { addtocart } from "../../../redux/slice/cartslice"
import { FiHeart } from 'react-icons/fi';
// import 'bootstrap/dist/css/bootstrap.min.css'
import { carsdata, getCars, maxringe, minrange, pricecarrange } from '../../../redux/slice/carsslice'
import { accessoriesdata, getAccessories, priceaccessoriesrange } from '../../../redux/slice/accessoriesslice'
function Productdetails() {
    const { id, category } = useParams();
    const Cars = useSelector(carsdata)
    const Accessories = useSelector(accessoriesdata)
    const [product, setProduct] = useState([])
    const dispatch = useDispatch();

    useEffect(() => {
        if (category === "Cars") {
            setProduct(Cars)
        }
        else {
            setProduct(Accessories)
        }
    }, [category])
    useEffect(() => {
        dispatch(getCars())
        dispatch(getAccessories())
    }, [dispatch])
    // const product = useSelector(productdata)
    const productdetails = product.filter((pro) => pro.id === id);
    const additem = () => {
        dispatch(addtocart(productdetails[0]))
    }

    return (
        <>
            <div className="product-details">
                <div className="head">
                    <h2><b>Product Details</b></h2>
                    <Link to="/store">&larr; Back To Store</Link>
                </div>
                <div className="content">
                    <div className="image">
                        <img src={productdetails[0]?.ImageUrl} alt="detail" />
                    </div>
                    <div className="text">
                        <p className="title">{productdetails[0]?.title}</p>
                        {/* <div class="single-item-rating">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star-half-alt"></i>
                            <i class="far fa-star"></i>
                            <span class="rating-count"> (4 Customer Reviews)</span>
                        </div> */}
                        <h5 className="price">{productdetails[0]?.price} EGB</h5>
                        <p className="description">{productdetails[0]?.description}</p>
                        {/* <h5 className="category">Category : {productdetails[0]?.category}</h5> */}
                        {/* <h5 className="brand">Brand : {productdetails[0]?.brand}</h5> */}
                        <button onClick={additem} className="addingbtn">Add to Cart</button>
                        <button onClick={() => dispatch(addtofavourit(productdetails[0]))}><FiHeart /></button>

                    </div>
                </div>
            </div>

        </>
    )
}

export default Productdetails
