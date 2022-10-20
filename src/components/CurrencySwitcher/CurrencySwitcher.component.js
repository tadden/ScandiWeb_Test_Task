import React, { PureComponent } from "react";
import { CurrencyContext } from "context/CurrencyContext";
import styles from "./CurrencySwitcher.module.scss";

class CurrencySwitcher extends PureComponent {
  static contextType = CurrencyContext;

  componentDidMount() {
    const { getCurrencyList } = this.context;
    getCurrencyList();
  }

  render() {
    const { currencyList, setCurrency, currentCurrency } = this.context;
    return (
      <div>
        <select className={styles.Dropdown} onChange={setCurrency}>
          {currencyList?.map(({ label, symbol }, index) => (
            <option
              className={styles.Dropdown__Item}
              key={index}
              value={label}
              selected={label === currentCurrency}
            >
              {symbol}
              {label}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default CurrencySwitcher;
