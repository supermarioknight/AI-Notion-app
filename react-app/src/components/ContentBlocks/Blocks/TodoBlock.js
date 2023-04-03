import React from 'react';

const TodoBlock = ({ to_do = [], blockId }) => {
  const { columns, rows } = to_do;

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

  return (
    <div className="todo-table" data-block-id={blockId}>
      <div className="todo-row todo-header-row">{todoHeaders}</div>
      <div className="todo-body">{todoRows}</div>
    </div>
  );
};

export default TodoBlock;