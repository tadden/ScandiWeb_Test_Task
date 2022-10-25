import React, { PureComponent } from "react";
import "./App.css";
import "styles/styles.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "pages/ProductPage";
import CartPage from "pages/CartPage";
import ContextProviders from "./context";

export default class App extends PureComponent {
  render() {
    return (
      <ContextProviders>
        <Routes>
          <Route path={"/"} element={<Navigate to="/category/all" />}></Route>
          <Route path={"/category/*"} element={<CategoryPage />}></Route>
          <Route
            path={"/category/:product/:id"}
            element={<ProductPage />}
          ></Route>
          <Route path={"/cart"} element={<CartPage />}></Route>
        </Routes>
      </ContextProviders>
    );
  }
}
