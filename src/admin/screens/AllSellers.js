import React, { useEffect, useState } from 'react'
import { fetchSellers } from '../../FirebaseConfig';
import AdminSellerCard from '../components/AdminSellerCard';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
const AllSellers = () => {

    const [search, setSearch] = useState('');
    const [sellers, setSellers] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const sellers = await fetchSellers();
            // Sort users by date before setting the state
            const sortedsellers = sellers.sort((a, b) => new Date(b.date) - new Date(a.date));
            setSellers(sortedsellers);
        };
        fetchData();
    }, []);

    return (
        <div>
            <div className='flex gap-10 cursor-pointer justify-center items-center mt-4'>
                <div style={{ color: '#eec60a' }}><FiberManualRecordIcon /><span>Pending</span></div>
                <div style={{ color: 'green' }}><FiberManualRecordIcon /><span>Approved</span></div>
                <div style={{ color: 'red' }}><FiberManualRecordIcon /><span>Rejected</span></div>
            </div>
            <div className="mx-auto px-4 flex justify-between items-center mt-4">
                <div className="lg:inline-flex flex h-10 rounded-md flex-grow relative">
                    <input
                        className="h-full text-base bg-transparent rounded-tl-md rounded-bl-md flex-grow outline-none border-2 border-yellow-500 px-2"
                        type="search"
                        placeholder="Search Sellers by Email Id or Name"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <span className="w-16 h-full text-yellow-500 cursor-pointer flex items-center justify-center border-2 border-yellow-500 hover:border-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200 rounded-tr-md rounded-br-md">
                        Search
                    </span>
                </div>
            </div>
            <div className="max-w-container mx-auto px-4">
                {sellers.map(seller => (
                    <div key={seller.id}>
                        <AdminSellerCard seller={seller} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllSellers
