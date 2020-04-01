import { exampleData1 } from "./exampleData1";
import { exampleData2 } from "./exampleData2";

export const getSearchResults = (pageNumber: number) => {
  if (pageNumber % 2 === 1) {
    return exampleData1;
  } else {
    return exampleData2;
  }
};
