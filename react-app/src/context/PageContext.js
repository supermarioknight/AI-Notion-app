import React, { useReducer, useContext, createContext } from "react";

export const PageContext = createContext()
export const usePagesAPI = () => useContext(PageContext)

const initialState = {
    pages: [],
    currentPageId: null,
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

        case "UPDATE_PAGE_SUMMARY":
          if (!Array.isArray(action.payload)) {
            return state;
          }
          return { ...state, pages: [...state.pages, ...action.payload]}

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

    const actionSummarizePage = async (pageId, name, content) => {
      const response = await fetch(`/api/pages/${pageId}/summarize`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          content,
        }),
      });
      const data = await response.json();
      
    
      // Update the page content on the server with the summarized content
      // by calling the actionUpdatePage function
      if (data && data.summary) {
        const summaryPlainText = data.summary;
      
        // Append the summary to the existing content in HTML format
        const newContent = `${content}<br><br><strong>Summary:</strong><br>${summaryPlainText}`;
      
        // Update the original page with the new content
        await actionUpdatePage(pageId, name, newContent);
      }
    };


    const actionTablePage = async(pageId, name, content) => {
      const response = await fetch(`/api/pages/${pageId}/table`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          content,
        }),
      });
      const data = await response.json()

      if (data && data.table) {
        const table = data.table

        const newContent = `${content}<br><br><strong>I'm a Idiot:</strong><br>${table}`;

        await actionUpdatePage(pageId, name, newContent)
      }
    }

    const actionCodePage = async(pageId, name, content, code) => {
      const response = await fetch(`/api/pages/${pageId}/code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          content,
          code
        }),
      });
      const data = await response.json()

      if (data && data.code) {
        const code = data.code

        const newContent = `${content}<br><br><strong>Code:</strong><br><pre>${code}</pre>`;

        await actionUpdatePage(pageId, name, newContent)
      }
    }

    const actionStoryPage = async(pageId, name, content, topic) => {
      const response = await fetch(`/api/pages/${pageId}/storytime`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          content,
          topic
        }),
      });
      const data = await response.json()

      if (data && data.story) {
        const story = data.story

        const newContent = `<strong>Story-Time:</strong><br>${story}`;

        await actionUpdatePage(pageId, name, newContent)
      }
    }


    const actionJournalPage = async(pageId, name, content, topic) => {
      const response = await fetch(`/api/pages/${pageId}/journal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          content,
          topic
        }),
      });
      const data = await response.json()

      if (data && data.journal) {
        const journal = data.journal

        const newContent = `${content}<br><strong>Journal-Prompt:</strong><br>${journal}`;

        await actionUpdatePage(pageId, name, newContent)
      }
    }

    const actionTranslatePage = async(pageId, name, content, language) => {
      const response = await fetch(`/api/pages/${pageId}/translate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          content,
          language
        }),
      });
      const data = await response.json()

      if (data && data.translate) {
        const translate = data.translate

        const newContent = `${content}<br><strong>Translation:</strong><br>${translate}`;

        await actionUpdatePage(pageId, name, newContent)
      }
    }

    const actionCoverPage = async(pageId, name, content, topic) => {
      const response = await fetch(`/api/pages/${pageId}/cover`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          content,
          topic
        }),
      });
      const data = await response.json()

      if (data && data.cover) {
        const cover = data.cover

        const newContent = `<strong>Cover Letter:</strong><br>${cover}`;

        await actionUpdatePage(pageId, name, newContent)
      }
    }

    const actionOutlinePage = async(pageId, name, content) => {
      const response = await fetch(`/api/pages/${pageId}/outline`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          content,
        }),
      });
      const data = await response.json()

      if (data && data.outline) {
        const outline = data.outline

        const newContent = `${content}<br><strong>Outline:</strong><br>${outline}`;

        await actionUpdatePage(pageId, name, newContent)
      }
    }

    const actionAnalyzePage = async(pageId, name, content) => {
      const response = await fetch(`/api/pages/${pageId}/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          content,
        }),
      });
      const data = await response.json()

      if (data && data.analyze) {
        const analyze = data.analyze

        const newContent = `${content}<br><strong>Analysis:</strong><br>${analyze}`;

        await actionUpdatePage(pageId, name, newContent)
      }
    }

    const actionSmartPage = async(pageId, name, content) => {
      const response = await fetch(`/api/pages/${pageId}/smart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          content,
        }),
      });
      const data = await response.json()

      if (data && data.smart) {
        const smart = data.smart

        const newContent = `${content}<br><strong>Sound Smart:</strong><br>${smart}`;

        await actionUpdatePage(pageId, name, newContent)
      }
    }

    const actionBlogPage = async(pageId, name, content, topic) => {
      const response = await fetch(`/api/pages/${pageId}/blog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          content,
          topic
        }),
      });
      const data = await response.json()

      if (data && data.blog) {
        const blog = data.blog

        const newContent = `${content}<br><strong>Blog:</strong><br>${blog}`;

        await actionUpdatePage(pageId, name, newContent)
      }
    }

    const actionHumblePage = async(pageId, name, content) => {
      const response = await fetch(`/api/pages/${pageId}/humble`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          content,
        }),
      });
      const data = await response.json()

      if (data && data.humble) {
        const humble = data.humble

        const newContent = `${content}<br><strong>Humble Me:</strong><br>${humble}`;

        await actionUpdatePage(pageId, name, newContent)
      }
    }

    const actionThankYou = async(pageId, name, content, topic) => {
      const response = await fetch(`/api/pages/${pageId}/thank`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          content,
          topic
        }),
      });
      const data = await response.json()

      if (data && data.all3) {
        const all3 = data.all3

        const newContent = `${content}<br><strong>All 3:</strong><br>${all3}`;

        await actionUpdatePage(pageId, name, newContent)
      }
    }


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

    const actionCreatePage = async (workspaceId, name = "Untitled", content = "") => {
      const response = await fetch(`/api/pages/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          workspace_id: workspaceId,
          name,
          content,
        }),
      });
      const data = await response.json();
      dispatch({ type: "CREATE_PAGE", payload: data });
      return data
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
          currentPageContent: state.currentPageContent,
          actionSummarizePage,
          actionTablePage,
          actionCodePage,
          actionStoryPage,
          actionJournalPage,
          actionTranslatePage,
          actionCoverPage,
          actionOutlinePage,
          actionAnalyzePage,
          actionSmartPage,
          actionBlogPage,
          actionHumblePage,
          actionThankYou
        }}
      >
        {children}
      </PageContext.Provider>
    );
}