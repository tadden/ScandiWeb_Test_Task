import React, { PureComponent } from "react";
import { MenuContext } from "context/MenuContext";
import MenuItem from "components/MenuItem";
import CurrencySwitcher from "components/CurrencySwitcher";
import MiniCart from "components/MiniCart";
import styles from "./Header.module.scss";
import Logo from "../../images/Logo.svg";

class HeaderComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  static contextType = MenuContext;

  toggleModal = () => {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal });
  };

  render() {
    const { menuList } = this.context;
    const { cartItemsCount } = this.props;
    const { showModal } = this.state;

    return (
      <header className={styles.Header}>
        <nav className={styles.Header__Navigation}>
          <ul className={styles.Header__Navigation__List}>
            {menuList.map(({ name }, index) => (
              <MenuItem key={index} name={name} />
            ))}
          </ul>
        </nav>
        <div>
          <img src={Logo} alt="" />
        </div>
        <div className={styles.Currency__Wrapper}>
          <CurrencySwitcher />
          <button
            className={styles.Header__Cart__Btn}
            onClick={this.toggleModal}
          ></button>
          {cartItemsCount > 0 && (
            <span className={styles.Header__Cart__Count}>{cartItemsCount}</span>
          )}
        </div>
        {showModal && <MiniCart toggleModal={this.toggleModal} />}
      </header>
    );
  }
}

export default HeaderComponent;
