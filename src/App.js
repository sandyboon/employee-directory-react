import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import { searchCriteria as defaultSearchCriteria } from './utils/searchCriteria';

const depts = ['Human Resources', 'Legal', 'Marketing', 'Sales', 'Services'];
const cities = ['California', 'New York', 'Ohio', 'Boston', 'Florida'];
const jobtitles = [
  'Benefits Manager',
  'Lawyer',
  'Marketing Analyst',
  'Sales Rep',
  'Service Manager',
];

function App() {
  const [searchLocation, setSearchLocation] = useState(
    defaultSearchCriteria.officeLocation
  );
  const [searchJobTitle, setSearchJobTitle] = useState(
    defaultSearchCriteria.jobTitle
  );
  const [searchDepartment, setSearchDepartment] = useState(
    defaultSearchCriteria.department
  );

  useEffect(() => {
    console.log('CHanging something');
  });

  const handleLocationSelection = (event) => {
    if (event.target.innerText === searchLocation) {
      // that means the item got unselected
      setSearchLocation('');
    } else {
      // set the new searc location criteria
      setSearchLocation(event.target.innerText);
    }
  };

  const handleDeptSelection = (event) => {
    if (event.target.innerText === searchDepartment) {
      // that means the item got unselected
      setSearchDepartment('');
    } else {
      // set the new searc location criteria
      setSearchDepartment(event.target.innerText);
    }
  };

  const handleTitleSelection = (event) => {
    if (event.target.innerText === searchJobTitle) {
      // that means the item got unselected
      setSearchJobTitle('');
    } else {
      // set the new searc location criteria
      setSearchJobTitle(event.target.innerText);
    }
  };

  const getCurrentSearchCriteria = () => {
    let criteria = {};
    if (searchLocation) {
      criteria.officeLocation = searchLocation;
    }
    if (searchDepartment) {
      criteria.department = searchDepartment;
    }
    if (searchJobTitle) {
      criteria.jobTitle = searchJobTitle;
    }
    return criteria;
  };

  return (
    <div className="container-fluid">
      <h1 className="text-center pt-3">Employee Directory</h1>
      <div className="row mt-5">
        <div className="col-3">
          <Sidebar
            filterType="officeLocation"
            filterName="location"
            filterItems={cities}
            handleSelection={handleLocationSelection}
            currentSelection={searchLocation}
          />
        </div>
        <div className="col-9">
          <MainContent searchCriteria={getCurrentSearchCriteria()} />
        </div>
      </div>
    </div>
  );
}

export default App;
