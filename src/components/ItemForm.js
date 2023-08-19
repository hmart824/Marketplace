import React, { useState } from "react";
import "./ItemForm.css";

const ItemForm = (props) => {
  const [imageURL, setImageURL] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const price = e.target.price.value;
    const image = URL.createObjectURL(imageURL);
    props.addItem({ id: props.items.length + 1 , name, price, image });
    e.target.reset();
  };

  const onChangeHandler = (event) => {
    const file = event.target.files[0];
    setImageURL(file);
  };

  return (
    <div className="form-control w-3/6 flex flex-col items-center h-64">
      <h1>Add Item</h1>
      <form
        className="w-4/5 flex flex-col gap-4"
        // style={{ border: "2px solid pink" }}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          className="block w-full rounded-md border-0 py-1.5 px-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mx-auto"
          placeholder="Item Name"
        />
        <input
          type="number"
          name="price"
          className="block w-full rounded-md border-0 py-1.5 px-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mx-auto"
          placeholder="Item Price"
        />
        <input
          type="file"
          name="image"
          className="cursor-pointer"
          onChange={onChangeHandler}
        />

        <button type="submit">Add Item To Sale</button>
      </form>
    </div>
  );
};

export default ItemForm;
