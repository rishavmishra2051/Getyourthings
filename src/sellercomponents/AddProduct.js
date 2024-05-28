import React, { useState } from 'react'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { app } from '../FirebaseConfig';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from 'react-redux';
const AddProduct = (props) => {
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        quantity: '',
        category: '',
        description: '',
        image: ''
    });
    const userInfo = useSelector(state => state.counter.userInfo);
    
    const db = getFirestore(app);
    const addProduct = (title, price, quantity, category, description, image, email) => {
        const productCollectionRef = collection(db, 'products');

        const productDoc = {
            title: title,
            price: price,
            quantity: quantity,
            category: category,
            description: description,
            image: image,
            verification:"Pending",
            sellerEmail: email,
            date: new Date().toLocaleDateString()
            
        };
        
        addDoc(productCollectionRef, productDoc)
            .then((docRef) => {
                toast.success("Product added successfully!");
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
        addProduct(formData.title, formData.price, formData.quantity, formData.category, formData.description, formData.image, userInfo.email);
        //console.log('Form data:', formData);
    };
    return (
        <div>
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="fixed inset-0 bg-white opacity-100">
                    <CloseOutlinedIcon onClick={() => { props.setAdd(); }} className="absolute top-0 right-0 font-semibold text-3xl cursor-pointer border border-red-600 bg-red-600" />
                    <div className='flex justify-center items-center'>
                        <form onSubmit={handleSubmit}>
                            <h2 className="text-2xl text-center font-semibold my-5"><u>Add New Product</u></h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-titleFont">
                                <div className="col-span-1">
                                    <label className="block ">Product Name</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        required
                                    />
                                </div>

                                <div className="col-span-1">
                                    <label className="block ">Category</label>
                                    <select name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        required>
                                        <option value="">Select</option>
                                        <option value="T-shirt">T-shirt</option>
                                        <option value="Electronics">Electronics</option>
                                        <option value="MensFashion">Men's Fashion</option>
                                        <option value="Jewellery">Jewellery</option>
                                        <option value="WomensFashion">Women's Fashion</option>
                                        <option value="HomeKitchen">Home & Kitchen</option>
                                        <option value="BeautyPersonalCare">Beauty & Personal Care</option>
                                        <option value="SportsOutdoors">Sports & Outdoors</option>
                                        <option value="ToysGames">Toys & Games</option>
                                        <option value="Books">Books</option>
                                        <option value="MusicInstruments">Music & Instruments</option>
                                        <option value="HealthWellness">Health & Wellness</option>
                                        <option value="BabyProducts">Baby Products</option>
                                        <option value="Automotive">Automotive</option>
                                        <option value="OfficeSupplies">Office Supplies</option>
                                        <option value="PetSupplies">Pet Supplies</option>
                                        <option value="Shoes">Shoes</option>
                                        <option value="BagsLuggage">Bags & Luggage</option>
                                        <option value="Watches">Watches</option>
                                        <option value="Furniture">Furniture</option>
                                        <option value="GardenOutdoor">Garden & Outdoor</option>
                                        <option value="GroceryGourmetFood">Grocery & Gourmet Food</option>
                                        <option value="HandcraftedArtisanal">Handcrafted & Artisanal</option>
                                        <option value="ComputerAccessories">Computer & Accessories</option>
                                        <option value="MobilePhonesAccessories">Mobile Phones & Accessories</option>
                                        <option value="VideoGames">Video Games</option>
                                        <option value="MoviesTV">Movies & TV</option>
                                        <option value="Stationery">Stationery</option>
                                        <option value="MusicalInstruments">Musical Instruments</option>
                                        <option value="Lighting">Lighting</option>
                                    </select>

                                </div>

                                <div className="col-span-1">
                                    <label className="block ">Price (In Rupee)</label>
                                    <input
                                        type="text"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        required
                                    />
                                </div>

                                <div className="col-span-1">
                                    <label className="block ">Quantity</label>
                                    <input
                                        type="text"
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        required
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label className="block ">Product Description</label>
                                    <textarea
                                        type="text"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        required
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label className="block ">Image Url</label>
                                    <input
                                        type="text"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        required
                                    />

                                </div>

                            </div>
                            <button
                                type="submit"
                                className="w-full mt-6 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            >
                                Add Product
                            </button>
                        </form>
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

export default AddProduct
