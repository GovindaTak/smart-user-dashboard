import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import "../styles/AddUser.css";
const AddUser = () => {
  const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const newUser = {
      id: Date.now(),
      name: data.name,
      email: data.email,
      age: parseInt(data.age),
    };

    dispatch({ type: "ADD_USER", payload: newUser });
    toast.success("User Added Successfully !");
    reset();
    navigate("/users");
  };

  return (
    <div className="form-container">
      <h2>Add New User</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            {...register("name", { required: true, minLength: 3 })}
          />
          {errors.name && (
            <p className="error">Name is required (min 3 letters)</p>
          )}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" {...register("email", { required: true })} />
          {errors.email && <p className="error">Valid email is required</p>}
        </div>
        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            {...register("age", { required: true, min: 1 })}
          />
          {errors.age && <p className="error">Age must be greater than 0</p>}
        </div>
        <button type="submit" className="submit-btn">
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUser;
