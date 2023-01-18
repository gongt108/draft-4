import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import ItemImage from "./ItemImage";
import ItemName from "./ItemName";
import ItemDetails from "./ItemDetails";

function ViewItem(props) {
  const { _id } = useParams();
  const items = props.items;
  const filteredItem = items.filter((item) => item._id === _id);

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:8082/api/closetItems/${id}`)
  //     .then((res) => {
  //       setBook(res.data);
  //     })
  //     .catch((err) => {
  //       console.log('Error from ShowBookDetails');
  //     });
  // }, []);

  // Show Edit Form
  const [isEditing, setIsEditing] = useState(false);
  const [changedItem, setChangedItem] = useState({
    brand: filteredItem[0].brand,
    color: filteredItem[0].color,
    type: filteredItem[0].type
  });

  function showEditForm() {
    setIsEditing(true);

    // useEffect(() => {
    //   axios
    //     .get(`http://localhost:8082/api/closetItems/${id}`)
    //     .then((res) => {
    //       setChangedItem({
    //         brand: res.data.brand,
    //         color: res.data.color,
    //         type: res.data.type,
    //       });
    //     })
    //     .catch((err) => {
    //       console.log('Error from UpdateBookInfo');
    //     });
    // }, []);
  }

  // Edit Form Entries
  

  function handleChange(event) {
    const { name, value } = event.target;

    setChangedItem((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }

  function saveChange(event) {
    const id = filteredItem[0]._id;
    const img = filteredItem[0].img;
    const edit = {
      id,
      img,
      ...changedItem
    };
    // props.onSave(edit);

    axios
      .put(`http://localhost:8082/api/closetItems/${id}`, edit)
      // .then((res) => {
      //   navigate(`/ViewItem/${id}`);
      // })
      .catch((err) => {
        console.log('Error in UpdateBookInfo!');
      });

      setIsEditing(false);

  }

  // Delete Item
  // function handleDelete(event) {
  //   const id = filteredItem[0].id;
  //   props.onDelete(id);
  //   console.log("I'm being deleted!!!!!");
  // }

  const handleDelete = () => {
    const id = filteredItem[0]._id;

    axios
      .delete(`http://localhost:8082/api/closetItems/${id}`)
      // .then((res) => {
      //   navigate('/');
      // })
      .catch((err) => {
        console.log('Error form ShowBookDetails_deleteClick');
      });
  };

  return (
    <div>
      <h1> View Item </h1>
      {filteredItem.map((item) => {
        return (
          <div key={item._id}>
            <ItemImage img={item.img} />
            <ItemName item={item} />
            {!isEditing && <button onClick={showEditForm}>Edit</button>}
            {isEditing && (
              <form onChange={handleChange}>
                <ItemDetails
                  brand={item.brand}
                  color={item.color}
                  type={item.type}
                />
                <Link to={`/ViewItem/${item._id}`}>
                  <button onClick={saveChange}>Save Changes</button>
                </Link>
                <Link to="/">
                  <button onClick={handleDelete}>Delete Item</button>
                </Link>
              </form>
            )}
            <Link to="/">
              <button>Cancel</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default ViewItem;
