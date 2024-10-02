import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/middlewares/userMiddleware";
import { resetStatus, setUser } from "../redux/slices/addUserSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
export default function AddUser() {
  const { user, status } = useSelector((state) => state.addUser);
  const navigate = useNavigate();
  console.log("🚀 ~ AddUser ~ user:", user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setUser(formData)); // Lưu trữ dữ liệu người dùng vào state
    dispatch(addUser(formData)); // Gửi yêu cầu tới API
  };
  useEffect(() => {
    if (status === "succeeded") {
      Swal.fire({
        title: "Good job!",
        text: "User added successfully!",
        icon: "success",
      }).then(() => {
        dispatch(resetStatus());
        navigate("/");
      });
    }
    if (status === "failed") {
      Swal.fire({
        title: "Oops...",
        text: "Something went wrong!",
        icon: "error",
      });
    }
  }, [status, navigate, dispatch]);
  const handleChange = ({ target: { name, value } }) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <>
      <div className="form-add d-flex justify-content-center mt-5">
        <form className="col-4" onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="first-name" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="first-name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="last-name" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              id="last-name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email-user" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email-user"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="check-gender d-flex justify-content-around mb-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="male"
                value="Male"
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="male">
                Male
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="female"
                value="Female"
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="female">
                Female
              </label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
