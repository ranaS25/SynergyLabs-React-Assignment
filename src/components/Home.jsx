import React, { useEffect } from "react";
import Bar from "./Bar";
import {  newUserObj } from "../utils/constants";
import UserCard from "./UserCard";

import {  useNavigate } from "react-router-dom";
import UserSkeleton from "./UserSkeleton";

const Home = ({ users, setSelectedUser, setNewUser }) => {
  
  const navigate = useNavigate();
  const handleNewUser = () => {

    const user = newUserObj(); //create user object with empy values;
    
    //if else to ensure that the new user id will always starting from 11  for compatiblity
    if (users.length === 0 || users[users.length - 1].id<11){
      user.id = 11
    }
    else {
      user.id = users[users.length - 1].id + 1;
    }

    //setting user for the UserPage and navigating
    setSelectedUser(user);
    setNewUser(true);
    navigate(`/users/${user.id}`)
  }

  useEffect(() => {
    
    setSelectedUser(null) //resetting selected user
    setNewUser(false); //reseting new user state
    
  }, []);
  return (
    <div className="w-full h-fit pt-20">
      <Bar heading="Users" isHomePage={true} />
      <div className="flex gap-4 p-4 flex-wrap ">
        {/* Floating Button to Create New User */}

        <button
          onClick={handleNewUser}
          className="py-2 px-6 font-semibold rounded bg-slate-400 fixed bottom-10 right-10"
        >
          New User
        </button>

        {!users && (
          <>
            <UserSkeleton />
            <UserSkeleton />
            <UserSkeleton />
            <UserSkeleton />
            <UserSkeleton />
            <UserSkeleton />
            <UserSkeleton />
            <UserSkeleton />
            <UserSkeleton />
            <UserSkeleton />
          </>
        )}


        {/* Displaying users using UserCard */}

        {users && users.map((user, index) => <UserCard key={index} user={user} setSelectedUser={setSelectedUser}/>)}
      </div>
    </div>
  );
};

export default Home;
