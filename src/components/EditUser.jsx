/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editUser } from "../redux/middlewares/userMiddleware";

export default function EditUser({ user, onClose }) {
  const dispatch = useDispatch();
  const [editUserData, setEditUserData] = useState({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    gender: user.gender,
  });
  const handleChange = ({ target: { name, value } }) => {
    setEditUserData({
      ...editUserData,
      [name]: value,
    });
  };
  const handleSaveChanges = () => {
    dispatch(editUser(editUserData));
    onClose();
  };
  return (
    <div
      className="modal fade show"
      style={{ display: "block" }}
      tabIndex="-1"
      aria-labelledby="editModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editModalLabel">
              Edit User
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-2">
              <label htmlFor="first-name" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="first-name"
                name="firstName"
                value={editUserData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="last-name" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="last-name"
                name="lastName"
                value={editUserData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={editUserData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="gender" className="form-label">
                Gender
              </label>
              <select
                className="form-select"
                id="gender"
                name="gender"
                value={editUserData.gender}
                onChange={handleChange}
              >
                <option value="Male">Male</option>
                <option value="FeMale">Female</option>
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSaveChanges}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
