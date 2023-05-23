import React from 'react';
import "./form-input.css"

const FormInput = (props) => {
  return (
    <input className='form-input' value={props.value} onChange={(e) => props.setValue(e.target.value)} type={props.type} id={props.id} name={props.name} placeholder={props.placeholder} />
  );
};

export default FormInput;