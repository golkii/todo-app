import React from 'react';
import "./blue-button.css"

const BlueButton = (props) => {
  return (
    <button onClick={props.onClick} className='blue-button'>
      {props.text}
    </button>
  );
};

export default BlueButton;