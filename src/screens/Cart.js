import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CartItem from "../components/cartItem";
import { resetCart } from '../redux/counterSlice';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { app } from '../FirebaseConfig';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { ToastContainer, toast } from "react-toastify";
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import AddAddress from "../components/AddAddress";
import { fetchAddresses } from '../FirebaseConfig';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
const Cart = () => {
  const products = useSelector((state) => state.counter.cartData);
  const userInfo = useSelector(state => state.counter.userInfo)
  const [totalAmt, setTotalAmt] = useState("");
  const [shippingCharge, setShippingCharge] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const db = getFirestore(app);

  useEffect(() => {
    let price = 0;
    products.map((item) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotalAmt(price);
  }, [products]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (totalAmt <= 200) {
      setShippingCharge(30);
    } else if (totalAmt <= 400) {
      setShippingCharge(25);
    } else if (totalAmt > 401) {
      setShippingCharge(20);
    }
  }, [totalAmt]);

  let finalPrice = totalAmt + shippingCharge; // Calculate the final price
  const proceedCheckout = () => {
    if (!userInfo) {
      toast.error("Please Login First");
      navigate('/signup');
    }
    if (!address) {
      toast.error("Please provide Delivery address");
      return;
    }
    else {
      handleCheckout(products, userInfo.email, finalPrice, address);
      dispatch(resetCart());
    }
  }

  const handleCheckout = (cartData, userEmail, finalPrice, address) => {
    // Get a Firestore reference to the 'carts' collection
    const cartCollectionRef = collection(db, 'orders');

    // Create a new document with the cart data, username, and current date
    const cartDoc = {
      cartData: cartData,
      userEmail: userEmail,
      amount: finalPrice,
      status: "Order placed",
      paymentMethod: "COD",
      address: address,
      date: new Date().toLocaleDateString(),
    };

    // Add the document to the 'carts' collection
    addDoc(cartCollectionRef, cartDoc)
      .then((docRef) => {
        toast.success("Order placed successfully!");
      })
      .catch((error) => {
        toast.error("Order not placed!");
        console.error("Error adding cart data to Firestore: ", error);
      });
  };
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  const [addAddress, setAddAddress] = useState(false);
  const [addressData, setAddressData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const addresses = await fetchAddresses();
      setAddressData(addresses);
    };
    fetchData();
  }, []);

  const [address, setAddress] = useState(null);
  const handleSelectChange = (id) => {
    const selectedAddressId = id; // Assuming you're passing the address ID as the value of the option
    const selectedAddress = addressData.find(address => address.id === selectedAddressId);
    if (selectedAddress) {
      setAddress(selectedAddress);
    }
    console.log(address);
  };


  return (
    <div className="max-w-container mx-auto px-4">
      {products.length > 0 ? (
        <div className="pb-20">
          <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
            <h2 className="col-span-2">Product</h2>
            <h2>Price</h2>
            <h2>Quantity</h2>
            <h2>Sub Total</h2>
          </div>
          <div className="mt-5">
            {products.map((item) => (
              <div key={item._id}>
                <CartItem item={item} />
              </div>
            ))}
          </div>

          <div className='flex gap-4 justify-center'>
            <button onClick={() => dispatch(resetCart()) && toast.error("Cart cleared!")} className="text-white px-1.5 mb-4 font-titleFont rounded-md  font-medium text-base bg-red-500 hover:bg-red-600 active:bg-red-700 duration-200">
              Reset Cart
            </button>
            <Link to="/">
              <button className="text-white py-1.5 px-1.5 mb-4 font-titleFont rounded-md  font-medium text-base bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 duration-200">
                Shop More
              </button>
            </Link>
          </div>

          <div className="flex flex-col mdl:flex-row justify-between border py-4 px-4 items-center gap-2 mdl:gap-0">
            <div className="flex items-center gap-4">
              <input
                className="w-44 mdl:w-52 h-8 px-4 border text-primeColor text-sm outline-none border-gray-400"
                type="text"
                placeholder="Coupon Number"
              />
              <button className="bg-blue-600 text-white hover:bg-blue-700 rounded-md px-1.5 py-1 text-sm mdl:text-base font-semibold cursor-pointer">
                Apply Coupon
              </button>
            </div>
            {/*<p className="text-lg font-semibold">Update Cart</p>*/}
          </div>

          <div className="mt-4 border py-4 px-4 items-center">
            <h3 className="text-lg font-semibold">Address for Delivery</h3>
            <div className='lgl:m-3'>
              <div className="rounded mb-2 border border-light">
                <div className="flex justify-between p-2 cursor-pointer" onClick={toggleExpanded}>
                  <h3 className="font-semibold">Select Address</h3>
                  <span className={'fs-20'}>
                    {expanded ? <ArrowDropDownOutlinedIcon /> : <ArrowRightOutlinedIcon />}
                  </span>
                </div>

                {expanded && (<div>
                  <button onClick={() => setAddAddress(true)} className="rounded-md mb-2 mx-2 text-gray-500 cursor-pointer bg-gradient-to-tr from-yellow-400 to-yellow-200 border border-yellow-500 hover:border-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 px-8 py-2 font-semibold duration-300">
                    <AddLocationAltOutlinedIcon style={{ fontSize: '24px' }} /> Add Address
                  </button>
                  {userInfo && <div className="">
                    {addressData
                      .filter((data) => data.userEmail === userInfo.email)
                      .map((address) => (
                        <div className="p-2 cursor-pointer border border-light" onClick={() => handleSelectChange(address.id)} key={address.id}>
                          <p>{address.name}</p>
                          <p>{address.phone}</p>
                          <p>{address.house}</p>
                          <p>{address.area}</p>
                          <p>{address.district}, {address.state}, {address.pincode}</p>
                        </div>
                      ))}
                  </div>}
                </div>
                )}
              </div>
            </div>
          </div>

          <div className="max-w-7xl gap-4 flex justify-end mt-4">
            <div className="w-96 flex flex-col gap-4">
              <h1 className="text-2xl font-semibold text-left">Cart totals</h1>
              <div>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Subtotal
                  <span className="font-semibold tracking-wide font-titleFont">
                    ${totalAmt}
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Shipping Charge
                  <span className="font-semibold tracking-wide font-titleFont">
                    ${shippingCharge}
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
                  Total
                  <span className="font-bold tracking-wide text-lg font-titleFont">
                    ${totalAmt + shippingCharge}
                  </span>
                </p>
              </div>
              <div className="flex justify-end">

                <button onClick={() => proceedCheckout()} className="w-52 h-10 rounded-md text-white bg-green-600 hover:bg-green-700 duration-300">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen -mt-20">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col mdl:flex-row justify-center items-center"
          >
            <div className="max-w-[500px] p-4 py-8 bg-white flex flex-col items-center rounded-md shadow-lg">
              <h1 className="font-titleFont text-xl mb-3 text-yellow-500 font-bold uppercase">
                Cart <ShoppingCartOutlinedIcon />
              </h1>
              <p className="text-sm text-center px-10 -mt-2">
                Your Shopping cart lives to serve. Give it purpose - fill it with
                books, electronics, videos, etc. and make it happy.
              </p>
              <Link to="/">
                <button className="rounded-md cursor-pointer mt-3 bg-gradient-to-tr from-yellow-400 to-yellow-200 border border-yellow-500 hover:border-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 px-8 py-2 font-titleFont font-semibold text-lg duration-300">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      )}
      {addAddress && <AddAddress setAddAddress={() => setAddAddress(false)} />}
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

export default Cart;