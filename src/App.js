import { useEffect, useState } from "react";
import "./App.css";
import ProductsLeft from "./components/ProductsLeft";
import GetProducts from "./components/GetProducts";

function App() {
  return (
    <div className="App">
      <ProductsLeft />
      <GetProducts />
    </div>
  );
}

export default App;
