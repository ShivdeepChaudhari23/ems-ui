import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ComingSoon } from './components';
import { LoginContainer } from './containers';

function App() {

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
