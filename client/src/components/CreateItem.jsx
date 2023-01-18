import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import ItemDetails from "./ItemDetails";

function CreateItem(props) {
  const [item, setItem] = useState({
    img: "",
    brand: "",
    color: "",
    type: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setItem((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      };
    });

    console.log(item);
  }

  // function saveChange(event) {
  //   console.log("clicked!");
  //   props.onSave(item);
  // }

  const saveChange = (e) => {
    // e.preventDefault();

    axios
      .post('http://localhost:8082/api/closetItems', item)
      // .then((res) => {
      //   setItem({
      //     img: "",
      //     brand: "",
      //     color: "",
      //     type: ""
      //   });


      // })
      .catch((err) => {
        e.preventDefault();
        console.log('Error in CreateBook!', err);
      });
  };

  return (
    <div>
      <form onChange={handleChange}>
        {/* <input type="file" /> */}
        <label>Image url: </label>
        <input type="text" name="img" />
        <br />
        <ItemDetails />
        <Link to="/">
          <button>Cancel</button>
        </Link>
        <Link to="/">
          <button onClick={saveChange}>Save</button>
        </Link>
      </form>
    </div>
  );
}

export default CreateItem;
