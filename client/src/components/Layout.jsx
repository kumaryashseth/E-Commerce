import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { ToastContainer, toast } from 'react-toastify';


const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main style={{ minHeight: '70vh' }} className='container py-4'>
        <ToastContainer/>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout