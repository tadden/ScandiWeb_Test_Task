import React, { PureComponent } from "react";
import ProductCard from "components/ProductCard";
import style from "./ProductList.module.scss";

export default class ProductList extends PureComponent {
  render() {
    const { productList, currentCategory } = this.props;
    return (
      <ul className={style.ProductList__Wrapper}>
        {productList.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            currentCategory={currentCategory}
          />
        ))}
      </ul>
    );
  }
}
