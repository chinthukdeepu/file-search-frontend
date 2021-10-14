const useToken = (content_type='application/json') => {
    
    let defaultOptions = null;
    
    
    let token = localStorage.getItem('bToken');
    let refresh_token = localStorage.getItem('rToken');
    let full_name = localStorage.getItem('full_name');
    let role = localStorage.getItem('role');
    

    defaultOptions = {
        headers: {
            'Content-Type': content_type,
            Autherization:`Barer `+token
        },
    };
    
    return {token,refresh_token,full_name,role,defaultOptions};
}
 
export default useToken;