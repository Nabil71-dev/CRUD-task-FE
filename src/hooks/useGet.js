import { useEffect, useReducer } from 'react';
import Api from '../utils/api';

const initialstate = {
    loading: true,
    error: '',
    data: {}
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'SUCCESS':
            return {
                loading: false,
                data: action.result,
                error: ''
            }
        case 'ERROR':
            return {
                loading: false,
                data: {},
                error: 'Something went wrong'
            }
        default:
            return state;
    }
}

function useGet(url) {
    const [state, dispatch] = useReducer(reducer, initialstate)
    useEffect(() => {
        Api.get(url)
            .then(data => {
                dispatch({ type: 'SUCCESS', result: data })
            })
            .catch(() => {
                dispatch({ type: 'ERROR' })
            })
    }, [url]);

    return {
        state,
        dispatch
    };
}
export default useGet;