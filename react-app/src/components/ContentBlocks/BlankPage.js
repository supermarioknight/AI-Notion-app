import React, { useState, useEffect } from 'react';
import './Templates.css'

export default function BlankPage() {
  const [content, setContent] = useState({ blocks: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const pageId = 1;

  useEffect(() => {
    async function getPageContent() {
      try {
        const response = await fetch(`/api/pages/active/${pageId}`);

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();

        setContent(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    }

    getPageContent();
  }, [pageId]);

  const renderContent = () => {
    return content.blocks.map((block) => {
      const blockElements = [];
  
      if (block.header) {
        const headerElements = block.header.map((header) => (
          <h1 className='header'>{header}</h1>
        ));
        blockElements.push(<div className='header-container'>{headerElements}</div>);
      }
  
      if (block.text) {
        const textElements = block.text.map((text) => (
          <div className="text">{text}</div>
        ));
        blockElements.push(<div className='text-container' placeHolder="Text goes here">{textElements}</div>);
      }
  
      if (block.code) {
        const codeElements = block.code.map((code) => (
          <pre className='code'>{code}</pre>
        ));
        blockElements.push(<div className='code-container'>{codeElements}</div>);
      }

      if (block.ordered_list) {
        const orderedListElements = block.ordered_list.map((listItem) => {

          const headerElements = listItem.header.map((header) => (
            <h1 className='header'>{header}</h1>
          ));
  
          const listItems = listItem.list.map((item) => (
            <li>{item}</li>
          ));
  
          const orderedList = <ol>{listItems}</ol>;
  
          return (
            <div className='listItem'>
              {headerElements}
              {orderedList}
            </div>
          );
        });
  
        blockElements.push(...orderedListElements);
      }
  
      return blockElements;
    });
  };
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <div className='blank-page-container'>{renderContent()}</div>;
}
