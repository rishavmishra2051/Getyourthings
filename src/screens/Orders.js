import React, { useState, useEffect } from 'react'
import { fetchOrders } from '../FirebaseConfig';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import OrderItem from '../components/OrderItem';
const Orders = () => {
  const [orderData, setOrderData] = useState([]);
  const userInfo = useSelector(state => state.counter.userInfo);
  useEffect(() => {
    const fetchData = async () => {
      const orders = await fetchOrders();
      const sortedOrders = orders.sort((a, b) => new Date(b.date) - new Date(a.date));
      setOrderData(sortedOrders);
    };
    fetchData();
  }, []);
  
  return (
    <div>
      <div className="max-w-container mx-auto px-4">
      {orderData.filter((data) => data.userEmail === userInfo.email).length > 0 ? (
        <div>
          <h1 className=" heading-background"><u>Offers</u></h1>
          <div className="mt-5">
          {orderData
              .filter((data) => data.userEmail === userInfo.email)
              .map((order) => (
                <div key={order.id}>
                  {order.cartData.map((item) => (
                    <div key={item.id}>
                      <OrderItem id={order.id} item={item} status={order.status} date={order.date} />
                    </div>
                  ))}
                </div>
              ))}
            
          </div>
          <div className='flex gap-4 justify-center'>
            <Link to="/">
              <button className="text-white py-1.5 px-1.5 mb-4 font-titleFont rounded-md  font-medium text-base bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 duration-200">
                Shop More
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen -mt-20">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col mdl:flex-row justify-center items-center"
          >
            <div className="max-w-[500px] p-4 py-8 bg-white flex flex-col items-center rounded-md shadow-lg">
              <h1 className="font-titleFont text-xl mb-3 text-yellow-500 font-bold uppercase">
                Your Orders <LocalMallOutlinedIcon />
              </h1>
              <p className="text-sm text-center px-10 -mt-2">
                Your have no orders till now. Fill it with
                books, electronics, videos, etc. and make it happy.
              </p>
              <Link to="/">
                <button className="rounded-md cursor-pointer mt-3 bg-gradient-to-tr from-yellow-400 to-yellow-200 border border-yellow-500 hover:border-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 px-8 py-2 font-titleFont font-semibold text-lg duration-300">
                  Order Now
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </div>
    </div>
  )
}

export default Orders
