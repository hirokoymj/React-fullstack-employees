import React, {Component} from 'react';
import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

const InputText = (props) =>{
  return(
    <FormGroup controlId={props.name} validationState={props.validationState ? props.validationState : null}>
      <ControlLabel>{props.formLabel}:</ControlLabel>
      <FormControl 
        type={props.type} 
        name={props.name} 
        value={props.value} 
        onChange={props.onChange} 
        inputRef={props.inputRef ? props.inputRef : null} />
    </FormGroup> 
  )
}
export default InputText;



