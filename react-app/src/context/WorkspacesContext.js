import React, { useReducer, useState, useContext, createContext, useEffect } from "react";

export const WorkspacesContext = createContext()
export const useWorkspacesAPI = () => useContext(WorkspacesContext)

const initialState = {
  workSpaceId: 1,
  workspaces: [],
  currentWorkspace: []
}

const workspacesReducer = (state, action) => {
  switch (action.type) {
    case "GET_ALL_WORKSPACES": 
      return {...state, workspaces: action.payload}
    case "GET_WORKSPACE_ID":
      return {...state, workSpaceId: action.payload}

    case "GET_WORKSPACE_BY_ID":
      return {...state, currentWorkspace: action.payload}

    case "CREATE_WORKSPACE":
      return {...state, workspaces: [...state.workspaces, action.payload]}
      case "EDIT_WORKSPACE":
        return {
          ...state,
          workspaces: state.workspaces.map((workspace) =>
            workspace.id === action.payload.id ? action.payload : workspace
          ),
          workSpaceId:
            state.workSpaceId && state.selectedWorkspace && state.selectedWorkspace.id === action.payload.id
              ? action.payload
              : state.workSpaceId,
        };
    case "DELETE_WORKSPACE":
      return {...state, workspaces: state.workspaces.filter((workspace) => workspace.id !== action.payload)}

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}


export default function WorkspacesProvider({ children }) {
  const [state, dispatch] = useReducer(workspacesReducer, initialState);

  const actionSetWorkspaceId = (id) => {
    dispatch({ type: "GET_WORKSPACE_ID", payload: id });
  };

  const actionGetWorkPlaceById = async (id) => {
    const response = await fetch(`/api/workspaces/${id}`);
    const data = await response.json();
    dispatch({ type: "GET_WORKSPACE_BY_ID", payload: data });
  }

  const actionGetAllWorkspaces = async () => {
    const response = await fetch("/api/workspaces/");
    const data = await response.json()
    dispatch({ type: "GET_ALL_WORKSPACES", payload: data });
  };


  const actionCreateWorkspace = async (name) => {
    const response = await fetch(`/api/workspaces/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    const data = await response.json()

    dispatch({ type: "CREATE_WORKSPACE", payload: data });
  };

  const actionEditWorkspace = async (id, name) => {
    const response = await fetch(`/api/workspaces/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    const data = await response.json()
    dispatch({ type: "EDIT_WORKSPACE", payload: data });
  };

  
  const actionDeleteWorkspace = async (id) => {
    await fetch(`/api/workspaces/${id}`, { method: "DELETE" });
    dispatch({ type: "DELETE_WORKSPACE", payload: id });
  };



  return (
    <WorkspacesContext.Provider
      value={{
        actionGetAllWorkspaces,
        actionEditWorkspace,
        actionDeleteWorkspace,
        actionCreateWorkspace,
        actionSetWorkspaceId,
        actionGetWorkPlaceById,
        
        workSpaceId: state.workSpaceId,
        workspaces: state.workspaces,
        currentWorkspace: state.currentWorkspace
      }}
    >
      {children}
    </WorkspacesContext.Provider>
  );
}