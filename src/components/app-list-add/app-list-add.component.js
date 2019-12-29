import React from 'react';
import { Store } from '../../store/app.store';
import uuidv1 from 'uuid';
import styled from 'styled-components';
import { FormButton, FormInput, FormLabel } from '../app-forms-ui/';

const AddForm = styled.form`
	padding: 1.6rem;
	background-color: #f1f1f1;
`;
const AddFormInner = styled.div`
	margin: 0 auto;
	max-width: 960px;
`;
const FormActionWrapper = styled.div`
	display: flex;
	margin: 1rem 0 0 0;
	* {
		flex: 1 1 0;
		&:first-child {
			margin-right: 0.5rem;
		}
		&:last-child {
			margin-left: 0.5rem;
		}
	}
`;
const AppListAdd = () => {
	const [bookname, setBookname] = React.useState();
	const [bookprice, setBookprice] = React.useState();
	const [bookimagesrc, setBookimagesrc] = React.useState();
	const { state, dispatch } = React.useContext(Store);
	const handleSubmit = (e) => {
		e.preventDefault();
		const listData = [
			{
				id: uuidv1(),
				price: bookprice,
				title: bookname,
				image: bookimagesrc,
				localStore: true
			},
			...state.listData
		]
		dispatch({
			type: 'ADD_NEW_BOOK',
			payload: listData
		})
	}
	const cancelAdditem = () => {
		dispatch({
			type: 'HIDE_ADD_FORM'
		})
	}
	return (
		<AddForm onSubmit={handleSubmit}>
			<AddFormInner>
				<div>
					<FormLabel labelHtmlFor="bookname">Book Name</FormLabel>
					<FormInput inputType='text' inputChangeAction={(e) => setBookname(e.target.value)} inputName="bookname" inputPlaceholder="book name" />
				</div>
				<div>
					<FormLabel labelHtmlFor="bookprice">Book Price</FormLabel>
					<FormInput inputType='number' inputChangeAction={(e) => setBookprice(e.target.value)} inputName="bookprice" inputPlaceholder="book price" />
				</div>
				<div>
					<FormLabel labelHtmlFor="bookimagesrc">Book Image Link</FormLabel>
					<FormInput inputType='text' onChange={(e) => setBookimagesrc(e.target.value)} inputName="bookimagesrc" inputPlaceholder="book image link" />
				</div>
				<FormActionWrapper>
					<FormButton buttonClickAction={cancelAdditem} buttonType="button" buttonText="Cancel" />
					<FormButton buttonType="submit" buttonText="Add Book" />
				</FormActionWrapper>
			</AddFormInner>
		</AddForm>
	)
};

export default AppListAdd;