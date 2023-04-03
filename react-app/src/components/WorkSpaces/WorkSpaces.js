import React, { useRef, useState, useEffect } from 'react';
import './WorkSpaces.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faClock, faGear, faUsers, faFolderOpen, faTrashCan, faPlus, faArrowUp, faArrowDown, faEllipsisH, faFile, faEdit } from '@fortawesome/free-solid-svg-icons';
import { useDispatch} from 'react-redux';
import {logout, authenticate} from '../../store/session'
import { useNavigate } from 'react-router-dom';


import { useWorkspacesAPI } from '../../context/WorkspacesContext';
import { usePagesAPI } from '../../context/PageContext';

import WorkSpaceDropDown from './WorkSpaces_Components/WorkSpaceDropDown';
import Dashboard3Buttons from './WorkSpaces_Components/Dashboard3Buttons';
import PageEditor from '../ContentBlocks/PageEditor';
import Dashboard4Bottom from './WorkSpaces_Components/Dashboard4Bottom';


export default function WorkSpaces() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        actionGetAllWorkspaces,
        actionEditWorkSpace,
        actionDeleteWorkspace,
        actionCreateWorkspace,
        actionSetWorkspaceId,
        actionGetWorkPlaceById,
        workSpaceId,
        workspaces,
        currentWorkspace
      } = useWorkspacesAPI();

    const {
        actionSetCurrentPage,
        actionDeletePage,
        actionCreatePage,
        actionGetAllPagesWorkSpace,
        actionGetCurrentPageContent,
        actionUpdatePage,
        pages,
        currentPageId,
        currentPageContent
    } = usePagesAPI()



    const [isLoading, setIsLoading] = useState(true)
    const [visiblePage, setVisiblePage] = useState(false)
    const [editingPageId, setEditingPageId] = useState(null);
    const [pageName, setPageName] = useState('');

    useEffect(() => {
        const fetchData = async () => {
          await dispatch(authenticate());
        //   await actionGetCurrentPageContent(currentPageId)
          await actionGetAllWorkspaces()
          await actionGetWorkPlaceById(workSpaceId)
          await actionGetAllPagesWorkSpace(workSpaceId)
          setIsLoading(false);
        };
        fetchData();
    }, [workSpaceId, currentPageId, dispatch]);
    
    
    if (isLoading) {
        return (
        <h1 style={{display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}>
        Loading...
        </h1>
        )
    }
    
    if (!pages) return null
    

    // console.log(currentPageId, 'pageId')
    // console.log(workSpaceId, 'workspaceId')
    // console.log(pages, 'pages')
    // console.log(workspaces, 'workspaces')
    
    return (
    <>
    <div className="workspace-container"> 
        <div className="dashboard-container">
            <div className="dashboard-content">
                <WorkSpaceDropDown workspaces={workspaces}/>
                <Dashboard3Buttons/>

                <div className="pages-container"
                    onMouseEnter={() => setVisiblePage(true)}
                    onMouseLeave={() => setVisiblePage(false)}
                    >
                   {pages?.pages?.map((ele, index) => (
                        <div className="page-element" onClick={() => {
                            actionSetCurrentPage(ele.id)
                            setPageName(ele.name)
                        }}
                        >
                        {editingPageId === ele.id 
                        ? (
                            <form onSubmit={async (e) => {
                                e.preventDefault();
                                await actionUpdatePage(ele.id, pageName); 
                                await actionGetAllPagesWorkSpace(workSpaceId);
                                await setEditingPageId(null);
                                await setPageName('');
                            }}>
                            <input
                                value={pageName}
                                onChange={e => setPageName(e.target.value)}
                                placeholder={ele.name}
                                />
                            </form>
                        ) 
                        : (
                        <span>
                            <FontAwesomeIcon style={{ paddingRight: 5 }} icon={faFile} /> {ele.name}
                        </span>
                        )}

                       <span className={visiblePage ? "" : "hidden"}>
                            <FontAwesomeIcon
                                style={{ marginRight: '10px' }}
                                icon={faEdit}
                                onClick={() => setEditingPageId(ele.id)}
                            />
                            <FontAwesomeIcon onClick={async () => {
                                await actionSetCurrentPage(ele.id)
                                await actionDeletePage(Number(ele.id))
                                await actionGetAllPagesWorkSpace(ele.workspace_id)
                            }} icon={faTrashCan} />
                        </span>
                    </div>
                    ))}
        
                <div onClick={async () => {
                    await actionCreatePage(workSpaceId)
                    await actionGetAllPagesWorkSpace(workSpaceId)
                }} className='add-page'><FontAwesomeIcon icon={faPlus} /> Add a Page</div>
            </div>

                <Dashboard4Bottom/>
                <div className="newpage-container">
                    <button className="newpage-button"
                    onClick={async () => {
                        await actionCreatePage(Number(workSpaceId))
                        await actionGetAllPagesWorkSpace(workSpaceId)
                    }}
                    >
                    <FontAwesomeIcon style={{paddingRight: '8px'}} icon={faPlus} /> New page</button>
                </div>
            </div >
        </div>
            
        <div className="page-container">
            {<PageEditor pageName={pageName} pageId={currentPageId} />}
        </div>
    </div>        
</>
    );
}