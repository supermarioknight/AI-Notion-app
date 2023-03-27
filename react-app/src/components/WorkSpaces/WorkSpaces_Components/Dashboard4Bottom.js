import React from 'react'
import { faSearch, faClock, faGear, faUsers, faFolderOpen, faTrashCan, faPlus, faArrowUp, faArrowDown, faEllipsisH, faFile, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Dashboard4Bottom() {
    const handleSearch = () => {
        alert("Feature is currently unavailable")
    }

  return (
    <div className="dashboard-bottom4">
        <button className="search" onClick={handleSearch}><FontAwesomeIcon icon={faUsers} />Create a teamspace</button>
        <button className="search" onClick={handleSearch}><FontAwesomeIcon icon={faFolderOpen} />Templates</button>
        <button className="search" onClick={handleSearch}><FontAwesomeIcon style={{paddingRight: 6}} icon={faArrowDown} />Import</button>
        <button className="search" onClick={handleSearch}><FontAwesomeIcon style={{paddingRight: 3}} icon={faTrashCan} />Trash</button>
    </div>
  )
}
