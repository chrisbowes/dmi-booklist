import React from 'react';
import { Store } from '../../store/app.store';
import uuidv1 from 'uuid';
import styled from 'styled-components';
import { FormButton, FormInput, FormLabel } from '../app-forms-ui/';
import config from '../../config/app.config';

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
	const [authorname, setAuthorname] = React.useState();
	const { state, dispatch } = React.useContext(Store);
	const handleSubmit = (e) => {
		e.preventDefault();
		const listData = [
			{
				id: uuidv1(),
				price: bookprice,
				title: bookname,
				image: bookimagesrc,
				author: authorname,
				localStore: true
			},
			...state.listData
		]
		dispatch({
			type: 'ADD_NEW_BOOK',
			payload: {
				listData,
				listDataRange: { from: 0, to: config.PAGING_RANGE }
			}
		})
	}
	const cancelAdditem = () => {
		dispatch({
			type: 'HIDE_ADD_FORM'
		})
	}
	const disableSubmit = (!bookprice || !bookname || !authorname);
	return (
		<AddForm onSubmit={handleSubmit}>
			<AddFormInner>
				<div>
					<FormLabel labelHtmlFor="bookname">Book Name</FormLabel>
					<FormInput inputType='text' inputChangeAction={(e) => setBookname(e.target.value)} inputName="bookname" />
				</div>
				<div>
					<FormLabel labelHtmlFor="authorname">Author</FormLabel>
					<FormInput inputType='text' inputChangeAction={(e) => setAuthorname(e.target.value)} inputName="authorname" />
				</div>
				<div>
					<FormLabel labelHtmlFor="bookprice">Book Price</FormLabel>
					<FormInput inputType='number' inputChangeAction={(e) => setBookprice(parseInt(e.target.value))} inputName="bookprice" inputStep="0.01" inputPattern="^\d+(?:\.\d{1,2})?$"/>
				</div>
				<div>
					<FormLabel labelHtmlFor="bookimagesrc">Book Image Link</FormLabel>
					<FormInput inputType='text' inputChangeAction={(e) => setBookimagesrc(e.target.value)} inputName="bookimagesrc" />
				</div>
				<FormActionWrapper>
					<FormButton buttonClickAction={cancelAdditem} buttonType="button" tone="light">Cancel</FormButton>
					<FormButton buttonType="submit" buttonDisabled={disableSubmit}>Add Book</FormButton>
				</FormActionWrapper>
			</AddFormInner>
		</AddForm>
	)
};

export default AppListAdd;