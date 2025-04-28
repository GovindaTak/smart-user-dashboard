import React, { use, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../styles/UserList.css";
const UserList = () => {
  const { state, dispatch } = useContext(UserContext);
  const users = state.users;
  const navigate = useNavigate();

  const handleDelete = (id) => {
    dispatch({ type: "REMOVE_USER", payload: id });
    toast.info("User Deleted Successfully!");
  };

  const handleRowClick = (user) => {
    navigate(`/user/${user.id}`, { state: { user } });
  };

  return (
    <div className="userlist-container">
      <h2>All Users</h2>

      {users.length === 0 ? (
        <p>No users found. Please add some users.</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                onClick={() => handleRowClick(user)}
                style={{ cursor: "pointer" }}
              >
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(user.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
