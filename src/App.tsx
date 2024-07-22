import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
// import { ComingSoon } from './components';
import { CategoriesContainer, Dashboard, EmployeesContainer, LoginContainer } from './containers';
import { ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { setToken } from './slices/authenticationSlice';

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
      console.log('$$$$ FOUND TOKEN');
      dispatch(setToken(cookieToken));
      navigate('/employees', { replace: true });
    }
  }, [])

  return (
      <Routes>
        <Route path='/' element={<LoginContainer />}/>
        <Route path='/employees' element={getDashbaordWrapper(<EmployeesContainer />)} />
        <Route path='/categories' element={getDashbaordWrapper(<CategoriesContainer />)} />
      </Routes>
  );
}

export default App;
