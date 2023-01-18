import React from "react";
import { Link } from "react-router-dom";
import ItemImage from "./ItemImage";
// import Collapse from "react-bootstrap/Collapse";

function Home(props) {
  const sortCondition = props.sortCondition;
  const items = props.items;

  const sortedItems = items.sort(function (a, b) {
    var nameA = a[sortCondition].toLowerCase(); // ignore upper and lowercase
    var nameB = b[sortCondition].toLowerCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });

  return (
    <div className="App">
      <h1>Welcome to your Closet</h1>
      <h2>Here are your items</h2>
      {sortedItems.map((item, key) => {
        return (
          <div key={key}>
            <Link to={`/ViewItem/${item._id}`}>
              <ItemImage img={item.img} />
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
