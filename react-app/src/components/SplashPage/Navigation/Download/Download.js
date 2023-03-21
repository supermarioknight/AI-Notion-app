import React, {useState, useEffect, useRef} from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Download.css'

export default function Download() {
  const [toggleDownload, setToggleDownload] = useState(false)

  const dropdownRef = useRef(null);
 

  return (
    <div className="download-container" 
    onMouseEnter={() => setToggleDownload(true)}
    onMouseLeave={() => setToggleDownload(false)} 
    ref={dropdownRef}>
        <NavLink className="splash-navlink"  >Download <FontAwesomeIcon className='dropdown-icon' icon={faChevronDown} /></NavLink>
        {toggleDownload && (
            <div className="download-dropdown-container">
                <div className="download-dropdown-menu">

                    <NavLink className="download-link">iOS & Android</NavLink>
                    <NavLink className="download-link">Mac & Windows</NavLink>

                </div>
            </div>
        )}
    </div>
  )
}
