import { useState, useEffect } from 'react'
import axios from 'axios'
import useToken from './useToken.js';

const usePostData = (url, formdata, type = 'application/json') => {

    const [data, setData] = useState(null);
    const [loading, setLoader] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const { defaultOptions } = useToken(type);

    useEffect(() => {

        if (formdata) {
            console.log('form called', formdata,process.env.REACT_APP_API_URL);
            setLoader(true);
            axios.post(process.env.REACT_APP_API_URL + url, formdata, defaultOptions)
                .then((response) => {
                    setData(response.data);
                    setMessage(response.data);
                    setError(null);
                    setLoader(false);
                }).catch(error => {
                    setData(null);
                    setMessage(null);
                    setLoader(false);
                    if (error?.response?.data?.error) {
                        setError(error.response.data.error);
                    } else {
                        setError({ non_field_error: 'Something went wrong' });
                    }
                });
        }

    }, [formdata]);
    return { data, error, loading, message }
}

export default usePostData;


