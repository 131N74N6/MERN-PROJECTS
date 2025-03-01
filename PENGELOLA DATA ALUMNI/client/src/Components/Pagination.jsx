import "./Pagination.css";

export default function Pagination({ currentPage, lastPage, setPage }) {
    const nextPage = () => {
        if (currentPage < lastPage) {
            setPage((prevState) => prevState + 1);
        }
        else {
            setPage(lastPage);
        }
    }

    const prevPage = () => {
        if (currentPage > 1) {
            setPage((prevState) => prevState - 1);
        }
        else {
            setPage(1);
        }
    }

    return (
        <div className="pagination">
            <button type="button" onClick={prevPage}>Prev</button>
            <div>{currentPage} dari {lastPage}</div>
            <button type="button" onClick={nextPage}>Next</button>
        </div>
    )
}
