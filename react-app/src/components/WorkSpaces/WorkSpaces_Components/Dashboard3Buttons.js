import React from 'react'
import { faSearch, faClock, faGear, faUsers, faFolderOpen, faTrashCan, faPlus, faArrowUp, faArrowDown, faEllipsisH, faFile, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



export default function Dashboard3Buttons() {
    const handleSearch = () => {
        alert("Feature is currently unavailable")
    }
    
  return (
    <div className="dashboard-3buttons">
        <button className="search" onClick={handleSearch}><FontAwesomeIcon icon={faSearch} /> Search</button>
        <button className="search" onClick={handleSearch}><FontAwesomeIcon  icon={faClock} />  Updates</button>
        <button className="search" onClick={handleSearch}><FontAwesomeIcon icon={faGear} /> Settings & Members</button>
    </div>
  )
}
