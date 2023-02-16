import { mockedProductList } from './mockedData';

// const baseUrl = 'https://my.backend';

export const getProductsList = () => {
  // const productsList = await fetch(`${baseUrl}/report`, {
  //   method: 'get',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // }).then(async (response) => {
  //   if (response) {
  //     const reportList = (await response.json()) as ProductsListType[];
  //     return reportList;
  //   }
  //   throw new Error(response);
  // });
  // return productsList;
  return mockedProductList;
};
