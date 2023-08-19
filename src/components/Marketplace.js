import React, { useState , useEffect } from "react";
import "./Marketplace.css";
import ItemForm from "./ItemForm";
import ItemListing from "./ItemListing";
import { useLocation, useNavigate } from "react-router-dom";

const Marketplace = (props) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

    // useEffect(() => {
    //   const interval = setInterval(() => {
    //     props.setItems(items => items.filter(item => Date.now() - item.created_on < 7 * 24 * 60 * 60 * 1000));
    //   }, 1000);
    //   return () => clearInterval(interval);
    // }, []);

  const toggleMarketplace = () => {
    if (props.isAdmin) {
      props.setMarketplaceEnabled(!props.marketplaceEnabled);
    }
  };

  const addItem = (item) => {
    props.setItems([...props.items, { ...item, dateAdded: Date.now() }]);
  };

  const removeItem = (item) => {
    props.setItems(props.items.filter((i) => i !== item));
  };

  const purchaseItem = (item) => {
    props.setItems(props.items.map((i) => {
      if(i.id === item.id){
        item.purchased = true;
        return item;
      }
      return i;
    }));
  };

  const filteredItems = props.items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="marketplace text-center">
      <button
        className="absolute top-1 right-1 rounded-xl"
        onClick={() => {
          if (pathname === "/admin") {
            navigate("/");
          } else {
            navigate("/admin");
          }
        }}
      >
        {pathname === "/admin" ? "Go to User View" : "Go to Admin View"}
      </button>
      {pathname === "/admin" && (
        <div className="admin absolute top-2 left-1 flex justify-center items-center gap-2">
          Admin
          <label
            htmlFor="check"
            className="bg-gray-200 cursor-pointer relative w-12 h-6 rounded-full block"
          >
            <input
              type="checkbox"
              name="check"
              id="check"
              className="sr-only peer"
              checked={props.isAdmin}
              onChange={() => {
                props.setIsAdmin(!props.isAdmin);
                if (!props.isAdmin) props.setMarketplaceEnabled(false);
              }}
            />
            <span className="w-2/6 h-4/6 bg-red-500 block absolute rounded-full left-1 top-1 peer-checked:bg-green-600 peer-checked:left-7 transition-all duration-200"></span>
          </label>
        </div>
      )}
      <h1> Marketplace</h1>
      {props.isAdmin && pathname === "/admin" && (
        <button onClick={toggleMarketplace} className="rounded-xl">
          {props.marketplaceEnabled ? "Disable" : "Enable"} Marketplace
        </button>
      )}
      <div
        className="m-container mt-4 flex justify-center px-4 gap-3"
        style={{ height: "84.8vh" }}
      >
        {props.marketplaceEnabled && props.isAdmin ? (
          <div className="items-for-sale w-3/6 flex items-center flex-col">
            <h1>Items for Sale</h1>
            <input
              type="text"
              className="w-11/12 bg-gray-100 p-1 rounded-md"
              style={{ borderBottom: "2px solid black", outline: "none" }}
              placeholder="Search for an item..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul className="w-11/12 flex flex-col items-center py-4 h-full overflow-y-scroll">
              {(filteredItems || props.items).map(
                (item) =>
                    <ItemListing
                      key={item.id}
                      item={item}
                      removeItem={removeItem}
                      purchaseItem={purchaseItem}
                    />
              )}
            </ul>
          </div>
        ) : (
          pathname !== "/admin" && <p>Wating for admin to open the market.</p>
        )}
        {props.marketplaceEnabled && props.isAdmin && (
          <ItemForm addItem={addItem} items={props.items} />
        )}
      </div>
    </div>
  );
};

export default Marketplace;
