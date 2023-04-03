import React, { useReducer, useContext, createContext } from "react";

export const PageContext = createContext()
export const usePagesAPI = () => useContext(PageContext)

const initialState = {
    pages: [],
    currentPageId: 1,
    currentPageContent: []
  };

const pageReducer = (state, action) => {
    switch (action.type) {
        case 'GET_CURRENT_PAGE':
          return { ...state, currentPageId: action.payload };

        case 'GET_ALL_PAGES_WORKSPACE':
          return {...state, pages: action.payload}
        
        case 'GET_CURRENT_PAGE_CONTENT':
          return {...state, currentPageContent: [...state.currentPageContent, action.payload]}
        
        case "UPDATE_PAGE":
          if (!Array.isArray(action.payload)) {
            return state;
          }
          return { ...state, pages: [...state.pages, ...action.payload] };

        case "DELETE_PAGE":
          return {
            ...state,
            pages: Array.isArray(state.pages) ? state.pages.filter(page => page._id !== action.payload) : [],
          };

        case "CREATE_PAGE":
            if (!Array.isArray(action.payload)) {
              return state;
            }
            return { ...state, pages: [...state.pages, ...action.payload] };
        
        case "UPDATE_PAGE_CONTENT": 
          return {...state, currentPageContent: action.payload}
        default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
};



export default function PageProvider({ children }) {
    const [state, dispatch] = useReducer(pageReducer, initialState);

    const actionSetCurrentPage = id => {
      dispatch({ type: 'GET_CURRENT_PAGE', payload: id });
    };

    const actionGetCurrentPageContent = async (pageId) => {
      const response = await fetch(`/api/pages/${pageId}`);
      const data = await response.json();

      dispatch({ type: "GET_CURRENT_PAGE_CONTENT", payload: data })
    }

    const actionGetAllPagesWorkSpace = async (workspaceId) => {
      const response = await fetch(`/api/workspaces/${workspaceId}/pages`);
      const data = await response.json();
      dispatch({ type: "GET_ALL_PAGES_WORKSPACE", payload: data });
    };

    const actionDeletePage = async (id) => {
      await fetch(`/api/pages/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
      dispatch({type: "DELETE_PAGE", payload: id})
    }

    const actionUpdatePage = async (id, name, content = []) => {
      const response = await fetch(`/api/pages/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          content
        }),
      });
      const data = await response.json();

      dispatch({ type: "UPDATE_PAGE", payload: data });
    }


    const actionCreatePage = async (workspaceId) => {
      const response = await fetch(`/api/pages/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          workspace_id: workspaceId,
          name: "Untitled",
        }),
      });
      const data = await response.json();
      dispatch({ type: "CREATE_PAGE", payload: data });
    };

  
return (
      <PageContext.Provider
        value={{
          actionSetCurrentPage,
          actionDeletePage,
          actionCreatePage,
          actionGetAllPagesWorkSpace,
          actionGetCurrentPageContent,
          actionUpdatePage,
          pages: state.pages,
          currentPageId: state.currentPageId,
          currentPageContent: state.currentPageContent
          // Expose the state and action creators here
        }}
      >
        {children}
      </PageContext.Provider>
    );
}