import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Productsitem from '../productsitem/Productsitem'
import { MdPhotoCameraBack } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { filterByCategory, filterBySearch, filterproduct } from '../../../redux/slice/filterslice'
import { carsdata, getCars } from '../../../redux/slice/carsslice'
import { accessoriesdata, getAccessories } from '../../../redux/slice/accessoriesslice'
function Productsfilter() {
    const [category, setCategory] = useState('Cars')
    const dispatch = useDispatch();

    const [inputsearch, setInputsearch] = useState("")
    const [type, setType] = useState([])
    // const selectproducts = useSelector(productdata)
    const Cars = useSelector(carsdata)
    const Accessories = useSelector(accessoriesdata)
    const [selectproducts, setSelectproducts] = useState([])
    const filteredproduct = useSelector(filterproduct)
    const currentproduct = filteredproduct.length === 0 ? selectproducts : filteredproduct;
    useEffect(() => {
        dispatch(filterBySearch({ product: selectproducts, search: inputsearch }))
    }, [dispatch, inputsearch, selectproducts])
    // const filterbycategory = (cat) => {
    //     dispatch(filterByCategory({ product: selectproducts, category: cat }));
    // }
    // const category = [
    //     "All",
    //     ...new Set(selectproducts.map((product) => product.category)),
    // ];
    useEffect(() => {
        dispatch(getCars())
        dispatch(getAccessories())
    }, [dispatch])
    useEffect(() => {
        if (category === "Cars") {
            setSelectproducts(Cars)
        }
        else {
            setSelectproducts(Accessories)
        }
    }, [category])
    // console.log(selectproducts);
    return (
        <>
            <div className="select-category flex justify-evenly w-1/2 p-5 mx-auto">

                <button className={`${category === 'Cars' ? 'text-[#263787] active' : ' text-black'}`} onClick={() => setCategory('Cars')}>Cars</button>
                <button className={`${category === 'Accessories' ? 'text-[#263787] active' : ' text-black'}`} onClick={() => setCategory('Accessories')}>Accessories</button>
            </div>

            <section className="storing">
                <div className="filter">
                    <div className="shop-widget">
                        <h3 className='shop-widget-title'>Search</h3>
                        <input type='text' className='searchinput' value={inputsearch} placeholder='search' onChange={(e) => setInputsearch(e.target.value)} />
                    </div>
                    {/* <div className="shop-widget">
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
                       
                    </div> */}
                    {/* <div className="shop-widget">
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
                    </div> */}
                </div>
                <section className="aproducts">
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