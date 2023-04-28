import './App.css';
import { Routes, Route } from 'react-router-dom';
import SplashPage from './components/SplashPage/SplashPage'
import Login from './components/Authentication/Login';
import Signup from './components/Authentication/Signup';
import WorkSpaces from './components/WorkSpaces/WorkSpaces';
import { authenticate } from './store/session';
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import FAQ from './components/ContentBlocks/FAQ';
import Tutorial from './components/Tutorial';
import NotFound from './components/NotFound';


function App() {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(authenticate());
    setIsLoaded(true)

  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <Routes>
          <Route exact path ="/" element={<SplashPage/>}></Route>
          <Route path="/pricing"></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/home" element={<WorkSpaces/>}></Route>
          <Route path="/home/faq" element={<FAQ/>} ></Route>
          <Route path="/tutorial" element={<Tutorial />} ></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        )}
    </>
  );
}

export default App;
