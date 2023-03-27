import React, { useReducer, useState, useContext, createContext } from "react";

export const PageContext = createContext()
export const usePagesAPI = () => useContext(PageContext)

const initialState = {
    pages: [],
    selectedPage: 1,
    pageContent: []
  };

const pageReducer = (state, action) => {
    switch (action.type) {
        case "GET_PAGE_CONTENT":
          return {...state, pageContent: action.payload}
        case "DELETE_PAGE":
          return {...state, pages: state.pages.filter((page) => page.id !== action.payload)}
        case "UPDATE_PAGE":
          return {...state, pages: state.pages.map((page) => page.id === action.payload.id)}
        case "CREATE_PAGE":
          return{...state, pages: [...state.pages, action.payload]}  
        case "SET_SELECTED_PAGE":
          return {...state, selectedPage: action.payload };
        case "UPDATE_PAGE_CONTENT": 
          return {...state, pageContent: action.payload}
        default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
};

async function fetchData(url, options) {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    return await response.json();
  }
  


export default function PageProvider({ children }) {
    const [state, dispatch] = useReducer(pageReducer, initialState);

    const setSelectedPage = (page) => {
      dispatch({ type: "SET_SELECTED_PAGE", payload: page });
    };

    const getPageContent = async (id) => {
      const data = await fetchData(`/api/pages/${id}`); // No need to call response.json() again
      dispatch({type: "GET_PAGE_CONTENT", payload: data});
      
  }

    const deletePage = async (id) => {
      const response = await fetchData(`/api/pages/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
      dispatch({type: "DELETE_PAGE", payload: id})
    }

    const updatePage = async (id, name) => {
      const response = await fetchData(`/api/pages/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id, // Use 'id' instead of 'pageId'
          name: name,
        })
      });
      dispatch({type: "UPDATE_PAGE", payload: response})
    };

    const createPage = async (workspaceId, blocks = []) => {
        const response = await fetchData(`/api/pages/`, {
          method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              workspace_id: workspaceId,
              name: "New Page",
              blocks: blocks
            })
          });


        dispatch({ type: "CREATE_PAGE", payload: response });
              
    };

    const updatePageContent = async (id, content) => {
      const response = await fetchData(`/api/pages/${id}/pages/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          content: content
        })
      })
      dispatch({type: "UPDATE_PAGE_CONTENT", payload: content})
    } 

  
    // Define your action creators and async API calls here
  
return (
      <PageContext.Provider
        value={{
        getPageContent,
        deletePage,
        createPage,
        updatePage,
        allPages: state.pages,
        setSelectedPage, // Add setSelectedPage here
        selectedPage: state.selectedPage, // Expose selectedPage from state
        pageContent: state.pageContent,
        updatePageContent
          // Expose the state and action creators here
        }}
      >
        {children}
      </PageContext.Provider>
    );
}