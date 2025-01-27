import React, { useContext } from "react";
// import'from "./Adminnav.module.css"
import styles from '../../admin/adminnav/Adminnav.module.css'
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { AuthContext } from '../../../context/AuthContext'
const Adminnav = () => {
    const { currentUser } = useContext(AuthContext)
    const userName = currentUser?.username
    const activelink = ({ isActive }) => (isActive ? `${styles.active}` : `${styles.navlinks}`)
    return (
        <div className={styles.nav}>
            <div className={styles.user}>
                <img src={currentUser?.photoimage} className="inline-block w-20 h-20" alt="" />
                {/* <FaUserCircle className='icon inline-block mb-2' size={60} color="#fff" /> */}
                <h4>{userName}</h4>
            </div>
            <div className='listcontainer'>
                <ul className={styles.list}>
                    <li >
                        <NavLink to="/admin" className={activelink}>
                            Dashboard
                        </NavLink>
                    </li>
                    <li >

                        <NavLink to="/admin/all-users" className={activelink}>
                            All Users
                        </NavLink>
                    </li>
                    <li >

                        <NavLink to="/admin/home-orders" className={activelink}>
                            Orders
                        </NavLink>
                    </li>

                    <li >

                        <NavLink to="/admin/all-cars" className={activelink}>
                            All Cars
                        </NavLink>
                    </li>
                    <li >

                        <NavLink to="/admin/add-car/Add" className={activelink}>
                            Add Car
                        </NavLink>
                    </li>
                    <li >

                        <NavLink to="/admin/all-accessories" className={activelink}>
                            All Accessories
                        </NavLink>
                    </li>
                    <li >

                        <NavLink to="/admin/add-accessory/Add" className={activelink}>
                            Add Accessory
                        </NavLink>
                    </li>
                    <li >

                        <NavLink to="/admin/home-booking" className={activelink}>
                            Booking
                        </NavLink>
                    </li>
                    <li >

                        <NavLink to="/admin/all-services" className={activelink}>
                            All Services
                        </NavLink>
                    </li>
                    <li >

                        <NavLink to="/admin/add-service/Add" className={activelink}>
                            Add Service
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default Adminnav;