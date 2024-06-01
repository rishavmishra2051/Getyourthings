import React, { useState, useEffect } from 'react';
import { fetchOrders, fetchUsers, fetchSellers, fetchProducts } from '../../FirebaseConfig';
import { useNavigate } from 'react-router-dom';
import OrderChart from '../components/OrderChart';
//import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import PieChartIcon from '@mui/icons-material/PieChart';
import DonutLargeOutlinedIcon from '@mui/icons-material/DonutLargeOutlined';

const AdminHome = () => {

    const navigate = useNavigate();
    const [progress, setProgress] = useState(false);
    const [chartType, setChartType] = useState("bar");
    const [ordersLength, setOrdersLength] = useState(0);
    const [usersLength, setUsersLength] = useState(0);
    const [sellersLength, setSellersLength] = useState(0);
    const [productsLength, setProductsLength] = useState(0);
    const [approvedProducts, setApprovedProducts] = useState(0);
    const [pendingProducts, setPendingProducts] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
          const orders = await fetchOrders();
          const users = await fetchUsers();
          const sellers = await fetchSellers();
          const products = await fetchProducts();
          const getProductCount = (verification) => {
            return products.filter(products => products.verification === verification).length;
          };

          setSellersLength(sellers.length);
          setOrdersLength(orders.length);
          setUsersLength(users.length);
          setProductsLength(products.length);
          setApprovedProducts(getProductCount("Approved"));
          setPendingProducts(getProductCount("Pending"));
        };
        fetchData();
      }, []);
      
    const handleChartClick = (type) => {
        setProgress(true);
        setChartType(type);
    };

    return (
        <>
            <div className='px-5 py-5'>
                <h1 className='text-3xl font-bold text-center mb-10'><u>Admin Dashboard</u></h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-1 flex justify-center items-center">
                        <div className="container mx-auto px-4 py-8 max-w-md">
                            <div className="grid grid-cols-2 gap-6">
                                <div onClick={() => { navigate('/allorders') }} className="cursor-pointer bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 shadow-lg text-white">
                                    <h2 className="text-xl font-semibold mb-2">Orders</h2>
                                    <p className="text-gray-200">Total Orders: {ordersLength}</p>
                                </div>
                                <div onClick={() => { navigate('/allsellers') }} className="cursor-pointer bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg p-6 shadow-lg text-white">
                                    <h2 className="text-xl font-semibold mb-2">Sellers</h2>
                                    <p className="text-gray-200">Total Sellers: {sellersLength}</p>
                                </div>
                                <div onClick={() => { navigate('/allusers') }} className="cursor-pointer bg-gradient-to-r from-green-500 to-lime-500 rounded-lg p-6 shadow-lg text-white">
                                    <h2 className="text-xl font-semibold mb-2">Users</h2>
                                    <p className="text-gray-200">Total Users: {usersLength}</p>
                                </div>
                                <div onClick={() => { navigate('/inventary') }} className="cursor-pointer bg-gradient-to-r from-yellow-500 to-amber-500 rounded-lg p-6 shadow-lg text-white">
                                    <h2 className="text-xl font-semibold mb-2">Products</h2>
                                    <p className="text-gray-200">Total Products: {approvedProducts}</p>
                                </div>
                                <div onClick={() => { navigate('/productapproval') }} className="cursor-pointer bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-6 shadow-lg text-white">
                                    <h2 className="text-xl font-semibold mb-2">Request</h2>
                                    <p className="text-gray-200">Approval Pending: {pendingProducts} </p>
                                </div>
                                <div onClick={() => { navigate('/') }} className="cursor-pointer bg-gradient-to-r from-pink-500 to-amber-500 rounded-lg p-6 shadow-lg text-white">
                                    <h2 className="text-xl font-semibold mb-2">Dummy</h2>
                                    <p className="text-gray-200">Approval Pending: {pendingProducts} </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 flex justify-center items-center">
                        <div className="p-2">
                            <div className='flex gap-2 justify-center'>
                                <BarChartOutlinedIcon style={{ fontSize: "2.5rem" }} className='m-1.5 rounded-md cursor-pointer text-purple-800 border-2 border-purple-800' onClick={() => handleChartClick('bar')} />
                                <TimelineOutlinedIcon style={{ fontSize: "2.5rem" }} className='m-1.5 rounded-md cursor-pointer text-purple-800 border-2 border-purple-800' onClick={() => handleChartClick('line')} />
                                <PieChartIcon style={{ fontSize: "2.5rem" }} className='m-1.5 rounded-md cursor-pointer text-purple-800 border-2 border-purple-800' onClick={() => handleChartClick('pie')} />
                                <DonutLargeOutlinedIcon style={{ fontSize: "2.5rem" }} className='m-1.5 rounded-md cursor-pointer text-purple-800 border-2 border-purple-800' onClick={() => handleChartClick('doughnut')} />
                            </div>
                            <OrderChart type={chartType} />
                            <p className='text-center text-gray-600'>Last 7 days Report</p>
                        </div>
                    </div>
                </div>
            </div>

            {/*<button className='border border-red-500 m-5' onClick={() => { handleChartClick('bar') }}>
                Last 7 days Report
            </button>
            {progress && (
                <div className="order-chart-container">
                    <div className='flex gap-2 justify-center'>
                        <BarChartOutlinedIcon style={{ fontSize: "2.5rem" }} className='m-1.5 rounded-md cursor-pointer text-purple-800 border-2 border-purple-800' onClick={() => handleChartClick('bar')} />
                        <TimelineOutlinedIcon style={{ fontSize: "2.5rem" }} className='m-1.5 rounded-md cursor-pointer text-purple-800 border-2 border-purple-800' onClick={() => handleChartClick('line')} />
                        <PieChartIcon style={{ fontSize: "2.5rem" }} className='m-1.5 rounded-md cursor-pointer text-purple-800 border-2 border-purple-800' onClick={() => handleChartClick('pie')} />
                        <DonutLargeOutlinedIcon style={{ fontSize: "2.5rem" }} className='m-1.5 rounded-md cursor-pointer text-purple-800 border-2 border-purple-800' onClick={() => handleChartClick('doughnut')} />
                        <CloseOutlinedIcon style={{ fontSize: "2.5rem" }} className='m-1.5 rounded-md cursor-pointer text-purple-800 border-2 border-purple-800' onClick={() => setProgress(false)} />
                    </div>
                    <OrderChart type={chartType} />
                </div>
            )}*/}
        </>
    )
}

export default AdminHome;
