import React from 'react'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { app } from '../FirebaseConfig';
import { useSelector } from "react-redux";
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { ToastContainer, toast } from "react-toastify";
const AddAddress = (props) => {
    const userInfo = useSelector(state => state.counter.userInfo)
    const db = getFirestore(app);
    const addAddress = (name,phone, house, area, district, state, pincode, userEmail ) => {
        if (!name || !phone || !house || !area || !district || !state || !pincode || !userEmail) {
            toast.error("Please fill out all fields");
            return; // Exit function if any field is empty
        }
        const addressCollectionRef = collection(db, 'address');

        const addressDoc = {
            userEmail: userEmail,
            phone: phone,
            name: name,
            house: house,
            area: area,
            district: district,
            state: state,
            pincode: pincode,
            date: new Date().toLocaleDateString(),
        };
        console.log(addressDoc)

        addDoc(addressCollectionRef, addressDoc)
            .then((docRef) => {
                toast.success("Address saved successfully!");
            })
            .catch((error) => {
                toast.error("Something went wrong!");
                console.error("Error adding address data to Firestore: ", error);
            });
    };
    return (
        <div>
            <div className="max-w-[1000px] min-w-[400px] bg-white items-center rounded-md shadow-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <CloseOutlinedIcon onClick={() => { props.setAddAddress(); }} className="absolute top-0 right-0 cursor-pointer border border-2 border-red-600 bg-red-600" />

                <div className='font-titleFont font-semibold p-2 m-2'>
                    <label htmlFor="name" className='me-5'>Full Name </label>
                    <input required type="text" id="name" placeholder="Full Name" className="w-full mb-2 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400" />

                    <label htmlFor="phone" className='me-5'>Phone Number </label>
                    <input required type="text" id="phone" placeholder="Full Name" className="w-full mb-2 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400" />

                    <label htmlFor="house" className='me-5'>House no./Society/Apartment </label>
                    <input required type="text" id="house" placeholder="House no./Society/Apartment" className="w-full mb-2 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400" />

                    <label htmlFor="area">Street/Area/Road </label>
                    <input required type="text" id="area" placeholder="Street/Area/Road" className="w-full mb-2 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400" />

                    <label htmlFor="district">City/District</label><br />
                    <input required type="text" id="district" placeholder="City/District" className="w-full mb-2 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400" />

                    <label htmlFor="state">State</label>
                    <select id="state" className='w-full mb-2 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400'>
                        <option>Select State</option>
                        <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
                        <option value="Daman and Diu">Daman and Diu</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Lakshadweep">Lakshadweep</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Puducherry">Puducherry</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="West Bengal">West Bengal</option>                        
                    </select>

                    <label htmlFor="postalCode">Postal Code</label>
                    <input required type="text" id="postalCode" placeholder="Postal Code" className="w-full mb-2 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400" />

                    <div className="flex justify-center">
                        <button className="rounded-md cursor-pointer text-gray-600 mt-3 bg-gradient-to-tr from-yellow-400 to-yellow-200 border border-yellow-500 hover:border-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 px-8 py-2 font-titleFont font-semibold text-lg duration-300"
                            onClick={() => {
                                addAddress(
                                    document.getElementById('name').value,
                                    document.getElementById('phone').value,
                                    document.getElementById('house').value,
                                    document.getElementById('area').value,
                                    document.getElementById('district').value,
                                    document.getElementById('state').value,
                                    document.getElementById('postalCode').value,
                                    userInfo.email                                   
                                );
                            }}>
                            Save Address
                        </button>
                    </div>
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

export default AddAddress
