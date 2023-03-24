import React, { useRef, useState, useEffect } from 'react';
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
import { useWorkspacesAPI } from '../../context/Workspaces';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {logout} from '../../store/session'
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../../store/session';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import BlankPage from '../ContentBlocks/BlankPage';


export default function WorkSpaces() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {currentWork, workspacePage, specificWorkPlace, deleteWorkSpace, createWorkSpace, editWorkSpace, workplaceId, fetchAllWorkSpaces,
        fetchAllPagesbyWorkPlaceId, setWorkPlaceId, selectWork, setSelectWork, fetchWorkSpaceById } = useWorkspacesAPI()

    const [editingWorkspaceId, setEditingWorkspaceId] = useState(null);
    const [editingWorkspaceName, setEditingWorkspaceName] = useState('');
    const [toggleWorkSpace, setToggleWorkSpace] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [visiblePage, setVisiblePage] = useState(false)
    const [showCreateWorkspaceForm, setShowCreateWorkspaceForm] = useState(false);
    const [newWorkspaceName, setNewWorkspaceName] = useState('');
    

    const dashboardContainer = useRef(null);
    const newPageContainer = useRef(null);
    const userContainer = useRef(null)
    


    const handleSearch = () => {
        alert("Feature is currently unavailable")
    }

    useEffect(() => {
    const fetchData = async () => {
        await dispatch(authenticate())
        await fetchAllWorkSpaces();
        await fetchWorkSpaceById(workplaceId)
        await fetchAllPagesbyWorkPlaceId(workplaceId);
        
        setIsLoading(false);
        };
        fetchData()
    }, [workplaceId, dispatch])
    

    const handleLogout = async () => {
        dispatch(logout())
          .then(() => {
            dispatch(authenticate());
          })
          .then(() => navigate("/"));
    }

    const handleWorkSpaceChange = (e) => {
        setEditingWorkspaceName(e.target.value);
    };

    const handleWorkspaceSubmit = (e, id) => {
        e.preventDefault();
        editWorkSpace(id, editingWorkspaceName);
        setEditingWorkspaceId(null);
        setEditingWorkspaceName('')
    };

    const handleDeleteWorkSpace = async (e, id) => {
        e.preventDefault();
        await deleteWorkSpace(id);
        await fetchAllWorkSpaces();
        const firstWorkspace = currentWork[0];
        setWorkPlaceId(firstWorkspace.workspace_id);
    };

    const cipher = {
        header: "h1",
        text: "p",
        code: "p"
    }

    
    return (
    <>
        <div className="workspace-container"> 
        {isLoading ? (
            <h1 style={{display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}>Loading...</h1>
            ) : (
            <div className="dashboard-container" ref={dashboardContainer}>
                <div className="dashboard-content">
                    <div className="workspace-user" 
                    onMouseEnter={() => setToggleWorkSpace(true)}
                    onMouseLeave={() => setToggleWorkSpace(false)}
                    ref={userContainer}
                    >

                    {toggleWorkSpace && (
                    <div className="workspaces-dropdown-container">
                        {currentWork.map((ele, index) => (
                            <div
                            key={index+10}
                            onClick={() => setWorkPlaceId(ele.workspace_id)}
                            className="workspaces-dropdown-menu"
                            >

                            {editingWorkspaceId === ele.workspace_id ? (
                               <form onSubmit={(e) => handleWorkspaceSubmit(e, ele.workspace_id)}>
                               <input
                                   type="text"
                                   value={editingWorkspaceName}
                                   onChange={(e) => handleWorkSpaceChange(e)}
                                   onBlur={() => setEditingWorkspaceId(null)}
                               />
                           </form>

                            ) : (
                            <span className="workspace-names">
                                {ele.name}
                                <span style={{ paddingRight: 10 }}>
                                <FontAwesomeIcon
                                    icon={faEdit}
                                    key={ele.workspace_id}
                                    style={{ paddingRight: 5 }}
                                    onClick={(event) => {
                                    event.stopPropagation()
                                    setEditingWorkspaceId(ele.workspace_id)
                                    setEditingWorkspaceName(ele.name)
                                    }}
                                />
                                <FontAwesomeIcon icon={faTrashCan} 
                                key={ele.workspace_id}
                                onClick={(event) => {
                                    event.stopPropagation();
                                    handleDeleteWorkSpace(event, ele.workspace_id);
                                }}
                                />

                                </span>
                            </span>
                            )}
                        </div>
                        ))}
                            <div onClick={() => setShowCreateWorkspaceForm(!showCreateWorkspaceForm)} className="create-work">Create Work Space</div>
                            {showCreateWorkspaceForm && (
                                <form
                                    onSubmit={(e) => {
                                    e.preventDefault();
                                    createWorkSpace(newWorkspaceName);
                                    setNewWorkspaceName('');
                                    setShowCreateWorkspaceForm(false);
                                    }}>

                                    <input
                                    className="workspace-input"
                                    type="text"
                                    value={newWorkspaceName}
                                    onChange={(e) => setNewWorkspaceName(e.target.value)}
                                    placeholder="Enter workspace name"
                                    />

                                    <button className="workspace-create" type="submit">Create</button>
                                </form>
                                )}
                            <div onClick={handleLogout} className="workspace-logout">Log out</div>
                        </div>
                    )}
                        
                        {specificWorkPlace.name}
                        <span>
                            <button>
                            <FontAwesomeIcon icon={faArrowUp} />
                            </button>
                            <button>
                            <FontAwesomeIcon icon={faArrowDown} />
                            </button>
                        </span>
                     </div>

                        
                    
                    <div className="dashboard-3buttons">
                        <button className="search" onClick={handleSearch}><FontAwesomeIcon icon={faSearch} /> Search</button>
                        <button className="search" onClick={handleSearch}><FontAwesomeIcon  icon={faClock} />  Updates</button>
                        <button className="search" onClick={handleSearch}><FontAwesomeIcon icon={faGear} /> Settings & Members</button>
                    </div>

                    <div className="pages-container"
                    onMouseEnter={() => setVisiblePage(true)}
                    onMouseLeave={() => setVisiblePage(false)}
                    >
                        {workspacePage.map((ele, index) => (
                            <div className="page-element"        
                            ><span><FontAwesomeIcon style={{paddingRight: 5}} icon={faFile} /> {ele.name} </span>  <span className={visiblePage ? '' : "hidden"}><FontAwesomeIcon icon={faEllipsisH}/> <FontAwesomeIcon icon={faPlus}/></span></div>
                        ))}
                        <div className='add-page'><FontAwesomeIcon icon={faPlus} /> Add a Page</div>
                    </div>

                    <div className="dashboard-bottom4">
                        <button className="search" onClick={handleSearch}><FontAwesomeIcon icon={faUsers} />Create a teamspace</button>
                        <button className="search" onClick={handleSearch}><FontAwesomeIcon icon={faFolderOpen} />Templates</button>
                        <button className="search" onClick={handleSearch}><FontAwesomeIcon style={{paddingRight: 6}} icon={faArrowDown} />Import</button>
                        <button className="search" onClick={handleSearch}><FontAwesomeIcon style={{paddingRight: 3}} icon={faTrashCan} />Trash</button>
                    </div>

                    <div className="newpage-container" ref={newPageContainer}>
                        <button className="newpage-button"><FontAwesomeIcon style={{paddingRight: '8px'}} icon={faPlus} /> New page</button>
                    </div>

                </div >
                
            </div>
            )}

        <div className="page-container">
            <BlankPage/>
            
        </div>
    </div>

        
    </>
    );
}