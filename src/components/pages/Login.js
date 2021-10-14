import { useState } from "react";
import usePostData from "../../hooks/usePostData";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [url, setUrl] = useState('auth/login');
    const [formdata, setFormData] = useState('');

    let loader = <span className='text-blue-500'>Sending...</span>;

    const processLogin = (e) => {
        e.preventDefault();
        setFormData({ email, password });
    }

    const { data, error, loading } = usePostData(url, formdata);

    if (data) {
        console.log('data found...')

        localStorage.setItem("bToken", data.accessToken);
        localStorage.setItem("rToken", data.refreshToken);
        localStorage.setItem("full_name", data.full_name);
        localStorage.setItem("role", data.role);

        window.location.href = "/";
    }

    return (
        <div className='h-full w-50 flex justify-center items-center'>

            <div className="w-full max-w-xs">

                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" >
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Email
                        </label>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Email" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" onKeyPress={e => {
                            if (e.key === 'Enter') {
                                processLogin(e)
                            }
                        }} />

                        <p className="text-red-500 text-xs italic">{error && error.message}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <button disabled={loading ? true : false} onClick={(e) => processLogin(e)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            Sign In
                        </button>
                        {loading && loader}

                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;