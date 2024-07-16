import { useEffect } from 'react';
import './App.css';
import { useGetAllEmployeesQuery } from './services/admin/adminService';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ComingSoon } from './components';
import { LoginContainer } from './containers';

function App() {
  const { data, isLoading } = useGetAllEmployeesQuery();

  useEffect(() => {
    if (isLoading) {
      console.log('#### LOADING....');
    }
    if (data) {
      console.log('#### DATA HERHE', data);
    }
  }, [data, isLoading]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginContainer />}/>
        <Route path='/employees' element={<ComingSoon />} />
        <Route path='/categories' element={<ComingSoon />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
