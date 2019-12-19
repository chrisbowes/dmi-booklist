import React from 'react';
import { Store } from '../../store/app.store';

const AppError = () => {
    const { state, dispatch } = React.useContext(Store);
    return (
        <div>
            {state.error}
        </div>
    )
}

export default AppError;