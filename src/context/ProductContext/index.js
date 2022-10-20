import React, { Component } from "react";
import { createContext } from "react";
import getProduct from "query/Product.query";

export const ProductContext = createContext({
  currentProduct: "",
  product: [],
  currentImage: "",
  getProduct: () => {},
  setAttribute: () => {},
});

export default class ProductProvider extends Component {
  state = {
    currentProduct: "",
    product: [],
    currentImage: "",
  };

  getProduct = async (id) => {
    const {
      product,
      product: {
        gallery: [image],
      },
    } = await getProduct(id);
    this.setState({
      product: product,
      currentProduct: id,
      currentImage: image,
    });
  };

  getContextValues() {
    const { product, currentProduct, currentImage } = this.state;
    return {
      product,
      getProduct: this.getProduct,
      currentProduct,
      currentImage,
    };
  }

  render() {
    const { children } = this.props;
    // console.log(this.state);
    return (
      <ProductContext.Provider value={this.getContextValues()}>
        {children}
      </ProductContext.Provider>
    );
  }
}
