import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
	display: block;
	font-size: 0.8rem;
	margin: 0.4rem 0;
	color: #666666;
`;

const FormLabel = (props) => {
  return (
    <Label htmlFor={props.labelHtmlFor}>{props.children}</Label>
  )
}
export default FormLabel;