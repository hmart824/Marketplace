import React from "react";
import "./ItemListing.css";
import { useLocation } from "react-router-dom";

const ItemListing = (props) => {
  const { pathname } = useLocation();
  console.log('rendered successfully')
  return (
    <>
      {!props.item.purchased && (
        <li
          className="w-full flex gap-2 relative items-center p-2 bg-gray-100"
          // style={{border: "2px solid black"}}
        >
          <div className="img w-32 h-20">
            <img
              className=" w-full h-full object-cover "
              src={props.item.image}
              alt={props.item.name}
            />
          </div>
          <div
            // style={{border: '1px solid green' , width: '56%'}}
            className="item-info"
          >
            <p>{props.item.name.slice(0, 29)}</p>
            <p className="w-fit">
              <b>&#8377;{props.item.price}</b>
            </p>
          </div>
          <div className="btn absolute right-2 h-full flex flex-col justify-center gap-2">
            <button onClick={() => props.purchaseItem(props.item)}>Buy</button>
            {pathname === "/admin" && (
              <button
                style={{ backgroundColor: "#d53232" }}
                onClick={() => props.removeItem(props.item)}
              >
                Remove
              </button>
            )}
          </div>
        </li>
      )}
    </>
  );
};

export default ItemListing;
