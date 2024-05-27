import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useMediaQuery } from '@mui/material';
import { Link } from "react-router-dom";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Search from '../components/Search';
import { HeadsetMicOutlined } from '@material-ui/icons';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ChatBot from "react-simple-chatbot";
import { steps } from '../constants/ChatboxSteps'
import LoyaltyOutlinedIcon from '@mui/icons-material/LoyaltyOutlined';

const SpecialIcons = () => {
  const cartLength = useSelector(state => state.counter.cartData.length)
  const wishListLength = useSelector(state => state.wishList.wishListData.length)
  const isMobile = useMediaQuery('(max-width: 720px)');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const userInfo = useSelector(state => state.counter.userInfo)
  const [helpCenter, setHelpCenter] = useState(false);
  const handleSearchIconClick = () => {
    setIsSearchOpen(!isSearchOpen);
  };
  return (<div className=''>
    <div className="home-container">
      {isMobile && isSearchOpen && <div className='my-1 fixed top-20 left-1/2 transform -translate-x-1/2 z-50'><Search /></div>}
      <div className="sticky-icon">
        {
          isMobile ? (
            <SearchOutlinedIcon
              onClick={handleSearchIconClick}
              style={{ fontSize: "2.5rem" }}
              className='mb-2 font-titleFont text-base text-white bg-yellow-400 hover:text-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-400 rounded-md cursor-pointer border-2 border-yellow-400 hover:border-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500'
            />
          ) : ''
        }
        
          <Link to="/cart">
            <div className="relative">
              <ShoppingCartOutlinedIcon style={{ fontSize: "2.5rem" }} className='mb-2 font-titleFont text-base text-white bg-yellow-400 hover:text-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-400 rounded-md cursor-pointer border-2 border-yellow-400 hover:border-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500' />
              <span className="absolute text-xs text-white -top-1 left-6 w-4 font-semibold p-1 h-4 bg-green-500 rounded-full flex justify-center items-center">
                {cartLength > 0 ? cartLength : 0}
              </span>
            </div>
          </Link>

          {userInfo && <Link to="/wishlist">
            <div className="relative">
              <FavoriteBorderOutlinedIcon style={{ fontSize: "2.5rem" }} className='mb-2 font-titleFont text-base text-white bg-yellow-400 hover:text-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-400 rounded-md cursor-pointer border-2 border-yellow-400 hover:border-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500' />
              <span className="absolute text-xs text-white -top-1 left-6 w-4 font-semibold p-1 h-4 bg-green-500 rounded-full flex justify-center items-center">
                {wishListLength > 0 ? wishListLength : 0}
              </span>
            </div>
          </Link>}

          <Link to="/seller">
            <div className="relative">
              <LoyaltyOutlinedIcon style={{ fontSize: "2.5rem" }} className='mb-2 font-titleFont text-base text-white bg-yellow-400 hover:text-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-400 rounded-md cursor-pointer border-2 border-yellow-400 hover:border-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500' />
              <span className="absolute text-xs text-white -top-1 left-6 w-4 font-semibold p-1 h-4 bg-orange-500 rounded-full flex justify-center items-center">
                %
              </span>
            </div>
          </Link>

          <div className="relative" onClick={() => setHelpCenter(true)}>
            <HeadsetMicOutlined style={{ fontSize: "2.5rem" }} className='mb-2 font-titleFont text-base text-white bg-yellow-400 hover:text-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-400 rounded-md cursor-pointer border-2 border-yellow-400 hover:border-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500' />
          </div>

      </div>
      {helpCenter && <div className="sticky-icon flex justify-between">
        <ChatBot steps={steps} />
        <CloseOutlinedIcon style={{ fontSize: "2.5rem" }} className='ms-2 rounded-md cursor-pointer text-purple-800 border-2 border-purple-800' onClick={() => setHelpCenter(false)}/>
      </div>
      }
    </div>

  </div>
  )
}

export default SpecialIcons
