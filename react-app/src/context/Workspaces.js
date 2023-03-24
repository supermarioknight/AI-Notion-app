import React, { useReducer, useState, useContext, createContext, useEffect }  from 'react'

export const WorkspacesContext = createContext()
export const useWorkspacesAPI = () => useContext(WorkspacesContext)

const initialState = {
  currentWork: [],
  workspacePage: [],
  workplaceId: 1,
  specificWorkPlace: []
}

const workspacesReducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENTWORKSPACE_ID": 
      return {...state, currentWork: action.payload}
    case "SET_SPECIFIC_WORKPLACE":
      return {...state, specificWorkPlace: action.payload}
    case "SET_WORKSPACE_PAGES":
      return {...state, workspacePage: action.payload}
    case "CREATE_WORKSPACE":
      return {...state, currentWork: [...state.currentWork, action.payload]}
    case "SET_WORKPLACE_ID":
      return {...state, workplaceId: action.payload}
    case "EDIT_WORKSPACE":
      return {...state, currentWork: state.currentWork.map((workspace) => workspace.workspace_id === action.payload.workspace_id ? action.payload : workspace),
        specificWorkPlace: state.specificWorkPlace.workspace_id === action.payload.workspace_id ? action.payload : state.specificWorkPlace
      }
    case "DELETE_WORKSPACE":
      return {...state, currentWork: state.currentWork.filter((workspace) => workspace.id !== action.payload)}
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}


export default function WorkspacesProvider({children}) {
  const [state, dispatch] = useReducer(workspacesReducer, initialState)
  const [selectWork, setSelectWork] = useState("");

  const setWorkPlaceId = (id) => {
    dispatch({ type: "SET_WORKPLACE_ID", payload: id });
    const selectedWorkspace = state.currentWork.find(workspace => workspace.id === id);
    if (selectedWorkspace) {
      setSelectWork(selectedWorkspace.nameA);
    }
  };

  //* All Workspaces of a User
  const fetchAllWorkSpaces = async () => {
    const url = `/api/workspaces/`
    const response = await fetch(url)
    const json = await response.json()
    dispatch({type: "SET_CURRENTWORKSPACE_ID", payload: json})
  }

  //* Workspaces by workspace id 
  const fetchWorkSpaceById = async (id) => {
    const response = await fetch(`/api/workspaces/${id}`)
    const json = await response.json()
    dispatch({type: "SET_SPECIFIC_WORKPLACE", payload: json})
  }


  //* Create a Workspace
  const createWorkSpace = async (name) => {
    const response = await fetch(`/api/workspaces/`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name}),
    })

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`)
    }
    const newWorkspace = await response.json()
    dispatch({type: "CREATE_WORKSPACE", payload: newWorkspace})
  }

  //* Edit a Workspace
  const editWorkSpace = async (workspace_id, name) => {
    const response = await fetch(`/api/workspaces/${workspace_id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name}),
    })

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`)
    }
    const updatedWorkspace = await response.json()
    dispatch({type: "EDIT_WORKSPACE", payload: updatedWorkspace})
  }

  //* Delete a Workspace
  const deleteWorkSpace = async (id) => {
    const response = await fetch(`/api/workspaces/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`)
    }
    dispatch({ type: "DELETE_WORKSPACE", payload: id})
  }


  //* All pages of a user by Workplace Id
  const fetchAllPagesbyWorkPlaceId = async (id) => {
    try {
      const response = await fetch(`/api/pages/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
  
      const data = await response.json();
      dispatch({type: "SET_WORKSPACE_PAGES", payload: data})
    } catch (error) {
      console.error('Error fetching pages:', error);
    }
  }


  return (
    <WorkspacesContext.Provider
      value={{
        fetchAllWorkSpaces,
        fetchAllPagesbyWorkPlaceId,
        ...state,
        deleteWorkSpace,
        createWorkSpace,
        editWorkSpace,
        setWorkPlaceId,
        fetchWorkSpaceById,
        selectWork,
        setSelectWork,
        fetchWorkSpaceById
      }}
    >
      {children}
    </WorkspacesContext.Provider>
  )
}
