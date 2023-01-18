import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import MainNav from "./Navbar";
import CreateItem from "./CreateItem";
import ViewItem from "./ViewItem";
import Home from "./Home";
import closetItems from "./closetItems";

function App() {
  const [items, setItems] = useState(closetItems);
  const [filteredItems, setFilteredItems] = useState([]);
  const [notSearching, setNotSearching] = useState(true);
  const [sortCondition, setSortCondition] = useState("type");
  const itemTypes = [];

  useEffect(() => {
    axios
      .get('http://localhost:8082/api/closetItems')
      .then((res) => {
        
        setItems(res.data);
      })
      .catch((err) => {
        console.log('Error from ShowBookList');
      });
  });

  function addItem(newItem) {
    setItems((prevValue) => {
      return [
        ...prevValue,
        {
          id: uuidv4(),
          ...newItem
        }
      ];
    });

    updateItemTypes();
  }

  function updateItemTypes() {
    items.forEach((item) => {
      if (!itemTypes.includes(item.type)) {
        itemTypes.push(item.type);
      }
    });
  }

  updateItemTypes();

  function editItem(edit) {
    const foundId = edit.id;

    const updatedItems = items.map((item) =>
      item.id === foundId ? edit : item
    );

    setItems(updatedItems);
  }

  function deleteItem(id) {
    setItems((prevItems) => {
      return prevItems.filter((item) => {
        return item.id !== id;
      });
    });
  }

  function sendSortCondition(condition) {
    setSortCondition(condition);
  }

  function retrieveSearchTerm(searchTerm) {
    let dataSearch = items.filter((item) => {
      return Object.keys(item).some((key) =>
        item[key]
          .toString()
          .toLowerCase()
          .includes(searchTerm.toString().toLowerCase())
      );
    });

    setFilteredItems(dataSearch);

    if (searchTerm !== "") {
      setNotSearching(false);
    } else {
      setNotSearching(true);
    }
  }

  return (
    <Router>
      <div className="content">
        <MainNav
          sendSortCondition={sendSortCondition}
          retrieveSearchTerm={retrieveSearchTerm}
          items={items}
        />

        <Switch>
          <Route exact path="/">
            <Home
              items={notSearching ? items : filteredItems}
              sortCondition={sortCondition}
            />
          </Route>
          <Route exact path="/create">
            <CreateItem onSave={addItem} />
          </Route>
          <Route path="/ViewItem/:_id">
            <ViewItem items={items} onSave={editItem} onDelete={deleteItem} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
