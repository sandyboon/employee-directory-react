import React from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import { searchCriteria as defaultSearchCriteria } from './utils/searchCriteria';

function App() {
  return (
    <div className="container-fluid">
      <div className="col-4">
        <Sidebar />
      </div>
      <div className="col-8">
        <MainContent searchCriteria={defaultSearchCriteria} />
      </div>
    </div>
  );
}

export default App;
