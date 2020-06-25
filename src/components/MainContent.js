import React, { useState, useEffect, useRef } from 'react';
import ImageCard from './ImageCard';
import Searchbar from './SearchBar';
import { searchCriteria as defaultSearchCriteria } from '../utils/searchCriteria';
import AllEmployees from '../utils/empdata.json';
import useDebounce from '../utils/debounceHook';

function useTraceUpdate(props) {
  const prev = useRef(props);
  useEffect(() => {
    const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
      if (prev.current[k] !== v) {
        ps[k] = [prev.current[k], v];
      }
      return ps;
    }, {});
    if (Object.keys(changedProps).length > 0) {
      console.log('Changed props:', changedProps);
    }
    prev.current = props;
  });
}

function MainContent(props) {
  useTraceUpdate(props);
  const [searchText, setSearchText] = useState('');
  const [employees, setEmployees] = useState();
  const [sortCriteria, setSortCriteria] = useState();

  const debouncedSearchTerm = useDebounce(searchText, 500);

  useEffect(() => {
    console.log('rendering component');
    // update the employees according to the search result
    let searchCriteria = props.searchCriteria
      ? goclone(props.searchCriteria)
      : defaultSearchCriteria;
    if (!debouncedSearchTerm) {
      setEmployees(getAllEmployees(searchCriteria, sortCriteria));
    } else {
      let emps = fetchEmployees(
        debouncedSearchTerm,
        searchCriteria,
        sortCriteria
      );
      setEmployees(emps);
    }
  }, [debouncedSearchTerm, props.searchCriteria, sortCriteria]);

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleNameSort = (event) => {
    setSortCriteria({
      by: 'byName',
      ascending: !(sortCriteria && sortCriteria.ascending),
    });
  };

  const handleLocationSort = (event) => {
    setSortCriteria({
      by: 'byLocation',
      ascending: !(sortCriteria && sortCriteria.ascending),
    });
  };

  return (
    <div id="mainContent" className="container-fluid">
      <div className="row">
        <Searchbar
          handleNameSort={handleNameSort}
          handleLocationSort={handleLocationSort}
          handleInputChange={handleInputChange}
          search={searchText}
        />
      </div>
      <div className="row">{renderEmployees(employees)}</div>
    </div>
  );
}

function renderEmployees(employees) {
  if (employees) {
    return employees.map((emp, i) => {
      return (
        <div key={i} className="col col-4">
          <ImageCard emp={emp} />
        </div>
      );
    });
  }
}

function fetchEmployees(searchText, searchCriteria, sortCriteria) {
  // this is where we do stuff to fetch employees
  let allEmps = getAllEmployees(searchCriteria, sortCriteria);
  let filteredEmps;
  if (searchText) {
    filteredEmps = allEmps.filter((emp) => {
      return emp.name.toLowerCase().includes(searchText.toLowerCase());
    });
  } else {
    filteredEmps = allEmps;
  }
  console.log('fileted emps ' + filteredEmps);
  return filteredEmps;
}

function getAllEmployees(searchCriteria, sortCriteria) {
  let emps = AllEmployees;
  let filteredemps = emps.filter((emp) =>
    checkIfEmployeesMatchesCriteria(emp, searchCriteria)
  );
  if (sortCriteria) {
    if (sortCriteria.by === 'byName') {
      filteredemps.sort((emp1, emp2) => {
        return sortCriteria.ascending
          ? emp1.name.localeCompare(emp2.name)
          : -emp1.name.localeCompare(emp2.name);
      });
    } else {
      filteredemps.sort((emp1, emp2) => {
        return sortCriteria.ascending
          ? emp1.department.localeCompare(emp2.department)
          : -emp1.department.localeCompare(emp2.department);
      });
    }
  }
  console.log(filteredemps);
  return filteredemps;
}

function checkIfEmployeesMatchesCriteria(emp, searchCriteria) {
  let isMatch = true;
  for (let criteria of Object.keys(searchCriteria)) {
    if (!isMatch) break;
    if (emp.hasOwnProperty(criteria)) {
      //Now match the property value
      isMatch =
        emp[criteria] === searchCriteria[criteria] ||
        searchCriteria[criteria].trim().length === 0;
    } else {
      isMatch = false;
    }
  }
  return isMatch;
}

function goclone(source) {
  if (Object.prototype.toString.call(source) === '[object Array]') {
    let clone = [];
    for (let i = 0; i < source.length; i++) {
      clone[i] = goclone(source[i]);
    }
    return clone;
  } else if (typeof source == 'object') {
    let clone = {};
    for (let prop in source) {
      if (source.hasOwnProperty(prop)) {
        clone[prop] = goclone(source[prop]);
      }
    }
    return clone;
  } else {
    return source;
  }
}

export default MainContent;
