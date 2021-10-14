import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { UserContext } from '../../App';

const TopNav = () => {

    const logOut =() =>{
        localStorage.clear();
        window.location.href = "/login";
    }

    const { role,fullName } = useContext(UserContext);

    return (
        <div className='flex justify-center md:justify-end'>
            {!role &&
                <>
                    <Link to='/login' className='btn'>Login</Link>
                    <Link to='/register' className='ml-2 btn'>Sign up</Link>
                </>
            }
            {role &&
               <>
               <span className='mr-2'>{fullName} | {role}</span> <Link onClick={()=>logOut()} to='/' className='btn'>Logout</Link>
               </>
            }
        </div >
    );
}

export default TopNav;