import React, { PureComponent } from "react";
import styles from "./ProductCard.module.scss";
import { Link } from "react-router-dom";
import Price from "components/Price";

export default class ProductCardComponent extends PureComponent {
  render() {
    const { currentCategory } = this.props;
    const { id, name, gallery, prices } = this.props.product;

    return (
      <li className={styles.ProductCard__Item}>
        <Link
          className={styles.ProductCard__Item__Link}
          to={`${currentCategory}/${id}`}
        >
          <img
            className={styles.ProductCard__Item__Img}
            src={gallery[0]}
            alt={name}
          />
          <p className={styles.ProductCard__Item__Title}>{name}</p>
          <p className={styles.ProductCard__Item__Price}>
            <Price prices={prices} />
          </p>
        </Link>
      </li>
    );
  }
}
