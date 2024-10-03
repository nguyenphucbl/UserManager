import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";

export default function Paginate() {
  const { users, totalCount, paginate } = useSelector((state) => state.users);
  let { _page, _limit } = paginate;
  _page = parseInt(_page);
  const [searchParams, setSearchParams] = useSearchParams();
  const totalPages = Math.ceil(totalCount / _limit);
  const params = Object.fromEntries(searchParams);
  const handleChangePage = (newPage) => {
    setSearchParams({
      ...params,
      _page: newPage,
    });
  };
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${_page === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => handleChangePage(_page - 1)}
          >
            Previous
          </button>
        </li>

        {Array.from({ length: totalPages }).map((_, index) => (
          <li
            key={index}
            className={`page-item ${_page === index + 1 ? "active" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => handleChangePage(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}

        <li className={`page-item ${_page === totalPages ? "disabled" : ""}`}>
          <button
            className="page-link"
            to="#"
            onClick={() => handleChangePage(_page + 1)}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
