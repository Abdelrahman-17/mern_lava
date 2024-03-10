import React, { useContext, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import HomePage from './pages/homepage/HomePage'
import Footer from './components/footer/Footer'
import LoginPage from './pages/accountpage/LoginPage'
import SignupPage from './pages/accountpage/SignupPage'
import StorePage from './pages/storepage/StorePage'
import Productdetails from './components/store/productsdetail/Productdetails'
import OrdersPage from './pages/orderspage/OrdersPage'
import CartPage from './pages/cartpage/CartPage'
import CheckoutPage from './pages/checkoutpage/CheckoutPage'
import AboutPage from './pages/aboutpage/AboutPage'
import TeamPage from './pages/teampage/TeamPage'
import ProfilePage from './pages/profilepage/ProfilePage'
import ChatPage from './pages/chatpage/ChatPage'
import SecurityPage from './pages/securitypage/SecurityPage'
import BookingPage from './pages/bookingpage/BookingPage'
import Admin from './components/admin/Admin';
import Loader from './components/loader/Loader'
import Onlyadmin from './context/Onlyadmin'
import Orderdetails from './components/orders/Orderdetails'
import NotFound from './pages/NotFound/NotFound'
import Bookingdetails from './components/booking/bookingdetails/Bookingdetails'
import Bookingconfirm from './components/booking/bookingconfirm/Bookingconfirm'
import ContactPage from './pages/Contactpage/ContactPage'
import { AuthContext } from './context/AuthContext'
import { useDispatch } from 'react-redux'
import { getProducts } from './redux/slice/productslice'
import { getorders } from './redux/slice/orderslice'
import { getNotification } from './redux/slice/notificationslice'
import { ToastContainer } from 'react-toastify'
import { getbooking } from './redux/slice/bookingslice'
import { getservices } from './redux/slice/serviceslice'
import Resetpassword from './components/auth/Resetpassword'
import Forgetpassword from './components/auth/Forgetpassword'
import Otp from './components/auth/Otp'
import { NotificationPage } from 'twilio/lib/rest/api/v2010/account/notification'
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getorders());
    dispatch(getbooking());
    dispatch(getservices())
    dispatch(getNotification())
  }, [dispatch])
  const { currentUser, loading } = useContext(AuthContext);

  // const [loading, setLoading] = useState(false)
  // useEffect(() => {
  //   if (currentUser?.email) {
  //     setLoading(false)
  //   }
  //   else {
  //     setLoading(true)
  //   }
  // }, [currentUser])
  // console.log('currentUser', currentUser);
  // useEffect(() => {
  //   if (currentUser && currentUser?.emailVerified !== true) {
  //     signOut(auth)
  //     sendEmailVerification(auth.currentUser);
  //     toast.info("you must Verified your email")
  //   }
  // }, [currentUser])

  return (
    <>
      {loading ? <Loader />
        : <>
          <ToastContainer />
          <Navbar />
          <Routes>
            <Route path="/" element={currentUser ? <HomePage /> : <LoginPage />} />
            <Route path='/login' element={currentUser ? <HomePage /> : <LoginPage />} />
            <Route path='/signup' element={currentUser ? <HomePage /> : <SignupPage />} />
            <Route path="/store" element={currentUser ? <StorePage /> : <LoginPage />} />
            <Route path='/productdetails/:id' element={currentUser ? <Productdetails /> : <LoginPage />} />
            <Route path='/orders' element={currentUser ? <OrdersPage /> : <LoginPage />} />
            <Route path='/orderdetails/:id' element={currentUser ? <Orderdetails /> : <LoginPage />} />
            <Route path='/cart' element={currentUser ? <CartPage /> : <LoginPage />} />
            <Route path='/booking' element={currentUser ? <BookingPage /> : <LoginPage />} />
            <Route path='/bookingdetails/:id' element={currentUser ? <Bookingdetails /> : <LoginPage />} />
            <Route path='/bookingconfirm' element={currentUser ? <Bookingconfirm /> : <LoginPage />} />
            <Route path='/profile/*' element={currentUser ? <ProfilePage /> : <LoginPage />} />
            <Route path='/checkout' element={currentUser ? <CheckoutPage /> : <LoginPage />} />
            <Route path='/chat' element={currentUser ? <ChatPage /> : <LoginPage />} />
            <Route path='/security' element={currentUser ? <SecurityPage /> : <LoginPage />} />
            <Route path='/about' element={currentUser ? <AboutPage /> : <LoginPage />} />
            <Route path='/team' element={currentUser ? <TeamPage /> : <LoginPage />} />
            <Route path='/contact' element={currentUser ? <ContactPage /> : <LoginPage />} />
            <Route path='/notification' element={currentUser ? <NotificationPage /> : <LoginPage />} />
            {
              currentUser?.email === "admin@gmail.com" &&
              <Route path='/admin/*' element={<Admin />} />
            }
            <Route path='/resetpassword/:id/:token' element={<Resetpassword />} />
            <Route path='/forgetpassword' element={<Forgetpassword />} />
            <Route path='otp' element={<Otp />} />
            <Route path='/*' element={< NotFound />} />
          </Routes>
          <Footer />
        </>
      }
    </>
  )
}

export default App