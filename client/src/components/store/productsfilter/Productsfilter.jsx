import React, { useEffect, useState } from 'react'
import "../Store.css"
import axios from 'axios'
import Productsitem from '../productsitem/Productsitem'
import { MdPhotoCameraBack } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { productdata } from '../../../redux/slice/productslice'
import { filterByCategory, filterBySearch, filterproduct } from '../../../redux/slice/filterslice'
function Productsfilter() {
    const dispatch = useDispatch();
    const [inputsearch, setInputsearch] = useState("")
    const [type, setType] = useState([])
    const selectproducts = useSelector(productdata)
    const filteredproduct = useSelector(filterproduct)
    const currentproduct = filteredproduct.length === 0 ? selectproducts : filteredproduct;
    useEffect(() => {
        dispatch(filterBySearch({ product: selectproducts, search: inputsearch }))
    }, [dispatch, inputsearch, selectproducts])
    const filterbycategory = (cat) => {
        dispatch(filterByCategory({ product: selectproducts, category: cat }));
    }
    const category = [
        "All",
        ...new Set(selectproducts.map((product) => product.category)),
    ];

    return (
        <>
            <section className="storing">
                <div className="filter">
                    <div className="shop-widget">
                        <h3 className='shop-widget-title'>Search</h3>
                        <input type='text' className='searchinput' value={inputsearch} placeholder='search' onChange={(e) => setInputsearch(e.target.value)} />
                    </div>
                    <div className="shop-widget">
                        <h3 className='shop-widget-title'>Category</h3>
                        <select aria-label="Default select example" className='form-select' onChange={(e) => {
                            setType(e.target.value);
                            filterbycategory(e.target.value);
                        }}>
                            {category.map((cat, index) => {
                                return (
                                    <option key={index} value={cat}>{cat}</option>
                                )
                            })}
                        </select>
                        {/* <ul>
                            {category.map((cat, index) => {
                                return (
                                    <li key={index} value={cat}>{cat}</li>
                                )
                            })}
                        </ul> */}
                    </div>
                    <div className="shop-widget">
                        <h3 className='shop-widget-title'>price ange</h3>

                        <label style={{ color: 'white' }}>Categories</label>
                        <input type='text' className='searchinput' value={inputsearch} placeholder='search' onChange={(e) => setInputsearch(e.target.value)} />
                        <select aria-label="Default select example" className='form-select' onChange={(e) => {
                            setType(e.target.value);
                            filterbycategory(e.target.value);
                        }}>
                            {category.map((cat, index) => {
                                return (
                                    <option key={index} value={cat}>{cat}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <section className="aproducts">
                    {/* prod */}
                    <div className='mb-4'>
                        <p>Showing 1-20 of {selectproducts.length} Results</p>
                    </div>
                    <Productsitem product={currentproduct} />
                </section>
            </section>
        </>
    )
}

export default Productsfilter