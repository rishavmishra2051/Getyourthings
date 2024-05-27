import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderChart from '../components/OrderChart';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import PieChartIcon from '@mui/icons-material/PieChart';
import DonutLargeOutlinedIcon from '@mui/icons-material/DonutLargeOutlined';

const AdminHome = () => {

    const navigate = useNavigate();
    const [progress, setProgress] = useState(false);
    const [chartType, setChartType] = useState("bar");
    
    const handleChartClick = (type) => {
        setProgress(true);
        setChartType(type);
    };

    return (
        <>
            <div className='px-10 py-20'>
                <div className="justify-center items-center max-w-screen-xl grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 xl:gap-4">
                    <div className='admin-card' onClick={() => { navigate('/allorders') }}>
                        <div className="relative">
                            View Orders
                        </div>
                    </div>
                    <div className='admin-card' onClick={() => { navigate('/allsellers') }}>
                        View Sellers
                    </div>
                    <div className='admin-card' onClick={() => { handleChartClick('bar') }}>
                        Last 7 days Report
                    </div>
                    <div className='admin-card' onClick={() => { navigate('/allusers') }}>
                        View Users
                    </div>
                    <div className='admin-card' onClick={() => { navigate('/inventary') }}>
                        Inventary
                    </div>
                </div>
            </div>
            {progress && (
                <div className="order-chart-container">
                    <div className='flex gap-2 justify-center'>
                        <BarChartOutlinedIcon style={{ fontSize: "2.5rem" }} className='m-1.5 rounded-md cursor-pointer text-purple-800 border-2 border-purple-800' onClick={() => handleChartClick('bar')} />
                        <TimelineOutlinedIcon style={{ fontSize: "2.5rem" }} className='m-1.5 rounded-md cursor-pointer text-purple-800 border-2 border-purple-800' onClick={() => handleChartClick('line')} />
                        <PieChartIcon style={{ fontSize: "2.5rem" }} className='m-1.5 rounded-md cursor-pointer text-purple-800 border-2 border-purple-800' onClick={() => handleChartClick('pie')} />
                        <DonutLargeOutlinedIcon style={{ fontSize: "2.5rem" }} className='m-1.5 rounded-md cursor-pointer text-purple-800 border-2 border-purple-800' onClick={() => handleChartClick('doughnut')} />
                        <CloseOutlinedIcon style={{ fontSize: "2.5rem" }} className='m-1.5 rounded-md cursor-pointer text-purple-800 border-2 border-purple-800' onClick={() => setProgress(false)} />
                    </div>
                    <OrderChart type={chartType} />
                </div>
            )}
        </>
    )
}

export default AdminHome;
