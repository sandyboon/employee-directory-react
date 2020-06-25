import React from 'react';

function SideBar(props) {
  return (
    <div className="list-group">
      <li className="list-group-item list-group-item-action font-weight-bold">
        {props.filterName}
      </li>
      {props.filterItems.map((item) => {
        let className =
          item === props.currentSelection
            ? 'list-group-item list-group-item-action active'
            : 'list-group-item list-group-item-action ';
        return (
          <button
            key={'btn-' + item}
            className={className}
            onClick={props.handleSelection}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}

export default SideBar;
