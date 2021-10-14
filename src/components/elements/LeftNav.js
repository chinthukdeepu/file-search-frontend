import { useState, useContext } from 'react';
import { Link,NavLink } from 'react-router-dom';
import PdfUploader from "../elements/PdfUploader";

import { UserContext } from '../../App';

const LeftNav = () => {
    const [showMenu, setMenu] = useState(false);
    const { role } = useContext(UserContext);
    return (
        <div className='md:col-span-2 md:flex md:justify-end bg-black pr-2'>
            <nav className='text-right'>

                <div className='flex justify-between items-center'>
                    <h1 className='font-bold uppercase p-4 hover:text-green-600'>
                        <Link to='/'>Logo for the file uploader</Link>
                    </h1>
                    <div className='px-4 md:hidden cursor-pointer' onClick={() => setMenu(!showMenu)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </div>
                </div>

                <ul className={showMenu ? 'md:block' : 'hidden md:block'}>
                    <li className='py-1'>
                        <NavLink exact to='/' className='flex justify-end pr-4' activeClassName="bg-blue-400 rounded">
                            <span className=''>My Files</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </NavLink>
                    </li>

                    {role === 'admin' &&
                        <li className='py-1'>
                            <NavLink exact to='/admin' className='flex justify-end pr-4' activeClassName="bg-blue-400 rounded">
                                <span className=''>Files from all users</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                </svg>
                            </NavLink >
                        </li>
                    }

                    <li className='mt-20'>
                        <hr />
                        <h2 className='text-left my-2'>Chose a file to upload</h2>
                        <PdfUploader />
                    </li>

                </ul>
            </nav>


        </div>
    );
}

export default LeftNav;