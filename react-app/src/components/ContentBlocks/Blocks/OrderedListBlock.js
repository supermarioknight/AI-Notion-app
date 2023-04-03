import React from 'react';

const OrderedListBlock = ({ ordered_list = [], blockId }) => {
  return ordered_list.map((listItem) => {
    const headerElements = listItem.header.map((header) => (
      <h3 className="header">{header}</h3>
    ));

    const listItems = listItem.list.map((item) => <li>{item}</li>);

    const orderedList = <ol>{listItems}</ol>;

    return (
      <div className="listItem" data-block-id={blockId}>
        {headerElements}
        {orderedList}
      </div>
    );
  });
};

export default OrderedListBlock;