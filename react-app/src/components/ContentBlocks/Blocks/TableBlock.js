import React from 'react';

const TableBlock = ({ table = [], blockId }) => {
  const { columns, rows } = table;
  

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

export default TableBlock;



