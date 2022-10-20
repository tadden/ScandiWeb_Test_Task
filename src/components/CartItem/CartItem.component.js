import React, { PureComponent } from "react";
import Price from "components/Price";
import styles from "./CartItem.module.scss";
import CartCount from "components/QuantitySelector";

export default class CartItem extends PureComponent {
  render() {
    const {
      product: { name, brand, prices, attributes, gallery, id },
      itemAttributes,
      qty,
      isMiniCart,
    } = this.props;
    // console.log(setAttribute);
    return (
      <>
        <div
          className={`
          ${styles.Item__Wrapper}
          ${isMiniCart && styles.Item__Wrapper_isMiniCart}
        `}
        >
          <div>
            <p
              className={`
              ${styles.Item__Name}
              ${isMiniCart && styles.Item__Name_isMiniCart}`}
            >
              {name}
            </p>
            <p
              className={`
              ${styles.Item__Brand}
              ${isMiniCart && styles.Item__Brand_isMiniCart}`}
            >
              {brand}
            </p>
            <p
              className={`
              ${styles.Item__Price}
              ${isMiniCart && styles.Item__Price_isMiniCart}`}
            >
              <Price prices={prices} />
            </p>

            {attributes?.map(({ id, items, type }) => (
              <div
                key={id}
                className={`
              ${styles.Item__Attributes__Value__Wrapper}
              ${
                isMiniCart && styles.Item__Attributes__Value__Wrapper_isMiniCart
              }
              `}
              >
                {items?.map(({ value, id: itemId }) => (
                  <div
                    className={`
                      ${styles.Item__Attributes__Value__Box}
                      ${
                        itemAttributes[id] === itemId &&
                        styles.Item__Attributes__Value__Box_selected
                      }
                      ${
                        isMiniCart &&
                        styles.Item__Attributes__Value__Box_isMiniCart
                      }
                      `}
                    style={{ backgroundColor: value }}
                    key={itemId}
                  >
                    {type !== "swatch" && (
                      <span className={styles.Product__Attributes__Value}>
                        {value}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div
            className={`${styles.Item__Count__Wrapper}
            ${isMiniCart && styles.Item__Count__Wrapper_isMiniCart}`}
          >
            <CartCount isMiniCart={isMiniCart} id={id} qty={qty} />
            <img
              className={`${styles.Item__Img}
            ${isMiniCart && styles.Item__Img_isMiniCart}`}
              src={gallery[0]}
              alt={name}
            />
          </div>
        </div>
      </>
    );
  }
}
