import React, { useContext, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/navbar/Navbar'
import HomePage from './pages/homepage/HomePage'
import Footer from './components/footer/Footer'
import LoginPage from './pages/accountpage/LoginPage'
import RegisterPage from './pages/accountpage/RegisterPage'
import StorePage from './pages/storepage/StorePage'
import Productdetails from './components/store/productsdetail/Productdetails'
import OrdersPage from './pages/orderspage/OrdersPage'
import CartPage from './pages/cartpage/CartPage'
import CheckoutPage from './pages/checkoutpage/CheckoutPage'
import About from './components/about/About';
import Team from './components/team/Team';
import Contact from './components/Contact/Contact';
import Services from './components/services/Services';
import Faq from './components/faq/Faq';
import News from './components/news/News';
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
import { AuthContext } from './context/AuthContext'
import { useDispatch } from 'react-redux'
import { getorders } from './redux/slice/orderslice'
import { getNotification } from './redux/slice/notificationslice'
import { ToastContainer } from 'react-toastify'
import { getbooking } from './redux/slice/bookingslice'
import { getservices } from './redux/slice/serviceslice'
import Resetpassword from './components/auth/Resetpassword'
import Forgetpassword from './components/auth/Forgetpassword'
import Otp from './components/auth/Otp'
import { getCars } from './redux/slice/carsslice';
import { getAccessories } from './redux/slice/accessoriesslice';
import Blog from './components/home/homeitems/blog/Blog';
import Testimonials from './components/home/homeitems/testimonials/Testimonials';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCars())
    dispatch(getAccessories())
    dispatch(getorders());
    dispatch(getbooking());
    dispatch(getservices())
    dispatch(getNotification())
  }, [dispatch])
  const { currentUser, loading } = useContext(AuthContext);
  const { pathname } = useLocation();
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
          {/* {pathname !== '/profile' && pathname !== '/profile/home' && pathname !== '/profile/orders' && pathname !== '/profile/booking' && pathname !== '/profile/notification' && pathname !== '/profile/chat' && */}
          {/* {pathname !== '/admin' && pathname !== '/admin/all-users' && pathname !== '/admin/home-orders' && pathname !== '/admin/all-cars' && pathname !== '/admin/add-car/Add' && pathname !== '/admin/all-accessories' && pathname !== '/admin/add-accessory/Add' && pathname !== '/admin/home-booking' && pathname !== '/admin/all-services' && pathname !== '/admin/add-service/Add' && */}
          <Navbar />
          {/* } */}
          <Routes>
            <Route path="/" element={currentUser ? <HomePage /> : <LoginPage />} />
            <Route path='/login' element={currentUser ? <HomePage /> : <LoginPage />} />
            <Route path='/register' element={currentUser ? <HomePage /> : <RegisterPage />} />
            <Route path="/store" element={currentUser ? <StorePage /> : <LoginPage />} />
            <Route path='/productdetails/:id/:category' element={currentUser ? <Productdetails /> : <LoginPage />} />
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
            <Route path='/about' element={currentUser ? <About /> : <LoginPage />} />
            <Route path='/team' element={currentUser ? <Team /> : <LoginPage />} />
            <Route path='/contact' element={currentUser ? <Contact /> : <LoginPage />} />
            <Route path='/services' element={currentUser ? <Services /> : <LoginPage />} />
            <Route path='/faq' element={currentUser ? <Faq /> : <LoginPage />} />
            <Route path='/news' element={currentUser ? <News /> : <LoginPage />} />
            <Route path='/blog' element={currentUser ? <Blog /> : <LoginPage />} />
            <Route path='/testimonials' element={currentUser ? <Testimonials /> : <LoginPage />} />
            <Route path='/404' element={< NotFound />} />


            {/* <Route path='/notification' element={currentUser ? <NotificationPage /> : <LoginPage />} /> */}
            {
              currentUser?.email === "admin@gmail.com" &&
              <Route path='/admin/*' element={<Admin />} />
            }
            <Route path='/resetpassword/:id/:token' element={<Resetpassword />} />
            <Route path='/forgetpassword' element={<Forgetpassword />} />
            <Route path='otp' element={<Otp />} />
            <Route path='/*' element={< NotFound />} />
          </Routes>
          {/* {pathname !== '/profile' && pathname !== '/profile/security' && pathname !== '/profile/orders' && pathname !== '/profile/booking' && pathname !== '/profile/notification' && pathname !== '/profile/chat' && */}
          {/* {pathname !== '/admin' && pathname !== '/admin/all-users' && pathname !== '/admin/home-orders' && pathname !== '/admin/all-cars' && pathname !== '/admin/add-car/Add' && pathname !== '/admin/all-accessories' && pathname !== '/admin/add-accessory/Add' && pathname !== '/admin/home-booking' && pathname !== '/admin/all-services' && pathname !== '/admin/add-service/Add' && */}
          <Footer />
          {/* } */}
        </>
      }
    </>
  )
}

export default App
