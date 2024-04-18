import React, { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import { updateDoc, doc } from "firebase/firestore";
import { colRef } from "../../FirebaseConfig";

const AdminOrderItem = ({ order }) => {
    const [expanded, setExpanded] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(order.status); // State to track the selected status

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    const handleStatusChange = async () => {
        try {
            // Update the status of the order document in Firebase
            await updateDoc(doc(colRef, order.id), { status: selectedStatus });
            toast.success('Status updated successfully!');
        } catch (error) {
            console.error('Failed to update order status: ', error);
            toast.error('Failed to update order status');
        }
    };

    const copyAddress = () => {
        const addressText = document.getElementById('shippingaddress').innerText;
        navigator.clipboard.writeText(addressText)
            .then(() => {
                toast.success('Address copied to clipboard!');
            })
            .catch((error) => {
                console.error('Failed to copy address: ', error);
            });
    };

    return (
        <div className='lgl:m-3'>
            <div className="rounded mb-3 border border-light">
                <div className="flex justify-between p-2 cursor-pointer" onClick={toggleExpanded}>
                    <h3 className="font-semibold text-purple-500" style={{ color: order.status === 'Delivered' ? 'green' : order.status === 'Cancelled' ? 'red' : order.status !== 'Order placed' ? '#eec60a' : '#7a0697' }}>{order.id}</h3>
                    <small className=''><span className={'fs-20'}>
                        {expanded ? <ArrowDropDownOutlinedIcon /> : <ArrowRightOutlinedIcon />}
                    </span></small>
                </div>
                {expanded && (<div className='z-50 px-2'>
                    <div>
                        <div className='flex justify-between max-w-[350px]'>
                            <h3 className='font-semibold'><u>Order Details</u></h3>
                            <div className='flex gap-2'>
                                <select
                                    name="status"
                                    id="status"
                                    className='font-semibold border-2 border-black cursor-pointer'
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                >
                                    <option value="Order placed">Change Status</option>
                                    <option value="Ready to Ship">Ready to Ship</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Out for Delivery">Out for Delivery</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Returned">Returned</option>
                                </select>
                                <button
                                    className='font-semibold px-1 rounded-md border-2 border-purple-600 bg-purple-600 text-white cursor-pointer'
                                    onClick={handleStatusChange}
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                        <div className='m-2'>
                            <p>Email Id: {order.userEmail}</p>
                            <p>Date: {order.date}</p>
                            <p>Payment: {order.paymentMethod}</p>
                            <p>Amount: ${parseInt(order.amount)}</p>
                            <p>Status: {order.status}</p>
                        </div>
                        <table className='border border-collapse mx-2 mb-2 max-w-[350px] min-w-[350px]'>
                            <thead>
                                <tr>
                                    <th scope="col" className="border">Id</th>
                                    <th scope="col" className="border">Product Name</th>
                                    <th scope="col" className="border">Qty</th>
                                    <th scope="col" className="border">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.cartData.map((product) => (
                                    <tr key={product.id}>
                                        <td className="border">{product.id}</td>
                                        <td className="border">{product.title.substring(0, 30)}</td>
                                        <td className="border">{product.quantity}</td>
                                        <td className="border">${parseInt(product.price) * parseInt(product.quantity)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='rounded mx-2 mb-3 border border-light max-w-[350px]'>
                        <div className='flex justify-between'>
                            <p className='px-2 font-semibold'>Shipping Address</p>
                            <button onClick={copyAddress} className="cursor-pointer bg-gradient-to-tr from-green-400 to-green-200 border border-green-500 hover:border-green-700 hover:from-green-300 to hover:to-green-400 active:bg-gradient-to-bl active:from-green-400 active:to-green-500 duration-300">
                                Copy
                            </button>
                        </div>
                        <hr />
                        <div className='px-2' id='shippingaddress'>
                            <p>Name- {order.address.name}</p>
                            <p>Phone- {order.address.phone}</p>
                            <p>Address- {order.address.house}, {order.address.area}, {order.address.district}, {order.address.state}, {order.address.pincode}</p>
                        </div>
                    </div>
                </div>
                )}
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

export default AdminOrderItem;
