import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Tutorial() {
    const navigate = useNavigate()

  return (
    <div className="tutorial-div">
        <div className="tutorial-heading" style={{fontSize: 30}}>
            Features 
            <div>
            <button onClick={() => navigate('/home')} className="close-tutorial">Close & Go to User Home Page</button>
            </div>
            
        </div>

        <div className="tutorial-features">
            Workspaces 
        </div>
        <div className="workspace-description">
            Workspaces are on the top left of the users homepage and you are able to change between workspaces depending on the job you have at hand. A workspace can have many pages.
            For example if you want to have a workspace for your personal and your business you can switch between each to fit the necessary work flow that you have in mind.
        </div>

        <div className="tutorial-features">
            Pages 
        </div>

        <div className="workspace-description">
            Pages are the pages on the left and the starter pages you receive are templates you can utilize. They are essentially the container
            that holds all of your block content on the right. Everything you edit inside the Rich Text Editor on the right is inside the page. 
            You can create a page, delete a page, edit a page. Essentially whatever your workspace needs.
        </div>


        <div className="tutorial-features">
            Blocks 
        </div>

        <div className="workspace-description">
            Blocks are essentially the content inside of the pages. They are the building blocks of what you are able to do with this application.
            You can utilize Artificial Intelligence to analyze the content of the blocks and do interesting interactions with it. Read up on the Artificial Intelligence feature to understand how they can be utilized interchangeably.
        </div>

        <div className="tutorial-features">
            Artificial Intelligence 
        </div>

        <div className="workspace-description">
            This application utilizes the power of Artificial Intelligence to ease your workflow. The buttons on the home screen all represent a different functionality of the application.
            For example Translate me Will translate the content of the page in a language of your choice. Read on to understand what each of the buttons do.
        </div>


        <div className="tutorial-container">
        <div className="tutorial-text">
            <span className="tutorial-front">Summarize Me: </span> 
            When you click this button the A.I. will create a summary of the content of the page you are currently active on and populate the summary on the page afterwards.
        </div>

        <div className="tutorial-text">
            <span className="tutorial-front">Story Time: </span> 
            When clicked this button will create a story based on the topic of your choice and populate it on the page afterwards.
        </div>

        <div className="tutorial-text">
            <span className="tutorial-front">Make Me Smart: </span> 
            When clicked it will attempt to make the content you have on your page sound smarter. 
        </div>

        <div className="tutorial-text">
            <span className="tutorial-front">I'm a Idiot: </span> 
            When clicked it will explain the content of your page as if you were a 6 year old. 
        </div>

        <div className="tutorial-text">
            <span className="tutorial-front">Code For Me: </span> 
            When clicked you ask it to code something for you. Best practice is to actually ask it something that is truly programable.
        </div>
        
        <div className="tutorial-text">
            <span className="tutorial-front">Outline Me: </span> 
            When clicked it will create an outline of your choice based on a topic or the content of the page.
        </div>

        <div className="tutorial-text">
            <span className="tutorial-front">Blog: </span> 
            When clicked it will create a blog entry based on the topic of your choice. 
        </div>

        <div className="tutorial-text">
            <span className="tutorial-front">Journal Prompt: </span> 
            When clicked it can give you a few journal prompts based on the topic of your choice. 
        </div>

        <div className="tutorial-text">
            <span className="tutorial-front">Translate Me: </span> 
            When clicked it can translate the content of the page in as many languages as you input. Best practice is to actually give it real languages.
        </div>

        <div className="tutorial-text">
            <span className="tutorial-front">Cover Letter: </span> 
            Will create a cover letter for you based on the position, company, and your tech stack.
        </div>

        <div className="tutorial-text">
            <span className="tutorial-front">Analyze: </span> 
            Will analyze your content and improve it.
        </div>

        <div className="tutorial-text">
            <span className="tutorial-front">Humble Me: </span> 
            Will attempt to make the content of your page sound more humble. 
        </div>

        <div className="tutorial-text">
            <span className="tutorial-front">Thank You Note: </span> 
           Will send a thank you note to a recruiter company of your choice. 
        </div>

        </div>
    </div>
  )
}
