import React from 'react';
import styled from 'styled-components';

const StyledFormButton = styled.button`
	width: ${props => (props.inline ? 'auto' : '100%')};
	padding: ${props => (props.mode === 'slim' ? '0.5rem 1rem' : '1rem')};
	border: ${props => (props.tone === 'light' ? '1px solid #999999' : 'none')};
	border-radius: 0.1rem;
	box-sizing: border-box;
	text-transform: uppercase;
	background-color: ${props => (props.tone === 'light' ? '#ffffff' : '#333333')};
	color: ${props => (props.tone === 'light' ? '#666666' : '#ffffff')};
	cursor: pointer;
	&[type='submit']{
		background-color: #000000;
	}
	&[disabled]{
		opacity: 0.4;
		cursor: default;
	}
`;

const FormButton = (props) => {
	return (
		<StyledFormButton disabled={props.buttonDisabled} type={props.buttonType} onClick={props.buttonClickAction} mode={props.mode} tone={props.tone} inline={props.inline}>{props.children}</StyledFormButton>
	)
}

export default FormButton;