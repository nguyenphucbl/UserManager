import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById, removeUser } from "../redux/middlewares/userMiddleware";
import Swal from "sweetalert2";
import EditUser from "../components/EditUser";
import Paginate from "../components/Paginate";
import { useLocation, useSearchParams } from "react-router-dom";

export default function Home() {
  const { users, loading } = useSelector((state) => state.users);
  const [query, setQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserById(query));
  }, [dispatch, query]);
  const handleRemove = async (userId) => {
    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (isConfirmed) {
      dispatch(removeUser(userId));
      Swal.fire({
        title: "Deleted!",
        text: "Your imaginary file has been deleted.",
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "Cancelled!",
        text: "Your imaginary file is safe :)",
        icon: "error",
      });
    }
  };
  const handleEdit = (user) => {
    setSelectedUser(user);
  };
  const handleCloseModal = () => {
    setSelectedUser(null);
  };
  return (
    <>
      {loading ? (
        <div className="col-12 d-flex justify-content-center mt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <table className="table  table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Email</th>
                <th scope="col">Gender</th>
                <th scope="col">Edit</th>
                <th scope="col">Remove</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {/* <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>@mdo</td>
        </tr> */}
              {users.map((user, index) => (
                <tr key={user.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.gender}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemove(user.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Paginate />
          {selectedUser && (
            <EditUser user={selectedUser} onClose={handleCloseModal} />
          )}
        </>
      )}
    </>
  );
}
