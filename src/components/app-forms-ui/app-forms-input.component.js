import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
	padding: 0.5rem;
	border: 1px solid #e1e1e1;
	border-radius: 0.2rem;
	box-sizing: border-box;
	width: 100%;
	color: #666;
	font-size: 1.2rem;
`;

const FormInput = (props) => {
  return (
    <Input type={props.inputType} onChange={props.inputChangeAction} name={props.inputName} placeholder={props.inputPlaceholder}></Input>
  )
}

export default FormInput