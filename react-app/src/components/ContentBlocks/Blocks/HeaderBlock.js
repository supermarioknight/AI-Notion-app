import React from 'react'

export default function HeaderBlock({ header = [], blockId }) {
  return (
    <div className="header-container" data-block-id={blockId}>
      {header.map((headerItem) => (
        <h2 className="header">{headerItem}</h2>
      ))}
    </div>
  );
}