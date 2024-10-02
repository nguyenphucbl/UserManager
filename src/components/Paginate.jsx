import { useSelector } from "react-redux";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

export default function Paginate() {
  const { users } = useSelector((state) => state.users);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("_page") || 1;
  const limit = searchParams.get("_limit") || 10;
  const totalPages = Math.ceil(users.length / limit);
  const handleChangePage = (newPage) => {
    setSearchParams({ _page: newPage });
    navigate(`${location.pathname}?_page=${newPage}&_limit=${limit}`);
  };
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <Link
            className="page-link"
            to="#"
            onClick={() => handleChangePage(+currentPage - 1)}
          >
            Previous
          </Link>
        </li>

        {[...Array(totalPages)].map((_, index) => (
          <li
            key={index}
            className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
          >
            <Link
              className="page-link"
              to="#"
              onClick={() => handleChangePage(index + 1)}
            >
              {index + 1}
            </Link>
          </li>
        ))}

        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <Link
            className="page-link"
            to="#"
            onClick={() => handleChangePage(+currentPage + 1)}
          >
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
}
