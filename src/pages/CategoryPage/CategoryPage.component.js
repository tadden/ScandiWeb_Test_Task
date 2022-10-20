import PageContainer from "components/PageContainer";
import ProductList from "components/ProductList";
import { CategoryContext } from "context/CategoryContext";
import React, { PureComponent } from "react";

class CategoryPage extends PureComponent {
  static contextType = CategoryContext;

  componentDidMount() {
    this.getCurrentCategory();
  }

  getCurrentCategory() {
    const { getProductList, currentCategory } = this.context;
    const categoryName = window.location.pathname.split("/").slice(-1)[0];
    if (currentCategory !== categoryName) {
      getProductList(categoryName);
    }
  }

  render() {
    const { productList, currentCategory } = this.context;

    return (
      <PageContainer>
        <ProductList
          productList={productList}
          currentCategory={currentCategory}
        />
      </PageContainer>
    );
  }
}

export default CategoryPage;
