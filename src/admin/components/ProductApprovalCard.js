import React, { useState } from 'react'
import { productRef } from "../../FirebaseConfig";
import { updateDoc, doc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
const ProductApprovalCard = ({ product }) => {
    const approveProduct = async () => {
        try {
            await updateDoc(doc(productRef, product.id), { verification: "Approved" });
            toast.success('Product approved!');
        } catch (error) {
            console.error('Failed to update product verification status: ', error);
            toast.error('Failed to update verification status');
        }
    };
    const rejectProduct = async () => {
        try {
            await updateDoc(doc(productRef, product.id), { verification: "Rejected" });
            toast.success('Product rejected!');
        } catch (error) {
            console.error('Failed to update product verification status: ', error);
            toast.error('Failed to update verification status');
        }
    };
    return (
        <div>
            <div className='mb-4 border'>
                <div className="max-w-container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-1">
                            <div className="bg-white h-auto py-6 z-30 relative flex flex-col gap-4">
                                <div className='flex'>
                                    <span className="absolute top-2 left-2 text-gray-800">
                                        Date: {product.date}
                                    </span>
                                    <span style={{ color: product.verification === 'Approved' ? 'green' : product.verification === 'Rejected' ? 'red' : '#f8b500' }} className="absolute font-titleFont font-semibold top-2 right-2">
                                        {product.verification}
                                    </span>
                                </div>
                                <div className="w-full h-auto flex items-center justify-center relative group">
                                    <img
                                        className="w-32 h-40 object-contain"
                                        src={product.image}
                                        alt="ProductImg"
                                    />
                                </div>
                                <small className="text-gray-800 font-medium text-center">
                                    Seller: {product.sellerEmail}
                                </small>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="bg-white h-auto py-6 z-30 relative flex flex-col gap-4">

                                <div className="w-full h-auto flex items-center justify-center relative group">
                                    <div className="px-4 bg-white flex flex-col gap-1">

                                        <h2 className="font-titleFont tracking-wide text-lg ext-gray-800 font-medium">
                                            {product.title}
                                        </h2>
                                        <h3 className="font-titleFont tracking-wide text-md text-gray-800">
                                            <i>{product.category}</i>
                                        </h3>
                                        <div className="flex items-center gap-8">
                                            <p className="text-lg ext-gray-800 font-semibold">
                                                ₹{product.price}
                                            </p>

                                            <p className="flex font-semibold items-center ext-gray-800">
                                                Quantity: {product.quantity}
                                            </p>

                                        </div>

                                        <div>
                                            <p className="text-sm text-text_color">{product.description}</p>

                                        </div>
                                        <div className='flex gap-2'>
                                            <button onClick={() => approveProduct()} className="w-full py-1.5 rounded-md mt-3 font-titleFont font-medium text-base bg-gradient-to-tr from-green-400 to-green-200 border border-green-500 hover:border-green-700 hover:from-green-300 to hover:to-green-400 active:bg-gradient-to-bl active:from-green-400 active:to-green-500 duration-200">
                                                Approve
                                            </button>
                                            <button onClick={() => rejectProduct()} className="w-full py-1.5 rounded-md mt-3 font-titleFont font-medium text-base bg-gradient-to-tr from-red-400 to-red-200 border border-red-500 hover:border-red-700 hover:from-red-300 to hover:to-red-400 active:bg-gradient-to-bl active:from-red-400 active:to-red-500 duration-200">
                                                Reject
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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

export default ProductApprovalCard
