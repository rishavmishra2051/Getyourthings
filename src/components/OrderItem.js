import React from 'react'
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const OrderItem = ({ item, status, date }) => {
    const navigate = useNavigate();
    const returnOrder = () => {
        toast.success("Order Returned");
        console.log("Order Returned")
    }
    const cancelOrder = () => {
        toast.success("Order Cancelled");
        console.log("Order Cancelled");
    }
    return (
    <div className='mb-4 border'>
        <div className='flex justify-between mx-2 mt-2'>
            <p className='font-titleFont font-semibold'>Date: {date}</p>
            <p className='inline-flex font-titleFont font-semibold'>Status: <p className='font-titleFont font-semibold' style={{ color: status === 'Delivered' ? 'green' : status === 'Returned' ? 'red' : '#FFA500' }}>{status}</p></p>
        </div>
        <div className="w-full lgl:px-5 grid lg:grid-cols-4 lgl:grid-cols-4 py-2">
            <p className="corner-date top-0 left-0 ml-4 mt-2 text-sm text-gray-500">{date}</p>
            <div className="flex col-span-4 mdl:col-span-2 items-center gap-4 ml-4">
                <img className="w-32 h-32" src={item.image} alt="productImage" />
                <h1 className="font-semibold">{item.title}</h1>
            </div>

            <div className="col-span-4 mdl:col-span-3 lgl:my-2 flex items-center justify-between py-4 mdl:py-0 px-4 mdl:px-0 gap-3 mdl:gap-0">
                
                <div className=" flex items-center font-titleFont font-bold text-lg">
                    <p>Qty: {item.quantity}</p>
                </div>
                <div className="flex items-center font-titleFont font-bold text-lg">
                    <p>Total: ${item.quantity * item.price}</p>
                </div>
            </div>
            <div className="col-span-4 mdl:col-span-3 flex items-center justify-between py-4 mdl:py-0 px-4 mdl:px-0 gap-6 mdl:gap-0">
                <div className='flex gap-4 justify-center'>
                    {status === 'Delivered' ? (
                        <button className="text-white py-1.5 px-1.5 font-titleFont rounded-md  font-medium text-base bg-red-500 hover:bg-red-600 active:bg-red-700 duration-200"
                            onClick={() => returnOrder()}>
                            Return Order
                        </button>
                    ) : (
                        <button className="text-white py-1.5 px-1.5 font-titleFont rounded-md  font-medium text-base bg-red-500 hover:bg-red-600 active:bg-red-700 duration-200"
                            onClick={() => cancelOrder()}>
                            Cancel Order
                        </button>
                    )}
                    <button className="text-white py-1.5 px-1.5 font-titleFont rounded-md  font-medium text-base bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 duration-200"
                        onClick={() => navigate("/productdetail", { state: { item: item } })}>
                        View Details
                    </button>
                </div>
            </div>
            
        </div>
        <ToastContainer
                position="top-left"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
    </div>
    )
}

export default OrderItem
