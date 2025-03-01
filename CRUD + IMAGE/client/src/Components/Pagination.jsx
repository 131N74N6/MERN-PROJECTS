import "./Pagination.css";

export default function Pagination({ currentPage, setPage, totalPage }) {
    const prevData = () => {
        currentPage > 1 ? setPage(currentPage - 1) : setPage(currentPage);
    }

    const nextData = () => {
        currentPage < totalPage ? setPage(currentPage + 1) : setPage(currentPage);
    }

    return (
        <div className="pagination">
            <button type="button" onClick={prevData}>Prev</button>
            <div>Page {currentPage} of {totalPage}</div>
            <button type="button" onClick={nextData}>Next</button>
        </div>
    )
}
