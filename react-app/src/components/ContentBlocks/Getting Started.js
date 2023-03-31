import React, { useState, useEffect, useCallback } from 'react';
import './Templates.css'
import { usePagesAPI } from '../../context/PageContext';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import parse from 'html-react-parser';
import BlockComponent from './Blocks/BlockComponent';


export default function GettingStarted({selectedPage}) {
  
  const { getPageContent, pageContent, updatePageContent } = usePagesAPI();
  const [newContent, setNewContent] = useState(null);

  const handleContentChange = useCallback((event) => {
  const reactElements = parse(event.target.innerHTML);
  setNewContent(reactElements);
  }, []);

  

  useEffect(() => {
    getPageContent(selectedPage);
    
  }, [selectedPage]);

  useEffect(() => {
    let timeout = null;

    if (newContent !== null) {
      // Wait for 5 seconds of inactivity before processing the new content
      timeout = setTimeout(() => {
        
        const updatedPageContent = convertToBackendStructure(newContent);
        console.log(updatedPageContent)
        updatePageContent(Number(selectedPage), updatedPageContent);
      }, 5000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [newContent, selectedPage, updatePageContent]);

  function convertToBackendStructure(reactElements) {
    const blocks = [];
  
    reactElements.forEach((element) => {
      const block = {};
      const blockId = element.props['data-block-id']
  
      if (element.type === 'div' && element.props.className === 'header-container') {
        block.header = Array.isArray(element.props.children) ? element.props.children.filter(child => child.props && child.props.children).map((child) => child.props.children) : [];
      } else if (element.type === 'div' && element.props.className === 'text-container') {
        block.text = Array.isArray(element.props.children) ? element.props.children.filter(child => child.props && child.props.children).map((child) => child.props.children) : [];
      } else if (element.type === 'div' && element.props.className === 'code-container') {
        block.code = Array.isArray(element.props.children) ? element.props.children.filter(child => child.props && child.props.children).map((child) => child.props.children) : [];
      } else if (element.type === 'div' && element.props.className === 'listItem') {
        const header = Array.isArray(element.props.children) ? element.props.children.filter((child) => child.type === 'h3' && child.props && child.props.children).map((child) => child.props.children) : [];
        const orderedList = element.props.children.filter((child) => child.type === 'ol')[0];
        const listItems = orderedList.props.children.filter(child => child.props && child.props.children).map((child) => child.props.children);
        block.ordered_list = { header, list: listItems };
      } else if (element.type === 'div' && element.props.className === 'table') {
        const tableHeaders = Array.isArray(element.props.children[0].props.children) ? element.props.children[0].props.children.filter(child => child.props && child.props.children).map((child) => child.props.children) : [];
        const tableRows = Array.isArray(element.props.children[1].props.children) ? element.props.children[1].props.children.filter(child => child.props && child.props.children).map((row) => {
          const rowData = {};
          tableHeaders.forEach((header, index) => {
            rowData[header] = row.props.children[index].props.children;
          });
          return rowData;
        }) : [];
        block.table = { columns: tableHeaders, rows: tableRows };
      } else if (element.type === 'div' && element.props.className === 'todo-table') {
        const todoHeaders = Array.isArray(element.props.children[0].props.children) ? element.props.children[0].props.children.filter(child => child.props && child.props.children).map((child) => child.props.children) : [];
        const todoRows = Array.isArray(element.props.children[1].props.children) ? element.props.children[1].props.children.filter(child => child.props && child.props.children).map((row) => {
          const rowData = {};
          todoHeaders.forEach((header, index) => {
            rowData[header] = row.props.children[index]?.props.children;
          });
          return rowData;
        }) : [];
        block.to_do = { columns: todoHeaders, rows: todoRows };
      }

      
      if (Object.keys(block).length > 0 && blockId) {
        block.block_id = blockId;
        blocks.push(block);
      }
    });
  
    return blocks;
  }
  
  

 
  

  const renderContent = () => {
    return pageContent?.blocks?.map((block) => {
      return (
        <BlockComponent
          key={block.block_id}
          blockId={block.block_id}
          header={block.header}
          text={block.text}
          code={block.code}
          orderedList={block.ordered_list}
          database={block.database}
          todo={block.to_do}
          table={block.table}
        />
      );
    });
  };
  
 

  return <div 
    className='blank-page-container'
    contentEditable
    suppressContentEditableWarning
    onInput={(event) => handleContentChange(event)}
    
  >
    {renderContent()}
  </div>;
}
