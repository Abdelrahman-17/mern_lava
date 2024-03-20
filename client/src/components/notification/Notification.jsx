import React, { useContext, useEffect, useState } from 'react'
import './Notification.css'
import { AuthContext } from '../../context/AuthContext'
import { getNotification } from '../../redux/slice/notificationslice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import axios from 'axios'

const Notification = () => {
    const [notification, setNotification] = useState([])
    const { currentUser } = useContext(AuthContext)
    const dispatch = useDispatch()
    useEffect(() => {
        const getnotifications = async () => {
            await axios.get(`${process.env.BASE_API_URL_HOST}/notification/notificationData/${currentUser?._id}`)
                .then(res => {
                    setNotification(res.data)
                })
                .catch(err => console.log(err))
        }
        getnotifications();
    }, [])


    const sortedNotification = [...notification].sort((a, b) => {
        return a.date.localeCompare(b.date);
    });
    const deleteNotification = async (notificationId) => {
        await axios.post(`${process.env.BASE_API_URL_HOST}/notification/clear-notification`, { notificationId })
            .then(
                res => {
                    toast.success(res.data)
                    dispatch(getNotification())
                })
            .catch(err => {
                toast.error(err.data)
            })
    };
    const formatRelativeTime = (timestamp) => {
        const minute = 1000 * 60;
        const hour = minute * 60;
        const day = hour * 24;
        if (timestamp < minute) {
            return "now";
        }
        else if (timestamp < hour) {
            const minutes = Math.floor(timestamp / minute);
            return `${minutes}m`;
        } else if (timestamp < day) {
            const hours = Math.floor(timestamp / hour);
            return `${hours}h`;
        }
        else if (timestamp >= day) {
            sortedNotification.map((notification) => {
                if ((Date.now() - notification.date) >= day) {
                    deleteNotification(notification.uid)
                }
            })
        }

    };
    return (
        <>
            <section className='notification'>
                {sortedNotification.map((notification) => {
                    return (
                        <div className='card' key={notification?._id}>
                            <p>{notification?.title}</p>
                            <p>{notification?.description}</p>
                            <p>{notification?.price}</p>
                            <p>
                                {
                                    notification.date &&
                                    formatRelativeTime(Date.now() - notification.date)
                                }
                            </p>
                        </div>
                    );
                })}
            </section>
        </>
    )
}

export default Notification