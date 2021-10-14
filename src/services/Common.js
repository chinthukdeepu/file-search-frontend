
const  refreshAccessToken = async() => {
   const refresh_token = localStorage.getItem('rToken');

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({refreshToken:refresh_token})
   };

   try {
      const response = await fetch(process.env.REACT_APP_API_URL+'auth/refresh-token',requestOptions); 
      const data = await response.json();
      localStorage.setItem("bToken",data.accessToken);
      localStorage.setItem("rToken",data.refreshToken);
      return data.accessToken;
    }
    catch (error) {
      return null;
    }

}
 
export default refreshAccessToken;