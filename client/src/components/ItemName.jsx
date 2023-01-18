import React from "react";

function ItemName({ item }) {
  const itemName = `${item.brand} ${item.color} ${item.type}`;
  return <h2>{itemName}</h2>;
}

export default ItemName;
