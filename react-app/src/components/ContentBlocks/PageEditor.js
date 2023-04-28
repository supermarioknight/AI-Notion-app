import React, { useState, useEffect, useCallback, useRef } from 'react';
import './Templates.css';
import { useNavigate } from 'react-router-dom';

import ReactQuill from 'react-quill';
import { usePagesAPI } from '../../context/PageContext';



export default function PageEditor({pageName, pageId, workSpaceId }) {
  const [content, setContent] = useState('');
  const [loadingButton, setLoadingButton] = useState('');
  

  const gif = "https://media2.giphy.com/media/xTk9ZvMnbIiIew7IpW/giphy.gif?cid=ecf05e47zs6ebu5pie6eahdgvf3tsbnh68yvrxlvig6onq43&rid=giphy.gif&ct=g"

  const quillRef = useRef(null);
  const navigate = useNavigate()


  const {
    actionSummarizePage,
    actionGetAllPagesWorkSpace,
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
    actionThankYou,
    actionUpdatePage,
    actionCreatePage,
    currentPageId,
    currentPageContent
  } = usePagesAPI()

  const getHTML = (quillRef) => {
    return quillRef.current.getEditor().root.innerHTML;
  };
  
  

  const handleContentChange = useCallback(
    (value) => {
      setContent(value);
    },
    [pageId, pageName]
  );

  const handleSubmit = async () => {
    try {
      await fetch(`/api/pages/${pageId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: pageName,
          content: content,
        }),
      });
      await alert("You have successfully saved your Page")
    } catch (error) {
      console.error('Error updating page content:', error);
    }
  };

  useEffect(() => {
    getPageContent();
    
  }, [pageId]);

  const getPageContent = async () => {
    try {
      const response = await fetch(`/api/pages/${pageId}`);
      const data = await response.json();
      
      setContent(data.content);
    } catch (error) {
      console.error('Error getting page content:', error);
    }
  };

  const handleSummarize = async (event) => {
    event.preventDefault();
    const editorContent = getHTML(quillRef);
  
    setLoadingButton('summarize');
    await actionSummarizePage(pageId, pageName, editorContent);
    await getPageContent();
    setLoadingButton('');
  };

  const handleTable = async (event) => {
    event.preventDefault()
    const editorContent = getHTML(quillRef)

    setLoadingButton('idiot')
    await actionTablePage(pageId, pageName, editorContent)
    await getPageContent();
    setLoadingButton('')
  }

  const handleStoryTime = async (event) => {
    event.preventDefault()
    const topic = prompt("Enter a topic for your story")
    const editorContent = getHTML(quillRef)

    setLoadingButton('story')
    await actionStoryPage(pageId, pageName, editorContent, topic)
    await getPageContent();
    setLoadingButton('')
  }

  const handleCodeForMe = async (event) => {
    event.preventDefault()
    const editorContent = getHTML(quillRef)
    const codeQuestion = prompt("What would you like me to code for you?")

    setLoadingButton('code')
    await actionCodePage(pageId, pageName, editorContent, codeQuestion)
    await getPageContent();
    setLoadingButton('')
  }

  
  const handleJournal = async (event) => {
    event.preventDefault()
    const editorContent = getHTML(quillRef)
    const topic = prompt("Enter a topic for your story")

    setLoadingButton("journal")
    await actionJournalPage(pageId, pageName, editorContent, topic)
    await getPageContent();
    setLoadingButton('')
  }

  const handleHumble = async (event) => {
    event.preventDefault()
    const editorContent = getHTML(quillRef)

    setLoadingButton("humble")
    await actionHumblePage(pageId, pageName, editorContent)
    await getPageContent();
    setLoadingButton('')
  }

  const handleCover = async (event) => {
    event.preventDefault()
    const editorContent = getHTML(quillRef)
    const topic = prompt("Enter a company, position, and your current tech stack.")

    setLoadingButton("cover")
    await actionCoverPage(pageId, pageName, editorContent, topic)
    await getPageContent();
    setLoadingButton('')
  }

  const handleTranslate = async (event) => {
    event.preventDefault()
    const language = prompt("Enter the language you want the content to be translated into")
    const editorContent = getHTML(quillRef)

    setLoadingButton('translate')
    await actionTranslatePage(pageId, pageName, editorContent, language)
    await getPageContent();
    setLoadingButton('')
  }

  const handleSmart = async (event) => {
    event.preventDefault()
    const editorContent = getHTML(quillRef)

    setLoadingButton("smart")
    await actionSmartPage(pageId, pageName, editorContent)
    await getPageContent();
    setLoadingButton("")
  }

  const handleOutline = async (event) => {
    event.preventDefault()
    const editorContent = getHTML(quillRef)

    setLoadingButton("outline")
    await actionOutlinePage(pageId, pageName, editorContent)
    await getPageContent();
    setLoadingButton("")
  }

  const handleBlog = async (event) => {
    event.preventDefault()
    const topic = prompt("Enter a topic for your blog")
    const editorContent = getHTML(quillRef)

    setLoadingButton("blog")
    await actionBlogPage(pageId, pageName, editorContent, topic)
    await getPageContent();
    setLoadingButton('')
  }

  const handleThankYou = async (event) => {
    event.preventDefault()
    const editorContent = getHTML(quillRef)
    const topic = prompt("Enter Company and position you applied for")

    setLoadingButton('thankyou')
    await actionThankYou(pageId, pageName, editorContent, topic)
    await getPageContent();
    setLoadingButton('')
  }

  return (
    pageId && (
      <div>
        <div className="page-topsection">
        <h1>{pageName}</h1>
        
        <button onClick={() => navigate("/tutorial")} className="button-nav">Tutorial / Click Me If You're Lost</button>
        </div>
        <div className="AI-container">

          <button onClick={handleSummarize} className="ai-buttons">{loadingButton === 'summarize' ? <img src={gif} alt="Loading..." className="loading-gif" /> : "Summarize Me" }</button>

          <button onClick={handleStoryTime} className="ai-buttons">{loadingButton === 'story' ? <img src={gif} alt="Loading..." className="loading-gif" /> : "Story Time" }</button>

          <button onClick={handleSmart} className="ai-buttons">{loadingButton === 'smart' ? <img src={gif} alt="Loading..." className="loading-gif" /> : "Make Me Smart" }</button>

          <button onClick={handleTable} className="ai-buttons">{loadingButton === 'idiot' ? <img src={gif} alt="Loading..." className="loading-gif" /> : "I'm a idiot" }</button>

          <button onClick={handleCodeForMe} className="ai-buttons">{loadingButton === 'code' ? <img src={gif} alt="Loading..." className="loading-gif" /> : "Code for Me" }</button>

          <button onClick={handleOutline} className="ai-buttons">{loadingButton === 'outline' ? <img src={gif} alt="Loading..." className="loading-gif" /> : "Outline Me" }</button>

          <button onClick={handleBlog} className="ai-buttons">{loadingButton === 'blog' ? <img src={gif} alt="Loading..." className="loading-gif" /> : "Blog" }</button>

          <button onClick={handleJournal} className="ai-buttons">{loadingButton === 'journal' ? <img src={gif} alt="Loading..." className="loading-gif" /> : "Journal Prompt" }</button>

          <button onClick={handleTranslate} className="ai-buttons">{loadingButton === 'translate' ? <img src={gif} alt="Loading..." className="loading-gif" /> : "Translate Me" }</button>

          <button onClick={handleCover} className="ai-buttons">{loadingButton === 'cover' ? <img src={gif} alt="Loading..." className="loading-gif" /> : "Cover Letter" }</button>

          <button className="ai-buttons">{loadingButton === 'analyze' ? <img src={gif} alt="Loading..." className="loading-gif" /> : "Analyze" }</button>

          <button onClick={handleHumble} className="ai-buttons">{loadingButton === 'humble' ? <img src={gif} alt="Loading..." className="loading-gif" /> : "Humble Me" }</button>

          <button onClick={handleThankYou} className="ai-buttons">{loadingButton === 'thankyou' ? <img src={gif} alt="Loading..." className="loading-gif" /> : "Thank You Note" }</button>
        </div>
        
        <ReactQuill
          ref={quillRef}
          value={content}
          onChange={handleContentChange}
          className="quill-hidden"
        />
        <button onClick={handleSubmit} className="ai-buttons" >Save</button>
      </div>
    )
  );
}