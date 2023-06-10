import React from 'react';
import {BrowserRouter as Router , Routes , Route , Link} from 'react-router-dom';
import Login from './Auth/Login';
import Subscribe from './Auth/Subscribe';
import Success from './Auth/Success';
const Menu = () => {
  return (
    <Router>
        <div className="bg-gray-900 py-4">
        <nav className="container mx-auto flex items-center justify-between">
            <div className="text-white font-semibold text-lg">ORT</div>
            <ul className="flex space-x-4">
            <li className='text-slate-100'>
                <Link to={'/login'}>Login</Link>
            </li>
            <li className='text-slate-100'>
                <Link to={'/subscribe'}>Subscribe</Link>
            </li>
            </ul>
        </nav>
        </div>
        <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/subscribe' element={<Subscribe/>}/>
            <Route path='/' element={<Success/>}/>
        </Routes>
    </Router>
  );
};

export default Menu;
