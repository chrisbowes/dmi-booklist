import React from 'react';
import { Store } from '../../store/app.store';
import uuidv1 from 'uuid';
import styled from 'styled-components';

const FormLabel = styled.label`
	display: block;
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
		<form onSubmit={handleSubmit}>
			<div>
				<FormLabel htmlFor="bookname">Book Name</FormLabel>
				<input type='text' onChange={(e) => setBookname(e.target.value)} name="bookname" placeholder="book name"></input>
			</div>
			<div>
				<FormLabel htmlFor="bookprice">Book Price</FormLabel>
				<input type='number' onChange={(e) => setBookprice(e.target.value)} name="bookprice" placeholder="book price"></input>
			</div>
			<div>
				<FormLabel htmlFor="bookimagesrc">Book Image Link</FormLabel>
				<input type='text' onChange={(e) => setBookimagesrc(e.target.value)} name="bookimagesrc" placeholder="book image link"></input>
			</div>
			<button onClick={cancelAdditem}>Cancel</button>
			<button type="submit">Add Book</button>
		</form>
	)
};

export default AppListAdd;