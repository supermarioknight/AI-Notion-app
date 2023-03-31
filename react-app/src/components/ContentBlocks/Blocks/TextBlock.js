import React from 'react'

export default function TextBlock({text = [], blockId}) {
    return (
        <div className="text-container" data-block-id={blockId}>
          {text.map((textElement) => (
            <div className="text">{textElement}</div>
          ))}
        </div>
    );
};