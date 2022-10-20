import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "context/CartContext";
import CartItem from "components/CartItem";
import styles from "./MiniCart.module.scss";

export default class MiniCart extends PureComponent {
  static contextType = CartContext;

  handleBackdropClick = (e) => {
    const { toggleModal } = this.props;
    if (e.currentTarget === e.target) {
      toggleModal();
    }
  };

  render() {
    const { cartItems = {}, cartItemsCount, grandTotal } = this.context;
    return (
      <div onClick={this.handleBackdropClick} className={styles.Overlay}>
        <div className={styles.MiniCart}>
          <h1 className={styles.MiniCart__Title}>
            My Bag{" "}
            <span className={styles.MiniCart__Title__Value}>
              {cartItemsCount} items
            </span>
          </h1>
          {cartItems.map(({ product, itemAttributes, qty }, index) => (
            <CartItem
              key={index}
              product={product}
              itemAttributes={itemAttributes}
              qty={qty}
              isMiniCart={true}
            />
          ))}
          <div className={styles.MiniCart__TotalPrice__Wrapper}>
            <span className={styles.MiniCart__TotalPrice__Value}>Total</span>
            <span className={styles.MiniCart__TotalPrice__Value}>
              $ {grandTotal}
            </span>
          </div>
          <div className={styles.MiniCart__Link__Wrapper}>
            <Link to={"/cart"} className={styles.MiniCart__Link}>
              View Bag
            </Link>
            <Link to={"/"} className={styles.MiniCart__Link}>
              Check Out
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
