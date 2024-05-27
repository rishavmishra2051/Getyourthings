import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { faqs } from '../constants/SellerFAQs'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SellerVerification from '../components/SellerVerification';
import { fetchSellers } from '../FirebaseConfig';
import { ToastContainer, toast } from "react-toastify";
import SellerDashBoard from './SellerDashBoard';
import { Link } from "react-router-dom";
const Seller = () => {
  const [sellerform, setSellerform] = useState(false);
  const userInfo = useSelector(state => state.counter.userInfo);
  const [firstTime, setFirstTime] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState("");
  const [seller, setSeller] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const sellers = await fetchSellers();
      if (userInfo) {
        sellers.forEach((seller) => {
          if (seller.email === userInfo.email) {
            setFirstTime(false);
            setVerificationStatus(seller.verification);
          }
        })
      }
    };
    fetchData();
  }, []);

  let navigate = useNavigate();
  const openForm = () => {
    if (!userInfo) {
      toast.error("Please Login First");
      navigate('/signup');
    }
    else {
      setSellerform(true);
    }
  }
  return (
    <div>
      {firstTime ?
        <>
          <h1 className="text-center text-3xl text-stone-800"><u>Seller</u></h1>
          <div className="flex justify-center items-center m-5">
            <button
              onClick={() => openForm()}
              className="flex bg-orange-500 px-5 py-2 text-white rounded-xl cursor-pointer"
            >
              Start Seller Verification <ArrowForwardIcon className="ml-2" />
            </button>
          </div>

          <div className="max-w-container mx-auto px-4">

            <h1 className="text-2xl text-gray-700 mb-2"><u>Frequently Asked Questions (FAQs)</u></h1>
            <hr />
            <div className="mt-5">
              {Object.keys(faqs).map((section) => (
                <div key={section}>
                  <h2 className="text-2xl text-gray-700 mb-4">{section}</h2>
                  {Object.keys(faqs[section]).map((key) => (
                    <div key={key} className="mb-4">
                      <h3 className="text-xl text-gray-800">{faqs[section][key].question}</h3>
                      <p className="text-gray-600">{faqs[section][key].answer}</p>
                    </div>
                  ))}
                  <hr className="my-4" />
                </div>
              ))}
            </div>
          </div>
          {sellerform && <SellerVerification setSellerform={() => setSellerform(false)} />}
        </>
        : <>
          {verificationStatus === "Approved" ? <SellerDashBoard />
            : verificationStatus === "Rejected" ? <div className='text-center justify-center'>
              <p className='text-red-500 my-10'>Your account verification has been rejected. Sorry, but you're not able to sell on our platform. Please contact us for further details.</p>
              <Link to="mailto:getyourthingsteam@gmail.com" className='border border-blue-700 p-2'><span className='text-blue-700'>Contact Us</span></Link>
            </div>
              : <div className='text-center justify-center'><p className='my-10 text-yellow-500 text-center'>Please wait, we are verifying your account. Your account will be verified soon. we'll notify you through email once it's verified.</p>
              <Link to="mailto:getyourthingsteam@gmail.com" className='border border-blue-700 p-2'><span className='text-blue-700'>Contact Us</span></Link>
              </div>}
        </>}
    </div>
  )
}

export default Seller
