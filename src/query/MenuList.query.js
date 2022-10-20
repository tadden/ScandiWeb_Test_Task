import { client, Query } from "@tilework/opus";

const getCategoriesList = async () => {
  client.setEndpoint("http://localhost:4000");

  const queryCategoriesList = new Query("categories", true).addFieldList([
    "name",
  ]);

  return client.post(queryCategoriesList);
};

export default getCategoriesList;
