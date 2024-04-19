import React from 'react'
import Product from '../components/Product'
import Carousel from '../components/Carousel'
import { useSelector } from 'react-redux';
import AdminHome from '../admin/screens/AdminHome';
const Home = () => {
  const userInfo = useSelector(state => state.counter.userInfo);
  return (
    <div>
      {userInfo && userInfo.email === process.env.REACT_APP_ADMIN_EMAIL ?<>
      <AdminHome />
      </>:
      <>
      <Carousel />
      <Product />
      </>}
    </div>
  )
}

export default Home
