import Pagination from 'react-js-pagination'

const PaginationWrap = ({page, items, totalItemsCount, pageRangeDisplayed, handlePageChange}) => {
  
    return (
      <div>
          <Pagination
            activePage={page}
            itemsCountPerPage={items}
            totalItemsCount={totalItemsCount}
            pageRangeDisplayed={pageRangeDisplayed}
            onChange={handlePageChange}
          >
          </Pagination>
        
      </div>
    )
}

export default PaginationWrap