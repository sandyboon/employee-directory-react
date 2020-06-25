import React from 'react';

function ImageCard(props) {
  // id={props.emp.id}
  return (
    <div className="card" style={{ width: '18rem' }}>
      <img
        className="card-img-top"
        src={props.emp.image}
        alt={props.emp.name + '_avatar'}
      ></img>
      <div className="card-body">
        <h5 className="card-title">{props.emp.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{props.emp.jobTitle}</h6>
        <div>
          <span style={{ display: 'inline-block' }} className="card-text">
            Department: {props.emp.department}
          </span>
          <span style={{ display: 'inline-block' }} className="card-text">
            Office: {props.emp.officeLocation}
          </span>
          <span style={{ display: 'inline-block' }} className="card-text">
            Phone: {props.emp.workPhone}
          </span>
          <span style={{ display: 'inline-block' }} className="card-text">
            {props.emp.email}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ImageCard;
