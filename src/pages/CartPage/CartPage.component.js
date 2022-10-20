import React, { PureComponent } from "react";
import PageContainer from "components/PageContainer";
import CartItem from "components/CartItem";
import { CartContext } from "context/CartContext";
import styles from "./CartPage.module.scss";

export default class CartPage extends PureComponent {
  static contextType = CartContext;

  render() {
    const { cartItems = {} } = this.context;

    return (
      <PageContainer>
        <h1 className={styles.CartPage__Title}>Cart</h1>
        {cartItems.length > 0 ? (
          cartItems.map(({ product, itemAttributes, qty }, index) => (
            <CartItem
              key={index}
              product={product}
              itemAttributes={itemAttributes}
              qty={qty}
            />
          ))
        ) : (
          <p className={styles.CartPage__EmptyTitle}>Your basket is empty!</p>
        )}
      </PageContainer>
    );
  }
}
