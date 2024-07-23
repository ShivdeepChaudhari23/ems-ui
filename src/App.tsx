import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
// import { ComingSoon } from './components';
import { CategoriesContainer, Dashboard, EmployeesContainer, LoginContainer } from './containers';
import { ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { setToken } from './slices/authenticationSlice';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/ReactToastify.min.css';

const getDashbaordWrapper = (component: ReactNode) => {
  return (
    <Dashboard>
      {component}
    </Dashboard>
  )
};

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const cookieToken = Cookies.get('token') as string;
    if (cookieToken) {
      dispatch(setToken(cookieToken));
      navigate('/employees', { replace: true });
    }
  }, [])

  return (
    <>
      <ToastContainer position='top-right' autoClose={3000} hideProgressBar={false}/>
      <Routes>
        <Route path='/' element={<LoginContainer />}/>
        <Route path='/employees' element={getDashbaordWrapper(<EmployeesContainer />)} />
        <Route path='/categories' element={getDashbaordWrapper(<CategoriesContainer />)} />
      </Routes>
    </>
  );
}

export default App;
