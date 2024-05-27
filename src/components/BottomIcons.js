import React from 'react'
import SellIcon from '@mui/icons-material/Sell';
import HomeIcon from '@mui/icons-material/Home';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import PersonIcon from '@mui/icons-material/Person';
const BottomIcons = () => {
    return (
        <div className='sticky-icon-bottom'>
            <div className='flex gap-10 cursor-pointer px-10'>

                <div className='flex flex-col items-center text-orange-500'>
                    <FmdGoodIcon />
                    <p>City</p>
                </div>

                <div className='flex flex-col items-center text-orange-500'>
                    <SellIcon />
                    <p>Sell</p>
                </div>

                <div className='flex flex-col items-center text-orange-500'>
                    <HomeIcon />
                    <p>Home</p>
                </div>

                <div className='flex flex-col items-center text-orange-500'>
                    <LocalTaxiIcon />
                    <p>Drive</p>
                </div>

                <div className='flex flex-col items-center text-orange-500'>
                    <PersonIcon />
                    <p>Profile</p>
                </div>

            </div>
        </div>
    )
}

export default BottomIcons
