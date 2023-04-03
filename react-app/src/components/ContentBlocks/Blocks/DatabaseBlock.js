import React from 'react';

const DatabaseBlock = ({ database = [], blockId }) => {
  const { columns, rows } = database;

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

  return (
    <div className="table" data-block-id={blockId}>
      <div className="table-row table-header-row">{tableHeaders}</div>
      <div className="table-body">{tableRows}</div>
    </div>
  );
};

export default DatabaseBlock;