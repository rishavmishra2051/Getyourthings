import React, { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import { updateDoc, doc } from "firebase/firestore";
import { sellerRef } from "../../FirebaseConfig";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
const AdminSellerCard = ({ seller }) => {
    const [expanded, setExpanded] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(seller.status);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    const handleStatusChange = async () => {
        try {
            // Update the status of the order document in Firebase
            await updateDoc(doc(sellerRef, seller.id), { verification: selectedStatus });
            toast.success('Status updated successfully!');
        } catch (error) {
            console.error('Failed to update seller verification status: ', error);
            toast.error('Failed to update verification status');
        }
    };
    
  return (
    <div className='lgl:m-3'>
            <div className="rounded mb-3 border border-light">
                <div className="flex justify-between p-2 cursor-pointer" onClick={toggleExpanded}>
                    <h3 className="font-semibold "><FiberManualRecordIcon style={{ color: seller.verification === 'Approved' ? 'green' : seller.verification === 'Rejected' ? 'red' : seller.verification === 'Pending' ? '#eec60a' : 'black'}} /> {seller.email}</h3>
                    <small className=''><span className='ml-2'>
                        {expanded ? <ArrowDropDownOutlinedIcon /> : <ArrowRightOutlinedIcon />}
                    </span></small>
                </div>
                {expanded && (<div className='z-50 px-2'>
                    <div>
                        <div className='flex justify-between max-w-[350px]'>
                            <h3 className='font-semibold'><u>Seller Details</u></h3>
                            <div className='flex gap-2'>
                                <select
                                    name="status"
                                    id="status"
                                    className='font-semibold border-2 border-black cursor-pointer text-center'
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                >
                                    <option className='text-white' value={seller.verification} style={{ backgroundColor: 'blue', display: 'none' }}>{seller.verification}</option>
                                    <option className='text-white' value="Approved" style={{ backgroundColor: 'green' }}>Approve</option>
                                    <option className='text-white' value="Rejected" style={{ backgroundColor: 'red' }}>Reject</option>
                                    <option className='text-white' value="Pending" style={{ backgroundColor: '#eec60a' }}>Pending</option>
                                </select>
                                <button
                                    className='font-semibold px-1 rounded-md border-2 border-orange-600 bg-orange-600 text-white cursor-pointer'
                                    onClick={handleStatusChange}
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                        <div className='m-2'>
                            <p>Name: {seller.name}</p>
                            <p>Store Name: {seller.storeName}</p>
                            <p>Aadhar Number: {seller.aadharNumber}</p>
                            <p>PAN Number: {seller.aadharNumber}</p>
                            <p>GST Number: {seller.panNumber}</p>
                            <p>Phone Number: {seller.gstNumber}</p>
                            <p>Address: {seller.address}</p>
                            <p>State: {seller.state}</p>
                            <p>Pincode: {seller.pincode}</p>
                            <p>Date: {seller.date}</p>
                            <p>Verification: <span style={{ color: seller.verification === 'Approved' ? 'green' : seller.verification === 'Rejected' ? 'red' : seller.verification === 'Pending' ? '#eec60a' : 'black'}}>{seller.verification}</span></p>
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

export default AdminSellerCard
