import React, { PureComponent } from "react";
import { CurrencyContext } from "context/CurrencyContext";

class Price extends PureComponent {
  static contextType = CurrencyContext;

  getFinalPrice() {
    const { prices = [] } = this.props;
    const { currentCurrency } = this.context;
    const result = prices.filter(
      ({ currency: { label } }) => label === currentCurrency
    );

    return result[0] ?? {};
  }

  render() {
    const { amount, currency: { symbol } = {} } = this.getFinalPrice();
    const { setCurrentPrice = () => {} } = this.props;
    setCurrentPrice(amount);

    return <span>{`${symbol} ${amount}`}</span>;
  }
}

export default Price;
