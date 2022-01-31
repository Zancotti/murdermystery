import React from 'react';
import { FindSearchItem } from 'components';

export const AccessedItemList = ({
  accessedItemList,
  selectedItem,
  title,
  onItemClick,
}) => {
  return (
    <div>
      <h2>{title}</h2>
      {accessedItemList.map(item => {
        return (
          <FindSearchItem
            key={item._id}
            onClick={() => onItemClick(item)}
            item={item}
            selectedItem={selectedItem}
          />
        );
      })}
    </div>
  );
};
