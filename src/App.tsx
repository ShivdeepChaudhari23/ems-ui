import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { ComingSoon } from './components';
import { CategoriesContainer, Dashboard, EmployeesContainer, LoginContainer } from './containers';
import { ReactNode } from 'react';

const getDashbaordWrapper = (component: ReactNode) => {
  return (
    <Dashboard>
      {component}
    </Dashboard>
  )
};

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginContainer />}/>
        <Route path='/employees' element={getDashbaordWrapper(<EmployeesContainer />)} />
        <Route path='/categories' element={getDashbaordWrapper(<CategoriesContainer />)} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
