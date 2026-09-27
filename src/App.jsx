import React from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ApiLoadingOverlay from './components/ApiLoadingOverlay.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Feedback from './pages/Feedback.jsx'
import Shop from './pages/Shop.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import OrderSuccess from './pages/OrderSuccess.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import { Routes, Route, Navigate } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <ApiLoadingOverlay />
    </div>
  )
}
