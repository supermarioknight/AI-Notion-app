import React, { useState, useEffect } from 'react';
import './Templates.css'
import { usePagesAPI } from '../../context/PageContext';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import parse from 'html-react-parser';

export default function GettingStarted({selectedPage}) {
  
  const { getPageContent, pageContent, updatePageContent } = usePagesAPI();
  const [newContent, setNewContent] = useState(null);

  const handleContentChange = (newContent) => {
    setNewContent(newContent);
  };

  function convertToBackendStructure(reactElements) {
    const blocks = reactElements.flatMap((blockElement) => {
      const block = {};
  
      blockElement.forEach((element) => {
        if (element.type === 'div' && element.props.className === 'header-container') {
          block.header = element.props.children.map((child) => child.props.children);
        } else if (element.type === 'div' && element.props.className === 'text-container') {
          block.text = element.props.children.map((child) => child.props.children);
        } else if (element.type === 'div' && element.props.className === 'code-container') {
          block.code = element.props.children.map((child) => child.props.children);
        } else if (element.type === 'div' && element.props.className === 'listItem') {
          const header = element.props.children.filter((child) => child.type === 'h3').map((child) => child.props.children);
          const orderedList = element.props.children.filter((child) => child.type === 'ol')[0];
          const listItems = orderedList.props.children.map((child) => child.props.children);
          block.ordered_list = { header, list: listItems };
        } else if (element.type === 'div' && element.props.className === 'table') {
          const tableHeaders = element.props.children[0].props.children.map((child) => child.props.children);
          const tableRows = element.props.children[1].props.children.map((row) => {
            const rowData = {};
            tableHeaders.forEach((header, index) => {
              rowData[header] = row.props.children[index].props.children;
            });
            return rowData;
          });
          block.table = { columns: tableHeaders, rows: tableRows };
        } else if (element.type === 'div' && element.props.className === 'todo-table') {
          const todoHeaders = element.props.children[0].props.children.map((child) => child.props.children);
          const todoRows = element.props.children[1].props.children.map((row) => {
            const rowData = {};
            todoHeaders.forEach((header, index) => {
              rowData[header] = row.props.children[index]?.props.children;
            });
            return rowData;
          });
          block.to_do = { columns: todoHeaders, rows: todoRows };
        }
      });
  
      return block;
    });
  
    return blocks;
  }

  useEffect(() => {
    getPageContent(selectedPage);
    
  }, [selectedPage]);

  useEffect(() => {
    let timeout = null;

    if (newContent !== null) {
      // Wait for 5 seconds of inactivity before processing the new content
      timeout = setTimeout(() => {
        console.log(updatedPageContent)
        const updatedPageContent = convertToBackendStructure(newContent);
        updatePageContent(selectedPage, updatedPageContent);
      }, 3000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [newContent, selectedPage, updatePageContent]);

  const renderContent = () => {
    return pageContent?.blocks?.map((block) => {
      const blockElements = [];
  
      if (block.header) {
        const headerElements = block.header.map((header) => (
          <h2 className='header'>{header}</h2>
        ));
        blockElements.push(<div className='header-container'>{headerElements}</div>);
      }
  
      if (block.text) {
        const textElements = block.text.map((text) => (
          <div className="text">{text}</div>
        ));
        blockElements.push(<div className='text-container' placeholder="Text Elements Go Here">{textElements}</div>);
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
            <h3 className='header'>{header}</h3>
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

      if (block.database) {
        const { columns, rows } = block.database;
  
        const tableHeaders = columns.map((column) => (
          <div className="table-header">{column}</div>
        ));
  
        const tableRows = rows.map((row, index) => (
          <div className="table-row" key={index}>
            {columns.map((column) => (
              <div className="table-cell">{row[column]}</div>
            ))}
          </div>
        ));
  
        blockElements.push(
          <div className="table">
            <div className="table-row table-header-row">{tableHeaders}</div>
            <div className="table-body">{tableRows}</div>
          </div>
        );
      }

      if (block.to_do) {
        const { columns, rows } = block.to_do;
      
        const todoHeaders = columns.map((column) => (
          <div className="todo-header">{column}</div>
        ));
      
        const todoRows = rows.map((row, index) => (
          <div className="todo-row" key={index}>
            {columns.map((column) => (
              <div className="todo-cell">{row[column]}</div>
            ))}
          </div>
        ));
      
        blockElements.push(
          <div className="todo-table">
            <div className="todo-row todo-header-row">{todoHeaders}</div>
            <div className="todo-body">{todoRows}</div>
          </div>
        );
      }

      if (block.table) {
        const { columns, rows } = block.table;
  
        const tableHeaders = columns.map((column) => (
          <div className="table-header">{column}</div>
        ));
  
        const tableRows = rows.map((row, index) => (
          <div className="table-row" key={index}>
            {columns.map((column) => (
              <div className="table-cell">{row[column]}</div>
            ))}
          </div>
        ));
  
        blockElements.push(
          <div className="table">
            <div className="table-row table-header-row">{tableHeaders}</div>
            <div className="table-body">{tableRows}</div>
          </div>
        );
      }

  
      return blockElements;
    });


  };
  
 

  return <div 
    className='blank-page-container'
    contentEditable
    suppressContentEditableWarning
    onInput={(event) => handleContentChange(event.target)}
  >
    {renderContent()}
  </div>;
}
