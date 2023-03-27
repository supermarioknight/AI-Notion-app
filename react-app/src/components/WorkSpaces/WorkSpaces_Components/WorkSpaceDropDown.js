import React, { useRef, useState, useEffect } from 'react';
import { faSearch, faClock, faGear, faUsers, faFolderOpen, faTrashCan, faPlus, faArrowUp, faArrowDown, faEllipsisH, faFile, faEdit } from '@fortawesome/free-solid-svg-icons';

import { useWorkspacesAPI } from '../../../context/Workspaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch} from 'react-redux';
import {logout, authenticate} from '../../../store/session'
import { useNavigate } from 'react-router-dom';

export default function WorkSpaceDropDown() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {
        workspaces,
        selectedWorkspace,
        createWorkspace,
        editWorkspace,
        deleteWorkSpace,
        fetchAllWorkSpaces,
        fetchWorkspaceById,
        fetchAllPagesbyWorkPlaceId,
        setSelectWork,
        selectWork,
        pages,
        workplacePage
        
    } = useWorkspacesAPI();

    const [editingWorkspaceId, setEditingWorkspaceId] = useState(null);
    const [editingWorkspaceName, setEditingWorkspaceName] = useState('');
    const [toggleWorkSpace, setToggleWorkSpace] = useState(false)
    const [showCreateWorkspaceForm, setShowCreateWorkspaceForm] = useState(false);
    const [newWorkspaceName, setNewWorkspaceName] = useState('');

    const handleLogout = async () => {
        dispatch(logout()).then(() => {
            dispatch(authenticate());
        }).then(() => navigate('/'));
    };

    const handleWorkSpaceChange = (e) => {
    setEditingWorkspaceName(e.target.value);
    };

    const handleWorkspaceSubmit = (e, workspace) => {
        e.preventDefault();
                
        editWorkspace(workspace.id, editingWorkspaceName);
        setEditingWorkspaceId(null);
        setEditingWorkspaceName('');
        // update selectWork state if the selected workspace is being edited
        if (selectedWorkspace.id === workspace.id) {
            setSelectWork({ ...selectedWorkspace, name: editingWorkspaceName });
        }
    };

    const handleDeleteWorkSpace = async (e, id) => {
    e.preventDefault();
    await deleteWorkSpace(id);
    await fetchAllWorkSpaces();
    const firstWorkspace = workspaces[0];
    setSelectWork(firstWorkspace.id);
    };

    const handleEditWorkspaceClick = (event, workspace) => {
        event.stopPropagation();
        setEditingWorkspaceId(workspace.id);
        setEditingWorkspaceName(workspace.name);
    };
    
    
    return (
        <div className="workspace-user" 
            onMouseEnter={() => setToggleWorkSpace(true)}
            onMouseLeave={() => setToggleWorkSpace(false)}
            >

            {toggleWorkSpace && (
            <div className="workspaces-dropdown-container">
                {workspaces.map((ele, index) => (
                    
                    <div
                    key={index+10}
                    onClick={async () => {
                        setSelectWork(ele);
                        await workplacePage(ele.id);
                      }}

                    className="workspaces-dropdown-menu"
                    >
                    {editingWorkspaceId === ele.id ? (
                        <form onSubmit={(e) => handleWorkspaceSubmit(e, ele)}>
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
                            onClick={(event) => handleEditWorkspaceClick(event, ele)}
                        />
                        <FontAwesomeIcon icon={faTrashCan} 
                        key={ele.workspace_id}
                        onClick={(event) => {
                            event.stopPropagation();
                            handleDeleteWorkSpace(event, ele.id);
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
                            createWorkspace(newWorkspaceName);
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
                
                {selectWork?.name ? selectWork.name : "Personal"} 
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
