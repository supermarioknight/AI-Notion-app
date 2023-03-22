import React, { useRef, useEffect } from 'react';
import './WorkSpaces.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function WorkSpaces() {
    const dashboardContainer = useRef(null);
    const newPageContainer = useRef(null);
    const placeholderUser = "User's Notion"
    const firstLetter = placeholderUser[0]

    const handleSearch = () => {
        alert("Feature is currently unavailable")
    }

    const handleMouseDown = () => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e) => {
        const maxWidth = 480;
        const minWidth = 100;
    
        if (dashboardContainer.current && newPageContainer.current) {
          const newWidth = e.clientX - dashboardContainer.current.getBoundingClientRect().left;
          if (newWidth > minWidth && newWidth < maxWidth) {
            dashboardContainer.current.style.width = newWidth + 'px';
            newPageContainer.current.style.width = newWidth + 'px';
          }
        }
      };

    const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    useEffect(() => {
        const updateNewPageWidth = () => {
            if (dashboardContainer.current && newPageContainer.current) {
                const dashboardWidth = dashboardContainer.current.offsetWidth;
                newPageContainer.current.style.width = dashboardWidth + 'px';
            }
        };

        window.addEventListener('resize', updateNewPageWidth);
        updateNewPageWidth();

        return () => {
            window.removeEventListener('resize', updateNewPageWidth);
        };
    }, []);

    return (
        <div className="workspace-container">
          <div className="dashboard-container" ref={dashboardContainer}>
             <div className="dashboard-content">
                <div className="workspace-user">{firstLetter} User's Notion</div>

                <div className="dashboard-3buttons">
                    <button className="search" onClick={handleSearch}><FontAwesomeIcon icon={faSearch} /> Search</button>
                    <button className="search" onClick={handleSearch}><FontAwesomeIcon  icon={faClock} />  Updates</button>
                    <button className="search" onClick={handleSearch}><FontAwesomeIcon icon={faGear} /> Settings & Members</button>
                </div>

                <div className="pages-container">

                </div>

                <div className="dashboard-bottom4">
                    <button className="search"><FontAwesomeIcon icon={faUsers} />Create a teamspace</button>
                    <button className="search"><FontAwesomeIcon icon={faFolderOpen} />Templates</button>
                    <button className="search"><FontAwesomeIcon style={{paddingRight: 6}} icon={faArrowDown} />Import</button>
                    <button className="search"><FontAwesomeIcon style={{paddingRight: 3}} icon={faTrashCan} />Trash</button>
                </div>

                <div className="newpage-container" ref={newPageContainer}>
                    <button className="newpage-button"><FontAwesomeIcon style={{paddingRight: '8px'}} icon={faPlus} /> New page</button>
                </div>

             </div >
            <div className="resizer" onMouseDown={handleMouseDown}></div>
          </div>
        </div>
    );
}