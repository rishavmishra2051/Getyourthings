import React, { useState, useEffect } from 'react'
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import Addresses from '../components/Addresses';
import AddAddress from '../components/AddAddress';
import { fetchAddresses } from '../FirebaseConfig';
import { useSelector } from "react-redux";
const UserAddresses = () => {
    const [addAddress, setAddAddress] = useState(false);
    const [addressData, setAddressData] = useState([])
    const userInfo = useSelector(state => state.counter.userInfo)
    useEffect(() => {
        const fetchData = async () => {
            const addresses = await fetchAddresses();
            setAddressData(addresses);
        };
        fetchData();        
    }, []);

    return (
        <div>
            <div className="max-w-container mx-auto px-4">
                <h1 className=" heading-background"><u>Your Addresses</u></h1>
                <button onClick={() => setAddAddress(true)} className="rounded-md text-gray-500 cursor-pointer mt-3 bg-gradient-to-tr from-yellow-400 to-yellow-200 border border-yellow-500 hover:border-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 px-8 py-2 font-titleFont font-semibold text-lg duration-300">
                    <AddLocationAltOutlinedIcon style={{ fontSize: '48px' }} /> Add Address
                </button>
                <div className="mt-5">
                    {addressData
                        .filter((data) => data.userEmail === userInfo.email)
                        .map((address) => (
                            <div key={address.id}>
                                <Addresses address={address} />
                            </div>
                        ))}
                </div>
            </div>
            {addAddress && <AddAddress setAddAddress={() => setAddAddress(false)} />}

        </div>
    )
}

export default UserAddresses
