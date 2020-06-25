import React, { useState, useEffect } from 'react';
import ImageCard from './ImageCard';
import Searchbar from './SearchBar';
import { searchCriteria as defaultSearchCriteria } from '../utils/searchCriteria';
import AllEmployees from '../utils/empdata.json';
import useDebounce from '../utils/debounceHook';

function MainContent(props) {
  const [searchText, setSearchText] = useState('');
  const [employees, setEmployees] = useState(
    fetchEmployees(
      searchText,
      props.searchCriteria ? props.searchCriteria : defaultSearchCriteria
    )
  );

  const debouncedSearchTerm = useDebounce(searchText, 500);

  useEffect(() => {
    console.log('rendering component');
    // update the employees according to the search result
    let searchCriteria = props.searchCriteria
      ? props.searchCriteria
      : defaultSearchCriteria;
    if (!debouncedSearchTerm) {
      setEmployees(getAllEmployees(searchCriteria));
    } else {
      let emps = fetchEmployees(debouncedSearchTerm, searchCriteria);
      setEmployees(emps);
    }
  }, [debouncedSearchTerm, props.searchCriteria]);

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div id="mainContent" className="container-fluid">
      <div className="row">
        <Searchbar
          handleDescSort={(event) => {
            console.log('sorting');
          }}
          handleAscSort={(event) => {
            console.log('sorting');
          }}
          handleInputChange={handleInputChange}
          search={searchText}
        />
      </div>
      <div className="row">
        {employees.map((emp, i) => {
          return (
            <div key={i} className="col col-4">
              <ImageCard emp={emp} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function fetchEmployees(searchText, searchCriteria) {
  // this is where we do stuff to fetch employees
  let allEmps = getAllEmployees(searchCriteria);
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

function getAllEmployees(searchCriteria) {
  let emps = AllEmployees;
  let filteredemps = emps.filter((emp) =>
    checkIfEmployeesMatchesCriteria(emp, searchCriteria)
  );
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

export default MainContent;
