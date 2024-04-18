import React, { useState, useEffect } from 'react';
import { fetchOrders } from '../../FirebaseConfig';
import AdminOrderItem from '../components/AdminOrderItem';

const AllOrders = () => {
  const [search, setSearch] = useState('');
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const orders = await fetchOrders();
      // Sort orders by date before setting the state
      const sortedOrders = orders.sort((a, b) => new Date(b.date) - new Date(a.date));
      setOrderData(sortedOrders);
    };
    fetchData();
  }, []);

  const cancelledOrders = () => {
    let length = 0;
    orderData.forEach((order) => {
      if(order.status === 'Cancelled'){
        length ++;
      }
    });
    return length;
  };
  const deliveredOrders = () => {
    let length = 0;
    orderData.forEach((order) => {
      if(order.status === 'Delivered'){
        length ++;
      }
    });
    return length;
  };
  const pendingOrders = () => {
    let length = deliveredOrders()+cancelledOrders();
    
    return orderData.length-length;
  };
  
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <div className="mx-auto px-4 flex justify-between items-center mt-4">
        <div className="lg:inline-flex flex h-10 rounded-md flex-grow relative">
          <input
            className="h-full text-base bg-transparent rounded-tl-md rounded-bl-md flex-grow outline-none border-2 border-yellow-500 px-2"
            type="search"
            placeholder="Search Orders by Email Id"
            value={search}
            onChange={handleSearchChange}
          />
          <span className="w-16 h-full text-yellow-500 cursor-pointer flex items-center justify-center border-2 border-yellow-500 hover:border-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200 rounded-tr-md rounded-br-md">
            Search
          </span>       
        </div>      
      </div>
      <div className='flex justify-center gap-4'>
      <p className='font-semibold'>Total Orders: <span className='text-purple-600'>{orderData.length}</span></p>
      <p className='font-semibold'>Pending Orders: <span className='text-yellow-400'>{pendingOrders()}</span></p>
      <p className='font-semibold'>Delivered Orders: <span className='text-green-600'>{deliveredOrders()}</span></p>
      <p className='font-semibold'>Cancelled Orders: <span className='text-red-600'>{cancelledOrders()}</span></p>
      </div>
      
      <div className="mt-5 max-w-container mx-auto px-4">
        {orderData
          .filter((data) => data.userEmail.includes(search.toLowerCase()))
          .map((order) => (
            <div key={order.id}>
              <AdminOrderItem order={order} />
              
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllOrders;
