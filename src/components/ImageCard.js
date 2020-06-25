import React from 'react';

function ImageCard(props) {
  // id={props.emp.id}
  return (
    <div className="card" style={{ width: '18rem' }}>
      <img className="card-img-top" src="..." alt="Card  cap"></img>
      <div className="card-body">
        <h5 className="card-title">{props.emp.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{props.emp.jobTitle}</h6>
        <div>
          <p className="card-text">Department: {props.emp.department}</p>
        </div>
        <div>
          <p className="card-text">Office: {props.emp.officeLocation}</p>
        </div>
      </div>
    </div>
  );
}

export default ImageCard;
