import React, { useState, useEffect } from 'react'
import Logo from "../assets/Logo.png"
import { useNavigate } from "react-router-dom";
import Search from './Search';
import { useSelector } from 'react-redux';
import { useMediaQuery } from '@mui/material';
import UserSettingOption from './UserSettingOption';
import SpecialIcons from './SpecialIcons';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
const Header = () => {
    let navigate = useNavigate();
    const userInfo = useSelector(state => state.counter.userInfo)
    const isMobile = useMediaQuery('(max-width: 720px)');
    const [settingList, setSettingList] = useState(false);
    return (
        <div className='sticky top-0 z-50'>
            <nav className="bg-header_color text-whiteText py-4 gap-2">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => { navigate("/") }}>
                        <img src={Logo} alt="Logo" className="h-10 w-10" />
                        <h1 className='font-titleFont font-bold'><i>GetYourThings</i></h1>
                    </div>

                    {/* Search Bar */}
                    {!isMobile ? <Search /> : ''}

                    {/* Login Button */}
                    {!userInfo ?
                        <button onClick={() => { navigate("/signup") }} className="font-titleFont font-medium text-base border-2 border-yellow-500 hover:border-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-400 p-1.5 rounded-md">
                            SignIn <LoginOutlinedIcon />
                        </button> :
                        <img onClick={() => setSettingList(!settingList)} className="w-10 h-10 rounded-full cursor-pointer" src={
                            userInfo.image
                                ? userInfo.image
                                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjjoyLMZMgE-exsnGT3Q_Py08zmW3bglsJKw&s"
                        } alt='' />
                    }
                </div>
            </nav>

            {/* User Setting List and Special Icons */}
            {settingList ?
                <UserSettingOption closeSettingList={() => setSettingList(false)} />
                : <SpecialIcons />}
        </div>
    )
}

export default Header
