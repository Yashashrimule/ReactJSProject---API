import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import LoginPage from './API4/LoginPage';
import Signup from './API4/Signup';
import Dashboard from './API4/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' Component={LoginPage}></Route>
        <Route path='/signup' Component={Signup}></Route>
        <Route path='/' Component={LoginPage}></Route>
        <Route path='/dash' Component={Dashboard}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
