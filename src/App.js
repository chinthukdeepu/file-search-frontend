import LeftNav from "./components/elements/LeftNav";
import Dashboard from "./components/pages/Dashboard";
import TopNav from "./components/elements/TopNav";
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import PageNotFound from './components/pages/PageNotFound';

import refreshAccessToken from './services/Common';
import axios from 'axios';

import { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { createContext } from "react";
import AdminDashboard from "./components/pages/AdminDashboard";

export const UserContext = createContext();

export const SearchContext = createContext({ keyword: '', setKeyword: () => { } });





//response interceptor for checking if main token expired 
//if token is expired , update main token with refresh token
axios.interceptors.response.use(
  function (successRes) {
    return successRes;
  }, async function (error) {
    const originalRequest = error.config;
    let page = originalRequest.url.substring(originalRequest.url.lastIndexOf('/') + 1);
    if (page === 'login') {
      return Promise.reject(error);
    } else {
      if (localStorage.getItem('bToken') && (error.response.data.error.status == 401 || error.response.data.error.message == 'jwt expired') && !originalRequest._retry) {
        originalRequest._retry = true;
        const access_token = await refreshAccessToken();
        if (access_token) {
          originalRequest.headers.Autherization=`Barer `+access_token;
          return axios(originalRequest);
        } else {
          return Promise.reject(error);
        }
      } else {
        return Promise.reject(error);
      }

    }
  }
);


const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    localStorage.getItem('bToken') ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
    )
  )} />
)

const AuthenticatedRouteAdmin = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    localStorage.getItem('bToken') && localStorage.getItem('role') === 'admin' ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
    )
  )} />
)

const LoginRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    localStorage.getItem('bToken') ? (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }} />
    ) : (
      <Component {...props} />
    )
  )} />
)


function App() {

  const accessToken = localStorage.getItem('bToken');
  const fullName = localStorage.getItem('full_name');
  const role = localStorage.getItem('role');

  //search keyword to pass in context
  const [keyword, setKeyword] = useState('');

  return (
    <Router>
      <div className="wrapper text-white font-main-font bg-gray-900 grid md:grid-cols-12 min-h-full h-auto">

        <UserContext.Provider value={{ accessToken, fullName, role, uploadStatus: 1 }}>
          <SearchContext.Provider value={{ keyword, setKeyword }}>
            {accessToken && <LeftNav />}
            <main className={`px-16 py-6 md:col-span-${accessToken ? '10' : '12'}`}>

              <TopNav />

              <Switch>
                <LoginRoute exact path="/login" component={Login} />
                <LoginRoute exact path="/register" component={Register} />
                <AuthenticatedRoute exact path="/" component={() => <Dashboard keyword />} />
                <AuthenticatedRouteAdmin exact path="/admin" component={() => <AdminDashboard keyword />} />
                <Route path='/404'><PageNotFound /></Route>
                <Redirect to="/404" />
              </Switch>
            </main>
          </SearchContext.Provider>
        </UserContext.Provider>


      </div>
    </Router>
  );
}

export default App;
