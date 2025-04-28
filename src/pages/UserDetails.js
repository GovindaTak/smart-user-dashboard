import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/UserDetails.css";

function UserDetails() {
  const { id } = useParams();
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const user =
    location.state?.user ||
    state.users.find((user) => user.id === parseInt(id)); //optional chaning
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    dispatch({ type: "UPDATE_USER", payload: editedUser });
    setIsEditing(false);
    toast.success("User details updated successfully!");
    navigate("/users");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser(user);
  };

  if (!user) {
    return <p>User not found !</p>;
  }

  return (
    <div className="userdetails-container">
      <h2>User Details for ID : {user.id}</h2>
      <div className="user-details">
        <div>
          <label>Name:</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={editedUser.name}
              onChange={handleChange}
            />
          ) : (
            <p>{user.name}</p>
          )}
        </div>
        <div>
          <label>Email:</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={editedUser.email}
              onChange={handleChange}
            />
          ) : (
            <p>{user.email}</p>
          )}
        </div>
        <div>
          <label>Age:</label>
          {isEditing ? (
            <input
              type="number"
              name="age"
              value={editedUser.age}
              onChange={handleChange}
            />
          ) : (
            <p>{user.age}</p>
          )}
        </div>
        <div>
          {isEditing ? (
            <>
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)}>Edit</button>
          )}
        </div>
      </div>
    </div>
  );
}
export default UserDetails;
