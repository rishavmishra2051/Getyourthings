import React, { useState } from 'react'
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import { ToastContainer, toast } from "react-toastify";
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
const OfferItem = ({ offer }) => {
    const [expanded, setExpanded] = useState(false);
    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                toast.success('Copied to clipboard!');
            })
            .catch(err => {
                console.error('Unable to copy text to clipboard:', err);
            });
    };
    const toggleExpanded = () => {
        setExpanded(!expanded);
    };
    return (
        <div className='lgl:m-3'>
            <div className="rounded mb-3 border border-light">
                <div className="flex justify-between p-2 cursor-pointer" onClick={toggleExpanded}>
                    <h3 className="font-semibold"><LocalOfferOutlinedIcon /> {offer.title}</h3>
                    <small className=''><i>t&c*</i><span className={'fs-20'}>
                        {expanded ? <ArrowDropDownOutlinedIcon /> : <ArrowRightOutlinedIcon />}
                    </span></small>
                </div>
                {expanded && (<div>
                    <div className='flex px-2 justify-between'>
                        <div className='flex'>
                            <p className=" rounded-tl-md rounded-bl-md cursor-pointer px-4 py-1 border border-green-500 font-titleFont text-lg">
                                {offer.code}
                            </p>
                            <button onClick={() => handleCopy(offer.code)} className="rounded-tr-md rounded-br-md cursor-pointer px-4 py-1 bg-gradient-to-tr from-green-400 to-green-200 border border-green-500 hover:border-green-700 hover:from-green-300 to hover:to-green-400 active:bg-gradient-to-bl active:from-green-400 active:to-green-500 font-titleFont font-semibold text-lg duration-300">
                                Copy
                            </button>
                        </div>
                    </div>
                    <div className="p-2">
                        <p><u>Offer Description:- </u>{offer.desc}</p>
                        <div className='text-gray-400'><i>
                            <p><u>Terms & Conditions</u></p>
                            
                            <ul className='list-disc px-5'>
                                {offer.tcs.map((tc) => (
                                    <li key={tc.id}>{tc}</li>
                                ))}
                            </ul></i>
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

export default OfferItem
