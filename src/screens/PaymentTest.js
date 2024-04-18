import React from 'react';

const PaymentTest = () => {
  return (
    <div className="modal w-full bg-white shadow-xl rounded-2xl max-w-md mx-auto p-6">
      <form className="form">
        <div className="payment--options grid grid-cols-3 gap-4 p-2">
          <button name="paypal" type="button" className="flex justify-center items-center h-14 bg-gray-200 rounded-lg focus:outline-none">
            <svg className="h-7 w-auto" viewBox="0 0 124 33" xmlns="http://www.w3.org/2000/svg">
              {/* PayPal SVG */}
            </svg>
          </button>
          <button name="apple-pay" type="button" className="flex justify-center items-center h-14 bg-gray-200 rounded-lg focus:outline-none">
            <svg className="h-7 w-auto" viewBox="0 0 512 210.2" xmlns="http://www.w3.org/2000/svg">
              {/* Apple Pay SVG */}
            </svg>
          </button>
          <button name="google-pay" type="button" className="flex justify-center items-center h-14 bg-gray-200 rounded-lg focus:outline-none">
            <svg className="h-7 w-auto" viewBox="0 0 80 39" xmlns="http://www.w3.org/2000/svg">
              {/* Google Pay SVG */}
            </svg>
          </button>
        </div>
        <div className="separator flex items-center justify-center gap-4 text-gray-600">
          <hr className="w-full border-t-2 border-gray-300" />
          <p className="font-semibold text-xs">or pay using credit card</p>
          <hr className="w-full border-t-2 border-gray-300" />
        </div>
        <div className="credit-card-info--form">
          <div className="input_container">
            <label htmlFor="full_name" className="input_label text-xs text-gray-600">Card holder full name</label>
            <input id="full_name" className="input_field h-10 rounded-md pl-4 outline-none bg-gray-200 border border-gray-300 focus:border-gray-500 transition-colors" type="text" name="full_name" placeholder="Enter your full name" />
          </div>
          <div className="input_container">
            <label htmlFor="card_number" className="input_label text-xs text-gray-600">Card Number</label>
            <input id="card_number" className="input_field h-10 rounded-md pl-4 outline-none bg-gray-200 border border-gray-300 focus:border-gray-500 transition-colors" type="number" name="card_number" placeholder="0000 0000 0000 0000" />
          </div>
          <div className="input_container">
            <label htmlFor="expiry_date" className="input_label text-xs text-gray-600">Expiry Date / CVV</label>
            <div className="split grid grid-cols-2 gap-4">
              <input id="expiry_date" className="input_field h-10 rounded-md pl-4 outline-none bg-gray-200 border border-gray-300 focus:border-gray-500 transition-colors" type="text" name="expiry_date" placeholder="01/23" />
              <input id="cvv" className="input_field h-10 rounded-md pl-4 outline-none bg-gray-200 border border-gray-300 focus:border-gray-500 transition-colors" type="number" name="cvv" placeholder="CVV" />
            </div>
          </div>
        </div>
        <button className="purchase--btn mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition-colors">Checkout</button>
      </form>
    </div>
  );
}

export default PaymentTest;
