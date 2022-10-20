import React, { PureComponent } from "react";
import styles from "./PageContainer.module.scss";
import HeaderComponent from "components/Header";
import { CartContext } from "context/CartContext";

export default class PageContainer extends PureComponent {
  static contextType = CartContext;

  render() {
    const { cartItemsCount } = this.context;
    return (
      <>
        <div className={styles.PageContainer__Wrapper}>
          <HeaderComponent cartItemsCount={cartItemsCount} />
          {this.props.children}
        </div>
      </>
    );
  }
}
