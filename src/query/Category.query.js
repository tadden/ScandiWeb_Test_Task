import { client, Query, Field } from "@tilework/opus";

const getCategory = async (category) => {
  client.setEndpoint("http://localhost:4000/graphql");

  const queryCategory = new Query("category", true)
    .addArgument("input", "CategoryInput", { title: category })
    .addField(
      new Field("products", true).addFieldList([
        "id",
        "name",
        "brand",
        "attributes{id, items{value, id}}",
        "inStock",
        "gallery",
        "prices {currency {label, symbol} amount}",
      ])
    );

  return await client.post(queryCategory);
};

export default getCategory;
