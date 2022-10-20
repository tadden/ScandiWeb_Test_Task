import React, { Component } from "react";
import { createContext } from "react";
import getCategoriesList from "query/MenuList.query";

export const MenuContext = createContext({
  getNavigation: () => {},
  menuList: [],
});

export default class MenuProvider extends Component {
  state = {
    menuList: [],
  };

  componentDidMount() {
    this.getNavigation();
  }

  getNavigation = async () => {
    const { categories } = await getCategoriesList();

    this.setState({ menuList: categories });
  };

  getContextValues() {
    const { menuList } = this.state;

    return { menuList };
  }

  render() {
    const { children } = this.props;
    return (
      <MenuContext.Provider value={this.getContextValues()}>
        {children}
      </MenuContext.Provider>
    );
  }
}
