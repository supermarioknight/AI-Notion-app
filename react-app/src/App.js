import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/SplashPage/Navigation';
import SplashPage from './components/SplashPage/SplashPage'
import Login from './components/Authentication/Login';
import Signup from './components/Authentication/Signup';
import WorkSpaces from './components/WorkSpaces/WorkSpaces';



function App() {
  return (
    <>
      <Routes>
        <Route exact path ="/" element={<SplashPage/>}></Route>
        <Route path="/pricing"></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/home" element={<WorkSpaces/>}></Route>
      </Routes>
    </>
  );
}

export default App;
