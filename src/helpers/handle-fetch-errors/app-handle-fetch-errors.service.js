const handleFetchErrors = (e, exception) => {
    if ( exception ) {
        return { error: 'unable to connect to server', loading: false }
    }
    return { error: "Unable to complete this operation, the request was incomplete or missing parameters", loading: false }
}

export default handleFetchErrors;