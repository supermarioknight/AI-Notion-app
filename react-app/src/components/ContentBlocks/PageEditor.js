import React, { useState, useEffect, useCallback} from 'react';
import './Templates.css'
import { usePagesAPI } from '../../context/PageContext';
import parse from 'html-react-parser';
import ReactQuill, { Quill } from 'react-quill';




export default function PageEditor({pageId, pageName}) {
const [content, setContent] = useState([])

  
  const [timeoutId, setTimeoutId] = useState(null);
  const [isContentUpdated, setIsContentUpdated] = useState(false);
  const inactivityDelay = 5000;

  const handleContentChange = useCallback((value) => {
    console.log(value, 'content')
    setContent(value);
    setIsContentUpdated(true);
  }, []);

  useEffect(() => {
    getPageContent();
  }, [pageId]);

  useEffect(() => {
    if (isContentUpdated) {
      // Clear the existing timer
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Start a new timer when content changes
      const newTimeoutId = setTimeout(() => {
        savePageContent();
      }, inactivityDelay);

      setTimeoutId(newTimeoutId);
    }
  }, [content]);

console.log(content)
  

  const getPageContent = async () => {
    try {
      const response = await fetch(`/api/pages/${pageId}`);
      const data = await response.json();
      
      setContent(data.content);
    } catch (error) {
      console.error('Error getting page content:', error);
    }
  };

  
  
  const savePageContent = async () => {
    try {
      const currentResponse = await fetch(`/api/pages/${pageId}`);
      const currentData = await currentResponse.json();
      const currentContent = currentData.content;
  
      let updatedContent;
  
      if (currentContent && Array.isArray(currentContent.ops)) {
        updatedContent = {
          ops: [
            ...currentContent,
            ...content,
          ],
        };
      } else {
        updatedContent = content;
      }
  
      await fetch(`/api/pages/${pageId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: pageName,
          content: updatedContent,
        }),
      });
    } catch (error) {
      console.error('Error updating page content:', error);
    }
  };

  useEffect(() => {
    const quill = document.querySelector('.ql-editor');
    if (quill) {
      quill.addEventListener('keydown', handleSlashCommand);
    }

    return () => {
      if (quill) {
        quill.removeEventListener('keydown', handleSlashCommand);
      }
    };
  }, []);

  const handleSlashCommand = (event) => {
    if (event.key === '/') {
      const command = prompt('Enter a command (e.g. link)');

    }
  };


  return (
    <div>
      <ReactQuill
        value={content}
        onChange={handleContentChange}
      />

    </div>
  );
}