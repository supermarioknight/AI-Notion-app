import React, {useState, useRef} from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Solutions.css'
import Enterprise from './Enterprise.PNG'
import Personal from './Personal.PNG'
import SmallBusiness from './SmallBusiness.PNG'

export default function Solutions() {
  const dropdownRef = useRef(null);  
  const [toggleSolutions, setToggleSolutions] = useState(false)

 

  return (
    <div className="solutions-container" 
    onMouseEnter={() => setToggleSolutions(true)}
    onMouseLeave={() => setToggleSolutions(false)} 
    ref={dropdownRef}>
        <NavLink className="splash-navlink"  >Solutions <FontAwesomeIcon className='dropdown-icon' icon={faChevronDown} /></NavLink>
        {toggleSolutions && (
            <div className="solution-dropdown-container">
                <div className="solution-dropdown-menu">

                    <NavLink className="solution-link">
                        <img src={Enterprise} alt="" /> 
                        <span>Enterprise
                            <div className="product-details-info">Advance features for your org</div>
                            </span>
                    </NavLink>

                    <NavLink className="solution-link">
                        <img src={SmallBusiness} alt="" /> 
                        <span>Small Business
                            <div className="product-details-info">Run your team on one tool</div>
                            </span>
                    </NavLink>


                    <NavLink className="solution-link">
                        <img src={Personal} alt="" /> 
                        <span>Personal
                            <div className="product-details-info">Free for Individuals</div>
                            </span>
                    </NavLink>
                </div>
            </div>
        )}
    </div>
  )
}
