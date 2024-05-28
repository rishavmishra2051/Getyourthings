import React from 'react'
import Card from '../sellercomponents/Card'
import DashboardCards from '../sellercomponents/DashboardCards'
const SellerDashBoard = () => {
  return (
    <>
      <div className='max-w-container mx-auto px-4'>
        <h1 className='text-center text-3xl text-orange-500 font-bold my-2'><u>Seller Dashboard</u></h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1 flex justify-center items-center">
            <DashboardCards />
          </div>
          <div className="col-span-1 flex justify-center items-center">
            <div className=''>
              <Card />
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default SellerDashBoard
/*
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1 flex justify-center items-center">
            
          </div>
          <div className="col-span-1 flex justify-center items-center">
            
          </div>
        </div>
*/