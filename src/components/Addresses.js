import React from 'react'
import { ToastContainer, toast } from "react-toastify";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
const Addresses = ({address}) => {
  return (
    <div className='lgl:m-3'>
            <div className="p-2 cursor-pointer rounded mb-3 lgl:card-border border border-light">
                <div>
                    <h3 className="font-titleFont font-semibold text-orange-500"><LocationOnOutlinedIcon /> </h3>
                    <p>{address.name}</p>
                    <p>{address.phone}</p>
                    <p>{address.house}</p>
                    <p>{address.area}</p>
                    <p>{address.district}, {address.state}, {address.pincode}</p>
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

export default Addresses
