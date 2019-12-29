import React from 'react';
import styled from 'styled-components';

const StyledFormButton = styled.button`
	width: 100%;
	padding: ${props => (props.mode === 'slim' ? '0.5rem 1rem' : '1rem')};
	border: none;
	border-radius: 0.1rem;
	box-sizing: border-box;
	text-transform: uppercase;
	background-color: #333333;
	color: #ffffff;
	&[type='submit']{
		background-color: #000000;
	}
`;

const FormButton = (props) => {
	return (
		<StyledFormButton type={props.buttonType} onClick={props.buttonClickAction} mode={props.mode}>{props.buttonText}</StyledFormButton>
	)
}

export default FormButton;