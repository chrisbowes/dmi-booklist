import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AppLoading = (props) => {
    const Spinner = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: ${props.cssHeight};
`;
    return (
        <Spinner>
            <FontAwesomeIcon icon="circle-notch" spin size='3x' style={{ color: '#e1e1e1' }} />
        </Spinner>
    )
}

export default AppLoading;