import { CategoryContext } from "context/CategoryContext";
import React, { PureComponent } from "react";
import { NavLink } from "react-router-dom";
import styles from "./MenuItem.module.scss";

export default class MenuItem extends PureComponent {
  static contextType = CategoryContext;

  updateCategoty = () => {
    const { setCurrentCategory } = this.context;
    const { name } = this.props;
    setCurrentCategory(name);
  };

  render() {
    const { name } = this.props;
    return (
      <li onClick={this.updateCategoty} className={styles.Navigation__Item}>
        <NavLink
          className={({ isActive }) =>
            isActive ? styles.Navigation__Link_active : styles.Navigation__Link
          }
          to={{
            pathname: `/category/${name}`,
          }}
        >
          {name}
        </NavLink>
      </li>
    );
  }
}
