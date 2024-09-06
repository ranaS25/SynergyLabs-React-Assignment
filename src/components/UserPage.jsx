import React, { useEffect, useState } from "react";
import Bar from "./Bar";
import { useNavigate } from "react-router-dom";
import LabeledInput from "./ui-components/LabeledInput";
import { JSON_PLACEHOLDER_API_URL } from "../utils/constants";
import { validateFormData } from "../utils/functions";
import ErrorBox from "./ui-components/ErrorBox";

const UserPage = ({
  userDetails,
  users,
  setUsers,
  setUserDetails,
  newUser,
}) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false); //editing mode on/off;
  const [errorMsg, setErrorMsg] = useState(null)

  // handling input value changes
  const handleInputChange = (e) => {
    setErrorMsg(null); //reseting error
    const { name, value } = e.target;
    setUserDetails((prevState) => ({
      ...prevState, // Keeping the previous state
      [name]: value, // Updating only the specific field by key
    }));
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setErrorMsg(null); //reseting error
    e.target.disabled = true;
    e.target.innerHTML = "deleting..";

    // url is endpoint for delating the user
    // if the deleting user is client created user then it will make a dummy api call
    const url = `${JSON_PLACEHOLDER_API_URL}/users/${
      userDetails.id <= 10 ? userDetails.id : 10
    }`;

    fetch(url, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((_) => {
        const updatedUsers = users.filter((user) => user.id !== userDetails.id); //deleted user is filtered out from users
        setUsers(updatedUsers); // setting new filtered list
        navigate("/"); //navigating back to the HomePage
      })
      .catch((err) => {
        console.log("Error: ", err);
        e.target.disabled = false;
        e.target.innerHTML = "Delete";
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null); //reseting error
    e.target.disabled = true;
    e.target.innerHTML = "Saving Changes..";
    const [isValid, errMsg] = validateFormData(userDetails);

    if (!isValid) {
      setErrorMsg(errMsg)
      e.target.disabled = false;
      e.target.innerHTML = "Save Changes";
      return;
    }

    //handling both cases changing the user details and creating user for the first time
    const method = newUser ? "POST" : "PUT";

    //endpoint needs id in case of put request but not in post request
    fetch(`${JSON_PLACEHOLDER_API_URL}/users/${method === "POST" ? "" : 10}`, {
      method: method,
      body: userDetails, //body contains the updated details of a user
    })
      .then((res) => res.json())
      .then((_) => {
        //user will be appended to the users in New User case
        if (newUser) {
          setUsers([...users, userDetails]);
        }
        // if updating a user record then details will  be updated of user
        else {
          const updatedUsers = users.map((user) => {
            if (user.id === userDetails.id) {
              return userDetails;
            }
            return user;
          });

          setUsers(updatedUsers);
        }
        // after success redirect the browser to HomePage
        navigate("/");
      })
      .catch((err) => {
        console.log("cannot save changes to the server: ", err);
        e.target.disabled = false;
        e.target.innerHTML = "Save Changes";
      });
  };

  useEffect(() => {
    //sending user to homepage if browser is directly accessing the route
    // we can also do dynamic fetching here from the api but we are not sure if the note actually exists or changed by user
    if (!userDetails) navigate("/");

    if (newUser) setIsEditing(true); //if creating a new user
  }, []);

  //case where a browser is directly coming to the User
  if (userDetails === null) {
    return null;
  }

  return (
    <div className="w-full h-fit pt-20">
      <Bar heading="User Details" />

      {errorMsg && <ErrorBox message={errorMsg} />}

      {/* Editing bar is not shown in case of creating a new user and the page will open in editing mode in New User Creation*/}
      {!newUser && (
        <div className="p-2 max-w-96 h-fit flex justify-between items-center w-full  mx-auto mt-10 bg-slate-300">
          {isEditing ? "Editing" : "Viewing"}
          <button
            className="bg-slate-400 py-1 px-2 hover:bg-slate-200 rounded"
            onClick={() => {
              setErrorMsg(null); //reseting error

              setIsEditing(!isEditing); //toggles editing mode
            }}
          >
            {!isEditing ? "Edit" : "Cancel"}
          </button>
        </div>
      )}

      <form className="py-4 max-w-96 w-full h-fit mx-auto mt-10 px-4 ">
        <LabeledInput
          label={"Name"}
          isDisabled={!isEditing} //editing mode
          value={userDetails.name}
          name={"name"}
          onChange={handleInputChange} //changes the input value
        />
        <LabeledInput
          label={"Username"}
          isDisabled={!isEditing}
          value={userDetails.username}
          name={"username"}
          onChange={handleInputChange}
        />
        <LabeledInput
          label={"Email"}
          isDisabled={!isEditing}
          value={userDetails.email}
          name={"email"}
          onChange={handleInputChange}
        />
        <LabeledInput
          label={"Phone"}
          isDisabled={!isEditing}
          value={userDetails.phone}
          name={"phone"}
          onChange={handleInputChange}
        />
        <LabeledInput
          label={"Website"}
          isDisabled={!isEditing}
          value={userDetails.website}
          name={"website"}
          onChange={handleInputChange}
        />
        {/* save to update the changes to the user list */}
        {isEditing && (
          <button
            onClick={handleSubmit}
            className="float-left mb-10 bg-slate-600 text-slate-100 p-2 rounded disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            Save Changes
          </button>
        )}
        {/* to delete user from the homepage: for existed users */}
        {!newUser && (
          <button
            onClick={handleDelete}
            className="float-right  mb-10 bg-red-600 text-slate-100 p-2 px-4 rounded  "
          >
            Delete
          </button>
        )}
      </form>
    </div>
  );
};

export default UserPage;
