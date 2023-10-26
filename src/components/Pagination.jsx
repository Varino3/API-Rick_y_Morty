import React from 'react';
import ReactPaginate from 'react-paginate';
import '../App.css';

function Pagination({ pageCount, handlePageClick }) {
    return (
        <div className='paginacion'>
            <ReactPaginate
                previousLabel={'Anterior'}
                nextLabel={'Siguiente'}
                breakLabel={'...'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
            />
        </div>
    );
}

export default Pagination;