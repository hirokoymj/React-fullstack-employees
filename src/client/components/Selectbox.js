import React, {Component} from 'react';
import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

const Selectbox = (props) =>{
  return(
    <FormGroup>
      <ControlLabel>{props.formLabel}:</ControlLabel>
      <FormControl 
        componentClass="select" 
        name={props.name} 
        value={props.value} 
        onChange={props.onChange}>
        <option value="">Select your job title</option>
        {
        props.options.map(option =>
          <option key={option.name} value={option.name}>{option.name}</option>
          )
        }
      </FormControl>
    </FormGroup>  
  )
}
export default Selectbox;


  