import React, { useReducer, useState, useContext, createContext, useEffect } from "react";

export const WorkspacesContext = createContext()
export const useWorkspacesAPI = () => useContext(WorkspacesContext)

const initialState = {
  workspaces: [],
  selectedWorkspace: null,
  workspacePages: [],
  pages: []
}

const workspacesReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKSPACES": 
      return {...state, workspaces: action.payload}
    case "SET_SELECTED_WORKSPACE":
      return {...state, selectedWorkspace: action.payload}
    case "CREATE_WORKSPACE":
      return {...state, workspaces: [...state.workspaces, action.payload]}
    case "EDIT_WORKSPACE":
      return {...state, workspaces: state.workspaces.map((workspace) => workspace.id === action.payload.id ? action.payload : workspace),
        selectedWorkspace: state.selectedWorkspace && state.selectedWorkspace.id === action.payload.id ? action.payload : state.selectedWorkspace
      }
    case "DELETE_WORKSPACE":
      return {...state, workspaces: state.workspaces.filter((workspace) => workspace.id !== action.payload)}
    case "SET_WORKSPACE_PAGES":
      return {...state, workspacePages: action.payload}
    case "SET_TEST":
      return {...state, pages: action.payload }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}



async function fetchData(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  }
  return await response.json();
}

export default function WorkspacesProvider({ children }) {
  const [state, dispatch] = useReducer(workspacesReducer, initialState);
  const [selectWork, setSelectWork] = useState("");

  useEffect(() => {
    if (state.workspaces.length > 0 && !state.selectedWorkspace) {

      const defaultWorkspaceId = state.workspaces[0].id;
      dispatch({ type: "SET_SELECTED_WORKSPACE", payload: defaultWorkspaceId });
    }
  }, [state.workspaces, state.selectedWorkspace]);


  const selectWorkspace = (workspace) => {
    dispatch({ type: "SET_SELECTED_WORKSPACE", payload: workspace });
    setSelectWork(workspace.name);
  };


  const fetchAllWorkSpaces = async () => {
    const workspaces = await fetchData("/api/workspaces/");
    const firstWorkspace = workspaces[0]; // get the first workspace
    dispatch({ type: "SET_WORKSPACES", payload: workspaces });
    dispatch({ type: "SET_SELECTED_WORKSPACE", payload: firstWorkspace });
  };


  const fetchWorkspaceById = async (id) => {
    const workspace = await fetchData(`/api/workspaces/${id}`);
    dispatch({ type: "SET_SELECTED_WORKSPACE", payload: workspace });
  };


  const createWorkspace = async (name) => {
    const newWorkspace = await fetchData(`/api/workspaces/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    dispatch({ type: "CREATE_WORKSPACE", payload: newWorkspace });
  };


  const editWorkspace = async (id, name) => {
    const updatedWorkspace = await fetchData(`/api/workspaces/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    dispatch({ type: "EDIT_WORKSPACE", payload: updatedWorkspace });
  };

  
  const deleteWorkSpace = async (id) => {
    await fetchData(`/api/workspaces/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: "DELETE_WORKSPACE", payload: id });
  };

  const fetchAllPagesbyWorkPlaceId = async (id) => {
    const data = await fetchData(`/api/pages/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: "SET_WORKSPACE_PAGES", payload: data });
  };

  const workplacePage = async (id) => {
    const data = await fetchData(`/api/workspaces/${id}/pages`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    dispatch({type: "SET_TEST", payload: data})
  }

  return (
    <WorkspacesContext.Provider
      value={{
        workspaces: state.workspaces,
        selectedWorkspace: state.selectedWorkspace,
        workspacePages: state.workspacePages,
        pages: state.pages,
        selectWorkspace,
        fetchAllWorkSpaces,
        fetchWorkspaceById,
        createWorkspace,
        editWorkspace,
        deleteWorkSpace,
        fetchAllPagesbyWorkPlaceId,
        selectWork,
        setSelectWork,
        workplacePage
      }}
    >
      {children}
    </WorkspacesContext.Provider>
  );
}