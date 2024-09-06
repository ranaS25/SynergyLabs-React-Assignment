import React from 'react'
import { useNavigate } from "react-router-dom";

// User card contains some of the basic details of user

const UserCard = ({ user, setSelectedUser }) => {
  const navigate = useNavigate();

  return (
    <div
      className="p-3 py-4 bg-slate-300 rounded grow"
      onClick={() => {

        // setting user and navigating to the UserPage
        
        setSelectedUser(user)
        navigate(`/users/${user.id}`)
      }}
    >
      <h1 className="text-2xl font-bold pb-4">{user.name}</h1>
      <h2>
        <span className="font-bold">Email: </span>
        {user.email}
      </h2>
      <h2>
        <span className="font-bold">Phone: </span>
        {user.phone}
      </h2>
    </div>
  );
}

export default UserCard