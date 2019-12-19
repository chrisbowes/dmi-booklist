const handleFetchErrors = (e, exception) => {
    if ( exception ) {
        return { error: 'unable to connect to server'}
    } else if ( e.status === 401) {
        return { error: "Unauthorised, your username or password was not recognised"}
    }
    return { error: "Unable to complete this operation, the request was incomplete or missing parameters"}
}

export default handleFetchErrors;