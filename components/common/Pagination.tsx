import Pagination from "react-bootstrap/Pagination";
import "./pagination.scss";
function CustomPagination({
  currentPage,
  pageCount,
  onPageChange,
}: {
  currentPage: number;
  pageCount: number;
  onPageChange: (newPage: number) => void;
}) {
  return (
    <Pagination>
      <Pagination>
        <Pagination.First
          disabled={currentPage === 1}
          onClick={() => onPageChange(1)}
        />
        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        />
        <Pagination.Item>
          Page <span>{currentPage}</span> of <span>{pageCount}</span>
        </Pagination.Item>
        <Pagination.Next
          disabled={currentPage === pageCount}
          onClick={() => onPageChange(currentPage + 1)}
        />
        <Pagination.Last
          disabled={currentPage === pageCount}
          onClick={() => onPageChange(pageCount)}
        />
      </Pagination>
    </Pagination>
  );
}

export default CustomPagination;
