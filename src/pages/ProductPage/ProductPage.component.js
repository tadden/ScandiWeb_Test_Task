import PageContainer from "components/PageContainer";
import React, { PureComponent } from "react";
import { ProductContext } from "context/ProductContext";
import Product from "components/Product";

export default class ProductPage extends PureComponent {
  static contextType = ProductContext;

  componentDidMount() {
    this.getCurrentProduct();
  }

  getCurrentProduct() {
    const { getProduct, CurrentProduct } = this.context;
    const productId = window.location.pathname.split("/").slice(-1)[0];
    if (CurrentProduct !== productId) {
      getProduct(productId);
    }
  }
  render() {
    const { product, currentImage } = this.context;
    return (
      <PageContainer>
        <Product product={product} currentImage={currentImage} />
      </PageContainer>
    );
  }
}
