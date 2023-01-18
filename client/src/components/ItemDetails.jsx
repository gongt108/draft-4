import React from "react";

function ItemDetails(props) {
  return (
    <div>
      <label>Brand: </label>
      <input
        type="text"
        name="brand"
        // value={props.brand}
      />
      <br />
      <label>Color: </label>
      <input
        type="text"
        name="color"
        // value={props.color}
      />
      <br />
      <label>Type: </label>
      <input
        type="text"
        name="type"
        // value={props.type}
      />
    </div>
  );
}

export default ItemDetails;
