import React, { useState, useEffect } from 'react'
import { fetchUsers } from '../../FirebaseConfig';

const AllUsers = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const users = await fetchUsers();
      // Sort users by date before setting the state
      const sortedusers = users.sort((a, b) => new Date(b.date) - new Date(a.date));
      setUsers(sortedusers);
    };
    fetchData();
  }, []);
  console.log(users)
  return (
    <div>
      <div className="mx-auto px-4 flex justify-between items-center mt-4">
        <div className="lg:inline-flex flex h-10 rounded-md flex-grow relative">
          <input
            className="h-full text-base bg-transparent rounded-tl-md rounded-bl-md flex-grow outline-none border-2 border-yellow-500 px-2"
            type="search"
            placeholder="Search Users by Email Id or Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="w-16 h-full text-yellow-500 cursor-pointer flex items-center justify-center border-2 border-yellow-500 hover:border-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200 rounded-tr-md rounded-br-md">
            Search
          </span>
        </div>
      </div>
      <div className="mx-auto flex justify-between items-center mt-2">
      <table className='flex-grow border-2 border-black border-collapse m-2'>
        <thead >
          <tr>
            <th className="border-2 border-black">Email Id</th>
            <th className="border-2 border-black">Name</th>
            <th className="border-2 border-black">Password</th>
            <th className="border-2 border-black">Date</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((data) => data.userEmail.includes(search) || data.name.includes(search)).map((user) => (
            <tr key={user.id} className="text-center">
              <td className="border-2 border-black">{user.userEmail}</td>
              <td className="border-2 border-black">{user.name}</td>
              <td className="border-2 border-black">{user.password}</td>
              <td className="border-2 border-black">{user.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
</div>
    </div>
  )
}

export default AllUsers
