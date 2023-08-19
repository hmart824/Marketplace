// App.js
import React, { useState } from "react";
import "./App.css";
import Marketplace from "./components/Marketplace";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "sofa",
      price: 10,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA1aswxBhSCm5EdPmSbQT3LUvFVXvFK1i5Eg&usqp=CAU",
      purchased: false,
      created_on: 1692460324073
    },
    {
      id: 2,
      name: "bmw bike",
      price: 20,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVlPwCdOLp5tj_8GOhE79LTjyjXFuchGWXCA&usqp=CAU",
      purchased: false,
      created_on: 1692460365904
    },
    // ... other items
  ]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [marketplaceEnabled, setMarketplaceEnabled] = useState(false);

  console.log(items);
  return (
    <>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Marketplace
                key="user"
                isAdmin={isAdmin}
                items={items}
                marketplaceEnabled={marketplaceEnabled}
                setItems={setItems}
              />
            }
          />
          <Route
            exact
            path="/admin"
            element={
              <Marketplace
                key="admin"
                isAdmin={isAdmin}
                setIsAdmin={setIsAdmin}
                items={items}
                marketplaceEnabled={marketplaceEnabled}
                setMarketplaceEnabled={setMarketplaceEnabled}
                setItems={setItems}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
