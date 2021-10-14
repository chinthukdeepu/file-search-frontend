import {useState, useEffect} from 'react'
import axios from 'axios'
import useToken from './useToken.js';

const useGetData = (url) => {

    const [data,setData] = useState(null);
    const [loading,setLoader] =useState(false);
    const [error,setError] = useState(null);

    const {defaultOptions} = useToken();
    //{params: {slug: user_name}}

    useEffect(()=>{
        if(url){
        setLoader(true);    
        axios.get(process.env.REACT_APP_API_URL+url,defaultOptions)
		.then((response) => {			
            setData(response.data);	
            setError(null);
            setLoader(false);
		}).catch(error =>{
            setData(null);
            setLoader(false);
            if (error?.response?.data?.error) {
                setError(error.response.data.error);
            } else {
                setError({ non_field_error: 'Something went wrong' });
            }              
		});
        }
    },[url]);
    return {data,error,loading}
}
 
export default useGetData;


