import React from 'react';
import { Store } from '../../store/app.store';
import styled from 'styled-components';

const Error = styled.div`
	background-color: #c95e5e;
	padding: 2rem;
	color: #fff;
	text-align: center;
`;

const AppError = () => {
    const { state } = React.useContext(Store);
    return (
        <Error>
            {state.error}
        </Error>
    )
}

export default AppError;