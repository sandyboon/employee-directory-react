import React from 'react';

function SearchBar(props) {
  return (
    <>
      <div className="w-100 mb-5">
        <input
          id="searchInput"
          type="text"
          placeholder="search by employee name"
          value={props.search}
          onChange={props.handleInputChange}
          className="form-control form-control-lg w-75 ml-3"
          style={{ display: 'inline' }}
        ></input>
        <button
          id="sortByNameBtn"
          className="btn btn-large pb-2"
          style={{ display: 'inline' }}
          onClick={props.handleNameSort}
          title="Sort by Name"
        >
          <i
            className="fa fa-sort-alpha-asc fa-2x"
            style={{ display: 'inline' }}
            aria-hidden="true"
          ></i>
        </button>
        <button
          id="sortByDeptBtn"
          className="btn btn-large pb-2"
          style={{ display: 'inline' }}
          onClick={props.handleLocationSort}
          title="Sort by Department"
        >
          <i
            className="fa fa-sort-amount-asc fa-2x"
            style={{ display: 'inline' }}
            aria-hidden="true"
          ></i>
        </button>
      </div>
    </>
  );
}

export default SearchBar;
