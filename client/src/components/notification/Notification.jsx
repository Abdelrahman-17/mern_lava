import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { notificationshistory } from '../../redux/slice/notificationslice'
import { useSelector } from 'react-redux'

const Notification = () => {
    const Notification = useSelector(notificationshistory)
    const { currentUser } = useContext(AuthContext)
    const sortedNotification = [...Notification].sort((a, b) => {
        return a.date.localeCompare(b.date);
    });
    const deleteNotification = async (NotificationId) => {
        await axios.post(`${process.env.BASE_API_URL_HOST}/notification/clear-notification`, { NotificationId })
            .then(
                res => {
                    toast.success(res.data)
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
        } else if (timestamp < hour) {
            const minutes = Math.floor(timestamp / minute);
            return `${minutes}m`;
        } else if (timestamp < day) {
            const hours = Math.floor(timestamp / hour);
            return `${hours}h`;
        }
        else if (timestamp >= day) {
            sortedNotification.map((Notification) => {
                if ((Date.now() - Notification.date.toDate()) >= day) {
                    deleteNotification(Notification._id)
                }
            })
        }

    };
    return (
        <>
            <div>
                {sortedNotification.map((notification) => {
                    return (
                        <div key={notification?._id}>
                            <p>{notification?.title}</p>
                            <p>{notification?.description}</p>
                            <p>{notification?.price}</p>
                            <p>
                                {
                                    notification.date &&
                                    formatRelativeTime(Date.now() - notification.date.toDate())
                                }
                            </p>
                        </div>
                    );
                })}
            </div>
        </>
    )
}

export default Notification