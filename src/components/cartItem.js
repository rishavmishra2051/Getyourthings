import React from 'react'
import { useDispatch } from "react-redux";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { deleteItem, increamentQuantity, decrementQuantity, } from '../redux/counterSlice';
import { ToastContainer, toast } from "react-toastify";
const CartItem = ({ item }) => {
    const dispatch = useDispatch();
    return (
        <div className="w-full grid grid-cols-5 mb-4 border py-2">
            <div className="flex col-span-5 mdl:col-span-2 items-center gap-4 ml-4">
                <img className="w-32 h-32" src={item.image} alt="productImage" />
                <h1 className="font-titleFont font-semibold">{item.title}</h1>
                <DeleteOutlineIcon onClick={() => dispatch(deleteItem(item.id)) && toast.success("Item deleted from cart!")} className="text-yellow-500 hover:text-red-500 duration-300 cursor-pointer" />
            </div>

            <div className="col-span-5 mdl:col-span-3 flex items-center justify-between py-4 mdl:py-0 px-4 mdl:px-0 gap-6 mdl:gap-0">
                <div className="flex w-1/3 items-center text-lg font-semibold">
                    ${item.price}
                </div>
                <div className="w-1/3 flex items-center gap-6 text-lg">
                    <span
                        onClick={() => dispatch(decrementQuantity(item))}
                        className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
                    >
                        -
                    </span>
                    <p>{item.quantity}</p>
                    <span
                        onClick={() => dispatch(increamentQuantity(item))}
                        className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
                    >
                        +
                    </span>
                </div>
                <div className="w-1/3 flex items-center font-titleFont font-bold text-lg">
                    <p>${item.quantity * item.price}</p>
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
    );
}

export default CartItem
