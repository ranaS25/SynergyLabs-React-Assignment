import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserPage from "./components/UserPage";
import Home from "./components/Home";
import { useEffect, useState } from "react";

import { JSON_PLACEHOLDER_API_URL } from "./utils/constants";

function App() {
  const [users, setUsers] = useState(null); //users list
  const [selectedUser, setSelectedUser] = useState(null); //selected user for UserPage
  const [newUser, setNewUser] = useState(false); //new user creation for UserPage


  // fetching users from the API
  useEffect(() => {
    fetch(`${JSON_PLACEHOLDER_API_URL}/users`)
      .then((res) => res.json())
      .then((data) => {

        setUsers(data);
      })
      .catch((error) => {
        console.log("Can't fetch the data from API: ", error);
      });
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Home
          users={users}
          setUsers={setUsers}
          setNewUser={ setNewUser}
          setSelectedUser={setSelectedUser}
          
        />
      ),
    },
    {
      path: "/users/:userId",
      element: (
        <UserPage
          userDetails={selectedUser}
          setUserDetails={setSelectedUser}
          newUser={newUser}
          users={users}
          setUsers={setUsers}
        />
      ),
    }
  ]);
  return <RouterProvider router={router} />;
}

export default App;
