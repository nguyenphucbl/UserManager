import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";

export default function Paginate() {
  const { users, totalCount, paginate } = useSelector((state) => state.users);
  const { _page, _limit } = paginate;

  const [searchParams, setSearchParams] = useSearchParams();
  const totalPages = Math.ceil(totalCount / _limit);
  const handleChangePage = (newPage) => {
    setSearchParams({
      ...Object.fromEntries([...searchParams]),
      _page: newPage,
    });
  };
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${_page === 1 ? "disabled" : ""}`}>
          <Link
            className="page-link"
            onClick={() => handleChangePage(+_page - 1)}
          >
            Previous
          </Link>
        </li>

        {Array.from({ length: totalPages }).map((_, index) => (
          <li
            key={index}
            className={`page-item ${_page === index + 1 ? "active" : ""}`}
          >
            <Link
              className="page-link"
              onClick={() => handleChangePage(index + 1)}
            >
              {index + 1}
            </Link>
          </li>
        ))}

        <li className={`page-item ${_page === totalPages ? "disabled" : ""}`}>
          <Link
            className="page-link"
            to="#"
            onClick={() => handleChangePage(+_page + 1)}
          >
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
}
