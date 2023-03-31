import React from 'react';

const CodeBlock = ({ code = [], blockId }) => {
  return (
    <div className="code-container" data-block-id={blockId}>
      {code.map((codeElement) => (
        <pre className="code">{codeElement}</pre>
      ))}
    </div>
  );
};

export default CodeBlock;