import React, { Component } from "react";
import { createContext } from "react";
import BrowserDatabase from "utils/browserDatabase";

export const CartContext = createContext({
  cartItems: [],
  itemAttributes: [],
  addToCart: () => {},
  cartItemsCount: 0,
  grandTotal: 0,
});

export default class CartProvider extends Component {
  state = {
    cartItems: BrowserDatabase.getItem("cart_data")?.cartItems ?? [],
    itemAttributes: BrowserDatabase.getItem("cart_data")?.itemAttributes ?? [],
    cartItemsCount: BrowserDatabase.getItem("cart_data")?.cartItemsCount ?? 0,
    grandTotal: BrowserDatabase.getItem("cart_data")?.grandTotal ?? 0,
  };

  addToCart = (product, currentPrice) => {
    const { cartItems, grandTotal, itemAttributes } = this.state;
    const updatedCartItems = [
      ...cartItems,
      {
        product: { ...product, price: parseFloat(currentPrice) },
        itemAttributes,
        qty: 1,
      },
    ];
    const cartData = {
      cartItems: updatedCartItems,
      cartItemsCount: updatedCartItems.length,
      grandTotal: parseFloat(grandTotal) + parseFloat(currentPrice),
    };
    this.setState(cartData);
    BrowserDatabase.setItem("cart_data", cartData);
    this.setState({ itemAttributes: [] });
  };

  setAttribute = (attribute) => {
    const { key, value } = attribute;
    const { itemAttributes } = this.state;
    this.setState({
      itemAttributes: { ...itemAttributes, [key]: value },
    });
  };

  updateQuantity = (id, isIncreasing = false) => {
    const { cartItems, grandTotal, cartItemsCount } = this.state;
    let productPrice = 0;
    const updatedCartItems = cartItems.reduce((acc, item) => {
      const {
        product: { id: productId, price },
        qty,
      } = item;
      if (id === productId) {
        productPrice = price;
        if (isIncreasing) {
          item.qty = qty + 1;
          acc.push(item);
        } else if (qty > 1) {
          item.qty = qty - 1;
          acc.push(item);
        }
      } else {
        acc.push(item);
      }
      return acc;
    }, []);
    const updatedGrandTotal =
      parseFloat(grandTotal) +
      (isIncreasing ? parseFloat(productPrice) : -parseFloat(productPrice));

    const cartData = {
      cartItems: updatedCartItems,
      cartItemsCount: cartItemsCount + (isIncreasing ? 1 : -1),
      grandTotal: updatedGrandTotal.toFixed(2),
    };
    this.setState(cartData);
    BrowserDatabase.setItem("cart_data", cartData);
  };
  getContextValues() {
    const { cartItems, itemAttributes, cartItemsCount, grandTotal } =
      this.state;
    return {
      cartItems,
      itemAttributes,
      cartItemsCount,
      grandTotal,
      setAttribute: this.setAttribute,
      addToCart: this.addToCart,
      updateQuantity: this.updateQuantity,
    };
  }

  render() {
    const { children } = this.props;

    return (
      <CartContext.Provider value={this.getContextValues()}>
        {children}
      </CartContext.Provider>
    );
  }
}
