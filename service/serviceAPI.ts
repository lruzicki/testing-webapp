import { mockedProductList } from './mockedData';
import { ProductsListType } from './types';

// const baseUrl = 'https://my.backend';

export const getProductsList = async () => {
  return await fetch(`http://34.238.75.167:5000/report`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((actualData) => {
      console.log('actualData', actualData);
      return actualData;
    })
    .catch((error) => {
      return [[]];
    });
};

export const getProductListCount = async () => {
  return await fetch(`http://34.238.75.167:5000/report/count`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .catch((error) => {
      return [[]];
    });
};
