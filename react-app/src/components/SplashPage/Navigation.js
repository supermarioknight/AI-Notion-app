import React, {useState, useEffect, useRef} from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Product from './Navigation/Product/ProductDropDown';
import Download from './Navigation/Download/Download';
import Solutions from './Navigation/Solutions/Solutions';
import Resources from './Navigation/Resources/Resources';
import { login } from '../../store/session';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export default function Navigation() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const workInProgress = () => {
    alert('This feature is currently in development')
  }

  const handleDemo = async (e) => {
    e.preventDefault()
    const email = "demo@aa.io"
    const password = "password"
    await dispatch(login(email, password))
    .then(navigate("/home"))
  }

  return (
    <>      
      <div className="nav-container">
        
        <div className="leftnav-container">
          <NavLink to="/" className="splash-navlink" >
            <div class="logo">
                AIdea
            </div>
          </NavLink>
          <Product workInProgress={workInProgress}/>
          <Download workInProgress={workInProgress}/>
          <Solutions workInProgress={workInProgress}/>
          <Resources workInProgress={workInProgress}/>
          <NavLink onClick={workInProgress} className="splash-navlink" >Pricing</NavLink>
        </div>

        

        <div className="rightnav-container">
          <NavLink onClick={handleDemo} className="splash-navlink" >Request a Demo</NavLink>
          <NavLink to="/login" className="splash-navlink" >Login</NavLink>
          <NavLink to="/signup" className="try">Sign Up</NavLink>
        </div>

      </div>
    </>
  )
}
