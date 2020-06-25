import React from 'react';

function SearchBar(props) {
  return (
    <>
      <form>
        <input
          id="searchInput"
          type="text"
          placeholder="search by employee name"
          value={props.search}
          onChange={props.handleInputChange}
        ></input>
        {/* <button
          id="searchBtn"
          className="btn btn-large"
          onClick={props.handleSearch}
        >
          <i class="fa fa-search" aria-hidden="true"></i>
        </button> */}
        <button
          id="sortDescBtn"
          className="btn btn-large"
          onClick={props.handleDescSort}
        >
          <i class="fa fa-sort-alpha-desc" aria-hidden="true"></i>
        </button>
        <button
          id="sortAscBtn"
          className="btn btn-large"
          onClick={props.handleAscSort}
        >
          <i class="fa fa-sort-alpha-asc" aria-hidden="true"></i>
        </button>
      </form>
    </>
  );
}

export default SearchBar;
