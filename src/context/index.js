import MenuProvider from "./MenuContext";
import CategoryProvider from "./CategoryContext";
import ProductProvider from "./ProductContext";
import CurrencyProvider from "./CurrencyContext";
import CartProvider from "./CartContext";

// The higher the priority - the sooner gets rendered
const providers = [
  MenuProvider,
  CategoryProvider,
  ProductProvider,
  CurrencyProvider,
  CartProvider,
];

export default function ContextProviders({ children }) {
  return providers.reduceRight(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children
  );
}
