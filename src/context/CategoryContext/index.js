import React, { Component } from "react";
import { createContext } from "react";
import getCategory from "query/Category.query";

export const CategoryContext = createContext({
  getCategory: () => {},
  productList: [],
});

export default class CategoryProvider extends Component {
  state = {
    currentCategory: "",
    productList: [],
  };

  getProductList = async (category) => {
    const { category: { products } = [] } = await getCategory(category);
    this.setState({ productList: products, currentCategory: category });
  };

  setCurrentCategory = (category) => {
    this.getProductList(category);
  };

  getContextValues() {
    const { productList, currentCategory } = this.state;
    return {
      productList,
      getProductList: this.getProductList,
      currentCategory,
      setCurrentCategory: this.setCurrentCategory,
    };
  }

  render() {
    const { children } = this.props;
    return (
      <CategoryContext.Provider value={this.getContextValues()}>
        {children}
      </CategoryContext.Provider>
    );
  }
}
