import React, { Component } from "react";
import { createContext } from "react";
import getCurrencies from "query/Currencies.query";
import BrowserDatabase from "utils/browserDatabase";

export const CurrencyContext = createContext({
  getCurrencyList: () => {},
  setCurrency: () => {},
  currentCurrency: "",
  currencyList: [],
});

export default class CurrencyProvider extends Component {
  state = {
    currentCurrency: "",
    currencyList: [],
  };

  getCurrencyList = async () => {
    const { currentCurrency } = this.state;
    const { currencies } = await getCurrencies();
    this.setState({ currencyList: currencies });
    const currencyFromLocalStorage =
      BrowserDatabase.getItem("current_currency");
    if (currencyFromLocalStorage) {
      this.setState({ currentCurrency: currencyFromLocalStorage });
    } else if (!currentCurrency) {
      this.setState({ currentCurrency: currencies[0].label });
    }
  };

  setCurrency = (event) => {
    const {
      target: { value },
    } = event;
    BrowserDatabase.setItem("current_currency", value);
    this.setState({ currentCurrency: value });
  };

  getContextValues() {
    const { currentCurrency, currencyList } = this.state;
    return {
      currencyList,
      getCurrencyList: this.getCurrencyList,
      currentCurrency,
      setCurrency: this.setCurrency,
    };
  }

  render() {
    const { children } = this.props;
    return (
      <CurrencyContext.Provider value={this.getContextValues()}>
        {children}
      </CurrencyContext.Provider>
    );
  }
}
