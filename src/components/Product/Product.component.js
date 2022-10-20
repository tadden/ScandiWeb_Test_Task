import React, { PureComponent } from "react";
import styles from "./Product.module.scss";
import Price from "components/Price";
import { CartContext } from "context/CartContext";

export default class Product extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedImg: null,
      currentPrice: 0,
    };
  }

  static contextType = CartContext;

  render() {
    const { selectedImg, currentPrice } = this.state;
    const { addToCart, setAttribute, itemAttributes } = this.context;

    const {
      product,
      product: {
        id,
        name,
        brand,
        gallery,
        attributes = [],
        prices,
        description,
      } = {},
      currentImage,
    } = this.props;

    return (
      <div className={styles.Product__Wrapper}>
        {/* GALLERY */}
        <div className={styles.Product__Img__Wrapper}>
          {gallery?.map((img, index) => (
            <img
              key={index}
              className={styles.Product__Img}
              src={img}
              alt=""
              onClick={() => this.setState({ selectedImg: img })}
            />
          ))}
        </div>
        <div className={styles.Product__SelectedImg__Wrapper}>
          <img
            className={styles.Product__SelectedImg}
            src={selectedImg ?? currentImage}
            alt=""
          />
        </div>

        <div className={styles.Product__Detail__Wrapper}>
          <p className={styles.Product__Name}>{name}</p>
          <p className={styles.Product__Brand}>{brand}</p>
          {/* Attributes */}
          <div className={styles.Product__Attributes__Wrapper}>
            {attributes?.map(({ id, items, type }) => (
              <div key={id}>
                <span className={styles.Product__Attributes__Name}>{id}:</span>
                <div className={styles.Product__Attributes__Value__Wrapper}>
                  {items?.map(({ value, id: itemId }) => (
                    <div
                      className={`
                      ${styles.Product__Attributes__Value__Box}
                      ${
                        itemAttributes[id] === itemId &&
                        styles.Product__Attributes__Value__Box_selected
                      }
                      `}
                      style={{ backgroundColor: value }}
                      key={itemId}
                      onClick={() =>
                        setAttribute({
                          key: id,
                          value: itemId,
                        })
                      }
                    >
                      {type !== "swatch" && (
                        <span className={styles.Product__Attributes__Value}>
                          {value}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* PRICE */}
          <div className={styles.attributes__name_container}>
            <span className={styles.Product__Attributes__Name}>Price:</span>
            <p className={styles.Product__Price}>
              <Price
                prices={prices}
                setCurrentPrice={(price) =>
                  this.setState({ currentPrice: price })
                }
              />
            </p>
          </div>
          {/* BUTTON */}
          <button
            disabled={attributes.length > Object.keys(itemAttributes).length}
            onClick={() => addToCart(product, currentPrice)}
            className={styles.Product__Btn}
          >
            Add to cart
          </button>
          {/* DESCRIPTION */}
          <p
            className={styles.Product__Description}
            dangerouslySetInnerHTML={{ __html: description }}
          ></p>
        </div>
      </div>
    );
  }
}
