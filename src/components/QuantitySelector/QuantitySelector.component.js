import React, { PureComponent } from "react";
import styles from "./QuantitySelector.module.scss";
import { CartContext } from "context/CartContext";

export default class QuantitySelector extends PureComponent {
  static contextType = CartContext;
  render() {
    const { isMiniCart, id, qty } = this.props;
    const { updateQuantity } = this.context;

    return (
      <div className={styles.Count__Wrapper}>
        <button
          className={`
        ${styles.Count__Btn}
        ${isMiniCart && styles.Count__Btn_isMiniCart}
        `}
          onClick={() => updateQuantity(id, true)}
        >
          +
        </button>
        <div>
          <span className={styles.Count__Value}>{qty}</span>
        </div>
        <button
          className={`
        ${styles.Count__Btn}
        ${isMiniCart && styles.Count__Btn_isMiniCart}
        `}
          onClick={() => updateQuantity(id, false)}
        >
          -
        </button>
      </div>
    );
  }
}
