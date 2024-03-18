import React from "react";
import "./Admin.css"
import { Route, Routes } from "react-router-dom";
import Adminnav from "./adminnav/Adminnav";
import Allusers from "./allusers/Allusers";
import Allcars from "./allcars/Allcars";
import Addcar from "./addcar/Addcar";
import Allaccessories from "./allaccessories/Allaccessories";
import Addaccessory from "./addaccessory/Addaccessory";
import Allservices from "./allservices/Allservices.jsx";
import Addservice from "./addservice/Addservice.jsx";
import Adminhomeorders from "./adminhome/Adminhomeorders";
import Adminhomebooking from "./adminhome/Adminhomebooking.jsx";


const Admin = () => {
    return (
        <div className="admin">

            <div className='navbar'>
                <Adminnav />
            </div>

            <div className="content">
                <Routes>
                    <Route path="all-users" element={<Allusers />} />
                    <Route path="all-cars" element={<Allcars />} />
                    <Route path="add-car/:id" element={<Addcar />} />
                    <Route path="all-accessories" element={<Allaccessories />} />
                    <Route path="add-accessory/:id" element={<Addaccessory />} />
                    <Route path="all-services" element={<Allservices />} />
                    <Route path="add-service/:id" element={<Addservice />} />
                    <Route path="home-orders" element={<Adminhomeorders />} />
                    <Route path="home-booking" element={<Adminhomebooking />} />

                </Routes>
            </div>
        </div>)
}

export default Admin