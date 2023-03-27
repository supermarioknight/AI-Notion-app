import React, { useRef, useState, useEffect } from 'react';
import './WorkSpaces.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faClock, faGear, faUsers, faFolderOpen, faTrashCan, faPlus, faArrowUp, faArrowDown, faEllipsisH, faFile, faEdit } from '@fortawesome/free-solid-svg-icons';
import { useDispatch} from 'react-redux';
import {logout, authenticate} from '../../store/session'
import { useNavigate } from 'react-router-dom';
import GettingStarted from '../ContentBlocks/Getting Started';

import { useWorkspacesAPI } from '../../context/Workspaces';
import { usePagesAPI } from '../../context/PageContext';

import WorkSpaceDropDown from './WorkSpaces_Components/WorkSpaceDropDown';
import Dashboard3Buttons from './WorkSpaces_Components/Dashboard3Buttons';
import Page from './WorkSpaces_Components/Page';
import Dashboard4Bottom from './WorkSpaces_Components/Dashboard4Bottom';


export default function WorkSpaces() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    

    const {workspaces, selectedWorkspace, createWorkspace, editWorkspace, deleteWorkSpace, fetchAllWorkSpaces, 
        fetchWorkspaceById, fetchAllPagesbyWorkPlaceId, setSelectWork, selectWork, workspacePages, workplacePage, 
        pages
      } = useWorkspacesAPI();

    const {getPageContent, deletePage, createPage, updatePage, allPages, setSelectedPage, selectedPage} = usePagesAPI()
    const [isLoading, setIsLoading] = useState(true)
    const [visiblePage, setVisiblePage] = useState(false)
    const [editingPageId, setEditingPageId] = useState(null);
    const [newPageName, setNewPageName] = useState('');

    useEffect(() => {
        const fetchData = async () => {
          await dispatch(authenticate());
          await fetchAllWorkSpaces();
          await getPageContent(selectedPage)
          if (selectedWorkspace?.id) {
            await fetchWorkspaceById(selectedWorkspace?.id);
            await fetchAllPagesbyWorkPlaceId(selectedWorkspace?.id);
            await workplacePage(selectedWorkspace.id);
          }
          setIsLoading(false);
        };
        fetchData();
    }, [selectedWorkspace?.id, dispatch]);
    
    // const clickCreatePage = async () => {
    //     const newPage = await createPage(Number(selectedPage));
    //     await setSelectedPage(newPage.id);
    //     await workplacePage(selectedWorkspace.id)
    // }


    // const clickDeletePage = async () => {
    //     try {
    //       await deletePage(Number(selectedPage));
    //       await workplacePage(selectedWorkspace.id);
    //     } catch (error) {
    //       console.error(error); // or display an error message to the user
    //     }
    // }
    
    const handleSubmit = async (id, e) => {
        e.preventDefault();
        try {
            await updatePage(id, newPageName); // Pass the new page name as an argument
            await workplacePage(selectWork.id);
        } catch (error) {
            console.error(error);
        } finally {
            setEditingPageId(null);
            setNewPageName('');
        }
    };
    
    if (isLoading) {
        return (
        <h1 style={{display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}>
        Loading...
        </h1>
        )
    }
    console.log(selectWork)
    
    return (
    <>
    <div className="workspace-container"> 
        <div className="dashboard-container">
            <div className="dashboard-content">
                <WorkSpaceDropDown pages={pages}/>
                <Dashboard3Buttons/>

                <div className="pages-container"
                    onMouseEnter={() => setVisiblePage(true)}
                    onMouseLeave={() => setVisiblePage(false)}
                    >
                   {pages?.pages?.map((ele, index) => (
                    <div
                        className="page-element"
                        onClick={() => setSelectedPage(ele.id)}
                    >
                        {editingPageId === ele.id ? (
                             <form onSubmit={(e) => handleSubmit(ele.id, e)}>
                             <input
                                 value={newPageName}
                                 onChange={e => setNewPageName(e.target.value)}
                                 placeholder={ele.name}
                             />
                         </form>
                        ) : (
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
                                await setSelectedPage(ele.id)
                                await deletePage(Number(ele.id))
                                await workplacePage(selectedWorkspace.id)
                            }} icon={faTrashCan} />
                        </span>
                    </div>
                    ))}
            
                    <div onClick={async () => {

                        await createPage(Number(selectWork.id))
                        await workplacePage(selectWork.id)
                    }} className='add-page'><FontAwesomeIcon icon={faPlus} /> Add a Page</div>
                </div>

                
                <Dashboard4Bottom/>

                
                    
                <div className="newpage-container">
                    <button className="newpage-button"><FontAwesomeIcon style={{paddingRight: '8px'}} icon={faPlus} /> New page</button>
                </div>
            </div >
        </div>
            
        <div className="page-container">
            {selectedPage && <GettingStarted selectedPage={selectedPage} />}
            
        </div>
    </div>

        
</>
    );
}