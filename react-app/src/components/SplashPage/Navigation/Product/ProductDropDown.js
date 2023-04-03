import React, {useState, useRef} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { NavLink } from 'react-router-dom'
import BookIcon from './bookicon.PNG'
import Marksman from './marksman.PNG'
import Notebook from './Notebook.PNG'
import AI from './aiIcon.PNG'


export default function Product({workInProgress}) {
  const [toggleProduct, setToggleProduct] = useState(false) 
  const dropdownRef = useRef(null);



  return (
    <div className="product-container"
    onMouseEnter={() => setToggleProduct(true)}
    onMouseLeave={() => setToggleProduct(false)} 
    ref={dropdownRef}>
    <NavLink className="splash-navlink" >Product <FontAwesomeIcon className='dropdown-icon' icon={faChevronDown} /></NavLink>
    {toggleProduct && (
          <div className="product-dropdown">
          <div className="product-dropdownmenu">

            <NavLink onClick={workInProgress} className="product-details-dropdownmenu">
              <div  className="wiki"><img src={BookIcon} alt="" />
                <div className="product-details-right">
                  Wikis
                  <div className="product-details-info">Centralize your Knowledge</div>
                </div> 
              </div>
            </NavLink>

            <NavLink onClick={workInProgress} className="product-details-dropdownmenu">
              <div className="wiki"> <img src={Marksman} alt="" />
                <div  className="product-details-right">
                  Projects
                <div className="product-details-info">For every team or size</div>
                </div>
              </div>
            </NavLink>

            <NavLink onClick={workInProgress} className="product-details-dropdownmenu">
              <div className="wiki"> <img  src={Notebook} alt="" /> 
                <div className="product-details-right">
                Docs
                <div className="product-details-info">Simple & Powerful</div>
              </div>
            </div>
            </NavLink>

            <NavLink onClick={workInProgress} className="product-details-dropdownmenu">
              <div className="wiki"> <img src={AI} alt="" />
              <div className="product-details-right">
              IdeaFusion AI
            <div className="product-details-info">Integrated AI assistant</div>
              </div>
            </div>
            </NavLink>

            <NavLink onClick={workInProgress} className="product-details-dropdownmenu">Template Gallery
            <div className="product-details-info">Setups to Get you started</div>
            </NavLink>

            <NavLink onClick={workInProgress} className="product-details-dropdownmenu">Customer Stories
            <div className="product-details-info">See how teams use Big Brain</div>
            </NavLink>
          </div>
        </div>
      )}  
  </div> 
  )
}
