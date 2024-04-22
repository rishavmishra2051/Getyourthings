import React, { useState, useEffect } from 'react';
import { fetchOrders } from '../../FirebaseConfig';
import AdminOrderItem from '../components/AdminOrderItem';
import SwapVertIcon from '@mui/icons-material/SwapVert';
const AllOrders = () => {
  const [search, setSearch] = useState('');
  const [orderData, setOrderData] = useState([]);
  const [statuscategory, setStatuscategory] = useState('')
  useEffect(() => {
    const fetchData = async () => {
      const orders = await fetchOrders();
      // Sort orders by date before setting the state
      const sortedOrders = orders.sort((a, b) => new Date(b.date) - new Date(a.date));
      setOrderData(sortedOrders);
    };
    fetchData();
  }, []);


  const filteredOrders = orderData.filter(order => {
    // Filter by status, search query, and status category
    return (
      (order.status.toLowerCase().includes(search.toLowerCase()) ||
        order.userEmail.toLowerCase().includes(search.toLowerCase())) &&
      (statuscategory === '' || order.status === statuscategory)
    );
  });

  const getStatusCount = (status) => {
    return orderData.filter(order => order.status === status).length;
  };
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  console.log(statuscategory)
  return (
    <div>
      <div className="mx-auto px-4 flex justify-between items-center mt-4">
        <div className="lg:inline-flex flex h-10 rounded-md flex-grow relative">
          <input
            className="h-full text-base bg-transparent rounded-tl-md rounded-bl-md flex-grow outline-none border-2 border-yellow-500 px-2"
            type="search"
            placeholder="Search Orders by Email Id or Status"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="w-16 h-full text-yellow-500 cursor-pointer flex items-center justify-center border-2 border-yellow-500 hover:border-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200 rounded-tr-md rounded-br-md">
            Search
          </span>
        </div>
      </div>

      <div className='px-4 py-1 max-w-[200px]'>
        <div className="rounded sticky-summary bg-white border-2 border-purple-500">
          <div className="flex justify-between p-1 cursor-pointer" onClick={toggleExpanded}>
            <h3 className="font-semibold text-purple-500" >{statuscategory}</h3>
            <small className=''><span className={'fs-20'}>
              <SwapVertIcon className='fs-20 text-purple-500' />
            </span></small>
          </div>
          <hr />
          {expanded && (<div className='z-50 px-2'>
            <div className='flex flex-col gap-2 my-2'>
              <p onClick={() => setStatuscategory('')} className='p-1 tracking-wide font-titleFont rounded-md flex items-center justify-center border hover:bg-gray-200 duration-300 cursor-pointer'>Total Orders: <span className='text-purple-600'>{orderData.length}</span></p>
              <p onClick={() => setStatuscategory('Order placed')} className='p-1 tracking-wide font-titleFont rounded-md flex items-center justify-center border hover:bg-gray-200 duration-300 cursor-pointer'>New Orders: <span className='text-purple-600'>{getStatusCount('Order placed')}</span></p>
              <p onClick={() => setStatuscategory('Ready to Ship')} className='p-1 tracking-wide font-titleFont rounded-md flex items-center justify-center border hover:bg-gray-200 duration-300 cursor-pointer'>Ready to Ship: <span className='text-yellow-600'>{getStatusCount('Ready to Ship')}</span></p>
              <p onClick={() => setStatuscategory('Shipped')} className='p-1 tracking-wide font-titleFont rounded-md flex items-center justify-center border hover:bg-gray-200 duration-300 cursor-pointer'>Shipped: <span className='text-yellow-600'>{getStatusCount('Shipped')}</span></p>
              <p onClick={() => setStatuscategory('Out for Delivery')} className='p-1 tracking-wide font-titleFont rounded-md flex items-center justify-center border hover:bg-gray-200 duration-300 cursor-pointer'>Out for Delivery: <span className='text-yellow-600'>{getStatusCount('Out for Delivery')}</span></p>
              <p onClick={() => setStatuscategory('Delivered')} className='p-1 tracking-wide font-titleFont rounded-md flex items-center justify-center border hover:bg-gray-200 duration-300 cursor-pointer'>Delivered Orders: <span className='text-green-600'>{getStatusCount('Delivered')}</span></p>
              <p onClick={() => setStatuscategory('Cancelled')} className='p-1 tracking-wide font-titleFont rounded-md flex items-center justify-center border hover:bg-gray-200 duration-300 cursor-pointer'>Cancelled Orders: <span className='text-red-600'>{getStatusCount('Cancelled')}</span></p>
              <p onClick={() => setStatuscategory('Returned')} className='p-1 tracking-wide font-titleFont rounded-md flex items-center justify-center border hover:bg-gray-200 duration-300 cursor-pointer'>Returned Orders: <span className='text-red-600'>{getStatusCount('Returned')}</span></p>
            </div>
          </div>
          )}
        </div>
      </div>

      <div className='flex justify-center gap-4 mt-1 px-2'>
        <p className='font-semibold'>Pending: <span className='text-yellow-400'>{orderData.length - getStatusCount('Delivered') - getStatusCount('Cancelled') - getStatusCount('Returned')}</span></p>
        <p className='font-semibold'>Delivered: <span className='text-green-600'>{getStatusCount('Delivered')}</span></p>
        <p className='font-semibold'>R/C: <span className='text-orange-600'>{getStatusCount('Returned') + getStatusCount('Cancelled')}</span></p>
        <p className='font-semibold'>Total: <span className='text-blue-600'>{orderData.length}</span></p>
      </div>

      <div className="max-w-container mx-auto px-4">
        {filteredOrders.map(order => (
          <div key={order.id}>
            <AdminOrderItem order={order} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllOrders;
