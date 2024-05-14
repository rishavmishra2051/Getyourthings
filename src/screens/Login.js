import React, { useState, useEffect, useRef } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/counterSlice";
import emailjs from '@emailjs/browser';
import { app } from '../FirebaseConfig';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
const Login = () => {

    const register = (RegForm, LoginForm, Indicator) => {
        RegForm.style.transform = "translateX(0px)";
        LoginForm.style.transform = "translateX(0px)";
        Indicator.style.transform = "translateX(100px)";
    };

    const logi = (RegForm, LoginForm, Indicator) => {
        RegForm.style.transform = "translateX(300px)";
        LoginForm.style.transform = "translateX(300px)";
        Indicator.style.transform = "translateX(0px)";
    };

    const handleLoginClick = () => {
        const RegForm = document.querySelector(".RegForm");
        const LoginForm = document.querySelector(".LoginForm");
        const Indicator = document.querySelector(".Indicator");
        logi(RegForm, LoginForm, Indicator);
    };

    const handleRegisterClick = () => {
        const RegForm = document.querySelector(".RegForm");
        const LoginForm = document.querySelector(".LoginForm");
        const Indicator = document.querySelector(".Indicator");
        register(RegForm, LoginForm, Indicator);
    };

    const navigate = useNavigate("");
    const dispatch = useDispatch();
    const auth = getAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otpWindow, setOtpWindow] = useState(false);
    const [otp, setOtp] = useState('');
    const [otpValue, setOtpValue] = useState('');

    const generateOTP = () => {
        const randomOTP = Math.floor(1000 + Math.random() * 9000);
        setOtp(randomOTP.toString());
    };

    useEffect(() => {
        generateOTP();
    }, []);

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, form.current, {
                publicKey: process.env.REACT_APP_PUBLIC_KEY,
            })
            .then(
                () => {
                    console.log('OTP sent!');
                },
                (error) => {
                    console.log('OTP not sent', error.text);
                },
            );
    };

    const handleRegister = async (name, email, password) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password, name)
                .then((result) => {
                    const user = result.user;
                    dispatch(
                        addUser({
                            _id: user.uid,
                            name: user.displayName,
                            email: user.email,
                            image: user.photoURL,
                        })
                    );
                    addUsertoDB(name, email, password);
                    setTimeout(() => {
                        navigate("/");
                    }, 1500);
                    toast.success("Sign In Successfully!");
                })
        } catch (error) {
            toast.error("Registeration Failed!");
            console.log(error);
        }
    }


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password)
                .then((result) => {
                    const user = result.user;
                    dispatch(
                        addUser({
                            _id: user.uid,
                            name: user.displayName,
                            email: user.email,
                            image: user.photoURL,
                        })
                    );
                    setTimeout(() => {
                        setOtpWindow(false);
                        navigate("/");
                    }, 1500);
                    toast.success("Sign In Successfully!");
                })
        } catch (error) {
            toast.error("Sign In Failed!");
            console.log(error);
        }
    }
    const db = getFirestore(app);
    const addUsertoDB = (name, userEmail, password) => {
        const cartCollectionRef = collection(db, 'users');   
        const userDoc = {
          name: name,
          userEmail: userEmail,
          password: password,
          date: new Date().toLocaleDateString(),
        };
    
        addDoc(cartCollectionRef, userDoc)
          .then((docRef) => {
            console.log("User added successfully!");
          })
          .catch((error) => {
            console.error("User is not added to Firestore: ", error);
          });
      };

    const handleOtp = async () => {
        if (otp === otpValue) {
            handleRegister(name, email, password);
            setOtpWindow(false);
        } else {
            toast.error("Invalid Otp");
        }
    }

    const handleSubmit = (e) => {
        if (!name.trim() || !email.trim() || !password.trim()) {
            // If any of the fields are empty, display an error toast
            toast.error("Please fill in all fields");
            return; // Exit early if validation fails
        }
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return; // Exit early if validation fails
        }

        e.preventDefault();
        sendEmail(e)
        setOtpWindow(true);
    };

    return (
        <div className="h-screen">
            <div className='w-full flex flex-col items-center justify-center py-5'>
                <h1 className="text-3xl font-bold text-green-800">Log in to your account</h1>
            </div>

            <div className="w-full flex flex-col items-center justify-center">
                <div className="form-box">
                    <div className="form-btn">
                        <span onClick={handleLoginClick}>Login</span>
                        <span onClick={handleRegisterClick}>Register</span>
                        <hr className="Indicator" />
                    </div>
                    <form className="LoginForm">
                        <input className='rounded-md' type="email" placeholder="Email Id" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input className='rounded-md' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button onClick={handleLogin} className="w-full py-1.5 rounded-md mt-3 font-titleFont font-medium text-base bg-gradient-to-tr from-yellow-400 to-yellow-200 border border-yellow-500 hover:border-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200">
                            Login
                        </button>
                        <p onClick={handleRegisterClick} className='cursor-pointer text-[#113f67] mt-2 text-xl'>New Customer</p>
                    </form>
                    <form className="RegForm" ref={form} onSubmit={sendEmail}>
                        <input className='rounded-md' type="text" name="user_name" placeholder="Full Name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                        <input className='rounded-md' type="email" name="user_email" placeholder="Email Id" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input className='rounded-md' type="password" placeholder="Create Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <textarea name="otp" value={otp} style={{ display: 'none' }} />
                        <button type="button" onClick={handleSubmit} className="w-full py-1.5 rounded-md mt-3 font-titleFont font-medium text-base bg-gradient-to-tr from-yellow-400 to-yellow-200 border border-yellow-500 hover:border-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200">
                            Register
                        </button>
                        <p onClick={handleLoginClick} className='cursor-pointer text-[#113f67] mt-2 text-xl'>Already a Customer</p>
                    </form>
                </div>
                {otpWindow && (
                    <div className="max-w-[500px] min-w-[400px] p-4 py-8 bg-white flex flex-col items-center rounded-md shadow-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <h1 className="font-titleFont text-xl mb-3 text-green-500 font-bold uppercase">
                            OTP Verification
                        </h1>
                        <div>
                            <label htmlFor="otp" className='font-titleFont font-semibold me-5'>OTP:</label>
                            <input type="text" placeholder='Enter OTP' value={otpValue} onChange={(e) => setOtpValue(e.target.value)} className="mb-2 rounded-md border border-gray-300 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                        </div>
                        <div className='flex gap-2'>
                            <button onClick={handleOtp} className="rounded-md cursor-pointer mt-3 bg-gradient-to-tr from-green-400 to-green-200 border border-green-500 hover:border-green-700 hover:from-green-300 to hover:to-green-400 active:bg-gradient-to-bl active:from-green-400 active:to-green-500 px-9 py-2 font-titleFont font-semibold text-lg duration-300">
                                Confirm
                            </button>
                            <button onClick={() => setOtpWindow(false)} className="rounded-md cursor-pointer mt-3 bg-gradient-to-tr from-green-400 to-green-200 border border-green-500 hover:border-green-700 hover:from-green-300 to hover:to-green-400 active:bg-gradient-to-bl active:from-green-400 active:to-green-500 px-9 py-2 font-titleFont font-semibold text-lg duration-300">
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

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
        </div>
    );
};

export default Login;