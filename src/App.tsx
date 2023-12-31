import { Routes, Route } from 'react-router-dom'
import FrontPage from './pages/frontpage'
import Header from './components/navbar/Header'
import CreateUser from './pages/create_user/create_user'
import RestaurantMenu from './pages/Resturant_menu'
import CartPage from './pages/cart'
import AdminLoginPage from './pages/Admin_login'
import ResturantLoginPage from './pages/Resturant_login'
import AccountPage from './pages/Account'
import { useEffect, useState } from 'react'
import Cookies from "js-cookie"
import Footer from './components/footer/Footer'
import { ShoppingCartProvider } from './components/ShoppingCartContext'
import CreateOrderPage from './pages/create_order/Create_order'
import Order from './pages/order_page/order'

export default function App() {

  // Variable holding login status
  const [loggedIn, setLoggedIn] = useState<Boolean>(false);

  // Check if user is logged in (Runs on page load)
  // TODO: Extra verify?
  useEffect(() => {
    if(Cookies.get("login-status") !== undefined) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  return (
    <>
          <ShoppingCartProvider>
      <Header isLoggedIn={loggedIn}/>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/create_user" element={<CreateUser />} />
        <Route path="/Resturant_menu" element={<RestaurantMenu/>} />
        <Route path="/cart" element={<CartPage/>} />
        <Route path="/account" element={<AccountPage/>} />
        <Route path="/Admin_login" element={<AdminLoginPage/>} />
        <Route path='/Resurant_login' element={<ResturantLoginPage/>} />
        <Route path="/create_order" element={<CreateOrderPage isLoggedIn={loggedIn}/>}   />
        <Route path="/order" element={<Order isLoggedIn={loggedIn}/>} />
      </Routes>
      <Footer />
      </ShoppingCartProvider>
    </>
  )
}