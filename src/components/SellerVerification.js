import React, { useState } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { app } from '../FirebaseConfig';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SellerVerification = (props) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        aadharNumber: '',
        gstNumber: '',
        panNumber: '',
        document: '',
        storeName:"",
        address: '',
        image: '',
        state: '',
        pincode: ''
    });

    const db = getFirestore(app);
    const addSeller = (aadharNumber, name, email, phoneNumber, state, pincode, address, storeName, gstNumber, panNumber) => {
        const sellerCollectionRef = collection(db, 'sellers');

        const sellerDoc = {
            aadharNumber: aadharNumber,
            gstNumber: gstNumber,
            panNumber: panNumber,
            name: name,
            email: email,
            phone: phoneNumber,
            state: state,
            pincode: pincode,
            verification:"Pending",
            address: address,
            storeName:storeName,
            date: new Date().toLocaleDateString()
        };
        console.log(sellerDoc);

        addDoc(sellerCollectionRef, sellerDoc)
            .then((docRef) => {
                toast.success("Request submitted successfully!");
            })
            .catch((error) => {
                toast.error("Something went wrong!");
                console.error(error);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        addSeller(formData.aadharNumber, formData.name, formData.email, formData.phoneNumber, formData.state, formData.pincode, formData.address, formData.storeName, formData.gstNumber, formData.panNumber);
        //console.log('Form data:', formData);
    };

    return (
        <div className='fixed inset-0 flex justify-center items-center bg-gray-100 z-50'>
            <CloseOutlinedIcon onClick={() => { props.setSellerform(); }} className="absolute top-4 right-4 cursor-pointer border border-2 border-red-600 bg-red-600" />
            <div className="w-full max-w-lg bg-white p-4 rounded-lg shadow-lg overflow-y-auto max-h-screen">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold mb-2 text-center"><u>Seller Verification Form</u></h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-1">
                            <label className="block text-gray-600">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                required
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-gray-600">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                required
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-gray-600">Phone Number</label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                required
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-gray-600">Aadhar Card Number</label>
                            <input
                                type="text"
                                name="aadharNumber"
                                value={formData.aadharNumber}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                required
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-gray-600">PAN Card Number</label>
                            <input
                                type="text"
                                name="panNumber"
                                value={formData.panNumber}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                required
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-gray-600">GST Number</label>
                            <input
                                type="text"
                                name="gstNumber"
                                value={formData.gstNumber}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                required
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-gray-600">Address</label>
                            <textarea
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                required
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-gray-600">State</label>
                            <select name="state"
                                value={formData.state}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                required>
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
                        </div>
                        <div className="col-span-1">
                            <label className="block text-gray-600">Store Name</label>
                            <input
                                type="text"
                                name="storeName"
                                value={formData.storeName}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                required
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-gray-600">Pincode</label>
                            <input
                                type="text"
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                required
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-gray-600">Image</label>
                            <input
                                type="file"
                                name="document"
                                onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                                className="w-full px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-gray-600">GST Document</label>
                            <input
                                type="file"
                                name="document"
                                onChange={(e) => setFormData({ ...formData, document: e.target.files[0] })}
                                className="w-full px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                               
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full mt-6 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                        Submit
                    </button>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
};

export default SellerVerification;
