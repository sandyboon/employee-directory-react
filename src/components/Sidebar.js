import React from 'react';

function SideBar(props) {
  return (
    <div className="panel-group">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4 className="panel-title">
            <a data-toggle="collapse" href={'#' + props.filterType}>
              {props.filterType}
            </a>
          </h4>
        </div>
        <div id={props.filterType} className="panel-collapse collapse">
          <ul className="list-group">
            <li className="list-group-item">One</li>
            <li className="list-group-item">Two</li>
            <li className="list-group-item">Three</li>
          </ul>
          <div className="panel-footer">Footer</div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
