import React, {useState} from 'react'
import AddProduct from './AddProduct';
import SellerProducts from './SellerProducts';

const DashboardCards = () => {
    const [addProduct, setAddProduct] = useState(false);
    const [productList, setProductList] = useState(false);
    return (
        <div>
            <div className="container mx-auto px-4 py-8 max-w-md">
                <div className="grid grid-cols-2 gap-6">

                    <div className="cursor-pointer bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 shadow-lg text-white">
                        <h2 className="text-xl font-semibold mb-2">Orders</h2>
                        <p className="text-gray-200">Total Orders: </p>
                    </div>

                    <div onClick={() => setProductList(true)} className="cursor-pointer bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg p-6 shadow-lg text-white">
                        <h2 className="text-xl font-semibold mb-2">Products</h2>
                        <p className="text-gray-200">Total Products: </p>
                    </div>

                    <div onClick={() => setAddProduct(true)} className="cursor-pointer bg-gradient-to-r from-green-500 to-lime-500 rounded-lg p-6 shadow-lg text-white">
                        <h2 className="text-xl font-semibold mb-2">Add Product</h2>
                        <p className="text-gray-200">Add a new product</p>
                    </div>

                    <div className="cursor-pointer bg-gradient-to-r from-yellow-500 to-amber-500 rounded-lg p-6 shadow-lg text-white">
                        <h2 className="text-xl font-semibold mb-2">Tarjeta</h2>
                        <p className="text-gray-200"></p>
                    </div>
                </div>
            </div>

            {addProduct && (
                <AddProduct setAdd={() => setAddProduct(false)} />
            )}
            {productList && (
                <SellerProducts setProductList={() => setProductList(false)} />
            )}
        </div>
    )
}

export default DashboardCards
