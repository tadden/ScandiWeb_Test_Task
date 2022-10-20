import { client, Query } from "@tilework/opus";

const getProduct = async (product) => {
  client.setEndpoint("http://localhost:4000/graphql");

  const query = new Query("product", true)
    .addArgument("id", "String!", product)
    .addFieldList([
      "id",
      "name",
      "inStock",
      "gallery",
      "description",
      "brand",
      "attributes {id, type, items {value, id}}",
      "prices {currency {label, symbol} amount}",
    ]);

  return await client.post(query);
};

export default getProduct;
