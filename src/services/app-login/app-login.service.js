import config from '../../config/app.config';
import handleFetchErrors from '../../helpers/handle-fetch-errors/app-handle-fetch-errors.helper';

const loginService = async (auth) => {   
    const url = `${config.API_URL}`;
    const params = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${auth}`
        }
    }
    let response;
    try {
      response = await fetch(url, params);
    } catch (ex) {
      return handleFetchErrors(ex, true);
    }
    if (!response.ok) {
      return handleFetchErrors(response, false);
    }
    return {
      success: true
    }
}

export default loginService;
