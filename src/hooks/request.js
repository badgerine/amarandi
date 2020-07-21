import { useReducer, useCallback } from 'react';

const requestReducer = (requestState, action) => {
  switch (action.type) {
    case 'SEND':
      return { loading: true, error: null, data: null, requestExtra: action.extra };
    case 'SUCCESSFUL':
      return { ...requestState, loading: false, data: action.responseData, };
    case 'ERROR':
      return { loading: false, error: action.error };
    case 'RESET':
      return { loading: false, error: null };
    default:
      throw new Error('Should not be reached!')
  }
}

const useRequest = () => {
  const [requestState, dispatchRequest] = useReducer(requestReducer,
    {
      loading: false,
      error: null,
      data: null,
      extra: null
    });

  const sendRequest = useCallback((url, method, body, requestExtra) => {
    dispatchRequest({ type: 'SEND', extra: requestExtra });
    fetch(url, {
      method: method,
      body: body,
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(responseJSObject => {
        dispatchRequest({ type: 'SUCCESSFUL', responseData: responseJSObject });
      })
      .catch(err => {
        dispatchRequest({ type: 'ERROR', error: 'Something went wrong. ' + err.message });
      });
  }, []);

  return {
    isLoading: requestState.loading,
    data: requestState.data,
    error: requestState.errror,
    sendRequest: sendRequest,
    requestExtra: requestState.requestExtra
  }
};

export default useRequest;