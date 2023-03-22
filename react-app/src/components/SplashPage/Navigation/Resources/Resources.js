import React, {useState, useRef} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { NavLink } from 'react-router-dom'
import './Resources.css'


export default function Resources({workInProgress}) {
    const dropdownRef = useRef(null);  
    const [toggleResources, setToggleResources] = useState(false)


  
  return (
    <div className="resources-container" 
    onMouseEnter={() => setToggleResources(true)}
    onMouseLeave={() => setToggleResources(false)} 
    ref={dropdownRef}>
        <NavLink className="splash-navlink"  >Resources <FontAwesomeIcon className='dropdown-icon' icon={faChevronDown} /></NavLink>
        {toggleResources && (
            <div className="resources-dropdown-container">
                <div className="resources-dropdown-menu">

                    <NavLink onClick={workInProgress} className="resources-link">Blog</NavLink>
                    <NavLink onClick={workInProgress} className="resources-link">Guides & Tutorials</NavLink>
                    <NavLink onClick={workInProgress} className="resources-link">Webinars</NavLink>
                    <NavLink onClick={workInProgress} className="resources-link">Help Center</NavLink>
                    <NavLink onClick={workInProgress} className="resources-link">API Docs</NavLink>
                    <NavLink onClick={workInProgress} className="resources-link">Community</NavLink>
                </div>
            </div>
        )}
    </div>
  )
}
