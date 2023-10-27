import React from 'react';
import ReactPaginate from 'react-paginate';

function Pagination({ pageCount, handlePageClick }) {
    return (
        <div className="paginacion">
            <ReactPaginate
                previousLabel={"Anterior"}
                nextLabel={"Siguiente"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
            />
        </div>
    );
}

export default Pagination;
