import React from 'react';
import HeaderBlock from './HeaderBlock';
import TextBlock from './TextBlock';
import CodeBlock from './CodeBlock';
import OrderedListBlock from './OrderedListBlock';
import TableBlock from './TableBlock';
import TodoBlock from './TodoBlock';
import DatabaseBlock from './DatabaseBlock';

const BlockComponent = ({
  blockId,
  header,
  text,
  code,
  orderedList,
  database,
  todo,
  table,
}) => {
  const components = [];

  if (header) {
    components.push(<HeaderBlock header={header} blockId={blockId} />);
  }
  if (text) {
    components.push(<TextBlock text={text} blockId={blockId} />);
  }
  if (code) {
    components.push(<CodeBlock code={code} blockId={blockId} />);
  }
  if (orderedList) {
    components.push(<OrderedListBlock orderedList={orderedList} blockId={blockId} />);
  }
  if (table) {
    components.push(<TableBlock table={table} blockId={blockId} />);
  }
  if (database) {
    components.push(<DatabaseBlock database={database} blockId={blockId} />);
  }
  if (todo) {
    components.push(<TodoBlock to_do={todo} blockId={blockId} />);
  }

  return components;
};

export default BlockComponent;