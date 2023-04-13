import React, { useRef, useState, useEffect } from 'react';
import { faSearch, faClock, faGear, faUsers, faFolderOpen, faTrashCan, faPlus, faArrowUp, faArrowDown, faEllipsisH, faFile, faEdit } from '@fortawesome/free-solid-svg-icons';

import { useWorkspacesAPI } from '../../../context/WorkspacesContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch} from 'react-redux';
import {logout, authenticate} from '../../../store/session'
import { useNavigate } from 'react-router-dom';

export default function WorkSpaceDropDown({workspaces, currentWorkspace}) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {
        actionGetAllWorkspaces,
        actionEditWorkspace,
        actionDeleteWorkspace,
        actionCreateWorkspace,
        actionSetWorkspaceId,
        actionGetWorkPlaceById,
        workSpaceId,
        

    } = useWorkspacesAPI();

    const [editingWorkspaceId, setEditingWorkspaceId] = useState(null);
    const [editWorkName, setEditWorkName] = useState('');
    const [toggleWorkSpace, setToggleWorkSpace] = useState(false)
    const [showCreateWorkspaceForm, setShowCreateWorkspaceForm] = useState(false);
    const [workSpaceName, setWorkSpaceName] = useState('');
    const [errors, setErrors] = useState([])
    const [editErrors, setEditErrors] = useState([])

    const handleLogout = async () => {
        dispatch(logout()).then(() => {
            dispatch(authenticate());
        }).then(() => navigate('/'));
    };
    

    
    return (
        <div className="workspace-user" 
            onMouseEnter={() => setToggleWorkSpace(true)}
            onMouseLeave={() => setToggleWorkSpace(false)}
            >

        { (toggleWorkSpace) && (
            <div className="workspaces-dropdown-container">
                {Array.isArray(workspaces) && workspaces.map((ele, index) => (
                    <div
                    key={ele.id}
                    onClick={async () => {
                        await actionSetWorkspaceId(ele.id);
                        await actionGetWorkPlaceById(ele.id);
                      }}

                    className="workspaces-dropdown-menu"
                    >
                    {editingWorkspaceId === ele.id 
                    ? (
                        <form onSubmit={ async (e) => {
                            e.preventDefault();
                            if (editWorkName.trim() === '') {
                                await setEditErrors(['Workspace name cannot be empty']);
                            } else {
                                await setEditErrors([]);
                                await actionEditWorkspace(ele.id, editWorkName);
                                await setEditingWorkspaceId(null);
                                await setEditWorkName('');
                            }
                        }}>
                        <input
                            type="text"
                            value={editWorkName}
                            onChange={(e) => setEditWorkName(e.target.value)}
                        />
                        {editErrors.length > 0 && (
                                <div className="error-message">{editErrors.join(', ')}</div>
                        )}
                    </form>
                    ) 
                    : (
                    <span className="workspace-names">
                        {ele.name}
                        <span style={{ paddingRight: 10 }}>
                        <FontAwesomeIcon
                            icon={faEdit}
                            key={ele.id}
                            style={{ paddingRight: 5 }}
                            onClick={async (e) => {
                                if (editingWorkspaceId !== ele.id) {
                                    await setEditingWorkspaceId(ele.id);
                                    await setEditWorkName(ele.name);
                                    await actionGetAllWorkspaces();
                                }
                            }}
                        />

                        <FontAwesomeIcon icon={faTrashCan} 
                        key={ele.id}
                        onClick={async (e) => {
                            e.stopPropagation();
                            e.preventDefault()
                            await actionDeleteWorkspace(ele.id);
                            await actionGetAllWorkspaces();
                            const firstWorkspace = workspaces[0];
                            await actionSetWorkspaceId(firstWorkspace.id);
                        }}
                        />
                        </span>
                    </span>
                    )}
                </div>
                ))}
                    <div 
                    onClick={() => setShowCreateWorkspaceForm(!showCreateWorkspaceForm)} 
                    className="create-work"
                    
                    >
                    Create Work Space
                    </div>
                    {showCreateWorkspaceForm && (
                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();
                                if (workSpaceName.trim() === '') {
                                    setErrors(['Workspace name cannot be empty']);
                                } else {
                                    setErrors([]);
                                    await actionCreateWorkspace(workSpaceName);
                                    await setShowCreateWorkspaceForm(false);
                                    await actionGetAllWorkspaces();
                                }
                            }}>
                                
                            <input
                            className="workspace-input"
                            type="text"
                            value={workSpaceName}
                            onChange={async (e) => {setWorkSpaceName(e.target.value)}}
                            placeholder="Enter workspace name"
                            />
                            
                            {errors.length > 0 && (
                                <div className="error-message">{errors.join(', ')}</div>
                            )}

                            <button 
                            className="workspace-create" 
                            type="submit"
                            
                            >
                                Create
                            </button>
                        </form>
                        )}
                    <div onClick={handleLogout} className="workspace-logout">Log out</div>
                </div>
            )}
                
                {currentWorkspace?.name ? currentWorkspace.name : "My Workspace"}

                <span>
                    <button>
                    <FontAwesomeIcon icon={faArrowUp} />
                    </button>
                    <button>
                    <FontAwesomeIcon icon={faArrowDown} />
                    </button>
                </span>
                </div>
    )
}
